import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";

/**
 * Pings Supabase daily so the free-tier project stays active (pauses after ~7 days of inactivity).
 * Vercel Cron: see vercel.json. Set CRON_SECRET in Vercel — cron requests send Authorization: Bearer <CRON_SECRET>.
 */
export async function GET(request: Request) {
    const cronSecret = process.env.CRON_SECRET?.trim();
    const authHeader = request.headers.get("authorization");

    if (cronSecret) {
        const isVercelCron = authHeader === `Bearer ${cronSecret}`;
        const isManualPing =
            request.headers.get("x-cron-secret") === cronSecret;

        if (!isVercelCron && !isManualPing) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }
    }

    const missing = ["NEXT_PUBLIC_SUPABASE_URL", "SUPABASE_SERVICE_ROLE_KEY"].filter(
        (key) => !process.env[key]?.trim()
    );

    if (missing.length > 0) {
        return NextResponse.json(
            { error: `Missing env: ${missing.join(", ")}` },
            { status: 500 }
        );
    }

    try {
        const { error } = await supabaseAdmin
            .from("contact_submissions")
            .select("id", { count: "exact", head: true });

        if (error) {
            console.warn("[keep-alive] query warning:", error.message);
        }

        return NextResponse.json({
            success: true,
            message: "Supabase keep-alive ping",
            time: new Date().toISOString(),
        });
    } catch (error: unknown) {
        const message = error instanceof Error ? error.message : "Unknown error";
        console.error("[keep-alive] error:", message);
        return NextResponse.json({ error: message }, { status: 500 });
    }
}
