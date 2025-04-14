import type { NextRequest } from 'next/server';

import { NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const code = searchParams.get('code');
  const state = searchParams.get('state');
  const provider = searchParams.get('provider');

  if (!code || !provider) {
    return NextResponse.redirect(new URL('/auth/error', request.url));
  }

  try {
    // Send the authorization code to your Django backend
    const response = await fetch(`http://your-django-backend.com/auth/${provider}/callback/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ code, state })
    });

    if (!response.ok) {
      throw new Error('Failed to authenticate with backend');
    }

    const data = (await response.json()) as any;

    // Set any cookies or tokens from your Django backend
    const redirectUrl = new URL('/', request.url);
    const res = NextResponse.redirect(redirectUrl);

    if (data.token) {
      res.cookies.set('auth_token', data.token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 60 * 60 * 24 * 7 // 1 week
      });
    }

    return res;
  } catch (error) {
    console.error('Authentication error:', error);
    return NextResponse.redirect(new URL('/auth/error', request.url));
  }
}
