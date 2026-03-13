import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;

    // Protect all /admin routes except /admin/login
    if (pathname.startsWith('/admin') && pathname !== '/admin/login') {
        const session = request.cookies.get('admin_session');

        if (!session || session.value !== 'true') {
            // Redirect to login if not authenticated
            const loginUrl = new URL('/admin/login', request.url);
            return NextResponse.redirect(loginUrl);
        }
    }

    return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
    matcher: ['/admin/:path*'],
};
