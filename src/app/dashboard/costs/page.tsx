'use client';

import { useEffect, useState } from 'react';
import { costsApi, projectsApi } from '@/lib/api';
import DataTable from '@/components/dashboard/DataTable';
import FormModal from '@/components/dashboard/FormModal';

const EMPTY = { project: '', category: 'materials', description: '', amount: '', date: '', supplier: '', notes: '' };
const CATEGORIES: Record<string, string> = {
  materials: 'Materiale', labor: 'Puntori', transport: 'Transport', equipment: 'Pajisje', other: 'Tjeter',
};

export default function CostsPage() {
  const [data, setData] = useState<any[]>([]);
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [form, setForm] = useState<any>(EMPTY);
  const [editId, setEditId] = useState<number | null>(null);
  const [saving, setSaving] = useState(false);

  const load = () => {
    setLoading(true);
    Promise.all([
      costsApi.list('page_size=200'),
      projectsApi.list('page_size=100'),
    ]).then(([c, p]) => {
      setData(c.results);
      setProjects(p.results);
      setLoading(false);
    });
  };

  useEffect(() => { load(); }, []);

  const openNew = () => {
    setForm({ ...EMPTY, date: new Date().toISOString().split('T')[0] });
    setEditId(null);
    setModalOpen(true);
  };
  const openEdit = (item: any) => { setForm({ ...item, project: item.project || '' }); setEditId(item.id); setModalOpen(true); };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const payload = {
        ...form,
        project: form.project ? parseInt(form.project) : null,
        amount: parseFloat(form.amount),
      };
      if (editId) {
        await costsApi.update(editId, payload);
      } else {
        await costsApi.create(payload);
      }
      setModalOpen(false);
      load();
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (item: any) => {
    if (!confirm(`Fshi koston "${item.description}"?`)) return;
    await costsApi.delete(item.id);
    load();
  };

  const set = (key: string, val: string) => setForm((f: any) => ({ ...f, [key]: val }));
  const getProjectName = (id: number | null) => {
    if (!id) return 'Kompania';
    return projects.find((p) => p.id === id)?.name || '-';
  };

  const totalCosts = data.reduce((s, c) => s + parseFloat(c.amount || 0), 0);

  const columns = [
    { key: 'description', label: 'Pershkrimi' },
    {
      key: 'project', label: 'Projekti / Kompania',
      render: (c: any) => c.project
        ? <span className="text-gray-700">{getProjectName(c.project)}</span>
        : <span className="text-xs px-2 py-0.5 bg-purple-50 text-purple-600 rounded-full font-medium">Kompania</span>,
    },
    { key: 'category', label: 'Kategoria', render: (c: any) => CATEGORIES[c.category] || c.category },
    { key: 'amount', label: 'Shuma', render: (c: any) => `${parseFloat(c.amount).toLocaleString('sq-AL')} ALL` },
    { key: 'date', label: 'Data' },
    { key: 'supplier', label: 'Furnitori' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Kostot</h1>
          <p className="text-sm text-gray-500 mt-1">
            Te gjitha kostot e projekteve dhe kompanise. Total: <span className="font-semibold text-red-600">{totalCosts.toLocaleString('sq-AL', { maximumFractionDigits: 0 })} ALL</span>
          </p>
        </div>
        <button onClick={openNew} className="px-4 py-2 bg-[#1a365d] text-white text-sm rounded-lg hover:bg-[#1a365d]/90 transition-colors">
          + Shto Kosto
        </button>
      </div>

      <DataTable columns={columns} data={data} loading={loading} onEdit={openEdit} onDelete={handleDelete} />

      <FormModal title={editId ? 'Ndrysho Koston' : 'Shto Kosto'} open={modalOpen} onClose={() => setModalOpen(false)} onSubmit={handleSubmit} loading={saving}>
        <div className="grid grid-cols-2 gap-4">
          <div className="col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">Projekti (opsional - bosh per kosto kompanie)</label>
            <select value={form.project} onChange={(e) => set('project', e.target.value)} className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#1a365d]">
              <option value="">Kosto Kompanie (pa projekt)</option>
              {projects.map((p) => (
                <option key={p.id} value={p.id}>{p.name}</option>
              ))}
            </select>
          </div>
          <div className="col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">Pershkrimi *</label>
            <input value={form.description} onChange={(e) => set('description', e.target.value)} required className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#1a365d]" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Kategoria</label>
            <select value={form.category} onChange={(e) => set('category', e.target.value)} className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#1a365d]">
              {Object.entries(CATEGORIES).map(([k, v]) => (
                <option key={k} value={k}>{v}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Shuma (ALL) *</label>
            <input type="number" step="0.01" value={form.amount} onChange={(e) => set('amount', e.target.value)} required className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#1a365d]" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Data *</label>
            <input type="date" value={form.date} onChange={(e) => set('date', e.target.value)} required className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#1a365d]" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Furnitori</label>
            <input value={form.supplier} onChange={(e) => set('supplier', e.target.value)} className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#1a365d]" />
          </div>
          <div className="col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">Shenime</label>
            <textarea value={form.notes} onChange={(e) => set('notes', e.target.value)} rows={2} className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#1a365d]" />
          </div>
        </div>
      </FormModal>
    </div>
  );
}
