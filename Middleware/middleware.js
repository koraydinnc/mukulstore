import { NextResponse } from 'next/server'
import { jwtVerify } from 'jose'

export async function middleware(request) {
  const token = request.cookies.get('adminToken')

  console.log("middleware.js çalışıyor");

  // Eğer token yoksa login sayfasına yönlendir
  if (!token) {
    return NextResponse.redirect(new URL('/admin/login', request.url))
  }

  try {
    // Token doğrulama
    await jwtVerify(token, new TextEncoder().encode(process.env.JWT_SECRET))
    return NextResponse.next()
  } catch (error) {
    console.error('Token doğrulama hatası:', error)
    return NextResponse.redirect(new URL('/admin/login', request.url))
  }
}

// Middleware'in hangi yollar için çalışacağını belirle
export const config = {
  matcher: ['/admin/:path*', '/dashboard/:path*'],
}