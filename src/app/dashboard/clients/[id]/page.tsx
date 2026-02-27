'use client';

import { useEffect, useState, useCallback } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { clientsApi, projectsApi, paymentsApi, costsApi, situacionApi } from '@/lib/api';
import StatCard from '@/components/dashboard/StatCard';
import FormModal from '@/components/dashboard/FormModal';

function fmt(n: number) {
  return n.toLocaleString('sq-AL', { maximumFractionDigits: 0 });
}

const STATUS_MAP: Record<string, string> = { active: 'Aktiv', completed: 'Perfunduar', cancelled: 'Anulluar' };
const STATUS_COLORS: Record<string, string> = {
  active: 'bg-emerald-50 text-emerald-600',
  completed: 'bg-blue-50 text-blue-600',
  cancelled: 'bg-gray-100 text-gray-500',
};
const CATEGORY_MAP: Record<string, string> = {
  materials: 'Materiale', labor: 'Puntori', transport: 'Transport', equipment: 'Pajisje', other: 'Tjeter',
};

const PROJECT_EMPTY = { name: '', project_type: 'supply_work', city: '', status: 'active', start_date: '', notes: '' };
const COST_EMPTY = { project: '', category: 'materials', description: '', amount: '', date: '', supplier: '', notes: '' };

export default function ClientDetailPage() {
  const params = useParams();
  const router = useRouter();
  const clientId = Number(params.id);

  const [client, setClient] = useState<any>(null);
  const [projects, setProjects] = useState<any[]>([]);
  const [payments, setPayments] = useState<any[]>([]);
  const [costs, setCosts] = useState<any[]>([]);
  const [situacions, setSituacions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Client edit
  const [editClientOpen, setEditClientOpen] = useState(false);
  const [clientForm, setClientForm] = useState<any>({});
  const [clientSaving, setClientSaving] = useState(false);

  // Project modal
  const [projectModalOpen, setProjectModalOpen] = useState(false);
  const [projectForm, setProjectForm] = useState<any>(PROJECT_EMPTY);
  const [projectEditId, setProjectEditId] = useState<number | null>(null);
  const [projectSaving, setProjectSaving] = useState(false);

  // Cost modal
  const [costModalOpen, setCostModalOpen] = useState(false);
  const [costForm, setCostForm] = useState<any>(COST_EMPTY);
  const [costEditId, setCostEditId] = useState<number | null>(null);
  const [costSaving, setCostSaving] = useState(false);

  // Expanded projects
  const [expandedProjects, setExpandedProjects] = useState<Set<number>>(new Set());

  const loadData = useCallback(() => {
    setLoading(true);
    Promise.all([
      clientsApi.get(clientId),
      projectsApi.list(`client=${clientId}&page_size=200`),
      paymentsApi.list('page_size=1000'),
      costsApi.list('page_size=1000'),
      situacionApi.list('page_size=1000'),
    ]).then(([c, p, pay, cost, sit]) => {
      setClient(c);
      setProjects(p.results);
      const projectIds = new Set(p.results.map((pr: any) => pr.id));
      setPayments(pay.results.filter((pa: any) => projectIds.has(pa.project)));
      setCosts(cost.results.filter((co: any) => projectIds.has(co.project)));
      setSituacions(sit.results.filter((s: any) => projectIds.has(s.project)));
      setLoading(false);
    });
  }, [clientId]);

  useEffect(() => { loadData(); }, [loadData]);

  // Toggle project expand
  const toggleProject = (id: number) => {
    setExpandedProjects(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id); else next.add(id);
      return next;
    });
  };

  // --- Client edit ---
  const openEditClient = () => {
    setClientForm({ ...client });
    setEditClientOpen(true);
  };
  const handleClientSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setClientSaving(true);
    try {
      await clientsApi.update(clientId, clientForm);
      setEditClientOpen(false);
      loadData();
    } finally { setClientSaving(false); }
  };
  const setC = (key: string, val: string) => setClientForm((f: any) => ({ ...f, [key]: val }));

  // --- Project CRUD ---
  const openNewProject = () => {
    setProjectForm(PROJECT_EMPTY);
    setProjectEditId(null);
    setProjectModalOpen(true);
  };
  const openEditProject = (p: any) => {
    setProjectForm({ name: p.name, project_type: p.project_type, city: p.city || '', status: p.status, start_date: p.start_date || '', notes: p.notes || '' });
    setProjectEditId(p.id);
    setProjectModalOpen(true);
  };
  const handleProjectSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setProjectSaving(true);
    try {
      const payload = { ...projectForm, client: clientId };
      if (projectEditId) {
        await projectsApi.update(projectEditId, payload);
      } else {
        const created = await projectsApi.create(payload);
        setExpandedProjects(prev => new Set(prev).add(created.id));
      }
      setProjectModalOpen(false);
      loadData();
    } finally { setProjectSaving(false); }
  };
  const setP = (key: string, val: string) => setProjectForm((f: any) => ({ ...f, [key]: val }));

  // --- Cost CRUD ---
  const openNewCost = (projectId?: number) => {
    setCostForm({ ...COST_EMPTY, project: projectId ? String(projectId) : '', date: new Date().toISOString().split('T')[0] });
    setCostEditId(null);
    setCostModalOpen(true);
  };
  const openEditCost = (c: any) => {
    setCostForm({ ...c, project: c.project ? String(c.project) : '' });
    setCostEditId(c.id);
    setCostModalOpen(true);
  };
  const handleDeleteCost = async (c: any) => {
    if (!confirm(`Fshi koston "${c.description}"?`)) return;
    await costsApi.delete(c.id);
    loadData();
  };
  const handleCostSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setCostSaving(true);
    try {
      const payload = { ...costForm, project: costForm.project ? parseInt(costForm.project) : null, amount: parseFloat(costForm.amount) };
      if (costEditId) {
        await costsApi.update(costEditId, payload);
      } else {
        await costsApi.create(payload);
      }
      setCostModalOpen(false);
      loadData();
    } finally { setCostSaving(false); }
  };
  const setCo = (key: string, val: string) => setCostForm((f: any) => ({ ...f, [key]: val }));

  if (loading || !client) {
    return <div className="text-gray-400 p-8">Duke ngarkuar...</div>;
  }

  const totalRevenue = payments.reduce((sum, p) => sum + parseFloat(p.amount || 0), 0);
  const totalCosts = costs.reduce((sum, c) => sum + parseFloat(c.amount || 0), 0);
  const totalProfit = totalRevenue - totalCosts;

  const projectsData = projects.map((p: any) => {
    const pPayments = payments.filter((pay) => pay.project === p.id);
    const pCosts = costs.filter((c) => c.project === p.id);
    const pSituacions = situacions.filter((s) => s.project === p.id);
    const revenue = pPayments.reduce((sum: number, pay: any) => sum + parseFloat(pay.amount || 0), 0);
    const costTotal = pCosts.reduce((sum: number, c: any) => sum + parseFloat(c.amount || 0), 0);
    return { ...p, pPayments, pCosts, pSituacions, revenue, costTotal, profit: revenue - costTotal };
  });

  const inputCls = "w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#1a365d]";
  const actionBtnCls = "text-xs px-2.5 py-1 rounded-md transition-colors";

  return (
    <div className="space-y-6">
      {/* Back link */}
      <Link href="/dashboard/clients" className="text-sm text-[#1a365d] hover:underline">&larr; Te gjithe Klientet</Link>

      {/* Client header + edit */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">{client.name}</h1>
          {client.business_name && (
            <p className="text-sm text-[#d97706] font-medium mt-0.5">{client.business_name}</p>
          )}
        </div>
        <button onClick={openEditClient} className="px-4 py-2 bg-[#d97706]/10 text-[#d97706] text-sm rounded-lg hover:bg-[#d97706]/20 transition-colors font-medium flex-shrink-0">
          Ndrysho Klientin
        </button>
      </div>

      {/* Contact info */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
          <div>
            <span className="text-gray-400 text-xs uppercase tracking-wider">Telefoni</span>
            <p className="font-medium text-gray-800 mt-0.5">{client.phone}</p>
          </div>
          <div>
            <span className="text-gray-400 text-xs uppercase tracking-wider">Email</span>
            <p className="font-medium text-gray-800 mt-0.5">{client.email || '-'}</p>
          </div>
          <div>
            <span className="text-gray-400 text-xs uppercase tracking-wider">Qyteti</span>
            <p className="font-medium text-gray-800 mt-0.5">{client.city || '-'}</p>
          </div>
          <div>
            <span className="text-gray-400 text-xs uppercase tracking-wider">Adresa</span>
            <p className="font-medium text-gray-800 mt-0.5">{client.address || '-'}</p>
          </div>
        </div>
        {client.notes && (
          <div className="mt-4 pt-4 border-t border-gray-100">
            <span className="text-gray-400 text-xs uppercase tracking-wider">Shenime</span>
            <p className="text-sm text-gray-700 mt-0.5 whitespace-pre-wrap">{client.notes}</p>
          </div>
        )}
      </div>

      {/* Financial summary */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Projekte" value={projects.length} color="blue" />
        <StatCard label="Te Ardhurat" value={`${fmt(totalRevenue)} ALL`} color="green" />
        <StatCard label="Kostot" value={`${fmt(totalCosts)} ALL`} color="red" />
        <StatCard label="Fitimi" value={`${fmt(totalProfit)} ALL`} color={totalProfit >= 0 ? 'green' : 'red'} />
      </div>

      {/* Projects header + add button */}
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-800">Projektet</h2>
        <button onClick={openNewProject} className="px-4 py-2 bg-[#1a365d] text-white text-sm rounded-lg hover:bg-[#1a365d]/90 transition-colors">
          + Shto Projekt
        </button>
      </div>

      {projectsData.length === 0 ? (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 text-center text-gray-400 text-sm">
          Ky klient nuk ka projekte. Shto nje projekt te ri me butonin me siper.
        </div>
      ) : (
        projectsData.map((p: any) => {
          const isExpanded = expandedProjects.has(p.id);
          return (
            <div key={p.id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
              {/* Project header */}
              <div
                onClick={() => toggleProject(p.id)}
                className="px-5 py-4 border-b border-gray-100 flex items-center justify-between hover:bg-gray-50/50 transition-colors cursor-pointer select-none"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <svg className={`w-4 h-4 text-gray-400 transition-transform flex-shrink-0 ${isExpanded ? 'rotate-90' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                  <div className="min-w-0">
                    <h3 className="text-sm font-semibold text-[#1a365d] truncate">{p.name}</h3>
                    <p className="text-xs text-gray-400 mt-0.5">
                      {p.project_type === 'supply_work' ? 'Furnizim + Pune' : 'Vetem Pune'}
                      {p.city ? ` - ${p.city}` : ''}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3 flex-shrink-0">
                  {/* Quick financial summary in header */}
                  <span className="text-xs text-gray-400 hidden sm:inline">
                    {fmt(p.revenue)} / {fmt(p.costTotal)} ALL
                  </span>
                  <span className={`text-[10px] px-2.5 py-1 rounded-full font-semibold uppercase ${STATUS_COLORS[p.status] || ''}`}>
                    {STATUS_MAP[p.status] || p.status}
                  </span>
                </div>
              </div>

              {isExpanded && (
                <div className="p-5 space-y-4">
                  {/* Project action buttons */}
                  <div className="flex flex-wrap gap-2">
                    <button
                      onClick={() => router.push(`/dashboard/projects/${p.id}/`)}
                      className={`${actionBtnCls} bg-[#1a365d] text-white hover:bg-[#1a365d]/90`}
                    >
                      Hap Projektin
                    </button>
                    <button
                      onClick={(e) => { e.stopPropagation(); openEditProject(p); }}
                      className={`${actionBtnCls} bg-[#d97706]/10 text-[#d97706] hover:bg-[#d97706]/20 font-medium`}
                    >
                      Ndrysho
                    </button>
                    <button
                      onClick={() => openNewCost(p.id)}
                      className={`${actionBtnCls} bg-red-50 text-red-600 hover:bg-red-100 font-medium`}
                    >
                      + Shto Kosto
                    </button>
                  </div>

                  {/* Project financials */}
                  <div className="grid grid-cols-3 gap-3">
                    <div className="text-center p-3 bg-gray-50 rounded-lg">
                      <p className="text-[10px] text-gray-400 uppercase tracking-wider">Te Ardhurat</p>
                      <p className="text-sm font-bold text-emerald-600 mt-0.5">{fmt(p.revenue)} ALL</p>
                    </div>
                    <div className="text-center p-3 bg-gray-50 rounded-lg">
                      <p className="text-[10px] text-gray-400 uppercase tracking-wider">Kostot</p>
                      <p className="text-sm font-bold text-red-500 mt-0.5">{fmt(p.costTotal)} ALL</p>
                    </div>
                    <div className="text-center p-3 bg-gray-50 rounded-lg">
                      <p className="text-[10px] text-gray-400 uppercase tracking-wider">Fitimi</p>
                      <p className={`text-sm font-bold mt-0.5 ${p.profit >= 0 ? 'text-emerald-600' : 'text-red-500'}`}>{fmt(p.profit)} ALL</p>
                    </div>
                  </div>

                  {/* Situacions */}
                  {p.pSituacions.length > 0 && (
                    <div>
                      <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Situacione</h4>
                      <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                          <thead>
                            <tr className="bg-[#1a365d]/5">
                              <th className="px-3 py-2 text-left text-[10px] font-semibold text-gray-500 uppercase">Nr.</th>
                              <th className="px-3 py-2 text-left text-[10px] font-semibold text-gray-500 uppercase">Data</th>
                              <th className="px-3 py-2 text-right text-[10px] font-semibold text-gray-500 uppercase">Total</th>
                              <th className="px-3 py-2 text-left text-[10px] font-semibold text-gray-500 uppercase">Statusi</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-gray-50">
                            {p.pSituacions.map((s: any) => {
                              const sitTotal = (s.items || []).reduce((t: number, i: any) => t + (parseFloat(i.quantity || 0) * parseFloat(i.price || 0)), 0);
                              return (
                                <tr key={s.id} className="hover:bg-gray-50/50">
                                  <td className="px-3 py-2 text-gray-700">{s.situacion_number}</td>
                                  <td className="px-3 py-2 text-gray-700">{s.date}</td>
                                  <td className="px-3 py-2 text-right text-gray-700">{fmt(sitTotal)} ALL</td>
                                  <td className="px-3 py-2">
                                    {s.payment_status === 'paid' ? (
                                      <span className="text-[10px] px-2 py-0.5 bg-emerald-50 text-emerald-600 rounded-full font-medium">Paguar</span>
                                    ) : (
                                      <span className="text-[10px] px-2 py-0.5 bg-amber-50 text-amber-600 rounded-full font-medium">Ne pritje</span>
                                    )}
                                  </td>
                                </tr>
                              );
                            })}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  )}

                  {/* Payments */}
                  {p.pPayments.length > 0 && (
                    <div>
                      <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Pagesat</h4>
                      <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                          <thead>
                            <tr className="bg-[#1a365d]/5">
                              <th className="px-3 py-2 text-left text-[10px] font-semibold text-gray-500 uppercase">Data</th>
                              <th className="px-3 py-2 text-right text-[10px] font-semibold text-gray-500 uppercase">Shuma</th>
                              <th className="px-3 py-2 text-left text-[10px] font-semibold text-gray-500 uppercase">Shenime</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-gray-50">
                            {p.pPayments.map((pay: any) => (
                              <tr key={pay.id} className="hover:bg-gray-50/50">
                                <td className="px-3 py-2 text-gray-700">{pay.date}</td>
                                <td className="px-3 py-2 text-right text-gray-700">{fmt(parseFloat(pay.amount))} ALL</td>
                                <td className="px-3 py-2 text-gray-500">{pay.notes || '-'}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  )}

                  {/* Costs */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Kostot</h4>
                      {p.pCosts.length > 0 && (
                        <span className="text-xs text-red-500 font-semibold">{fmt(p.costTotal)} ALL</span>
                      )}
                    </div>
                    {p.pCosts.length > 0 ? (
                      <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                          <thead>
                            <tr className="bg-[#1a365d]/5">
                              <th className="px-3 py-2 text-left text-[10px] font-semibold text-gray-500 uppercase">Data</th>
                              <th className="px-3 py-2 text-left text-[10px] font-semibold text-gray-500 uppercase">Kategoria</th>
                              <th className="px-3 py-2 text-left text-[10px] font-semibold text-gray-500 uppercase">Pershkrimi</th>
                              <th className="px-3 py-2 text-right text-[10px] font-semibold text-gray-500 uppercase">Shuma</th>
                              <th className="px-3 py-2 text-left text-[10px] font-semibold text-gray-500 uppercase">Furnitori</th>
                              <th className="px-3 py-2 text-right text-[10px] font-semibold text-gray-500 uppercase">Veprime</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-gray-50">
                            {p.pCosts.map((c: any) => (
                              <tr key={c.id} className="hover:bg-gray-50/50">
                                <td className="px-3 py-2 text-gray-700">{c.date}</td>
                                <td className="px-3 py-2 text-gray-700">{CATEGORY_MAP[c.category] || c.category}</td>
                                <td className="px-3 py-2 text-gray-700">{c.description}</td>
                                <td className="px-3 py-2 text-right text-gray-700">{fmt(parseFloat(c.amount))} ALL</td>
                                <td className="px-3 py-2 text-gray-500">{c.supplier || '-'}</td>
                                <td className="px-3 py-2 text-right space-x-1">
                                  <button onClick={() => openEditCost(c)} className={`${actionBtnCls} bg-[#d97706]/10 text-[#d97706] hover:bg-[#d97706]/20 font-medium`}>Ndrysho</button>
                                  <button onClick={() => handleDeleteCost(c)} className={`${actionBtnCls} bg-red-50 text-red-500 hover:bg-red-100`}>Fshi</button>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    ) : (
                      <p className="text-xs text-gray-400">Nuk ka kosto per kete projekt.</p>
                    )}
                  </div>

                  {/* Empty state for situacions/payments */}
                  {p.pSituacions.length === 0 && p.pPayments.length === 0 && (
                    <p className="text-sm text-gray-400 text-center py-2">Nuk ka situacione ose pagesa. Perdor butonin &quot;Hap Projektin&quot; per te shtuar dokumente.</p>
                  )}
                </div>
              )}
            </div>
          );
        })
      )}

      {/* ===== MODALS ===== */}

      {/* Edit Client Modal */}
      <FormModal title="Ndrysho Klientin" open={editClientOpen} onClose={() => setEditClientOpen(false)} onSubmit={handleClientSubmit} loading={clientSaving}>
        <div className="grid grid-cols-2 gap-4">
          <div className="col-span-2 sm:col-span-1">
            <label className="block text-sm font-medium text-gray-700 mb-1">Emri *</label>
            <input value={clientForm.name || ''} onChange={(e) => setC('name', e.target.value)} required className={inputCls} />
          </div>
          <div className="col-span-2 sm:col-span-1">
            <label className="block text-sm font-medium text-gray-700 mb-1">Biznesi</label>
            <input value={clientForm.business_name || ''} onChange={(e) => setC('business_name', e.target.value)} className={inputCls} />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Telefoni *</label>
            <input value={clientForm.phone || ''} onChange={(e) => setC('phone', e.target.value)} required className={inputCls} />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input type="email" value={clientForm.email || ''} onChange={(e) => setC('email', e.target.value)} className={inputCls} />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Qyteti</label>
            <input value={clientForm.city || ''} onChange={(e) => setC('city', e.target.value)} className={inputCls} />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Adresa</label>
            <input value={clientForm.address || ''} onChange={(e) => setC('address', e.target.value)} className={inputCls} />
          </div>
          <div className="col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">Shenime</label>
            <textarea value={clientForm.notes || ''} onChange={(e) => setC('notes', e.target.value)} rows={2} className={inputCls} />
          </div>
        </div>
      </FormModal>

      {/* Project Modal (Add / Edit) */}
      <FormModal title={projectEditId ? 'Ndrysho Projektin' : 'Shto Projekt te Ri'} open={projectModalOpen} onClose={() => setProjectModalOpen(false)} onSubmit={handleProjectSubmit} loading={projectSaving}>
        <div className="grid grid-cols-2 gap-4">
          <div className="col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">Emri i Projektit *</label>
            <input value={projectForm.name} onChange={(e) => setP('name', e.target.value)} required className={inputCls} />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Lloji</label>
            <select value={projectForm.project_type} onChange={(e) => setP('project_type', e.target.value)} className={inputCls}>
              <option value="supply_work">Furnizim + Pune</option>
              <option value="work_only">Vetem Pune</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Statusi</label>
            <select value={projectForm.status} onChange={(e) => setP('status', e.target.value)} className={inputCls}>
              <option value="active">Aktiv</option>
              <option value="completed">Perfunduar</option>
              <option value="cancelled">Anulluar</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Qyteti</label>
            <input value={projectForm.city} onChange={(e) => setP('city', e.target.value)} className={inputCls} />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Data Fillimit</label>
            <input type="date" value={projectForm.start_date} onChange={(e) => setP('start_date', e.target.value)} className={inputCls} />
          </div>
          <div className="col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">Shenime</label>
            <textarea value={projectForm.notes} onChange={(e) => setP('notes', e.target.value)} rows={2} className={inputCls} />
          </div>
        </div>
      </FormModal>

      {/* Cost Modal (Add / Edit) */}
      <FormModal title={costEditId ? 'Ndrysho Koston' : 'Shto Kosto'} open={costModalOpen} onClose={() => setCostModalOpen(false)} onSubmit={handleCostSubmit} loading={costSaving}>
        <div className="grid grid-cols-2 gap-4">
          <div className="col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">Projekti</label>
            <select value={costForm.project} onChange={(e) => setCo('project', e.target.value)} className={inputCls}>
              <option value="">Kosto Kompanie (pa projekt)</option>
              {projects.map((pr) => (
                <option key={pr.id} value={pr.id}>{pr.name}</option>
              ))}
            </select>
          </div>
          <div className="col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">Pershkrimi *</label>
            <input value={costForm.description} onChange={(e) => setCo('description', e.target.value)} required className={inputCls} />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Kategoria</label>
            <select value={costForm.category} onChange={(e) => setCo('category', e.target.value)} className={inputCls}>
              {Object.entries(CATEGORY_MAP).map(([k, v]) => (
                <option key={k} value={k}>{v}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Shuma (ALL) *</label>
            <input type="number" step="0.01" min="0" value={costForm.amount} onChange={(e) => setCo('amount', e.target.value)} required className={inputCls} />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Data *</label>
            <input type="date" value={costForm.date} onChange={(e) => setCo('date', e.target.value)} required className={inputCls} />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Furnitori</label>
            <input value={costForm.supplier} onChange={(e) => setCo('supplier', e.target.value)} className={inputCls} />
          </div>
          <div className="col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">Shenime</label>
            <textarea value={costForm.notes} onChange={(e) => setCo('notes', e.target.value)} rows={2} className={inputCls} />
          </div>
        </div>
      </FormModal>
    </div>
  );
}
