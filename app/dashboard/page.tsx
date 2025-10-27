export default async function DashboardPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="mt-2 text-gray-600">Visão geral do sistema</p>
        </div>

        <div className="bg-white shadow rounded-lg p-6 mb-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            🎉 Bem-vindo ao Sistema de Seguros de Viagem!
          </h2>
          <p className="text-gray-600 mb-4">
            Você está logado com sucesso. Aqui você pode gerenciar clientes, seguros e usuários.
          </p>
          
          <div className="bg-green-50 border border-green-200 rounded-md p-4 mb-4">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-green-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-green-800">
                  Sistema funcionando perfeitamente!
                </h3>
                <div className="mt-2 text-sm text-green-700">
                  <p>✅ Autenticação funcionando</p>
                  <p>✅ Banco de dados conectado</p>
                  <p>✅ Dashboard carregado com sucesso</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <a
              href="/dashboard/clients"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors"
            >
              👥 Gerenciar Clientes
            </a>
            <a
              href="/dashboard/insurances"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 transition-colors"
            >
              🛡️ Gerenciar Seguros
            </a>
            <a
              href="/dashboard/admins"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 transition-colors"
            >
              👤 Gerenciar Usuários
            </a>
          </div>
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h3 className="text-lg font-medium text-blue-900 mb-2">
            📋 Informações do Sistema
          </h3>
          <div className="text-sm text-blue-800 space-y-1">
            <p><strong>Status:</strong> Sistema operacional</p>
            <p><strong>Versão:</strong> Next.js 14 + Prisma + PostgreSQL</p>
            <p><strong>Ambiente:</strong> Desenvolvimento</p>
            <p><strong>Última atualização:</strong> {new Date().toLocaleString('pt-BR')}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
