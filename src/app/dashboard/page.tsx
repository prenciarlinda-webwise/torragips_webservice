'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getDashboardStats, projectsApi, clientsApi } from '@/lib/api';
import StatCard from '@/components/dashboard/StatCard';

function fmt(n: number) {
  return n.toLocaleString('sq-AL', { maximumFractionDigits: 0 });
}

export default function DashboardPage() {
  const router = useRouter();
  const [stats, setStats] = useState<any>(null);
  const [recentProjects, setRecentProjects] = useState<any[]>([]);
  const [recentClients, setRecentClients] = useState<any[]>([]);

  useEffect(() => {
    getDashboardStats().then(setStats);
    projectsApi.list('page_size=5').then((r) => setRecentProjects(r.results));
    clientsApi.list('page_size=5').then((r) => setRecentClients(r.results));
  }, []);

  if (!stats) {
    return <div className="text-gray-400 p-8">Duke ngarkuar...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#1f2937]">Dashboard</h1>
          <p className="text-sm text-gray-400 mt-0.5">Permbledhje e pergjithshme</p>
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
        <StatCard label="Projekte Aktive" value={stats.totalProjects} color="blue" />
        <StatCard label="Klientet" value={stats.totalClients} color="gray" />
        <StatCard label="Te Ardhurat" value={`${fmt(stats.totalRevenue)} ALL`} color="green" />
        <StatCard label="Kostot" value={`${fmt(stats.totalCosts)} ALL`} color="red" />
        <StatCard label="Fitimi" value={`${fmt(stats.profit)} ALL`} color={stats.profit >= 0 ? 'green' : 'red'} />
        <StatCard label="Pagesa ne Pritje" value={`${stats.pendingPaymentsCount} - ${fmt(stats.pendingPaymentsAmount)} ALL`} color="yellow" />
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Recent Projects */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between">
            <h2 className="text-sm font-semibold text-[#1a365d] uppercase tracking-wider">Projektet e Fundit</h2>
            <div className="w-8 h-0.5 bg-[#d97706] rounded-full" />
          </div>
          <div className="p-5">
            {recentProjects.length === 0 ? (
              <p className="text-sm text-gray-400">Nuk ka projekte.</p>
            ) : (
              <div className="space-y-2">
                {recentProjects.map((p) => (
                  <button
                    key={p.id}
                    onClick={() => router.push(`/dashboard/projects/${p.id}/`)}
                    className="w-full flex items-center justify-between py-2.5 px-3 rounded-lg hover:bg-gray-50 transition-colors text-left group"
                  >
                    <div>
                      <p className="text-sm font-medium text-[#1f2937] group-hover:text-[#1a365d] transition-colors">{p.name}</p>
                      <p className="text-xs text-gray-400">{p.client_name}{p.city ? ` - ${p.city}` : ''}</p>
                    </div>
                    <span className={`text-[10px] px-2.5 py-1 rounded-full font-semibold tracking-wide uppercase ${
                      p.status === 'active' ? 'bg-emerald-50 text-emerald-600' :
                      p.status === 'completed' ? 'bg-[#1a365d]/10 text-[#1a365d]' :
                      'bg-gray-100 text-gray-400'
                    }`}>
                      {p.status === 'active' ? 'Aktiv' : p.status === 'completed' ? 'Perfunduar' : 'Anulluar'}
                    </span>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Recent Clients */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between">
            <h2 className="text-sm font-semibold text-[#1a365d] uppercase tracking-wider">Klientet e Fundit</h2>
            <div className="w-8 h-0.5 bg-[#d97706] rounded-full" />
          </div>
          <div className="p-5">
            {recentClients.length === 0 ? (
              <p className="text-sm text-gray-400">Nuk ka kliente.</p>
            ) : (
              <div className="space-y-2">
                {recentClients.map((c) => (
                  <div key={c.id} className="flex items-center justify-between py-2.5 px-3 rounded-lg hover:bg-gray-50 transition-colors">
                    <div>
                      <p className="text-sm font-medium text-[#1f2937]">{c.name}</p>
                      <p className="text-xs text-gray-400">{c.phone}{c.city ? ` - ${c.city}` : ''}</p>
                    </div>
                    {c.business_name && (
                      <span className="text-[10px] px-2 py-0.5 bg-[#d97706]/10 text-[#d97706] rounded font-medium">{c.business_name}</span>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
