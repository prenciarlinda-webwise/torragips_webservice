'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { projectsApi, clientsApi } from '@/lib/api';
import DataTable from '@/components/dashboard/DataTable';
import FormModal from '@/components/dashboard/FormModal';

const EMPTY = { client: '', name: '', project_type: 'supply_work', city: '', status: 'active', start_date: '', notes: '' };

export default function ProjectsPage() {
  const router = useRouter();
  const [data, setData] = useState<any[]>([]);
  const [clients, setClients] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [form, setForm] = useState<any>(EMPTY);
  const [editId, setEditId] = useState<number | null>(null);
  const [saving, setSaving] = useState(false);

  const load = () => {
    setLoading(true);
    Promise.all([
      projectsApi.list('page_size=100'),
      clientsApi.list('page_size=100'),
    ]).then(([p, c]) => {
      setData(p.results);
      setClients(c.results);
      setLoading(false);
    });
  };

  useEffect(() => { load(); }, []);

  const openNew = () => { setForm(EMPTY); setEditId(null); setModalOpen(true); };
  const openEdit = (item: any) => { setForm({ ...item }); setEditId(item.id); setModalOpen(true); };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const payload = { ...form, client: parseInt(form.client) };
      if (editId) {
        await projectsApi.update(editId, payload);
      } else {
        const created = await projectsApi.create(payload);
        router.push(`/dashboard/projects/${created.id}/`);
        return;
      }
      setModalOpen(false);
      load();
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (item: any) => {
    if (!confirm(`Fshi projektin "${item.name}"?`)) return;
    await projectsApi.delete(item.id);
    load();
  };

  const set = (key: string, val: string) => setForm((f: any) => ({ ...f, [key]: val }));

  const STATUS_MAP: Record<string, string> = { active: 'Aktiv', completed: 'Perfunduar', cancelled: 'Anulluar' };
  const STATUS_COLORS: Record<string, string> = {
    active: 'bg-green-50 text-green-600',
    completed: 'bg-blue-50 text-blue-600',
    cancelled: 'bg-gray-100 text-gray-500',
  };

  const columns = [
    { key: 'name', label: 'Emri' },
    { key: 'client_name', label: 'Klienti' },
    { key: 'project_type', label: 'Lloji', render: (p: any) => p.project_type === 'supply_work' ? 'Furnizim + Pune' : 'Vetem Pune' },
    { key: 'city', label: 'Qyteti' },
    {
      key: 'status', label: 'Statusi',
      render: (p: any) => (
        <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${STATUS_COLORS[p.status] || ''}`}>
          {STATUS_MAP[p.status] || p.status}
        </span>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-800">Projektet</h1>
        <button onClick={openNew} className="px-4 py-2 bg-[#1a365d] text-white text-sm rounded-lg hover:bg-[#1a365d]/90 transition-colors">
          + Shto Projekt
        </button>
      </div>

      <DataTable
        columns={columns}
        data={data}
        loading={loading}
        onRowClick={(item) => router.push(`/dashboard/projects/${item.id}/`)}
        onEdit={openEdit}
        onDelete={handleDelete}
      />

      <FormModal title={editId ? 'Ndrysho Projektin' : 'Shto Projekt te Ri'} open={modalOpen} onClose={() => setModalOpen(false)} onSubmit={handleSubmit} loading={saving}>
        <div className="grid grid-cols-2 gap-4">
          <div className="col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">Klienti *</label>
            <select value={form.client} onChange={(e) => set('client', e.target.value)} required className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#1a365d]">
              <option value="">Zgjidh klientin...</option>
              {clients.map((c) => (
                <option key={c.id} value={c.id}>{c.name} {c.business_name ? `(${c.business_name})` : ''}</option>
              ))}
            </select>
          </div>
          <div className="col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">Emri i Projektit *</label>
            <input value={form.name} onChange={(e) => set('name', e.target.value)} required className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#1a365d]" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Lloji</label>
            <select value={form.project_type} onChange={(e) => set('project_type', e.target.value)} className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#1a365d]">
              <option value="supply_work">Furnizim + Pune</option>
              <option value="work_only">Vetem Pune</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Statusi</label>
            <select value={form.status} onChange={(e) => set('status', e.target.value)} className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#1a365d]">
              <option value="active">Aktiv</option>
              <option value="completed">Perfunduar</option>
              <option value="cancelled">Anulluar</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Qyteti</label>
            <input value={form.city} onChange={(e) => set('city', e.target.value)} className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#1a365d]" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Data Fillimit</label>
            <input type="date" value={form.start_date || ''} onChange={(e) => set('start_date', e.target.value)} className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#1a365d]" />
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
