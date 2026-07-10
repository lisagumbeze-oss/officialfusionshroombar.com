import {
  AdminCommentNotificationEmail,
  CustomerCommentConfirmationEmail,
} from '@/emails/CommentEmails';
import {
  AdminContactNotificationEmail,
  CustomerContactConfirmationEmail,
} from '@/emails/ContactEmails';
import {
  AdminNewsletterSignupEmail,
  CustomerNewsletterWelcomeEmail,
} from '@/emails/NewsletterEmails';
import {
  AdminOrderAlertEmail,
  CustomerOrderConfirmationEmail,
} from '@/emails/OrderEmails';
import { EMAIL_FROM, formatOrderId, getAdminEmail } from '@/lib/email/config';
import { sendEmails } from '@/lib/email/send';

type OrderEmailPayload = {
  orderId: string;
  customerName: string;
  customerEmail: string;
  shippingAddress: string;
  totalAmount: number;
  items: Array<{ productName: string; quantity: number; price: number }>;
  paymentMethod: {
    name: string;
    details: string;
    instructions?: string | null;
  };
};

export async function sendOrderEmails(payload: OrderEmailPayload) {
  const shortId = formatOrderId(payload.orderId);

  return sendEmails([
    {
      from: EMAIL_FROM.orders,
      to: payload.customerEmail,
      replyTo: getAdminEmail(),
      subject: `Order Confirmation #${shortId} - Fusion Shroom Bars`,
      react: CustomerOrderConfirmationEmail({
        customerName: payload.customerName,
        orderId: payload.orderId,
        totalAmount: payload.totalAmount,
        shippingAddress: payload.shippingAddress,
        paymentMethod: payload.paymentMethod,
      }),
    },
    {
      from: EMAIL_FROM.notifications,
      to: getAdminEmail(),
      subject: `New Order Received — $${payload.totalAmount.toFixed(2)}`,
      react: AdminOrderAlertEmail({
        customerName: payload.customerName,
        customerEmail: payload.customerEmail,
        orderId: payload.orderId,
        totalAmount: payload.totalAmount,
        items: payload.items,
        paymentMethodName: payload.paymentMethod.name,
      }),
    },
  ]);
}

export async function sendContactEmails(payload: {
  name: string;
  email: string;
  subject: string;
  message: string;
}) {
  const safeSubject = payload.subject || 'General Inquiry';

  return sendEmails(
    [
      {
        from: EMAIL_FROM.contact,
        to: getAdminEmail(),
        replyTo: payload.email,
        subject: `New Contact Form — ${safeSubject}`,
        react: AdminContactNotificationEmail({
          name: payload.name,
          email: payload.email,
          subject: safeSubject,
          message: payload.message,
        }),
      },
      {
        from: EMAIL_FROM.contact,
        to: payload.email,
        replyTo: getAdminEmail(),
        subject: 'We received your message — Fusion Shroom Bars',
        react: CustomerContactConfirmationEmail({
          name: payload.name,
          subject: safeSubject,
        }),
      },
    ],
    { failFast: true }
  );
}

export async function sendNewsletterEmails(email: string) {
  return sendEmails(
    [
      {
        from: EMAIL_FROM.notifications,
        to: getAdminEmail(),
        subject: `New Newsletter Subscriber — ${email}`,
        react: AdminNewsletterSignupEmail({ email }),
      },
      {
        from: EMAIL_FROM.contact,
        to: email,
        replyTo: getAdminEmail(),
        subject: 'Welcome to the Fusion newsletter',
        react: CustomerNewsletterWelcomeEmail({ email }),
      },
    ],
    { failFast: true }
  );
}

export async function sendCommentEmails(payload: {
  name: string;
  email?: string;
  content: string;
  postTitle: string;
  postSlug: string;
}) {
  const emails = [
    {
      from: EMAIL_FROM.notifications,
      to: getAdminEmail(),
      subject: `New Blog Comment — ${payload.postTitle}`,
      react: AdminCommentNotificationEmail({
        name: payload.name,
        email: payload.email,
        postTitle: payload.postTitle,
        postSlug: payload.postSlug,
        content: payload.content,
      }),
    },
  ];

  if (payload.email) {
    emails.push({
      from: EMAIL_FROM.contact,
      to: payload.email,
      replyTo: getAdminEmail(),
      subject: `Your comment on "${payload.postTitle}"`,
      react: CustomerCommentConfirmationEmail({
        name: payload.name,
        postTitle: payload.postTitle,
        postSlug: payload.postSlug,
      }),
    });
  }

  return sendEmails(emails);
}
