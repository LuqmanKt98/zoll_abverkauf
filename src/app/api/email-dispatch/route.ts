import { NextRequest, NextResponse } from 'next/server';
import { sendAdminResponseEmail } from '@/lib/emailService';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { to, subject, html } = body || {};
    if (!to || !subject || !html) {
      return NextResponse.json({ ok: false, error: 'Missing fields' }, { status: 400 });
    }
    const result = await sendAdminResponseEmail(to, subject, html);
    if (!result.ok) {
      return NextResponse.json({ ok: false, error: result.error }, { status: 500 });
    }
    return NextResponse.json({ ok: true, provider: result.provider, meta: result.meta });
  } catch (e: any) {
    return NextResponse.json({ ok: false, error: e?.message || 'Unknown error' }, { status: 500 });
  }
}
