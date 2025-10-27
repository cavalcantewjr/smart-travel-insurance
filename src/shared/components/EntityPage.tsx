import React from 'react';

interface EntityPageProps {
  title: string;
  children: React.ReactNode;
  actions?: React.ReactNode;
}

export function EntityPage({ title, children, actions }: EntityPageProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold text-gray-900">{title}</h1>
            {actions && <div className="flex space-x-3">{actions}</div>}
          </div>
        </div>
        <div className="bg-white shadow rounded-lg">
          {children}
        </div>
      </div>
    </div>
  );
}
