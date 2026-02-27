'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { clientsApi } from '@/lib/api';
import DataTable from '@/components/dashboard/DataTable';
import FormModal from '@/components/dashboard/FormModal';

const EMPTY = { name: '', business_name: '', phone: '', email: '', city: '', address: '', notes: '' };

export default function ClientsPage() {
  const router = useRouter();
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [form, setForm] = useState<any>(EMPTY);
  const [editId, setEditId] = useState<number | null>(null);
  const [saving, setSaving] = useState(false);

  const load = () => {
    setLoading(true);
    clientsApi.list('page_size=100').then((r) => { setData(r.results); setLoading(false); });
  };

  useEffect(() => { load(); }, []);

  const openNew = () => { setForm(EMPTY); setEditId(null); setModalOpen(true); };
  const openEdit = (item: any) => { setForm({ ...item }); setEditId(item.id); setModalOpen(true); };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      if (editId) {
        await clientsApi.update(editId, form);
      } else {
        await clientsApi.create(form);
      }
      setModalOpen(false);
      load();
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (item: any) => {
    if (!confirm(`Fshi klientin "${item.name}"?`)) return;
    await clientsApi.delete(item.id);
    load();
  };

  const set = (key: string, val: string) => setForm((f: any) => ({ ...f, [key]: val }));

  const columns = [
    { key: 'name', label: 'Emri' },
    { key: 'business_name', label: 'Biznesi' },
    { key: 'phone', label: 'Telefoni' },
    { key: 'email', label: 'Email' },
    { key: 'city', label: 'Qyteti' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-800">Klientet</h1>
        <button onClick={openNew} className="px-4 py-2 bg-[#1a365d] text-white text-sm rounded-lg hover:bg-[#1a365d]/90 transition-colors">
          + Shto Klient
        </button>
      </div>

      <DataTable columns={columns} data={data} loading={loading} onRowClick={(item) => router.push(`/dashboard/clients/${item.id}/`)} onEdit={openEdit} onDelete={handleDelete} />

      <FormModal title={editId ? 'Ndrysho Klientin' : 'Shto Klient'} open={modalOpen} onClose={() => setModalOpen(false)} onSubmit={handleSubmit} loading={saving}>
        <div className="grid grid-cols-2 gap-4">
          <div className="col-span-2 sm:col-span-1">
            <label className="block text-sm font-medium text-gray-700 mb-1">Emri *</label>
            <input value={form.name} onChange={(e) => set('name', e.target.value)} required className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#1a365d]" />
          </div>
          <div className="col-span-2 sm:col-span-1">
            <label className="block text-sm font-medium text-gray-700 mb-1">Biznesi</label>
            <input value={form.business_name} onChange={(e) => set('business_name', e.target.value)} className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#1a365d]" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Telefoni *</label>
            <input value={form.phone} onChange={(e) => set('phone', e.target.value)} required className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#1a365d]" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input type="email" value={form.email} onChange={(e) => set('email', e.target.value)} className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#1a365d]" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Qyteti</label>
            <input value={form.city} onChange={(e) => set('city', e.target.value)} className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#1a365d]" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Adresa</label>
            <input value={form.address} onChange={(e) => set('address', e.target.value)} className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#1a365d]" />
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
