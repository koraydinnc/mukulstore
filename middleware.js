import { jwtVerify } from 'jose';
import { NextResponse } from 'next/server';

export async function middleware(request) {
  const token = request.cookies.get('adminToken');


  if (!token) {
    return NextResponse.redirect(new URL('/admin', request.url));
  }
  
  
}

export const config = {
  matcher: ['/admin/dashboard:path*'],
};
