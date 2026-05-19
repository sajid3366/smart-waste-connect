import { NextRequest, NextResponse } from 'next/server'

export async function middleware(req: NextRequest) {
    // const { pathname } = req.nextUrl

    // Get accessToken from httpOnly cookie
    const accessToken = req.cookies.get('accessToken')?.value
    // console.log(accessToken, 'middleware  token')
    // If no token → redirect to login
    if (!accessToken) {
        return NextResponse.redirect(new URL('/login', req.url))
    }

    try {


        // Token valid → allow through
        return NextResponse.next()
    } catch (err) {
        // Token expired or invalid → redirect to login
        console.error('JWT verification failed:', err)
        return NextResponse.redirect(new URL('/login', req.url))
    }
}

// ✅ Protect all /dashboard routes
export const config = {
    matcher: ['/dashboard/:path*'],
}