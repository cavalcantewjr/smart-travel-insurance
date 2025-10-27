import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Sistema de Seguros de Viagem
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Gerencie clientes e apólices de seguro de forma eficiente
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                Acesso ao Sistema
              </h3>
              <p className="text-sm text-gray-600 mb-6">
                Faça login para acessar o dashboard administrativo
              </p>
            </div>

            <div className="space-y-4">
              <Link
                href="/login"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
              >
                Fazer Login
              </Link>

              <Link
                href="/dashboard"
                className="w-full flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
              >
                Ir para Dashboard
              </Link>
            </div>

            <div className="mt-6 p-4 bg-blue-50 rounded-md">
              <h4 className="text-sm font-medium text-blue-800 mb-2">
                Credenciais de Teste
              </h4>
              <div className="text-xs text-blue-700 space-y-1">
                <p><strong>Email:</strong> admin@local.dev</p>
                <p><strong>Senha:</strong> admin123</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8 text-center">
        <div className="text-sm text-gray-500">
          <p>Sistema desenvolvido com Next.js 14 + Prisma + PostgreSQL</p>
        </div>
      </div>
    </div>
  );
}
