import { NextResponse } from 'next/server';
import { deleteAuthCookie } from '@/lib/cookies';
import { createSuccessResponse } from '@/lib/responses';

export async function POST() {
  deleteAuthCookie();
  
  return NextResponse.json(
    createSuccessResponse({ message: 'Logout realizado com sucesso' })
  );
}

