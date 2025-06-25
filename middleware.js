import { NextResponse } from 'next/server';
import { jwtVerify } from 'jose';

export async function middleware(request) {
  console.log('Middleware called for:', request.nextUrl.pathname);
  console.log('Request URL:', request.url);
  console.log('Request nextUrl:', request.nextUrl);
  console.log('Request nextUrl.origin:', request.nextUrl.origin);
  
  const token = request.cookies.get('adminToken');

  if (request.nextUrl.pathname.startsWith('/admin/dashboard') || 
      request.nextUrl.pathname.startsWith('/dashboard')) {
      if (!token) {
      try {
        const baseUrl = request.nextUrl.origin || 'http://localhost:3000';
        const loginUrl = new URL('/admin', baseUrl);
        return NextResponse.redirect(loginUrl);
      } catch (error) {
        console.error('Middleware redirect error:', error);
        return NextResponse.next();
      }
    }

    // Token doğrulama
    if (process.env.JWT_SECRET && token?.value) {
      try {
        await jwtVerify(token.value, new TextEncoder().encode(process.env.JWT_SECRET));
        return NextResponse.next();
      } catch (error) {
        console.error('Token doğrulama hatası:', error);        try {
          const baseUrl = request.nextUrl.origin || 'http://localhost:3000';
          const loginUrl = new URL('/admin', baseUrl);
          return NextResponse.redirect(loginUrl);
        } catch (redirectError) {
          console.error('Middleware redirect error:', redirectError);
          return NextResponse.next();
        }
      }
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*', '/dashboard/:path*'],
};
