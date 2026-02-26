'use client';

import { useEffect, useState } from 'react';
import { paymentsApi, projectsApi } from '@/lib/api';
import DataTable from '@/components/dashboard/DataTable';

export default function PaymentsPage() {
  const [data, setData] = useState<any[]>([]);
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      paymentsApi.list('page_size=200'),
      projectsApi.list('page_size=100'),
    ]).then(([p, pr]) => {
      setData(p.results);
      setProjects(pr.results);
      setLoading(false);
    });
  }, []);

  const getProjectName = (id: number) => projects.find((p) => p.id === id)?.name || '-';
  const totalPayments = data.reduce((s, p) => s + parseFloat(p.amount || 0), 0);

  const columns = [
    { key: 'project', label: 'Projekti', render: (p: any) => getProjectName(p.project) },
    { key: 'amount', label: 'Shuma', render: (p: any) => `${parseFloat(p.amount).toLocaleString('sq-AL')} ALL` },
    { key: 'date', label: 'Data' },
    { key: 'notes', label: 'Shenime' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-800">Pagesat</h1>
        <p className="text-sm text-gray-500 mt-1">
          Total: {totalPayments.toLocaleString('sq-AL', { maximumFractionDigits: 0 })} ALL
          <span className="text-gray-400 ml-2">(Krijohen automatikisht kur Situacioni shenohet si &quot;Paguar&quot;)</span>
        </p>
      </div>

      <DataTable columns={columns} data={data} loading={loading} />
    </div>
  );
}
