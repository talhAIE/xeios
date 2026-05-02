import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';

export async function GET(request: Request) {
  // Verify Vercel Cron signature if the secret is configured
  const authHeader = request.headers.get('authorization');
  const cronSecret = process.env.CRON_SECRET;
  
  if (process.env.NODE_ENV === 'production' && cronSecret && authHeader !== `Bearer ${cronSecret}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    // Perform a lightweight query to wake the database
    // We try to fetch 1 row from 'contact_submissions' (which the site uses)
    const { data, error } = await supabaseAdmin
      .from('contact_submissions')
      .select('id')
      .limit(1);

    // If there's an error calling a table, we log it, but the connection was still made keeping the DB awake
    if (error) {
       console.log("Supabase connection made, but contact_submissions query failed (table might be empty or missing yet):", error.message);
    }

    return NextResponse.json({ success: true, message: 'Supabase keep-alive successful', time: new Date().toISOString() }, { status: 200 });
  } catch (error: any) {
    console.error('Keep-alive error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
