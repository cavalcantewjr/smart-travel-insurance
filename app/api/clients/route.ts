import { NextRequest, NextResponse } from 'next/server';
import { createSuccessResponse, createErrorResponse } from '@/lib/responses';
import { createClientSchema } from '@/shared/validation/client.schema';
import { ClientServiceFactory } from '@/features/clients/application/factories/ClientServiceFactory';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const q = searchParams.get('q');
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');

    // Usar ClientService para lógica de negócio
    const clientService = ClientServiceFactory.createClientService();
    const result = await clientService.findAll({
      name: q || undefined,
      page,
      limit,
    });

    return NextResponse.json(
      createSuccessResponse(result.clients, {
        page,
        limit,
        total: result.total,
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
    const data = createClientSchema.parse(body);

    // Usar ClientService para lógica de negócio
    const clientService = ClientServiceFactory.createClientService();
    const client = await clientService.create(data);

    return NextResponse.json(createSuccessResponse(client), { status: 201 });
  } catch (error) {
    if (error instanceof Error && error.name === 'ZodError') {
      return NextResponse.json(
        createErrorResponse('VALIDATION_ERROR', 'Dados inválidos', [
          error.message,
        ]),
        { status: 400 }
      );
    }

    // Tratar erros específicos do ClientService
    if (error instanceof Error && error.message === 'Nome é obrigatório') {
      return NextResponse.json(
        createErrorResponse('VALIDATION_ERROR', error.message),
        { status: 400 }
      );
    }

    if (error instanceof Error && error.message === 'Email já está em uso') {
      return NextResponse.json(createErrorResponse('CONFLICT', error.message), {
        status: 409,
      });
    }

    return NextResponse.json(
      createErrorResponse('INTERNAL_ERROR', 'Erro interno do servidor'),
      { status: 500 }
    );
  }
}
