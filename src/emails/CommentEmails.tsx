import { Text } from '@react-email/components';
import {
  EmailDetailRow,
  EmailLayout,
  EmailMessageBlock,
  EmailPanel,
} from '@/emails/components/EmailLayout';
import { absoluteUrl } from '@/lib/email/config';

export type AdminCommentNotificationProps = {
  name: string;
  email?: string;
  postTitle: string;
  postSlug: string;
  content: string;
};

export function AdminCommentNotificationEmail({
  name,
  email,
  postTitle,
  postSlug,
  content,
}: AdminCommentNotificationProps) {
  return (
    <EmailLayout
      preview={`New comment on "${postTitle}" from ${name}`}
      eyebrow="New blog comment"
      title={postTitle}
      ctas={[
        { label: 'View post', href: absoluteUrl(`/blog/${postSlug}`) },
        { label: 'Manage blog', href: absoluteUrl('/admin/blog'), variant: 'secondary' },
        ...(email ? [{ label: 'Reply to commenter', href: `mailto:${email}`, variant: 'secondary' as const }] : []),
      ]}
      footerNote="Blog comment notification — Fusion admin"
    >
      <EmailPanel title="Commenter">
        <EmailDetailRow label="Name" value={name} />
        {email ? <EmailDetailRow label="Email" value={email} /> : null}
      </EmailPanel>

      <EmailPanel title="Comment">
        <EmailMessageBlock>{content}</EmailMessageBlock>
      </EmailPanel>
    </EmailLayout>
  );
}

export type CustomerCommentConfirmationProps = {
  name: string;
  postTitle: string;
  postSlug: string;
};

export function CustomerCommentConfirmationEmail({
  name,
  postTitle,
  postSlug,
}: CustomerCommentConfirmationProps) {
  return (
    <EmailLayout
      preview={`Your comment on "${postTitle}" was posted.`}
      eyebrow="Comment posted"
      title="Thanks for joining the conversation"
      ctas={[
        { label: 'View your comment', href: absoluteUrl(`/blog/${postSlug}`) },
        { label: 'Read more articles', href: absoluteUrl('/blog'), variant: 'secondary' },
        { label: 'Shop products', href: absoluteUrl('/shop'), variant: 'secondary' },
      ]}
    >
      <Text style={paragraph}>Hi {name},</Text>
      <Text style={paragraph}>
        Your comment on <strong>{postTitle}</strong> has been posted. Thanks for being part of the
        Fusion community.
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
