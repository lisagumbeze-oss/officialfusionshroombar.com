import { Resend } from 'resend';

let client: Resend | null = null;

export function getResendClient(): Resend | null {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey || apiKey.startsWith('re_123')) {
    return null;
  }

  if (!client) {
    client = new Resend(apiKey);
  }

  return client;
}

export function isEmailConfigured(): boolean {
  return Boolean(getResendClient());
}
