import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function POST(request: Request) {
    try {
        const { name, content, blogPostId, turnstileToken } = await request.json();

        if (!name || !content || !blogPostId || !turnstileToken) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }

        // Verify Turnstile Token
        const verifyUrl = 'https://challenges.cloudflare.com/turnstile/v0/siteverify';
        const verifyResponse = await fetch(verifyUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: `secret=${process.env.CLOUDFLARE_SECRET_KEY}&response=${turnstileToken}`,
        });

        const verifyData = await verifyResponse.json();

        if (!verifyData.success) {
            return NextResponse.json({ error: 'Spam verification failed. Please try again.' }, { status: 403 });
        }

        // Save Comment
        const comment = await (prisma as any).comment.create({
            data: {
                name,
                content,
                blogPostId,
            },
        });

        return NextResponse.json(comment, { status: 201 });
    } catch (error) {
        console.error('[Comments API] Error:', error);
        return NextResponse.json({ error: 'Failed to post comment' }, { status: 500 });
    }
}
