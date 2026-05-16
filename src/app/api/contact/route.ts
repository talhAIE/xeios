import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";
import { sendContactNotification } from "@/lib/contact-notify";

function missingEnvVars(): string[] {
    const required = [
        "NEXT_PUBLIC_SUPABASE_URL",
        "SUPABASE_SERVICE_ROLE_KEY",
        "RESEND_API_KEY",
        "CONTACT_EMAIL_TO",
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

        if (!name || !email || !message) {
            return NextResponse.json(
                { error: "Name, email, and message are required." },
                { status: 400 }
            );
        }

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

        const emailResult = await sendContactNotification({
            name,
            company,
            phone,
            email,
            subject,
            message,
        });

        if (!emailResult.ok) {
            console.error(
                "[contact] Submission saved but notification email failed after retries"
            );
        }

        return NextResponse.json({ success: true }, { status: 200 });
    } catch (err) {
        console.error("Contact API unexpected error:", err);
        return NextResponse.json(
            { error: "An unexpected error occurred. Please try again." },
            { status: 500 }
        );
    }
}
