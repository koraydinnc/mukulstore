import { jwtVerify } from 'jose';
import { NextResponse } from 'next/server';

export async function middleware(request) {
  const token = request.cookies.get('adminToken');

  console.log("middleware.js çalışıyor");

  // Eğer token yoksa login sayfasına yönlendir
  if (!token) {
    return NextResponse.redirect(new URL('/admin', request.url));
  }
  
  
}

// Middleware'in hangi yollar için çalışacağını belirle
export const config = {
  matcher: ['/admin/dashboard:path*'],
};
