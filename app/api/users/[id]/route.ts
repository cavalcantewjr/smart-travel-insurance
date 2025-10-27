import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcrypt';
import { prisma } from '@/lib/db';
import { createSuccessResponse, createErrorResponse } from '@/lib/responses';
import { updateUserSchema } from '@/shared/validation/user.schema';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const user = await prisma.user.findUnique({
      where: { id: params.id },
      select: {
        id: true,
        email: true,
        role: true,
        createdAt: true,
        updatedAt: true,
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

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    const data = updateUserSchema.parse(body);

    const updateData: any = { ...data };
    if (data.password) {
      updateData.passwordHash = await bcrypt.hash(data.password, 10);
      delete updateData.password;
    }

    const user = await prisma.user.update({
      where: { id: params.id },
      data: updateData,
      select: {
        id: true,
        email: true,
        role: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    return NextResponse.json(createSuccessResponse(user));
  } catch (error) {
    if (error instanceof Error && error.name === 'ZodError') {
      return NextResponse.json(
        createErrorResponse('VALIDATION_ERROR', 'Dados inválidos', [
          error.message,
        ]),
        { status: 400 }
      );
    }

    if (error instanceof Error && error.message.includes('Record to update not found')) {
      return NextResponse.json(
        createErrorResponse('USER_NOT_FOUND', 'Usuário não encontrado'),
        { status: 404 }
      );
    }

    return NextResponse.json(
      createErrorResponse('INTERNAL_ERROR', 'Erro interno do servidor'),
      { status: 500 }
    );
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    const data = updateUserSchema.parse(body);

    const updateData: any = { ...data };
    if (data.password) {
      updateData.passwordHash = await bcrypt.hash(data.password, 10);
      delete updateData.password;
    }

    const user = await prisma.user.update({
      where: { id: params.id },
      data: updateData,
      select: {
        id: true,
        email: true,
        role: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    return NextResponse.json(createSuccessResponse(user));
  } catch (error) {
    if (error instanceof Error && error.name === 'ZodError') {
      return NextResponse.json(
        createErrorResponse('VALIDATION_ERROR', 'Dados inválidos', [
          error.message,
        ]),
        { status: 400 }
      );
    }

    if (error instanceof Error && error.message.includes('Record to update not found')) {
      return NextResponse.json(
        createErrorResponse('USER_NOT_FOUND', 'Usuário não encontrado'),
        { status: 404 }
      );
    }

    return NextResponse.json(
      createErrorResponse('INTERNAL_ERROR', 'Erro interno do servidor'),
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await prisma.user.delete({
      where: { id: params.id },
    });

    return new NextResponse(null, { status: 204 });
  } catch (error) {
    if (error instanceof Error && error.message.includes('Record to delete does not exist')) {
      return NextResponse.json(
        createErrorResponse('USER_NOT_FOUND', 'Usuário não encontrado'),
        { status: 404 }
      );
    }

    return NextResponse.json(
      createErrorResponse('INTERNAL_ERROR', 'Erro interno do servidor'),
      { status: 500 }
    );
  }
}
