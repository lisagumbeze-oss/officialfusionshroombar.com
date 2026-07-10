import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { sendCommentEmails } from '@/lib/email/notifications';
import { isEmailConfigured } from '@/lib/email/resend';

export async function POST(request: Request) {
  try {
    const { name, content, blogPostId, turnstileToken, email } = await request.json();

    if (!name || !content || !blogPostId || !turnstileToken) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

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

    const post = await prisma.blogPost.findUnique({
      where: { id: blogPostId },
      select: { id: true, title: true, slug: true },
    });

    if (!post) {
      return NextResponse.json({ error: 'Blog post not found' }, { status: 404 });
    }

    const comment = await prisma.comment.create({
      data: {
        name: String(name).trim(),
        content: String(content).trim(),
        blogPostId,
      },
    });

    if (isEmailConfigured()) {
      try {
        await sendCommentEmails({
          name: String(name).trim(),
          email: email ? String(email).trim() : undefined,
          content: String(content).trim(),
          postTitle: post.title,
          postSlug: post.slug,
        });
      } catch (emailErr) {
        console.error('[Comments API] Email failed:', emailErr);
      }
    }

    return NextResponse.json(comment, { status: 201 });
  } catch (error) {
    console.error('[Comments API] Error:', error);
    return NextResponse.json({ error: 'Failed to post comment' }, { status: 500 });
  }
}
