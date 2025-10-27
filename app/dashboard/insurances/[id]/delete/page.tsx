'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

interface Insurance {
  id: string;
  policyNumber: string;
  coverage: string;
  startDate: string;
  endDate: string;
  status: string;
  client: {
    id: string;
    name: string;
  };
}

export default function DeleteInsurancePage({ params }: { params: { id: string } }) {
  const [insurance, setInsurance] = useState<Insurance | null>(null);
  const [loading, setLoading] = useState(false);
  const [loadingData, setLoadingData] = useState(true);
  const [error, setError] = useState('');
  const router = useRouter();

  useEffect(() => {
    const fetchInsurance = async () => {
      try {
        const response = await fetch(`/api/insurances/${params.id}`);
        const data = await response.json();
        
        if (response.ok) {
          setInsurance(data.data);
        } else {
          setError('Seguro não encontrado');
        }
      } catch (err) {
        setError('Erro ao carregar dados do seguro');
      } finally {
        setLoadingData(false);
      }
    };

    fetchInsurance();
  }, [params.id]);

  const handleDelete = async () => {
    if (!confirm('Tem certeza que deseja excluir este seguro? Esta ação não pode ser desfeita.')) {
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await fetch(`/api/insurances/${params.id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        router.push('/dashboard/insurances');
      } else {
        const data = await response.json();
        setError(data.error?.message || 'Erro ao excluir seguro');
      }
    } catch (err) {
      setError('Erro de conexão');
    } finally {
      setLoading(false);
    }
  };

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

  if (loadingData) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-red-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Carregando dados do seguro...</p>
        </div>
      </div>
    );
  }

  if (!insurance) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-600 text-6xl mb-4">⚠️</div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Seguro não encontrado</h1>
          <p className="text-gray-600 mb-4">O seguro que você está procurando não existe.</p>
          <Link
            href="/dashboard/insurances"
            className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors"
          >
            Voltar para Seguros
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Excluir Seguro</h1>
              <p className="mt-2 text-gray-600">Confirme a exclusão do seguro</p>
            </div>
            <Link
              href="/dashboard/insurances"
              className="bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700 transition-colors"
            >
              ← Voltar
            </Link>
          </div>
        </div>

        {/* Warning Card */}
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 mb-6">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-8 w-8 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <h3 className="text-lg font-medium text-red-800">
                Atenção: Esta ação é irreversível!
              </h3>
              <div className="mt-2 text-sm text-red-700">
                <p>Você está prestes a excluir permanentemente este seguro e todos os dados associados.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Insurance Info */}
        <div className="bg-white shadow rounded-lg">
          <div className="px-6 py-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Informações do Seguro</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Número da Apólice
                </label>
                <p className="text-lg text-gray-900">{insurance.policyNumber}</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Cliente
                </label>
                <p className="text-lg text-gray-900">{insurance.client.name}</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Cobertura
                </label>
                <p className="text-lg text-gray-900">{insurance.coverage}</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Status
                </label>
                <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(insurance.status)}`}>
                  {insurance.status}
                </span>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Data de Início
                </label>
                <p className="text-lg text-gray-900">{new Date(insurance.startDate).toLocaleDateString('pt-BR')}</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Data de Fim
                </label>
                <p className="text-lg text-gray-900">{new Date(insurance.endDate).toLocaleDateString('pt-BR')}</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  ID do Seguro
                </label>
                <p className="text-sm text-gray-500 font-mono">{insurance.id}</p>
              </div>
            </div>

            {error && (
              <div className="mt-6 bg-red-50 border border-red-200 rounded-md p-4">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-red-800">
                      Erro
                    </h3>
                    <div className="mt-2 text-sm text-red-700">
                      <p>{error}</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div className="mt-8 flex justify-end space-x-4">
              <Link
                href="/dashboard/insurances"
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Cancelar
              </Link>
              <button
                onClick={handleDelete}
                disabled={loading}
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {loading ? 'Excluindo...' : 'Confirmar Exclusão'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
