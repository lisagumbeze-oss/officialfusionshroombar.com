import { Text } from '@react-email/components';
import {
  EmailDetailRow,
  EmailLayout,
  EmailPanel,
} from '@/emails/components/EmailLayout';
import { absoluteUrl } from '@/lib/email/config';

export type AdminNewsletterSignupProps = {
  email: string;
};

export function AdminNewsletterSignupEmail({ email }: AdminNewsletterSignupProps) {
  return (
    <EmailLayout
      preview={`New newsletter subscriber: ${email}`}
      eyebrow="Newsletter signup"
      title="New subscriber"
      ctas={[
        { label: 'Open admin', href: absoluteUrl('/admin') },
        { label: 'Email subscriber', href: `mailto:${email}`, variant: 'secondary' },
      ]}
      footerNote="Newsletter notification — Fusion admin"
    >
      <EmailPanel title="Subscriber details">
        <EmailDetailRow label="Email" value={email} />
      </EmailPanel>
      <Text style={paragraph}>
        A visitor subscribed to the Fusion newsletter from the blog page.
      </Text>
    </EmailLayout>
  );
}

export type CustomerNewsletterWelcomeProps = {
  email: string;
};

export function CustomerNewsletterWelcomeEmail({ email }: CustomerNewsletterWelcomeProps) {
  return (
    <EmailLayout
      preview="Welcome to the Fusion newsletter — exclusive drops and wellness insights."
      eyebrow="Welcome aboard"
      title="You're on the list"
      ctas={[
        { label: 'Shop new arrivals', href: absoluteUrl('/shop') },
        { label: 'Read the blog', href: absoluteUrl('/blog'), variant: 'secondary' },
        { label: 'Dosing guide', href: absoluteUrl('/microdosing-chocolate'), variant: 'secondary' },
      ]}
      footerNote={`You're subscribed as ${email}. Expect exclusive insights, early access, and wellness tips.`}
    >
      <Text style={paragraph}>
        Thanks for joining the fungi revolution. You&apos;ll be first to hear about limited flavors,
        microdosing guides, and fusion shroom bar updates.
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
