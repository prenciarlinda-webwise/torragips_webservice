'use client';

interface Column<T> {
  key: string;
  label: string;
  render?: (item: T) => React.ReactNode;
}

interface DataTableProps<T> {
  columns: Column<T>[];
  data: T[];
  onView?: (item: T) => void;
  onEdit?: (item: T) => void;
  onDelete?: (item: T) => void;
  loading?: boolean;
}

export default function DataTable<T extends { id: number }>({
  columns,
  data,
  onView,
  onEdit,
  onDelete,
  loading,
}: DataTableProps<T>) {
  const hasActions = onView || onEdit || onDelete;

  if (loading) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-12 text-center text-gray-400">
        Duke ngarkuar...
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-[#1a365d]">
              {columns.map((col) => (
                <th key={col.key} className="px-4 py-3 text-left text-[11px] font-semibold text-white/90 uppercase tracking-wider">
                  {col.label}
                </th>
              ))}
              {hasActions && (
                <th className="px-4 py-3 text-right text-[11px] font-semibold text-white/90 uppercase tracking-wider">
                  Veprime
                </th>
              )}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {data.length === 0 ? (
              <tr>
                <td colSpan={columns.length + (hasActions ? 1 : 0)} className="px-4 py-8 text-center text-gray-400 text-sm">
                  Nuk ka te dhena.
                </td>
              </tr>
            ) : (
              data.map((item, idx) => (
                <tr key={item.id} className={`transition-colors hover:bg-gray-50/80 ${idx % 2 === 0 ? '' : 'bg-gray-50/40'}`}>
                  {columns.map((col) => (
                    <td key={col.key} className="px-4 py-3 text-sm text-gray-700">
                      {col.render ? col.render(item) : (item as any)[col.key]}
                    </td>
                  ))}
                  {hasActions && (
                    <td className="px-4 py-3 text-right space-x-1.5">
                      {onView && (
                        <button
                          onClick={() => onView(item)}
                          className="text-xs px-3 py-1.5 bg-[#1a365d] text-white rounded-md hover:bg-[#1a365d]/90 transition-colors"
                        >
                          Shiko
                        </button>
                      )}
                      {onEdit && (
                        <button
                          onClick={() => onEdit(item)}
                          className="text-xs px-3 py-1.5 bg-[#d97706]/10 text-[#d97706] rounded-md hover:bg-[#d97706]/20 transition-colors font-medium"
                        >
                          Ndrysho
                        </button>
                      )}
                      {onDelete && (
                        <button
                          onClick={() => onDelete(item)}
                          className="text-xs px-3 py-1.5 bg-red-50 text-red-500 rounded-md hover:bg-red-100 transition-colors"
                        >
                          Fshi
                        </button>
                      )}
                    </td>
                  )}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
