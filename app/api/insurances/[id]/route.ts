import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { createSuccessResponse, createErrorResponse } from '@/lib/responses';
import { updateInsuranceSchema } from '@/shared/validation/insurance.schema';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const insurance = await prisma.insurance.findUnique({
      where: { id: params.id },
      include: {
        client: true,
      },
    });

    if (!insurance) {
      return NextResponse.json(
        createErrorResponse('INSURANCE_NOT_FOUND', 'Seguro não encontrado'),
        { status: 404 }
      );
    }

    return NextResponse.json(createSuccessResponse(insurance));
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
    const data = updateInsuranceSchema.parse(body);

    const insurance = await prisma.insurance.update({
      where: { id: params.id },
      data: {
        ...data,
        startDate: data.startDate ? new Date(data.startDate) : undefined,
        endDate: data.endDate ? new Date(data.endDate) : undefined,
      },
      include: {
        client: true,
      },
    });

    return NextResponse.json(createSuccessResponse(insurance));
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
        createErrorResponse('INSURANCE_NOT_FOUND', 'Seguro não encontrado'),
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
    const data = updateInsuranceSchema.parse(body);

    const insurance = await prisma.insurance.update({
      where: { id: params.id },
      data: {
        ...data,
        startDate: data.startDate ? new Date(data.startDate) : undefined,
        endDate: data.endDate ? new Date(data.endDate) : undefined,
      },
      include: {
        client: true,
      },
    });

    return NextResponse.json(createSuccessResponse(insurance));
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
        createErrorResponse('INSURANCE_NOT_FOUND', 'Seguro não encontrado'),
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
    await prisma.insurance.delete({
      where: { id: params.id },
    });

    return new NextResponse(null, { status: 204 });
  } catch (error) {
    if (error instanceof Error && error.message.includes('Record to delete does not exist')) {
      return NextResponse.json(
        createErrorResponse('INSURANCE_NOT_FOUND', 'Seguro não encontrado'),
        { status: 404 }
      );
    }

    return NextResponse.json(
      createErrorResponse('INTERNAL_ERROR', 'Erro interno do servidor'),
      { status: 500 }
    );
  }
}
