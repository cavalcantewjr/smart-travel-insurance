import { NextRequest, NextResponse } from 'next/server';
import { getAuthCookie } from '@/lib/cookies';
import { verifyJwt } from '@/lib/jwt';
import { prisma } from '@/lib/db';
import { createSuccessResponse, createErrorResponse } from '@/lib/responses';

export async function GET(request: NextRequest) {
  try {
    const token = getAuthCookie();
    
    if (!token) {
      return NextResponse.json(
        createErrorResponse('UNAUTHORIZED', 'Token não encontrado'),
        { status: 401 }
      );
    }

    const payload = verifyJwt(token);
    if (!payload) {
      return NextResponse.json(
        createErrorResponse('UNAUTHORIZED', 'Token inválido'),
        { status: 401 }
      );
    }

    const user = await prisma.user.findUnique({
      where: { id: payload.userId },
      select: {
        id: true,
        email: true,
        role: true,
      },
    });

    if (!user) {
      return NextResponse.json(
        createErrorResponse('USER_NOT_FOUND', 'Usuário não encontrado'),
        { status: 404 }
      );
    }

    return NextResponse.json(createSuccessResponse(user));
  } catch (error) {
    return NextResponse.json(
      createErrorResponse('INTERNAL_ERROR', 'Erro interno do servidor'),
      { status: 500 }
    );
  }
}

