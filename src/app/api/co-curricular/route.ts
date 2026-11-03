import { NextRequest, NextResponse } from "next/server";
import { logSubmission } from "@/lib/submissions-store";
import { sendLeadEmail } from "@/utils/mailer";
import { rateLimit, clientIp } from "@/lib/rate-limit";
import {
  isHoneypotTriggered,
  isValidEmail,
  isValidLength,
  isValidPhone,
} from "@/lib/form-validation";

export async function POST(request: NextRequest) {
  try {
    const ip = clientIp(request.headers);
    const rl = rateLimit(`form:co-curricular:${ip}`, 5, 5 / 900);
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
      instrument,
      parentName,
      email,
      phone,
      studentName,
      yearLevel,
      preferredTime,
      additionalNotes,
      region: rawRegion,
    } = body;

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

    if (!isValidPhone(phone)) {
      return NextResponse.json({ error: "A valid phone number is required (7 to 20 digits or symbols)" }, { status: 400 });
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
      !isValidLength(yearLevel, 100) ||
      !yearLevel ||
      typeof yearLevel !== "string" ||
      yearLevel.trim() === ""
    ) {
      return NextResponse.json({ error: "Valid year level is required (max 100 characters)" }, { status: 400 });
    }

    if (!isValidLength(instrument, 100)) {
      return NextResponse.json({ error: "Instrument exceeds maximum length (100 characters)" }, { status: 400 });
    }

    if (!isValidLength(preferredTime, 100)) {
      return NextResponse.json({ error: "Preferred time exceeds maximum length (100 characters)" }, { status: 400 });
    }

    if (!isValidLength(additionalNotes, 2000)) {
      return NextResponse.json({ error: "Additional notes exceed maximum length (2000 characters)" }, { status: 400 });
    }

    const region = (typeof rawRegion === "string" && rawRegion ? rawRegion : "au").toLowerCase();
    const data: Record<string, string | number | boolean | null | undefined> = {
      region,
      parentName: parentName.trim(),
      email: email.trim(),
      phone: phone.trim(),
      studentName: studentName.trim(),
      yearLevel: yearLevel.trim(),
      ...(instrument && { instrument: String(instrument).trim() }),
      ...(preferredTime && { preferredTime: String(preferredTime).trim() }),
      ...(additionalNotes && { additionalNotes: String(additionalNotes).trim() }),
    };

    // 1. Send email in isolated try/catch
    let emailOk = false;
    try {
      emailOk = await sendLeadEmail({
        form: "co-curricular",
        region,
        data,
        pageUrl: `https://www.tutorexel.com/${region === "au" ? "" : region}/co-curricular`,
        replyTo: email.trim(),
      });
    } catch (err) {
      console.error(`[co-curricular ${region.toUpperCase()}] Failed to send lead email:`, err);
      emailOk = false;
    }

    // 2. Save to store in isolated try/catch
    let storedOk = false;
    try {
      const storePayload = {
        ...data,
        ...(!emailOk && { emailFailed: true }),
      };
      await logSubmission("co-curricular", storePayload);
      storedOk = true;
    } catch (err) {
      console.error(`[co-curricular ${region.toUpperCase()}] Failed to save submission to store:`, err);
      storedOk = false;
    }

    // Return success only if stored OR email sent
    if (!storedOk && !emailOk) {
      return NextResponse.json(
        { error: "Failed to submit enquiry. Please try again later." },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Co-curricular enquiry error:", error);
    return NextResponse.json({ error: "Failed to submit enquiry" }, { status: 500 });
  }
}
