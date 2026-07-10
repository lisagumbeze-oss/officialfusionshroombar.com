import type { ReactElement } from 'react';
import { render } from '@react-email/render';
import { getResendClient } from './resend';

type SendEmailOptions = {
  from: string;
  to: string | string[];
  subject: string;
  react: ReactElement;
  replyTo?: string;
  text?: string;
};

export type SendEmailResult =
  | { ok: true; skipped?: false; data: unknown }
  | { ok: true; skipped: true }
  | { ok: false; error: string };

export async function sendEmail(options: SendEmailOptions): Promise<SendEmailResult> {
  const resend = getResendClient();
  if (!resend) {
    console.log('[email] Skipping send — Resend not configured');
    return { ok: true, skipped: true };
  }

  try {
    const html = await render(options.react);
    const { data, error } = await resend.emails.send({
      from: options.from,
      to: options.to,
      subject: options.subject,
      html,
      text: options.text,
      replyTo: options.replyTo,
    });

    if (error) {
      console.error('[email] Resend error:', error);
      return { ok: false, error: error.message || 'Failed to send email' };
    }

    return { ok: true, data };
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to send email';
    console.error('[email] Send failed:', error);
    return { ok: false, error: message };
  }
}

export async function sendEmails(
  emails: SendEmailOptions[],
  options: { failFast?: boolean } = {}
): Promise<SendEmailResult[]> {
  const results: SendEmailResult[] = [];

  for (const email of emails) {
    const result = await sendEmail(email);
    results.push(result);
    if (options.failFast && !result.ok) {
      break;
    }
  }

  return results;
}
