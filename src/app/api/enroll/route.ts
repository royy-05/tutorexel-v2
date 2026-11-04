import { NextRequest, NextResponse } from "next/server";
import { computePricing, type ClassType, type Offering } from "@/lib/pricing";
import { findActiveByCode, incrementUsage } from "@/lib/coupons-store";
import { applyCoupon } from "@/lib/coupons-apply";
import { logSubmission } from "@/lib/submissions-store";
import { getRegionConfig, type RegionCode } from "@/data/regions";
import {
  sendEnrollmentWelcomeEmail,
  sendEnrollmentTeamNotification,
  type EnrollmentEmailParams,
} from "@/utils/enrollment-emails";
import { sendEnrollmentWebhook } from "@/utils/webhook";
import { rateLimit, clientIp } from "@/lib/rate-limit";
import {
  isHoneypotTriggered,
  isValidEmail,
  isValidLength,
  isValidPhone,
} from "@/lib/form-validation";

/**
 * Formats a phone number for Razorpay without overriding existing country codes.
 * If no leading '+' is present, applies the region calling code.
 */
function formatPhoneForRazorpay(phone: string, region: RegionCode): string {
  if (!phone) return "";
  let cleaned = phone.replace(/[^\d+]/g, "");

  if (!cleaned.startsWith("+")) {
    const regionCallingCodes: Record<RegionCode, string> = {
      au: "+61",
      us: "+1",
      ca: "+1",
      nz: "+64",
    };
    const prefix = regionCallingCodes[region] || "+61";
    if (cleaned.startsWith("0")) {
      cleaned = prefix + cleaned.substring(1);
    } else {
      cleaned = prefix + cleaned;
    }
  }

  // Strip leading zero after Australian country code if present (+610412... -> +61412...)
  if (cleaned.startsWith("+610")) {
    cleaned = "+61" + cleaned.substring(4);
  }

  return cleaned;
}

/**
 * Generates a deterministic reference_id for deduplication.
 * Same email + amount + currency + day -> same reference_id.
 * Razorpay rejects duplicate reference_ids, which we catch to return the existing link.
 */
function generateReferenceId(email: string, amount: number, currency: string): string {
  const today = new Date().toISOString().split("T")[0].replace(/-/g, ""); // YYYYMMDD
  const emailSlug = email.toLowerCase().replace(/[^a-z0-9]/g, "_").substring(0, 16);
  return `te_${emailSlug}_${amount}${currency.toLowerCase()}_${today}`.substring(0, 40);
}

function getRazorpayAuthHeader(): string | null {
  const keyId = process.env.RAZORPAY_KEY_ID;
  const keySecret = process.env.RAZORPAY_KEY_SECRET;
  if (!keyId || !keySecret) return null;
  return "Basic " + Buffer.from(`${keyId}:${keySecret}`).toString("base64");
}

/**
 * Fetches an existing payment link by reference_id.
 * Used when Razorpay rejects a duplicate reference_id so we return the existing link.
 */
async function fetchPaymentLinkByReferenceId(referenceId: string): Promise<string | null> {
  const auth = getRazorpayAuthHeader();
  if (!auth) return null;

  const response = await fetch(
    `https://api.razorpay.com/v1/payment_links?reference_id=${encodeURIComponent(referenceId)}`,
    { headers: { Authorization: auth } }
  );

  if (!response.ok) return null;
  const data = await response.json();
  return data.payment_links?.[0]?.short_url || null;
}

async function createRazorpayPaymentLink(params: {
  amount: number;
  currency: string;
  region: RegionCode;
  description: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  studentName: string;
  yearGroup: string;
  offering: string;
}): Promise<{ paymentUrl: string | null; referenceId: string }> {
  const currency = params.currency;
  const referenceId = generateReferenceId(params.customerEmail, params.amount, currency);

  const auth = getRazorpayAuthHeader();
  if (!auth) {
    console.error("[Razorpay] credentials not configured");
    return { paymentUrl: null, referenceId };
  }

  const regConfig = getRegionConfig(params.region);
  const callbackUrl = `${process.env.NEXT_PUBLIC_SITE_URL || "https://www.tutorexel.com"}${regConfig.basePath}/thank-you`;
  const formattedPhone = formatPhoneForRazorpay(params.customerPhone, params.region);

  const requestBody = {
    amount: Math.round(params.amount * 100),
    currency,
    accept_partial: false,
    reference_id: referenceId,
    description: params.description,
    reminder_enable: false,
    customer: {
      name: params.customerName,
      email: params.customerEmail,
      contact: formattedPhone,
    },
    notify: {
      sms: false,
      email: false,
    },
    notes: {
      studentName: params.studentName,
      yearGroup: params.yearGroup,
      offering: params.offering,
      parentName: params.customerName,
      email: params.customerEmail,
      region: params.region,
      currency: params.currency,
      displayAmount: `${params.currency} ${params.amount % 1 !== 0 ? params.amount.toFixed(2) : params.amount}`,
      displayAmountAUD: String(params.amount % 1 !== 0 ? params.amount.toFixed(2) : params.amount),
    },
    callback_url: callbackUrl,
    callback_method: "get",
  };

  const response = await fetch("https://api.razorpay.com/v1/payment_links", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: auth,
    },
    body: JSON.stringify(requestBody),
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    const description = data?.error?.description?.toLowerCase?.() || "";
    const isDuplicate = description.includes("already exists");

    if (isDuplicate) {
      const existingUrl = await fetchPaymentLinkByReferenceId(referenceId);
      if (existingUrl) {
        console.log("[Razorpay] Returning existing link for", referenceId);
        return { paymentUrl: existingUrl, referenceId };
      }
    }

    console.error("[Razorpay] API error:", JSON.stringify(data));
    return { paymentUrl: null, referenceId };
  }

  return { paymentUrl: data.short_url, referenceId };
}

export async function POST(request: NextRequest) {
  try {
    const ip = clientIp(request.headers);
    const rl = rateLimit(`form:enroll:${ip}`, 5, 5 / 900);
    if (!rl.ok) {
      return NextResponse.json(
        { error: "Too many requests. Please try again later." },
        {
          status: 429,
          headers: { "Retry-After": String(Math.ceil(rl.retryAfterMs / 1000)) },
        }
      );
    }

    const body = await request.json().catch(() => null);
    if (!body || typeof body !== "object") {
      return NextResponse.json({ error: "Invalid JSON payload" }, { status: 400 });
    }

    // Silent rejection for honeypot
    if (isHoneypotTriggered(body.website)) {
      return NextResponse.json({ success: true });
    }

    const {
      region: rawRegion,
      parentName,
      email,
      phone,
      studentName,
      yearGroup,
      offering,
      planDetails,
      totalAmount: clientTotal,
      couponCode,
      pricingSelection,
    } = body as {
      region?: string;
      parentName?: string;
      email?: string;
      phone?: string;
      studentName?: string;
      yearGroup?: string;
      offering?: string;
      planDetails?: string;
      totalAmount?: number;
      couponCode?: string | null;
      website?: string;
      pricingSelection?: {
        offering?: Offering;
        classType?: ClassType;
        subjects?: { Mathematics?: boolean; English?: boolean; Science?: boolean };
        activities?: { piano?: boolean; guitar?: boolean };
      };
    };

    // Server-side validation
    if (
      !isValidLength(parentName, 100) ||
      !parentName ||
      typeof parentName !== "string" ||
      parentName.trim() === ""
    ) {
      return NextResponse.json({ error: "Valid parent name is required (max 100 characters)" }, { status: 400 });
    }

    if (!isValidEmail(email)) {
      return NextResponse.json({ error: "A valid email address is required" }, { status: 400 });
    }
    const cleanEmail: string = (email as string).trim();

    if (phone && !isValidPhone(phone)) {
      return NextResponse.json({ error: "Phone number format is invalid (7 to 20 digits or symbols)" }, { status: 400 });
    }

    if (
      !isValidLength(studentName, 100) ||
      !studentName ||
      typeof studentName !== "string" ||
      studentName.trim() === ""
    ) {
      return NextResponse.json({ error: "Valid student name is required (max 100 characters)" }, { status: 400 });
    }

    if (
      !isValidLength(yearGroup, 100) ||
      !yearGroup ||
      typeof yearGroup !== "string" ||
      yearGroup.trim() === ""
    ) {
      return NextResponse.json({ error: "Valid year group is required (max 100 characters)" }, { status: 400 });
    }

    if (
      !isValidLength(offering, 100) ||
      !offering ||
      typeof offering !== "string" ||
      offering.trim() === ""
    ) {
      return NextResponse.json({ error: "Valid programme offering is required (max 100 characters)" }, { status: 400 });
    }

    if (!isValidLength(planDetails, 2000)) {
      return NextResponse.json({ error: "Plan details exceed maximum length (2000 characters)" }, { status: 400 });
    }

    if (!isValidLength(couponCode, 50)) {
      return NextResponse.json({ error: "Coupon code exceeds maximum length (50 characters)" }, { status: 400 });
    }

    // Validate region strictly server-side
    const validRegions: RegionCode[] = ["au", "us", "ca", "nz"];
    const region: RegionCode = validRegions.includes((rawRegion || "").toLowerCase() as RegionCode)
      ? ((rawRegion || "").toLowerCase() as RegionCode)
      : "au";
    const regConfig = getRegionConfig(region);
    const currency = regConfig.currency;

    // Derive authoritative price server-side from user selection
    let serverTotal: number | null = null;
    if (pricingSelection && typeof pricingSelection === "object") {
      const result = computePricing({
        offering: pricingSelection.offering as Offering,
        classType: pricingSelection.classType as ClassType,
        subjects: pricingSelection.subjects,
        activities: pricingSelection.activities,
        region: region,
      });
      serverTotal = result.total;
    }

    if (serverTotal == null) {
      serverTotal = typeof clientTotal === "number" && clientTotal > 0 ? clientTotal : null;
    } else if (typeof clientTotal === "number" && Math.abs(serverTotal - clientTotal) > 0.01) {
      console.warn(
        "[Enroll] client/server total mismatch - using server value.",
        { clientTotal, serverTotal, email, offering, region }
      );
    }

    // Server-side coupon re-validation
    let validatedCouponCode: string | null = null;
    let validatedCouponId: string | null = null;
    let discountAmount = 0;
    let finalAmount: number | null = serverTotal;
    let couponNote: string | null = null;

    if (couponCode && serverTotal != null && serverTotal > 0) {
      const coupon = await findActiveByCode(String(couponCode));
      const result = applyCoupon(coupon, serverTotal);
      if (result.ok && coupon) {
        validatedCouponCode = coupon.code;
        validatedCouponId = coupon.id;
        discountAmount = result.discountAmount ?? 0;
        finalAmount = result.finalAmount ?? serverTotal;
        couponNote = `${coupon.code}: ${
          coupon.discountType === "percentage"
            ? `${coupon.discountValue}% off`
            : `$${coupon.discountValue} off`
        }`;
      } else {
        console.warn("[Enroll] coupon rejected at payment", { couponCode, reason: result.reason });
      }
    }

    const chargeAmount = finalAmount;

    // Build subject and activity lists
    const activityList = pricingSelection?.activities
      ? Object.entries(pricingSelection.activities)
          .filter(([, v]) => v)
          .map(([k]) => k.charAt(0).toUpperCase() + k.slice(1))
          .join(", ")
      : null;
    const subjectList = pricingSelection?.subjects
      ? Object.entries(pricingSelection.subjects)
          .filter(([, v]) => v)
          .map(([k]) => k.charAt(0).toUpperCase() + k.slice(1))
          .join(", ")
      : null;

    const enrollData: Record<string, string | number | boolean | null | undefined> = {
      region,
      currency,
      parentName: parentName.trim(),
      email: cleanEmail,
      phone: phone ? phone.trim() : "",
      studentName: studentName.trim(),
      yearGroup: yearGroup.trim(),
      offering: offering.trim(),
      ...(planDetails ? { planDetails: planDetails.trim() } : {}),
      ...(subjectList ? { subjects: subjectList } : {}),
      ...(activityList ? { activities: activityList } : {}),
      ...(validatedCouponCode ? { couponCode: validatedCouponCode } : couponCode ? { couponCode: String(couponCode).trim() } : {}),
      ...(serverTotal != null ? { originalPrice: `${currency} $${serverTotal % 1 !== 0 ? serverTotal.toFixed(2) : serverTotal}` } : {}),
      ...(discountAmount > 0 ? { discount: `-${currency} $${discountAmount.toFixed(2)}` } : {}),
      ...(chargeAmount != null ? { finalPrice: `${currency} $${chargeAmount % 1 !== 0 ? chargeAmount.toFixed(2) : chargeAmount}` } : {}),
    };

    // Create Razorpay Payment Link (with customer notification disabled)
    let paymentUrl: string | null = null;
    let paymentError: string | null = null;
    let referenceId = generateReferenceId(cleanEmail, chargeAmount || 0, currency);

    if (chargeAmount && chargeAmount > 0) {
      const description = [
        `TutorExel - ${offering}`,
        planDetails ? `(${planDetails.replace(/\n/g, ", ")})` : "",
        couponNote ? `[Coupon: ${couponNote}]` : "",
      ]
        .filter(Boolean)
        .join(" ")
        .trim();

      const linkResult = await createRazorpayPaymentLink({
        amount: chargeAmount,
        currency,
        region,
        description,
        customerName: parentName.trim(),
        customerEmail: cleanEmail,
        customerPhone: phone ? phone.trim() : "",
        studentName: studentName.trim(),
        yearGroup: yearGroup.trim(),
        offering: offering.trim(),
      });

      paymentUrl = linkResult.paymentUrl;
      referenceId = linkResult.referenceId;

      if (!paymentUrl) {
        paymentError = "Payment link creation failed. Check server logs.";
        console.error(
          "[Enroll] Payment link creation returned null.",
          { chargeAmount, currency, region, email, offering }
        );
      } else if (validatedCouponId) {
        try {
          await incrementUsage(validatedCouponId);
        } catch (err) {
          console.warn("[Enroll] failed to increment coupon usage", err);
        }
      }
    } else {
      paymentError = `chargeAmount is ${JSON.stringify(chargeAmount)} - skipped payment link creation`;
      console.warn("[Enroll] Skipped Razorpay -", { chargeAmount });
    }

    // 1. Send emails in isolated try/catch blocks
    const emailParams: EnrollmentEmailParams = {
      parentName: parentName.trim(),
      email: cleanEmail,
      phone: phone ? phone.trim() : "",
      studentName: studentName.trim(),
      yearGroup: yearGroup.trim(),
      offering: offering.trim(),
      classType: pricingSelection?.classType
        ? pricingSelection.classType === "one-to-one"
          ? "One-to-One Session"
          : "Group Class (3:1)"
        : undefined,
      subjects: subjectList || undefined,
      activities: activityList || undefined,
      planDetails: planDetails ? planDetails.trim() : undefined,
      amount: chargeAmount || serverTotal || 0,
      currency,
      region,
      paymentUrl,
      referenceId,
      couponCode: validatedCouponCode || undefined,
      discountAmount,
    };

    let teamEmailOk = false;
    try {
      teamEmailOk = await sendEnrollmentTeamNotification(emailParams);
    } catch (err) {
      console.error(`[enroll ${region.toUpperCase()}] Failed to send team lead email:`, err);
      teamEmailOk = false;
    }

    try {
      await sendEnrollmentWelcomeEmail(emailParams);
    } catch (err) {
      console.error(`[enroll ${region.toUpperCase()}] Failed to send customer welcome email:`, err);
    }

    // 2. Save submission to store in isolated try/catch
    let storedOk = false;
    try {
      const storePayload = {
        ...enrollData,
        ...(!teamEmailOk && { emailFailed: true }),
      };
      await logSubmission("enroll", storePayload);
      storedOk = true;
    } catch (err) {
      console.error(`[enroll ${region.toUpperCase()}] Failed to save submission to store:`, err);
      storedOk = false;
    }

    // 3. Call server-side webhook in isolated try/catch
    try {
      await sendEnrollmentWebhook(enrollData);
    } catch (err) {
      console.error(`[enroll ${region.toUpperCase()}] Failed to call webhook:`, err);
    }

    // Return success only if stored OR team email sent
    if (!storedOk && !teamEmailOk) {
      return NextResponse.json(
        { error: "Failed to process enrolment. Please try again later." },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      paymentUrl,
      paymentError,
      currency,
      receiptId: referenceId,
      serverTotal,
      discountAmount,
      finalAmount: chargeAmount,
      appliedCouponCode: validatedCouponCode,
    });
  } catch (error) {
    console.error("Enrolment error:", error);
    return NextResponse.json({ error: "Failed to process enrolment" }, { status: 500 });
  }
}
