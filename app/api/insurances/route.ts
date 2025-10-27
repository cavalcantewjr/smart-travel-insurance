import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { createSuccessResponse, createErrorResponse } from '@/lib/responses';
import { createInsuranceSchema } from '@/shared/validation/insurance.schema';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');
    const clientId = searchParams.get('clientId');
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const skip = (page - 1) * limit;

    const where: any = {};
    if (status) where.status = status;
    if (clientId) where.clientId = clientId;

    const [insurances, total] = await Promise.all([
      prisma.insurance.findMany({
        where,
        skip,
        take: limit,
        include: {
          client: true,
        },
        orderBy: { createdAt: 'desc' },
      }),
      prisma.insurance.count({ where }),
    ]);

    return NextResponse.json(
      createSuccessResponse(insurances, {
        page,
        limit,
        total,
      })
    );
  } catch (error) {
    return NextResponse.json(
      createErrorResponse('INTERNAL_ERROR', 'Erro interno do servidor'),
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const data = createInsuranceSchema.parse(body);

    // Verificar se o cliente existe
    const client = await prisma.client.findUnique({
      where: { id: data.clientId },
    });

    if (!client) {
      return NextResponse.json(
        createErrorResponse('CLIENT_NOT_FOUND', 'Cliente não encontrado'),
        { status: 404 }
      );
    }

    const insurance = await prisma.insurance.create({
      data: {
        ...data,
        startDate: new Date(data.startDate),
        endDate: new Date(data.endDate),
      },
      include: {
        client: true,
      },
    });

    return NextResponse.json(createSuccessResponse(insurance), { status: 201 });
  } catch (error) {
    if (error instanceof Error && error.name === 'ZodError') {
      return NextResponse.json(
        createErrorResponse('VALIDATION_ERROR', 'Dados inválidos', [
          error.message,
        ]),
        { status: 400 }
      );
    }

    return NextResponse.json(
      createErrorResponse('INTERNAL_ERROR', 'Erro interno do servidor'),
      { status: 500 }
    );
  }
}

