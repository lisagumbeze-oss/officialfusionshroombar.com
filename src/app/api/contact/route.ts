import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
    try {
        const body = await req.json();
        
        if (!process.env.RESEND_API_KEY) {
            console.error('RESEND_API_KEY is missing');
            return NextResponse.json({ error: 'Email service not configured' }, { status: 500 });
        }

        if (process.env.RESEND_API_KEY.startsWith('re_123')) {
            console.log('Dummy Resend API key detected. Skipping real email send for testing.');
            return NextResponse.json({ success: true, dummy: true });
        }

        const { name, email, message, subject } = body;

        const { data, error } = await resend.emails.send({
            from: 'Fusion Contact <support@officialfusionshroombar.com>', 
            to: ['order@officialfusionshroombar.com'], 
            subject: subject || `New Contact Form Submission from ${name}`,
            replyTo: email,
            html: `
                <div style="font-family: sans-serif; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
                    <h2 style="color: #9d3bea;">New Message Received</h2>
                    <p><strong>Name:</strong> ${name}</p>
                    <p><strong>Email:</strong> ${email}</p>
                    <hr />
                    <p><strong>Message:</strong></p>
                    <p style="white-space: pre-wrap;">${message}</p>
                </div>
            `,
        });

        if (error) {
            console.error('Resend error:', error);
            return NextResponse.json({ error: (error as any).message || 'Failed to send email' }, { status: 400 });
        }

        return NextResponse.json({ success: true, data });
    } catch (error: any) {
        console.error('Contact form catch error:', error);
        return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 });
    }
}
