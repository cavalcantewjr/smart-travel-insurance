import { NextRequest, NextResponse } from 'next/server';
import { setAuthCookie } from '@/lib/cookies';
import { createSuccessResponse, createErrorResponse } from '@/lib/responses';
import { loginSchema } from '@/shared/validation/auth.schema';
import { AuthServiceFactory } from '@/features/auth/application/factories/AuthServiceFactory';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, password } = loginSchema.parse(body);

    // Usar AuthService para lógica de negócio
    const authService = AuthServiceFactory.createAuthService();
    const authResult = await authService.login({ email, password });

    const response = NextResponse.json(
      createSuccessResponse({
        id: authResult.user.id,
        email: authResult.user.email,
        role: authResult.user.role,
      })
    );

    // Definir cookie de autenticação
    response.cookies.set('auth_token', authResult.token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24, // 1 day
      path: '/',
    });

    return response;
  } catch (error) {
    if (error instanceof Error && error.name === 'ZodError') {
      return NextResponse.json(
        createErrorResponse('VALIDATION_ERROR', 'Dados inválidos', [
          error.message,
        ]),
        { status: 400 }
      );
    }

    // Tratar erros específicos do AuthService
    if (error instanceof Error && error.message === 'Credenciais inválidas') {
      return NextResponse.json(
        createErrorResponse('INVALID_CREDENTIALS', 'Email ou senha inválidos'),
        { status: 401 }
      );
    }

    return NextResponse.json(
      createErrorResponse('INTERNAL_ERROR', 'Erro interno do servidor'),
      { status: 500 }
    );
  }
}

