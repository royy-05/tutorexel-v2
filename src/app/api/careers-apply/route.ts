import { NextRequest, NextResponse } from "next/server";
import { logSubmission } from "@/lib/submissions-store";
import { sendLeadEmail, type LeadEmailAttachment } from "@/utils/mailer";
import { sendCareersWebhook } from "@/utils/webhook";
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
    const rl = rateLimit(`form:careers-apply:${ip}`, 5, 5 / 900);
    if (!rl.ok) {
      return NextResponse.json(
        { error: "Too many requests. Please try again later." },
        {
          status: 429,
          headers: { "Retry-After": String(Math.ceil(rl.retryAfterMs / 1000)) },
        }
      );
    }

    const formData = await request.formData();

    // Silent rejection for honeypot
    const honeypot = formData.get("website");
    if (isHoneypotTriggered(honeypot)) {
      return NextResponse.json({ success: true });
    }

    const fullName = formData.get("fullName") as string;
    const email = formData.get("email") as string;
    const phone = formData.get("phone") as string;
    const location = formData.get("location") as string;
    const qualificationRaw = formData.get("qualification") as string;
    const QUAL_LABELS: Record<string, string> = {
      "bachelors-education": "Bachelor's of Education",
      "bachelors-other": "Bachelor's Degree (Other)",
      "masters-education": "Master's of Education",
      "masters-other": "Master's Degree (Other)",
      "phd": "PhD",
      "diploma": "Diploma of Teaching",
      "cert-iv": "Certificate IV in Training & Assessment",
      "other": "Other",
    };
    const qualification = QUAL_LABELS[qualificationRaw] || qualificationRaw;
    const yearsExperience = formData.get("yearsExperience") as string;
    const currentRole = formData.get("currentRole") as string;
    const hasLaptopOrIpad = formData.get("hasWebcam") as string;
    const hasQuietSpace = formData.get("hasQuietSpace") as string;
    const internetSpeed = formData.get("internetSpeed") as string;
    const coverLetter = formData.get("coverLetter") as string;
    const subjectsRaw = formData.get("subjects") as string;
    const availabilityRaw = formData.get("availability") as string;
    const cvFile = formData.get("cv") as File | null;
    const rawRegion = formData.get("region") as string;
    const region = (rawRegion || "au").toLowerCase();

    // Server-side validation
    if (
      !isValidLength(fullName, 100) ||
      !fullName ||
      typeof fullName !== "string" ||
      fullName.trim() === ""
    ) {
      return NextResponse.json({ error: "Valid full name is required (max 100 characters)" }, { status: 400 });
    }

    if (!isValidEmail(email)) {
      return NextResponse.json({ error: "A valid email address is required" }, { status: 400 });
    }

    if (!isValidPhone(phone)) {
      return NextResponse.json({ error: "A valid phone number is required (7 to 20 digits or symbols)" }, { status: 400 });
    }

    if (
      !isValidLength(location, 100) ||
      !location ||
      typeof location !== "string" ||
      location.trim() === ""
    ) {
      return NextResponse.json({ error: "Valid location is required (max 100 characters)" }, { status: 400 });
    }

    if (
      !isValidLength(qualification, 100) ||
      !qualification ||
      typeof qualification !== "string" ||
      qualification.trim() === ""
    ) {
      return NextResponse.json({ error: "Valid qualification is required (max 100 characters)" }, { status: 400 });
    }

    if (
      !isValidLength(yearsExperience, 50) ||
      !yearsExperience ||
      typeof yearsExperience !== "string" ||
      yearsExperience.trim() === ""
    ) {
      return NextResponse.json({ error: "Years of experience is required (max 50 characters)" }, { status: 400 });
    }

    if (!isValidLength(currentRole, 100)) {
      return NextResponse.json({ error: "Current role exceeds maximum length (100 characters)" }, { status: 400 });
    }

    if (!isValidLength(hasLaptopOrIpad, 50)) {
      return NextResponse.json({ error: "Device details exceed maximum length (50 characters)" }, { status: 400 });
    }

    if (!isValidLength(hasQuietSpace, 50)) {
      return NextResponse.json({ error: "Quiet space details exceed maximum length (50 characters)" }, { status: 400 });
    }

    if (!isValidLength(internetSpeed, 50)) {
      return NextResponse.json({ error: "Internet speed details exceed maximum length (50 characters)" }, { status: 400 });
    }

    if (!isValidLength(coverLetter, 2000)) {
      return NextResponse.json({ error: "Cover letter exceeds maximum length (2000 characters)" }, { status: 400 });
    }

    // Validate and process CV file without saving to disk
    const attachments: LeadEmailAttachment[] = [];
    let cvFileName = "";
    if (cvFile && cvFile.size > 0) {
      const MAX_CV_SIZE = 5 * 1024 * 1024; // 5 MB
      if (cvFile.size > MAX_CV_SIZE) {
        return NextResponse.json(
          { error: "CV file size exceeds the 5 MB limit" },
          { status: 400 }
        );
      }

      const ext = (cvFile.name.split(".").pop() || "").toLowerCase();
      const allowedExts = ["pdf", "doc", "docx"];
      const allowedMimes = [
        "application/pdf",
        "application/msword",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        "application/octet-stream",
      ];

      if (!allowedExts.includes(ext) || (!allowedMimes.includes(cvFile.type) && cvFile.type !== "")) {
        return NextResponse.json(
          { error: "Invalid CV file type. Only PDF, DOC, and DOCX files are allowed." },
          { status: 400 }
        );
      }

      const bytes = await cvFile.arrayBuffer();
      const buffer = Buffer.from(bytes);
      cvFileName = cvFile.name || "resume.pdf";
      attachments.push({
        filename: cvFileName,
        content: buffer,
        contentType: cvFile.type || "application/octet-stream",
      });
    }

    // Parse JSON arrays sent as strings
    let subjectsList = "";
    try {
      subjectsList = JSON.parse(subjectsRaw || "[]").join(", ");
    } catch {
      subjectsList = subjectsRaw || "";
    }

    let availabilityStr = "";
    try {
      const avail = JSON.parse(availabilityRaw || "[]");
      if (Array.isArray(avail)) {
        availabilityStr = avail.join(", ");
      } else {
        availabilityStr = Object.entries(avail).filter(([, v]) => v).map(([k]) => k).join(", ");
      }
    } catch {
      availabilityStr = availabilityRaw || "";
    }

    const data: Record<string, string | number | boolean | null | undefined> = {
      region,
      fullName: fullName.trim(),
      email: email.trim(),
      phone: phone.trim(),
      location: location.trim(),
      qualification: qualification.trim(),
      yearsExperience: yearsExperience.trim(),
      ...(currentRole && { currentRole: currentRole.trim() }),
      ...(subjectsList && { subjects: subjectsList.trim() }),
      ...(availabilityStr && { availability: availabilityStr.trim() }),
      ...(hasLaptopOrIpad && { hasLaptopOrIpad: hasLaptopOrIpad.trim() }),
      ...(hasQuietSpace && { hasQuietSpace: hasQuietSpace.trim() }),
      ...(internetSpeed && { internetSpeed: internetSpeed.trim() }),
      ...(coverLetter && { coverLetter: coverLetter.trim() }),
      ...(cvFileName && { cvFileName }),
    };

    // 1. Send email in isolated try/catch
    let emailOk = false;
    try {
      emailOk = await sendLeadEmail({
        form: "careers-apply",
        region,
        data,
        pageUrl: `https://www.tutorexel.com/${region === "au" ? "" : region}/careers/apply`,
        replyTo: email.trim(),
        attachments: attachments.length > 0 ? attachments : undefined,
      });
    } catch (err) {
      console.error(`[careers-apply ${region.toUpperCase()}] Failed to send lead email:`, err);
      emailOk = false;
    }

    // 2. Save to store in isolated try/catch
    let storedOk = false;
    try {
      const storePayload = {
        ...data,
        ...(!emailOk && { emailFailed: true }),
      };
      await logSubmission("careers", storePayload);
      storedOk = true;
    } catch (err) {
      console.error(`[careers-apply ${region.toUpperCase()}] Failed to save submission to store:`, err);
      storedOk = false;
    }

    // 3. Call webhook in isolated try/catch
    try {
      await sendCareersWebhook(data);
    } catch (err) {
      console.error(`[careers-apply ${region.toUpperCase()}] Failed to call webhook:`, err);
    }

    // Return success only if stored OR email sent
    if (!storedOk && !emailOk) {
      return NextResponse.json(
        { error: "Failed to submit application. Please try again later." },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, cvReceived: attachments.length > 0 });
  } catch (error) {
    console.error("Careers apply form error:", error);
    return NextResponse.json({ error: "Failed to submit application" }, { status: 500 });
  }
}
