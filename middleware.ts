import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { verifyJwt } from './lib/jwt';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // TEMPORÁRIO: Permitir acesso direto ao dashboard para teste
  if (pathname.startsWith('/dashboard')) {
    console.log('Acesso direto ao dashboard permitido para teste');
    return NextResponse.next();
  }

  // Permitir acesso a login sem autenticação
  if (pathname === '/login') {
    return NextResponse.next();
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*', '/login'],
};
