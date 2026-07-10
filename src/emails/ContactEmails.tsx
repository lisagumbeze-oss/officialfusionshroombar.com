import { Text } from '@react-email/components';
import {
  EmailDetailRow,
  EmailLayout,
  EmailMessageBlock,
  EmailPanel,
} from '@/emails/components/EmailLayout';
import { absoluteUrl } from '@/lib/email/config';

export type AdminContactNotificationProps = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

export function AdminContactNotificationEmail({
  name,
  email,
  subject,
  message,
}: AdminContactNotificationProps) {
  return (
    <EmailLayout
      preview={`New contact form from ${name}`}
      eyebrow="New inquiry"
      title={subject || 'General inquiry'}
      ctas={[
        { label: 'Reply to customer', href: `mailto:${email}` },
        { label: 'Open admin', href: absoluteUrl('/admin'), variant: 'secondary' },
      ]}
      footerNote="Contact form notification — Fusion admin"
    >
      <EmailPanel title="Sender">
        <EmailDetailRow label="Name" value={name} />
        <EmailDetailRow label="Email" value={email} />
      </EmailPanel>

      <EmailPanel title="Message">
        <EmailMessageBlock>{message}</EmailMessageBlock>
      </EmailPanel>
    </EmailLayout>
  );
}

export type CustomerContactConfirmationProps = {
  name: string;
  subject: string;
};

export function CustomerContactConfirmationEmail({
  name,
  subject,
}: CustomerContactConfirmationProps) {
  return (
    <EmailLayout
      preview="We received your message and will reply shortly."
      eyebrow="Message received"
      title="Thanks for reaching out"
      ctas={[
        { label: 'Browse the shop', href: absoluteUrl('/shop') },
        { label: 'Read the FAQ', href: absoluteUrl('/faq'), variant: 'secondary' },
        { label: 'Track an order', href: absoluteUrl('/track'), variant: 'secondary' },
      ]}
      footerNote="Our team typically responds within 24 hours on business days."
    >
      <Text style={paragraph}>Hi {name},</Text>
      <Text style={paragraph}>
        We&apos;ve received your message about <strong>{subject || 'your inquiry'}</strong> and
        our team will get back to you shortly.
      </Text>
      <Text style={paragraph}>
        In the meantime, you can explore our latest fusion shroom bars or check order tracking if
        you already placed an order.
      </Text>
    </EmailLayout>
  );
}

const paragraph = {
  color: '#2c2419',
  fontSize: '15px',
  lineHeight: '1.7',
  margin: '0 0 16px',
};
