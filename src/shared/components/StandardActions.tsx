import React from 'react';

interface StandardActionsProps {
  onCreate?: () => void;
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
  editId?: string;
  deleteId?: string;
}

export function StandardActions({
  onCreate,
  onEdit,
  onDelete,
  editId,
  deleteId,
}: StandardActionsProps) {
  return (
    <div className="flex space-x-2">
      {onCreate && (
        <button
          onClick={onCreate}
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
        >
          Criar
        </button>
      )}
      {onEdit && editId && (
        <button
          onClick={() => onEdit(editId)}
          className="bg-yellow-600 text-white px-4 py-2 rounded-md hover:bg-yellow-700 transition-colors"
        >
          Editar
        </button>
      )}
      {onDelete && deleteId && (
        <button
          onClick={() => onDelete(deleteId)}
          className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition-colors"
        >
          Excluir
        </button>
      )}
    </div>
  );
}
