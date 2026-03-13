import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function POST(req: Request) {
    try {
        const { password } = await req.json();
        const adminPassword = process.env.ADMIN_PASSWORD || 'fusion-admin-2026'; // Default if not set

        if (password === adminPassword) {
            // Set a secure session cookie
            const response = NextResponse.json({ success: true });
            
            // In a production app, use a proper session token/JWT
            // For now, we'll use a simple "is_admin" cookie for the simulation
            response.cookies.set('admin_session', 'true', {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'strict',
                maxAge: 60 * 60 * 24, // 24 hours
                path: '/',
            });

            return response;
        }

        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    } catch (error) {
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
