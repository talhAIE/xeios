import { Resend } from "resend";

const MAX_ATTEMPTS = 3;
const RETRY_DELAY_MS = 800;

function sleep(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

function escapeHtml(text: string): string {
    return text
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;");
}

function buildEmailHtml(payload: {
    name: string;
    company?: string;
    phone?: string;
    email: string;
    subject?: string;
    message: string;
}): string {
    const { name, company, phone, email, subject, message } = payload;
    const rows = [
        `<p><strong>Name:</strong> ${escapeHtml(name)}</p>`,
        company ? `<p><strong>Company:</strong> ${escapeHtml(company)}</p>` : "",
        phone ? `<p><strong>Phone:</strong> ${escapeHtml(phone)}</p>` : "",
        `<p><strong>Email:</strong> ${escapeHtml(email)}</p>`,
        subject ? `<p><strong>Subject:</strong> ${escapeHtml(subject)}</p>` : "",
        `<p><strong>Message:</strong><br/>${escapeHtml(message).replace(/\n/g, "<br/>")}</p>`,
    ]
        .filter(Boolean)
        .join("");

    return `<div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;background:#0A0118;color:#fff;">
<h1 style="background:linear-gradient(135deg,#672C8D,#8E44AD);padding:24px;margin:0;font-size:22px;">New Contact Form Submission</h1>
<div style="padding:24px;">${rows}</div></div>`;
}

export type ContactNotifyPayload = {
    name: string;
    company?: string;
    phone?: string;
    email: string;
    subject?: string;
    message: string;
};

export async function sendContactNotification(
    payload: ContactNotifyPayload
): Promise<{ ok: boolean }> {
    const apiKey = process.env.RESEND_API_KEY?.trim();
    const recipients = (process.env.CONTACT_EMAIL_TO ?? "")
        .split(",")
        .map((e) => e.trim())
        .filter(Boolean);
    const fromAddress =
        process.env.CONTACT_EMAIL_FROM?.trim() ||
        "XeiosTech <noreply@xeiostechsolutions.com>";

    if (!apiKey) {
        console.error("[contact-email] RESEND_API_KEY is not set");
        return { ok: false };
    }

    if (recipients.length === 0) {
        console.error("[contact-email] CONTACT_EMAIL_TO is not set");
        return { ok: false };
    }

    const resend = new Resend(apiKey);
    const html = buildEmailHtml(payload);

    for (let attempt = 1; attempt <= MAX_ATTEMPTS; attempt++) {
        const { data, error } = await resend.emails.send({
            from: fromAddress,
            to: recipients,
            replyTo: payload.email,
            subject: `New Contact Form Submission — ${payload.subject || "No Subject"} | XeiosTech`,
            html,
        });

        if (!error) {
            console.log("[contact-email] sent:", data?.id, "to:", recipients.join(", "));
            return { ok: true };
        }

        console.error(
            `[contact-email] attempt ${attempt}/${MAX_ATTEMPTS} failed:`,
            JSON.stringify(error)
        );

        if (attempt < MAX_ATTEMPTS) {
            await sleep(RETRY_DELAY_MS * attempt);
        }
    }

    return { ok: false };
}
