import { prisma } from '@/lib/db';
import { EntityPage } from '@/shared/components/EntityPage';
import { StandardActions } from '@/shared/components/StandardActions';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

interface Client {
  id: string;
  name: string;
  email: string | null;
  phone: string | null;
  createdAt: Date;
  _count: {
    insurances: number;
  };
}

async function getClients(searchParams: { [key: string]: string | string[] | undefined }) {
  const q = searchParams.q as string;
  const page = parseInt((searchParams.page as string) || '1');
  const limit = 10;
  const skip = (page - 1) * limit;

  const where = q
    ? {
        name: {
          contains: q,
          mode: 'insensitive' as const,
        },
      }
    : {};

  const [clients, total] = await Promise.all([
    prisma.client.findMany({
      where,
      skip,
      take: limit,
      include: {
        _count: {
          select: {
            insurances: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    }),
    prisma.client.count({ where }),
  ]);

  return { clients, total, page, limit };
}

export default async function ClientsPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const { clients, total, page, limit } = await getClients(searchParams);
  const totalPages = Math.ceil(total / limit);

  return (
    <EntityPage
      title="Clientes"
      actions={
        <Link
          href="/dashboard/clients/new"
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
        >
          Novo Cliente
        </Link>
      }
    >
      <div className="p-6">
        {/* Search Form */}
        <form method="GET" className="mb-6">
          <div className="flex gap-4">
            <input
              type="text"
              name="q"
              placeholder="Buscar por nome..."
              defaultValue={searchParams.q as string}
              className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="submit"
              className="bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700 transition-colors"
            >
              Buscar
            </button>
          </div>
        </form>

        {/* Clients Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Nome
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Email
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Telefone
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Seguros
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Criado em
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Ações
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {clients.map((client) => (
                <tr key={client.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {client.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {client.email || '-'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {client.phone || '-'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {client._count.insurances}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(client.createdAt).toLocaleDateString('pt-BR')}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <Link
                        href={`/dashboard/clients/${client.id}/edit`}
                        className="text-yellow-600 hover:text-yellow-900"
                      >
                        Editar
                      </Link>
                      <Link
                        href={`/dashboard/clients/${client.id}/delete`}
                        className="text-red-600 hover:text-red-900"
                      >
                        Excluir
                      </Link>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="mt-6 flex justify-between items-center">
            <div className="text-sm text-gray-700">
              Mostrando {((page - 1) * limit) + 1} a {Math.min(page * limit, total)} de {total} resultados
            </div>
            <div className="flex space-x-2">
              {page > 1 && (
                <Link
                  href={`?page=${page - 1}${searchParams.q ? `&q=${searchParams.q}` : ''}`}
                  className="px-3 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
                >
                  Anterior
                </Link>
              )}
              {page < totalPages && (
                <Link
                  href={`?page=${page + 1}${searchParams.q ? `&q=${searchParams.q}` : ''}`}
                  className="px-3 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
                >
                  Próxima
                </Link>
              )}
            </div>
          </div>
        )}
      </div>
    </EntityPage>
  );
}
