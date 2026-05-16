import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { supabaseAdmin } from "@/lib/supabase";

function getResend() {
    const key = process.env.RESEND_API_KEY;
    if (!key) return null;
    return new Resend(key);
}

function missingEnvVars(): string[] {
    const required = [
        "NEXT_PUBLIC_SUPABASE_URL",
        "SUPABASE_SERVICE_ROLE_KEY",
    ] as const;
    return required.filter((name) => !process.env[name]?.trim());
}

export async function POST(req: NextRequest) {
    try {
        const missing = missingEnvVars();
        if (missing.length > 0) {
            console.error("Contact API misconfigured — missing env:", missing.join(", "));
            return NextResponse.json(
                { error: "Server configuration error. Please contact support." },
                { status: 500 }
            );
        }

        const body = await req.json();
        const { name, company, phone, email, subject, message } = body;

        // ── 1. Validate required fields ──────────────────────────────────────────
        if (!name || !email || !message) {
            return NextResponse.json(
                { error: "Name, email, and message are required." },
                { status: 400 }
            );
        }

        // ── 2. Save to Supabase ──────────────────────────────────────────────────
        const { error: dbError } = await supabaseAdmin
            .from("contact_submissions")
            .insert([{ name, company, phone, email, subject, message }]);

        if (dbError) {
            console.error("Supabase insert error:", dbError.message, dbError.code, dbError.details);
            return NextResponse.json(
                {
                    error: "Failed to save your message. Please try again.",
                    ...(process.env.NODE_ENV === "development" && {
                        debug: dbError.message,
                    }),
                },
                { status: 500 }
            );
        }

        // ── 3. Send notification email via Resend ────────────────────────────────
        const recipients = (process.env.CONTACT_EMAIL_TO ?? "")
            .split(",")
            .map((e) => e.trim())
            .filter(Boolean);

        const fromAddress =
            process.env.CONTACT_EMAIL_FROM?.trim() ||
            "XeiosTech <noreply@xeiostechsolutions.com>";

        const resend = getResend();
        if (!resend) {
            console.warn("RESEND_API_KEY not set — submission saved but no email sent");
            return NextResponse.json(
                { success: true, emailSent: false, emailReason: "missing_resend_api_key" },
                { status: 200 }
            );
        }

        if (recipients.length === 0) {
            console.error(
                "CONTACT_EMAIL_TO is empty — submission saved but no email sent. Set CONTACT_EMAIL_TO on Vercel."
            );
            return NextResponse.json(
                { success: true, emailSent: false, emailReason: "missing_contact_email_to" },
                { status: 200 }
            );
        }

        const { data: emailData, error: emailError } = await resend.emails.send({
            from: fromAddress,
            to: recipients,
            replyTo: email,
            subject: `New Contact Form Submission — ${subject || "No Subject"} | XeiosTech`,
            html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #0A0118; color: #ffffff; border-radius: 12px; overflow: hidden;">
          <!-- Header -->
          <div style="background: linear-gradient(135deg, #672C8D, #8E44AD); padding: 32px 40px;">
            <h1 style="margin: 0; font-size: 24px; font-weight: 700; color: #ffffff;">
              New Contact Form Submission
            </h1>
            <p style="margin: 8px 0 0; color: rgba(255,255,255,0.8); font-size: 14px;">
              Received on ${new Date().toLocaleString("en-US", { timeZone: "UTC", dateStyle: "full", timeStyle: "short" })} UTC
            </p>
          </div>

          <!-- Body -->
          <div style="padding: 32px 40px;">
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 10px 0; border-bottom: 1px solid rgba(103,44,141,0.2); color: #9CA3AF; font-size: 13px; width: 120px; vertical-align: top;">Name</td>
                <td style="padding: 10px 0; border-bottom: 1px solid rgba(103,44,141,0.2); color: #ffffff; font-size: 14px; font-weight: 600;">${name}</td>
              </tr>
              ${company ? `
              <tr>
                <td style="padding: 10px 0; border-bottom: 1px solid rgba(103,44,141,0.2); color: #9CA3AF; font-size: 13px; vertical-align: top;">Company</td>
                <td style="padding: 10px 0; border-bottom: 1px solid rgba(103,44,141,0.2); color: #ffffff; font-size: 14px;">${company}</td>
              </tr>` : ""}
              ${phone ? `
              <tr>
                <td style="padding: 10px 0; border-bottom: 1px solid rgba(103,44,141,0.2); color: #9CA3AF; font-size: 13px; vertical-align: top;">Phone</td>
                <td style="padding: 10px 0; border-bottom: 1px solid rgba(103,44,141,0.2); color: #ffffff; font-size: 14px;">${phone}</td>
              </tr>` : ""}
              <tr>
                <td style="padding: 10px 0; border-bottom: 1px solid rgba(103,44,141,0.2); color: #9CA3AF; font-size: 13px; vertical-align: top;">Email</td>
                <td style="padding: 10px 0; border-bottom: 1px solid rgba(103,44,141,0.2); color: #ffffff; font-size: 14px;">
                  <a href="mailto:${email}" style="color: #8E44AD;">${email}</a>
                </td>
              </tr>
              ${subject ? `
              <tr>
                <td style="padding: 10px 0; border-bottom: 1px solid rgba(103,44,141,0.2); color: #9CA3AF; font-size: 13px; vertical-align: top;">Subject</td>
                <td style="padding: 10px 0; border-bottom: 1px solid rgba(103,44,141,0.2); color: #ffffff; font-size: 14px;">${subject}</td>
              </tr>` : ""}
              <tr>
                <td style="padding: 10px 0; color: #9CA3AF; font-size: 13px; vertical-align: top;">Message</td>
                <td style="padding: 10px 0; color: #ffffff; font-size: 14px; line-height: 1.6;">${message.replace(/\n/g, "<br/>")}</td>
              </tr>
            </table>

            <!-- Reply CTA -->
            <div style="margin-top: 32px; text-align: center;">
              <a href="mailto:${email}?subject=Re: ${encodeURIComponent(subject || "Your inquiry")}"
                style="display: inline-block; padding: 12px 32px; background: linear-gradient(135deg, #672C8D, #8E44AD); color: #ffffff; text-decoration: none; border-radius: 50px; font-weight: 700; font-size: 14px;">
                Reply to ${name}
              </a>
            </div>
          </div>

          <!-- Footer -->
          <div style="padding: 20px 40px; background: rgba(103,44,141,0.1); text-align: center; font-size: 12px; color: #6B7280;">
            This email was sent from the XeiosTech contact form. &copy; ${new Date().getFullYear()} XeiosTech. All rights reserved.
          </div>
        </div>
      `,
        });

        if (emailError) {
            console.error("Resend email error:", JSON.stringify(emailError));
            return NextResponse.json(
                {
                    success: true,
                    emailSent: false,
                    emailReason: "resend_send_failed",
                },
                { status: 200 }
            );
        }

        console.log("Resend email sent:", emailData?.id, "to:", recipients.join(", "));
        return NextResponse.json({ success: true, emailSent: true }, { status: 200 });
    } catch (err) {
        console.error("Contact API unexpected error:", err);
        return NextResponse.json(
            { error: "An unexpected error occurred. Please try again." },
            { status: 500 }
        );
    }
}
