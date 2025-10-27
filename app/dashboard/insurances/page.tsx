import { prisma } from '@/lib/db';
import { EntityPage } from '@/shared/components/EntityPage';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

interface Insurance {
  id: string;
  policyNumber: string;
  coverage: string;
  startDate: Date;
  endDate: Date;
  status: string;
  createdAt: Date;
  client: {
    id: string;
    name: string;
  };
}

async function getInsurances(searchParams: { [key: string]: string | string[] | undefined }) {
  const status = searchParams.status as string;
  const clientId = searchParams.clientId as string;
  const page = parseInt((searchParams.page as string) || '1');
  const limit = 10;
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
        client: {
          select: {
            id: true,
            name: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    }),
    prisma.insurance.count({ where }),
  ]);

  return { insurances, total, page, limit };
}

export default async function InsurancesPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const { insurances, total, page, limit } = await getInsurances(searchParams);
  const totalPages = Math.ceil(total / limit);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'expired':
        return 'bg-red-100 text-red-800';
      case 'canceled':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <EntityPage
      title="Seguros"
      actions={
        <Link
          href="/dashboard/insurances/new"
          className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors"
        >
          Novo Seguro
        </Link>
      }
    >
      <div className="p-6">
        {/* Filters */}
        <div className="mb-6 flex gap-4">
          <form method="GET" className="flex gap-2">
            <select
              name="status"
              defaultValue={searchParams.status as string}
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              <option value="">Todos os status</option>
              <option value="active">Ativo</option>
              <option value="expired">Expirado</option>
              <option value="canceled">Cancelado</option>
            </select>
            <button
              type="submit"
              className="bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700 transition-colors"
            >
              Filtrar
            </button>
          </form>
        </div>

        {/* Insurances Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Apólice
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Cliente
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Cobertura
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Período
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Ações
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {insurances.map((insurance) => (
                <tr key={insurance.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {insurance.policyNumber}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {insurance.client.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {insurance.coverage}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(insurance.startDate).toLocaleDateString('pt-BR')} - {new Date(insurance.endDate).toLocaleDateString('pt-BR')}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(insurance.status)}`}>
                      {insurance.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <Link
                        href={`/dashboard/insurances/${insurance.id}/edit`}
                        className="text-yellow-600 hover:text-yellow-900"
                      >
                        Editar
                      </Link>
                      <Link
                        href={`/dashboard/insurances/${insurance.id}/delete`}
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
                  href={`?page=${page - 1}${searchParams.status ? `&status=${searchParams.status}` : ''}`}
                  className="px-3 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
                >
                  Anterior
                </Link>
              )}
              {page < totalPages && (
                <Link
                  href={`?page=${page + 1}${searchParams.status ? `&status=${searchParams.status}` : ''}`}
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
