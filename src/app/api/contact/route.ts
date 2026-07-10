import { NextResponse } from 'next/server';
import { sendContactEmails } from '@/lib/email/notifications';
import { isEmailConfigured } from '@/lib/email/resend';

export async function POST(req: Request) {
  try {
    if (!isEmailConfigured()) {
      console.error('RESEND_API_KEY is missing or using dummy key');
      return NextResponse.json({ error: 'Email service not configured' }, { status: 500 });
    }

    const body = await req.json();
    const { name, email, message, subject } = body;

    if (!name || !email || !message) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const results = await sendContactEmails({
      name: String(name).trim(),
      email: String(email).trim(),
      subject: subject ? String(subject).trim() : 'General Inquiry',
      message: String(message).trim(),
    });

    const failed = results.find((result) => !result.ok);
    if (failed && !failed.ok) {
      return NextResponse.json({ error: failed.error || 'Failed to send email' }, { status: 400 });
    }

    return NextResponse.json({ success: true });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Internal Server Error';
    console.error('Contact form catch error:', error);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
