import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { createSuccessResponse, createErrorResponse } from '@/lib/responses';
import { updateClientSchema } from '@/shared/validation/client.schema';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const client = await prisma.client.findUnique({
      where: { id: params.id },
      include: {
        insurances: true,
      },
    });

    if (!client) {
      return NextResponse.json(
        createErrorResponse('CLIENT_NOT_FOUND', 'Cliente não encontrado'),
        { status: 404 }
      );
    }

    return NextResponse.json(createSuccessResponse(client));
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
    const data = updateClientSchema.parse(body);

    const client = await prisma.client.update({
      where: { id: params.id },
      data,
    });

    return NextResponse.json(createSuccessResponse(client));
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
        createErrorResponse('CLIENT_NOT_FOUND', 'Cliente não encontrado'),
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
    const data = updateClientSchema.parse(body);

    const client = await prisma.client.update({
      where: { id: params.id },
      data,
    });

    return NextResponse.json(createSuccessResponse(client));
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
        createErrorResponse('CLIENT_NOT_FOUND', 'Cliente não encontrado'),
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
    await prisma.client.delete({
      where: { id: params.id },
    });

    return new NextResponse(null, { status: 204 });
  } catch (error) {
    if (error instanceof Error && error.message.includes('Record to delete does not exist')) {
      return NextResponse.json(
        createErrorResponse('CLIENT_NOT_FOUND', 'Cliente não encontrado'),
        { status: 404 }
      );
    }

    return NextResponse.json(
      createErrorResponse('INTERNAL_ERROR', 'Erro interno do servidor'),
      { status: 500 }
    );
  }
}
