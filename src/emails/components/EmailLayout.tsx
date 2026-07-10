import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Img,
  Link,
  Preview,
  Section,
  Text,
} from '@react-email/components';
import type { ReactNode } from 'react';
import { EMAIL_BRAND } from '@/lib/email/config';

const { colors, fontFamily, logoUrl, siteName, siteUrl, tagline } = EMAIL_BRAND;

export type EmailCta = {
  label: string;
  href: string;
  variant?: 'primary' | 'secondary';
};

type EmailLayoutProps = {
  preview: string;
  eyebrow?: string;
  title: string;
  children: ReactNode;
  ctas?: EmailCta[];
  footerNote?: string;
};

export function EmailLayout({
  preview,
  eyebrow,
  title,
  children,
  ctas = [],
  footerNote,
}: EmailLayoutProps) {
  return (
    <Html>
      <Head />
      <Preview>{preview}</Preview>
      <Body style={styles.body}>
        <Container style={styles.container}>
          <Section style={styles.header}>
            <Link href={siteUrl} style={styles.logoLink}>
              <Img src={logoUrl} alt={siteName} width="180" height="69" style={styles.logo} />
            </Link>
          </Section>

          <Section style={styles.hero}>
            {eyebrow ? <Text style={styles.eyebrow}>{eyebrow}</Text> : null}
            <Heading as="h1" style={styles.title}>
              {title}
            </Heading>
          </Section>

          <Section style={styles.content}>{children}</Section>

          {ctas.length > 0 ? (
            <Section style={styles.ctaSection}>
              {ctas.map((cta) => (
                <Button
                  key={`${cta.href}-${cta.label}`}
                  href={cta.href}
                  style={cta.variant === 'secondary' ? styles.buttonSecondary : styles.buttonPrimary}
                >
                  {cta.label}
                </Button>
              ))}
            </Section>
          ) : null}

          <Hr style={styles.hr} />

          <Section style={styles.footer}>
            <Text style={styles.footerBrand}>{siteName}</Text>
            <Text style={styles.footerTagline}>{tagline}</Text>
            {footerNote ? <Text style={styles.footerNote}>{footerNote}</Text> : null}
            <Text style={styles.footerLinks}>
              <Link href={siteUrl} style={styles.footerLink}>
                Shop
              </Link>
              {' · '}
              <Link href={`${siteUrl}/blog`} style={styles.footerLink}>
                Blog
              </Link>
              {' · '}
              <Link href={`${siteUrl}/contact`} style={styles.footerLink}>
                Contact
              </Link>
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}

export function EmailPanel({ children, title }: { children: ReactNode; title?: string }) {
  return (
    <Section style={styles.panel}>
      {title ? <Text style={styles.panelTitle}>{title}</Text> : null}
      {children}
    </Section>
  );
}

export function EmailDetailRow({
  label,
  value,
  highlight,
}: {
  label: string;
  value: string;
  highlight?: boolean;
}) {
  return (
    <Section style={styles.detailRow}>
      <Text style={styles.detailLabel}>{label}</Text>
      <Text style={highlight ? styles.detailValueHighlight : styles.detailValue}>{value}</Text>
    </Section>
  );
}

export function EmailMessageBlock({ children }: { children: ReactNode }) {
  return (
    <Section style={styles.messageBlock}>
      {typeof children === 'string' ? <Text style={styles.messageText}>{children}</Text> : children}
    </Section>
  );
}

const styles = {
  body: {
    backgroundColor: colors.background,
    fontFamily,
    margin: 0,
    padding: '32px 16px',
  },
  container: {
    backgroundColor: colors.card,
    border: `1px solid ${colors.border}`,
    borderRadius: '18px',
    margin: '0 auto',
    maxWidth: '600px',
    overflow: 'hidden',
  },
  header: {
    backgroundColor: colors.surface,
    padding: '24px 32px',
    textAlign: 'center' as const,
  },
  logoLink: {
    display: 'inline-block',
  },
  logo: {
    margin: '0 auto',
  },
  hero: {
    padding: '28px 32px 8px',
  },
  eyebrow: {
    color: colors.primary,
    fontSize: '11px',
    fontWeight: 700,
    letterSpacing: '0.14em',
    margin: '0 0 10px',
    textTransform: 'uppercase' as const,
  },
  title: {
    color: colors.foreground,
    fontSize: '28px',
    fontWeight: 700,
    letterSpacing: '-0.02em',
    lineHeight: '1.2',
    margin: 0,
  },
  content: {
    padding: '8px 32px 24px',
  },
  panel: {
    backgroundColor: colors.surface,
    border: `1px solid ${colors.border}`,
    borderRadius: '14px',
    margin: '20px 0',
    padding: '20px',
  },
  panelTitle: {
    color: colors.primary,
    fontSize: '11px',
    fontWeight: 700,
    letterSpacing: '0.12em',
    margin: '0 0 14px',
    textTransform: 'uppercase' as const,
  },
  detailRow: {
    marginBottom: '14px',
  },
  detailLabel: {
    color: colors.muted,
    fontSize: '12px',
    fontWeight: 600,
    margin: '0 0 4px',
    textTransform: 'uppercase' as const,
    letterSpacing: '0.06em',
  },
  detailValue: {
    color: colors.foreground,
    fontSize: '15px',
    fontWeight: 600,
    margin: 0,
    lineHeight: '1.5',
  },
  detailValueHighlight: {
    color: colors.primary,
    fontSize: '24px',
    fontWeight: 800,
    margin: 0,
    lineHeight: '1.2',
  },
  messageBlock: {
    backgroundColor: colors.background,
    border: `1px solid ${colors.border}`,
    borderRadius: '12px',
    margin: '16px 0 0',
    padding: '18px',
  },
  messageText: {
    color: colors.foreground,
    fontSize: '15px',
    lineHeight: '1.7',
    margin: 0,
    whiteSpace: 'pre-wrap' as const,
  },
  ctaSection: {
    padding: '0 32px 28px',
    textAlign: 'center' as const,
  },
  buttonPrimary: {
    backgroundColor: colors.primary,
    borderRadius: '980px',
    color: colors.onPrimary,
    display: 'inline-block',
    fontSize: '14px',
    fontWeight: 700,
    margin: '6px 8px',
    padding: '14px 28px',
    textDecoration: 'none',
  },
  buttonSecondary: {
    backgroundColor: colors.card,
    border: `1px solid ${colors.border}`,
    borderRadius: '980px',
    color: colors.foreground,
    display: 'inline-block',
    fontSize: '14px',
    fontWeight: 700,
    margin: '6px 8px',
    padding: '14px 28px',
    textDecoration: 'none',
  },
  hr: {
    borderColor: colors.border,
    margin: '0 32px',
  },
  footer: {
    padding: '24px 32px 32px',
    textAlign: 'center' as const,
  },
  footerBrand: {
    color: colors.foreground,
    fontSize: '13px',
    fontWeight: 700,
    margin: '0 0 6px',
  },
  footerTagline: {
    color: colors.muted,
    fontSize: '11px',
    letterSpacing: '0.08em',
    margin: '0 0 12px',
    textTransform: 'uppercase' as const,
  },
  footerNote: {
    color: colors.subtle,
    fontSize: '13px',
    lineHeight: '1.6',
    margin: '0 0 12px',
  },
  footerLinks: {
    color: colors.muted,
    fontSize: '12px',
    margin: 0,
  },
  footerLink: {
    color: colors.primary,
    textDecoration: 'none',
  },
};
