import { NextResponse } from 'next/server';
import { sendNewsletterEmails } from '@/lib/email/notifications';
import { isEmailConfigured } from '@/lib/email/resend';

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(req: Request) {
  try {
    if (!isEmailConfigured()) {
      return NextResponse.json({ error: 'Email service not configured' }, { status: 500 });
    }

    const body = await req.json();
    const email = String(body.email || '').trim().toLowerCase();

    if (!email || !EMAIL_PATTERN.test(email)) {
      return NextResponse.json({ error: 'Please enter a valid email address' }, { status: 400 });
    }

    const results = await sendNewsletterEmails(email);
    const failed = results.find((result) => !result.ok);

    if (failed && !failed.ok) {
      return NextResponse.json({ error: failed.error || 'Failed to subscribe' }, { status: 400 });
    }

    return NextResponse.json({ success: true });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Internal Server Error';
    console.error('Newsletter signup error:', error);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
