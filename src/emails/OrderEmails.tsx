import { Text } from '@react-email/components';
import {
  EmailDetailRow,
  EmailLayout,
  EmailPanel,
} from '@/emails/components/EmailLayout';
import { absoluteUrl, formatCurrency, formatOrderId } from '@/lib/email/config';

type OrderItem = {
  productName: string;
  quantity: number;
  price: number;
};

type PaymentMethod = {
  name: string;
  details: string;
  instructions?: string | null;
};

export type CustomerOrderConfirmationProps = {
  customerName: string;
  orderId: string;
  totalAmount: number;
  shippingAddress: string;
  paymentMethod: PaymentMethod;
};

export function CustomerOrderConfirmationEmail({
  customerName,
  orderId,
  totalAmount,
  shippingAddress,
  paymentMethod,
}: CustomerOrderConfirmationProps) {
  const shortId = formatOrderId(orderId);

  return (
    <EmailLayout
      preview={`Your Fusion order #${shortId} is awaiting payment.`}
      eyebrow="Order received"
      title="Thanks for your order"
      ctas={[
        { label: 'Track your order', href: absoluteUrl('/track') },
        { label: 'Continue shopping', href: absoluteUrl('/shop'), variant: 'secondary' },
        { label: 'Contact support', href: absoluteUrl('/contact'), variant: 'secondary' },
      ]}
      footerNote="Once payment is verified, your order will be prepared for discreet dispatch."
    >
      <Text style={paragraph}>Hi {customerName},</Text>
      <Text style={paragraph}>
        Your order <strong>#{shortId}</strong> has been received and is currently{' '}
        <strong>awaiting payment</strong>.
      </Text>

      <EmailPanel title="Payment instructions">
        <EmailDetailRow label="Method" value={paymentMethod.name} />
        <EmailDetailRow label="Send payment to" value={paymentMethod.details} />
        <EmailDetailRow label="Order total" value={formatCurrency(totalAmount)} highlight />
        {paymentMethod.instructions ? (
          <Text style={note}>Note: {paymentMethod.instructions}</Text>
        ) : null}
      </EmailPanel>

      <EmailPanel title="Shipping destination">
        <Text style={paragraphTight}>{shippingAddress}</Text>
      </EmailPanel>
    </EmailLayout>
  );
}

export type AdminOrderAlertProps = {
  customerName: string;
  customerEmail: string;
  orderId: string;
  totalAmount: number;
  items: OrderItem[];
  paymentMethodName: string;
};

export function AdminOrderAlertEmail({
  customerName,
  customerEmail,
  orderId,
  totalAmount,
  items,
  paymentMethodName,
}: AdminOrderAlertProps) {
  const shortId = formatOrderId(orderId);

  return (
    <EmailLayout
      preview={`New order #${shortId} — ${formatCurrency(totalAmount)}`}
      eyebrow="New order alert"
      title={`Order #${shortId}`}
      ctas={[
        { label: 'Open admin panel', href: absoluteUrl('/admin/orders') },
        { label: 'Email customer', href: `mailto:${customerEmail}`, variant: 'secondary' },
      ]}
      footerNote="Internal notification — Fusion admin"
    >
      <EmailPanel title="Customer">
        <EmailDetailRow label="Name" value={customerName} />
        <EmailDetailRow label="Email" value={customerEmail} />
        <EmailDetailRow label="Total" value={formatCurrency(totalAmount)} highlight />
        <EmailDetailRow label="Payment" value={paymentMethodName} />
      </EmailPanel>

      <EmailPanel title={`Items (${items.length})`}>
        {items.map((item) => (
          <Text key={`${item.productName}-${item.quantity}`} style={itemRow}>
            {item.quantity}× {item.productName}
            <span style={itemPrice}>{formatCurrency(item.price)}</span>
          </Text>
        ))}
      </EmailPanel>
    </EmailLayout>
  );
}

const paragraph = {
  color: '#2c2419',
  fontSize: '15px',
  lineHeight: '1.7',
  margin: '0 0 16px',
};

const paragraphTight = {
  ...paragraph,
  margin: 0,
};

const note = {
  color: '#6b6459',
  fontSize: '13px',
  fontStyle: 'italic' as const,
  lineHeight: '1.6',
  margin: '14px 0 0',
};

const itemRow = {
  borderBottom: '1px solid #e8e2d9',
  color: '#2c2419',
  fontSize: '14px',
  lineHeight: '1.5',
  margin: '0 0 10px',
  paddingBottom: '10px',
};

const itemPrice = {
  color: '#0071e3',
  float: 'right' as const,
  fontWeight: 700,
};
