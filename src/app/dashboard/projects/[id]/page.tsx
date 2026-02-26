'use client';

import { useEffect, useState, useCallback } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  projectsApi, servicesApi,
  listeCmimeshApi, listeCmimeshItemsApi,
  preventivApi, preventivItemsApi,
  situacionApi, situacionItemsApi,
  costsApi, paymentsApi,
} from '@/lib/api';
import FormModal from '@/components/dashboard/FormModal';

function fmt(n: number) {
  return n.toLocaleString('sq-AL', { maximumFractionDigits: 0 });
}

function openPrintPage(type: string, docId: number) {
  window.open(`/dashboard/print/${type}/${docId}/`, '_blank');
}

// ── Inline editable item rows ───────────────────────────────────

function ItemEditor({
  items,
  setItems,
  showQuantity,
  showRefPrice,
  services,
}: {
  items: any[];
  setItems: (items: any[]) => void;
  showQuantity: boolean;
  showRefPrice?: boolean;
  services?: any[];
}) {
  const update = (idx: number, key: string, val: any) => {
    const copy = [...items];
    copy[idx] = { ...copy[idx], [key]: val };
    setItems(copy);
  };
  const selectService = (idx: number, serviceName: string) => {
    const svc = services?.find((s: any) => s.name === serviceName);
    const copy = [...items];
    copy[idx] = {
      ...copy[idx],
      service_name: serviceName,
      unit: svc?.default_unit || copy[idx].unit,
      description: svc?.description || copy[idx].description,
    };
    setItems(copy);
  };
  const add = () => setItems([...items, { service_name: '', description: '', quantity: '', unit: 'm2', price: '', _refPrice: null, order: items.length }]);
  const remove = (idx: number) => setItems(items.filter((_, i) => i !== idx));

  const grandTotal = items.reduce((s, i) => {
    const p = parseFloat(i.price) || 0;
    const q = showQuantity ? (parseFloat(i.quantity) || 0) : 1;
    return s + p * q;
  }, 0);

  // For preventiv/situacion: 14 cols with ref price, 12 without. For liste-cmimesh: 10 cols.
  const hasRef = showQuantity && showRefPrice;
  const cols = hasRef ? 'grid-cols-[2.5fr_2fr_1fr_1fr_1fr_1.5fr_1.5fr_auto]' : showQuantity ? 'grid-cols-[3fr_2fr_1fr_1fr_2fr_2fr_auto]' : 'grid-cols-[3fr_3fr_1fr_2fr_auto]';

  return (
    <div className="space-y-2">
      <div className={`grid ${cols} gap-2 text-xs font-medium text-gray-500 uppercase tracking-wider px-1`}>
        <div>Sherbimi</div>
        <div>Pershkrimi</div>
        {showQuantity && <div className="text-right">Sasia</div>}
        <div className="text-center">Njesia</div>
        {hasRef && <div className="text-right">Ref. Cmim</div>}
        <div className="text-right">Cmimi</div>
        {showQuantity && <div className="text-right">Total</div>}
        <div className="w-6" />
      </div>
      {items.map((item, idx) => {
        const rowTotal = (parseFloat(item.quantity) || 0) * (parseFloat(item.price) || 0);
        return (
          <div key={idx} className={`grid ${cols} gap-2 items-center`}>
            <div>
              {services?.length ? (
                <>
                  <input list={`svc-list-${idx}`} value={item.service_name} onChange={(e) => selectService(idx, e.target.value)} placeholder="Zgjidh ose shkruaj..." className="w-full px-2 py-1.5 border border-gray-200 rounded text-sm focus:outline-none focus:border-[#1a365d]" />
                  <datalist id={`svc-list-${idx}`}>
                    {services.map((s: any) => <option key={s.id} value={s.name} />)}
                  </datalist>
                </>
              ) : (
                <input value={item.service_name} onChange={(e) => update(idx, 'service_name', e.target.value)} placeholder="Emri sherbimit" className="w-full px-2 py-1.5 border border-gray-200 rounded text-sm focus:outline-none focus:border-[#1a365d]" />
              )}
            </div>
            <div>
              <input value={item.description} onChange={(e) => update(idx, 'description', e.target.value)} placeholder="Pershkrimi" className="w-full px-2 py-1.5 border border-gray-200 rounded text-sm focus:outline-none focus:border-[#1a365d]" />
            </div>
            {showQuantity && (
              <div>
                <input type="number" step="0.01" value={item.quantity} onChange={(e) => update(idx, 'quantity', e.target.value)} className="w-full px-2 py-1.5 border border-gray-200 rounded text-sm text-right focus:outline-none focus:border-[#1a365d]" />
              </div>
            )}
            <div>
              <select value={item.unit} onChange={(e) => update(idx, 'unit', e.target.value)} className="w-full px-1 py-1.5 border border-gray-200 rounded text-sm focus:outline-none focus:border-[#1a365d]">
                <option value="m2">m2</option>
                <option value="ml">ml</option>
                <option value="cope">cope</option>
              </select>
            </div>
            {hasRef && (
              <div className="text-right text-xs text-gray-400 pr-1 tabular-nums">
                {item._refPrice != null ? `${fmt(item._refPrice)}` : '-'}
              </div>
            )}
            <div>
              <input type="number" step="0.01" value={item.price} onChange={(e) => update(idx, 'price', e.target.value)} placeholder="0" className="w-full px-2 py-1.5 border border-gray-200 rounded text-sm text-right focus:outline-none focus:border-[#1a365d]" />
            </div>
            {showQuantity && (
              <div className="text-right text-sm font-medium text-gray-700 pr-1">
                {fmt(rowTotal)} ALL
              </div>
            )}
            <div className="text-center w-6">
              <button type="button" onClick={() => remove(idx)} className="text-red-400 hover:text-red-600 text-lg leading-none">&times;</button>
            </div>
          </div>
        );
      })}
      <div className="flex items-center justify-between pt-2">
        <button type="button" onClick={add} className="text-xs text-blue-600 hover:text-blue-800 font-medium">+ Shto rresht</button>
        {showQuantity && (
          <div className="text-sm font-bold text-[#1a365d]">Total: {fmt(grandTotal)} ALL</div>
        )}
      </div>
    </div>
  );
}

// ── Document section (ListeCmimesh / Preventiv / Situacion) ─────

function DocumentSection({
  title,
  type,
  projectId,
  documents,
  onReload,
  refItems,
  services,
}: {
  title: string;
  type: 'liste-cmimesh' | 'preventiv' | 'situacion';
  projectId: number;
  documents: any[];
  onReload: () => void;
  refItems?: any[];
  services?: any[];
}) {
  const [modalOpen, setModalOpen] = useState(false);
  const [editId, setEditId] = useState<number | null>(null);
  const [saving, setSaving] = useState(false);
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [city, setCity] = useState('');
  const [docNumber, setDocNumber] = useState('1');
  const [paymentStatus, setPaymentStatus] = useState('pending');
  const [paidDate, setPaidDate] = useState('');
  const [items, setItems] = useState<any[]>([{ service_name: '', description: '', quantity: '', unit: 'm2', price: '', _refPrice: null, order: 0 }]);

  const api = type === 'liste-cmimesh' ? listeCmimeshApi : type === 'preventiv' ? preventivApi : situacionApi;
  const itemsApi = type === 'liste-cmimesh' ? listeCmimeshItemsApi : type === 'preventiv' ? preventivItemsApi : situacionItemsApi;
  const parentKey = type === 'liste-cmimesh' ? 'liste_cmimesh' : type;
  const isOneToOne = type === 'liste-cmimesh' || type === 'preventiv';
  const showQuantity = type !== 'liste-cmimesh';
  const pdfType = type === 'liste-cmimesh' ? 'liste-cmimesh' : type;

  // Build pre-populated items from reference source (Liste Cmimesh for Preventiv, Preventiv for Situacion)
  const buildItemsFromRef = () => {
    if (!refItems?.length) return [{ service_name: '', description: '', quantity: '', unit: 'm2', price: '', _refPrice: null, order: 0 }];
    return refItems.map((ri: any, idx: number) => ({
      service_name: ri.service_name,
      description: ri.description || '',
      quantity: '',
      unit: ri.unit || 'm2',
      price: String(ri.price || ''),
      _refPrice: parseFloat(ri.price) || null,
      order: idx,
    }));
  };

  // Build ref-price lookup from reference items
  const refPriceMap: Record<string, number> = {};
  if (refItems?.length) {
    for (const ri of refItems) {
      refPriceMap[ri.service_name] = parseFloat(ri.price) || 0;
    }
  }

  const openNew = () => {
    setEditId(null);
    setDate(new Date().toISOString().split('T')[0]);
    setCity('');
    setDocNumber(String((documents.length || 0) + 1));
    setPaymentStatus('pending');
    setPaidDate('');
    // Pre-populate from reference items (Liste Cmimesh → Preventiv, Preventiv → Situacion)
    if (showQuantity) {
      setItems(buildItemsFromRef());
    } else {
      setItems([{ service_name: '', description: '', quantity: '', unit: 'm2', price: '', _refPrice: null, order: 0 }]);
    }
    setModalOpen(true);
  };

  const openEdit = (doc: any) => {
    setEditId(doc.id);
    setDate(doc.date);
    setCity(doc.city || '');
    if (type === 'preventiv') setDocNumber(String(doc.preventiv_number));
    if (type === 'situacion') {
      setDocNumber(String(doc.situacion_number));
      setPaymentStatus(doc.payment_status);
      setPaidDate(doc.paid_date || '');
    }
    // Attach reference prices from Liste Cmimesh when editing
    const editItems = doc.items?.length
      ? doc.items.map((i: any) => ({ ...i, _refPrice: refPriceMap[i.service_name] ?? null }))
      : [{ service_name: '', description: '', quantity: '', unit: 'm2', price: '', _refPrice: null, order: 0 }];
    setItems(editItems);
    setModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      let docData: any = { project: projectId, date, city };
      if (type === 'preventiv') docData.preventiv_number = parseInt(docNumber);
      if (type === 'situacion') {
        docData.situacion_number = parseInt(docNumber);
        docData.payment_status = paymentStatus;
        docData.paid_date = paidDate || null;
      }

      let docId: number;
      if (editId) {
        await api.update(editId, docData);
        docId = editId;
        // Delete old items
        const existing = documents.find((d) => d.id === editId);
        if (existing?.items) {
          for (const item of existing.items) {
            await itemsApi.delete(item.id);
          }
        }
      } else {
        const created = await api.create(docData);
        docId = created.id;
      }

      // Create items
      for (let i = 0; i < items.length; i++) {
        const item = items[i];
        if (!item.service_name) continue;
        await itemsApi.create({
          [parentKey]: docId,
          service_name: item.service_name,
          description: item.description || '',
          quantity: parseFloat(item.quantity) || 0,
          unit: item.unit || 'm2',
          price: parseFloat(item.price) || 0,
          order: i,
        });
      }

      setModalOpen(false);
      onReload();
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (doc: any) => {
    if (!confirm('Fshi kete dokument?')) return;
    await api.delete(doc.id);
    onReload();
  };

  const canCreate = isOneToOne ? documents.length === 0 : true;

  const computeTotal = (doc: any) => {
    if (!doc.items?.length) return 0;
    if (type === 'liste-cmimesh') return doc.items.reduce((s: number, i: any) => s + parseFloat(i.price || 0), 0);
    return doc.items.reduce((s: number, i: any) => s + (parseFloat(i.quantity || 0) * parseFloat(i.price || 0)), 0);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-semibold text-gray-600 uppercase tracking-wider">{title}</h3>
        {canCreate && (
          <button onClick={openNew} className="text-xs px-3 py-1.5 bg-[#1a365d] text-white rounded-md hover:bg-[#1a365d]/90 transition-colors">
            + Krijo
          </button>
        )}
      </div>

      {documents.length === 0 ? (
        <div className="text-sm text-gray-400 py-4">Nuk ka {title.toLowerCase()} te krijuar.</div>
      ) : (
        <div className="space-y-3">
          {documents.map((doc) => (
            <div key={doc.id} className="bg-gray-50 rounded-lg overflow-hidden">
              <div className="px-4 py-3 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-sm font-medium text-gray-800">
                    {type === 'preventiv' && `#${doc.preventiv_number} - `}
                    {type === 'situacion' && `Nr. ${doc.situacion_number} - `}
                    {doc.date}
                  </span>
                  {type === 'situacion' && (
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                      doc.payment_status === 'paid' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                    }`}>
                      {doc.payment_status === 'paid' ? 'Paguar' : 'Ne pritje'}
                    </span>
                  )}
                  <span className="text-sm font-bold text-[#1a365d]">{fmt(computeTotal(doc))} ALL</span>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => openPrintPage(pdfType, doc.id)} className="text-xs px-2.5 py-1 bg-emerald-50 text-emerald-600 rounded hover:bg-emerald-100">PDF</button>
                  <button onClick={() => openEdit(doc)} className="text-xs px-2.5 py-1 bg-blue-50 text-blue-600 rounded hover:bg-blue-100">Ndrysho</button>
                  <button onClick={() => handleDelete(doc)} className="text-xs px-2.5 py-1 bg-red-50 text-red-600 rounded hover:bg-red-100">Fshi</button>
                </div>
              </div>
              {doc.items?.length > 0 && (
                <table className="w-full text-xs">
                  <thead>
                    <tr className="bg-gray-100/50 text-gray-500 uppercase">
                      <th className="px-4 py-1.5 text-left w-8">#</th>
                      <th className="px-2 py-1.5 text-left">Sherbimi</th>
                      <th className="px-2 py-1.5 text-left">Pershkrimi</th>
                      {showQuantity && <th className="px-2 py-1.5 text-right">Sasia</th>}
                      <th className="px-2 py-1.5 text-center">Njesia</th>
                      <th className="px-2 py-1.5 text-right">Cmimi</th>
                      {showQuantity && <th className="px-2 py-1.5 text-right">Total</th>}
                    </tr>
                  </thead>
                  <tbody>
                    {doc.items.map((item: any, idx: number) => (
                      <tr key={item.id || idx} className="border-t border-gray-100">
                        <td className="px-4 py-1.5 text-gray-400">{idx + 1}</td>
                        <td className="px-2 py-1.5 font-medium text-gray-700">{item.service_name}</td>
                        <td className="px-2 py-1.5 text-gray-500">{item.description}</td>
                        {showQuantity && <td className="px-2 py-1.5 text-right">{item.quantity}</td>}
                        <td className="px-2 py-1.5 text-center">{item.unit}</td>
                        <td className="px-2 py-1.5 text-right">{fmt(parseFloat(item.price))}</td>
                        {showQuantity && <td className="px-2 py-1.5 text-right font-medium">{fmt(parseFloat(item.quantity) * parseFloat(item.price))}</td>}
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          ))}
        </div>
      )}

      <FormModal
        title={`${editId ? 'Ndrysho' : 'Krijo'} ${title}`}
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onSubmit={handleSubmit}
        loading={saving}
        wide={showQuantity}
      >
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">Data *</label>
              <input type="date" value={date} onChange={(e) => setDate(e.target.value)} required className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#1a365d]" />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">Qyteti</label>
              <input value={city} onChange={(e) => setCity(e.target.value)} className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#1a365d]" />
            </div>
            {(type === 'preventiv' || type === 'situacion') && (
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Numri</label>
                <input type="number" value={docNumber} onChange={(e) => setDocNumber(e.target.value)} className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#1a365d]" />
              </div>
            )}
            {type === 'situacion' && (
              <>
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">Statusi Pageses</label>
                  <select value={paymentStatus} onChange={(e) => setPaymentStatus(e.target.value)} className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#1a365d]">
                    <option value="pending">Ne pritje</option>
                    <option value="paid">Paguar</option>
                  </select>
                </div>
                {paymentStatus === 'paid' && (
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">Data Pageses</label>
                    <input type="date" value={paidDate} onChange={(e) => setPaidDate(e.target.value)} className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#1a365d]" />
                  </div>
                )}
              </>
            )}
          </div>
          <ItemEditor items={items} setItems={setItems} showQuantity={showQuantity} showRefPrice={showQuantity && (refItems?.length ?? 0) > 0} services={services} />
        </div>
      </FormModal>
    </div>
  );
}

// ── Costs section ───────────────────────────────────────────────

function CostsSection({ projectId, costs, onReload }: { projectId: number; costs: any[]; onReload: () => void }) {
  const [modalOpen, setModalOpen] = useState(false);
  const [editId, setEditId] = useState<number | null>(null);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({ category: 'materials', description: '', amount: '', date: '', supplier: '', notes: '' });

  const CATEGORIES: Record<string, string> = {
    materials: 'Materiale', labor: 'Puntori', transport: 'Transport', equipment: 'Pajisje', other: 'Tjeter',
  };

  const openNew = () => {
    setForm({ category: 'materials', description: '', amount: '', date: new Date().toISOString().split('T')[0], supplier: '', notes: '' });
    setEditId(null);
    setModalOpen(true);
  };
  const openEdit = (c: any) => { setForm({ ...c }); setEditId(c.id); setModalOpen(true); };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const payload = { ...form, project: projectId, amount: parseFloat(form.amount) };
      if (editId) await costsApi.update(editId, payload);
      else await costsApi.create(payload);
      setModalOpen(false);
      onReload();
    } finally { setSaving(false); }
  };

  const handleDelete = async (c: any) => {
    if (!confirm('Fshi koston?')) return;
    await costsApi.delete(c.id);
    onReload();
  };

  const set = (key: string, val: string) => setForm((f) => ({ ...f, [key]: val }));
  const total = costs.reduce((s, c) => s + parseFloat(c.amount || 0), 0);

  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-3">
          <h3 className="text-sm font-semibold text-gray-600 uppercase tracking-wider">Kostot</h3>
          <span className="text-sm font-bold text-red-600">{fmt(total)} ALL</span>
        </div>
        <button onClick={openNew} className="text-xs px-3 py-1.5 bg-[#1a365d] text-white rounded-md hover:bg-[#1a365d]/90 transition-colors">
          + Shto
        </button>
      </div>
      {costs.length === 0 ? (
        <div className="text-sm text-gray-400 py-4">Nuk ka kosto.</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="bg-gray-50 text-gray-500 uppercase">
                <th className="px-3 py-2 text-left">Pershkrimi</th>
                <th className="px-3 py-2 text-left">Kategoria</th>
                <th className="px-3 py-2 text-right">Shuma</th>
                <th className="px-3 py-2 text-left">Data</th>
                <th className="px-3 py-2 text-left">Furnitori</th>
                <th className="px-3 py-2 text-right">Veprime</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {costs.map((c) => (
                <tr key={c.id}>
                  <td className="px-3 py-2 font-medium text-gray-700">{c.description}</td>
                  <td className="px-3 py-2 text-gray-500">{CATEGORIES[c.category] || c.category}</td>
                  <td className="px-3 py-2 text-right font-medium">{fmt(parseFloat(c.amount))} ALL</td>
                  <td className="px-3 py-2 text-gray-500">{c.date}</td>
                  <td className="px-3 py-2 text-gray-500">{c.supplier}</td>
                  <td className="px-3 py-2 text-right space-x-1">
                    <button onClick={() => openEdit(c)} className="px-2 py-0.5 bg-blue-50 text-blue-600 rounded hover:bg-blue-100">Ndrysho</button>
                    <button onClick={() => handleDelete(c)} className="px-2 py-0.5 bg-red-50 text-red-600 rounded hover:bg-red-100">Fshi</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <FormModal title={editId ? 'Ndrysho Koston' : 'Shto Kosto'} open={modalOpen} onClose={() => setModalOpen(false)} onSubmit={handleSubmit} loading={saving}>
        <div className="grid grid-cols-2 gap-4">
          <div className="col-span-2">
            <label className="block text-xs font-medium text-gray-700 mb-1">Pershkrimi *</label>
            <input value={form.description} onChange={(e) => set('description', e.target.value)} required className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#1a365d]" />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">Kategoria</label>
            <select value={form.category} onChange={(e) => set('category', e.target.value)} className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#1a365d]">
              {Object.entries(CATEGORIES).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">Shuma (ALL) *</label>
            <input type="number" step="0.01" value={form.amount} onChange={(e) => set('amount', e.target.value)} required className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#1a365d]" />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">Data *</label>
            <input type="date" value={form.date} onChange={(e) => set('date', e.target.value)} required className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#1a365d]" />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">Furnitori</label>
            <input value={form.supplier} onChange={(e) => set('supplier', e.target.value)} className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#1a365d]" />
          </div>
        </div>
      </FormModal>
    </div>
  );
}

// ── Main Project Detail Page ────────────────────────────────────

type Tab = 'liste-cmimesh' | 'preventiv' | 'situacion' | 'costs';

export default function ProjectDetailPage() {
  const params = useParams();
  const router = useRouter();
  const projectId = Number(params.id);

  const [project, setProject] = useState<any>(null);
  const [services, setServices] = useState<any[]>([]);
  const [listeCmimesh, setListeCmimesh] = useState<any[]>([]);
  const [preventiv, setPreventiv] = useState<any[]>([]);
  const [situacions, setSituacions] = useState<any[]>([]);
  const [costs, setCosts] = useState<any[]>([]);
  const [payments, setPayments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState<Tab>('liste-cmimesh');

  // Load services once
  useEffect(() => {
    servicesApi.list('page_size=200&is_active=true').then((r) => setServices(r.results));
  }, []);

  const load = useCallback(() => {
    setLoading(true);
    Promise.all([
      projectsApi.get(projectId),
      listeCmimeshApi.list(`project=${projectId}&page_size=10`),
      preventivApi.list(`project=${projectId}&page_size=10`),
      situacionApi.list(`project=${projectId}&page_size=50`),
      costsApi.list(`project=${projectId}&page_size=200`),
      paymentsApi.list(`project=${projectId}&page_size=200`),
    ]).then(([p, lc, prev, sit, c, pay]) => {
      setProject(p);
      setListeCmimesh(lc.results);
      setPreventiv(prev.results);
      setSituacions(sit.results);
      setCosts(c.results);
      setPayments(pay.results);
      setLoading(false);
    });
  }, [projectId]);

  useEffect(() => { load(); }, [load]);

  if (loading || !project) {
    return <div className="text-gray-400 p-8">Duke ngarkuar...</div>;
  }

  const totalRevenue = payments.reduce((s, p) => s + parseFloat(p.amount || 0), 0);
  const totalCosts = costs.reduce((s, c) => s + parseFloat(c.amount || 0), 0);
  const profit = totalRevenue - totalCosts;

  const STATUS_MAP: Record<string, string> = { active: 'Aktiv', completed: 'Perfunduar', cancelled: 'Anulluar' };
  const STATUS_COLORS: Record<string, string> = {
    active: 'bg-green-50 text-green-700',
    completed: 'bg-blue-50 text-blue-700',
    cancelled: 'bg-gray-100 text-gray-600',
  };

  const TAB_CONFIG: { key: Tab; label: string }[] = [
    { key: 'liste-cmimesh', label: 'Liste Cmimesh' },
    { key: 'preventiv', label: 'Preventiv' },
    { key: 'situacion', label: 'Situacione' },
    { key: 'costs', label: 'Kostot' },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <Link href="/dashboard/projects" className="text-gray-400 hover:text-gray-600 text-sm">&larr; Projektet</Link>
      </div>

      {/* Project Info */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">{project.name}</h1>
            <p className="text-sm text-gray-500 mt-1">
              {project.client_name}
              {project.city && ` - ${project.city}`}
              {project.start_date && ` | Fillimi: ${project.start_date}`}
            </p>
          </div>
          <span className={`text-xs px-3 py-1.5 rounded-full font-medium ${STATUS_COLORS[project.status] || ''}`}>
            {STATUS_MAP[project.status] || project.status}
          </span>
        </div>

        {/* Financial summary */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6 pt-4 border-t border-gray-100">
          <div>
            <p className="text-xs text-gray-500 uppercase tracking-wider">Te Ardhurat</p>
            <p className="text-lg font-bold text-emerald-600">{fmt(totalRevenue)} ALL</p>
          </div>
          <div>
            <p className="text-xs text-gray-500 uppercase tracking-wider">Kostot</p>
            <p className="text-lg font-bold text-red-600">{fmt(totalCosts)} ALL</p>
          </div>
          <div>
            <p className="text-xs text-gray-500 uppercase tracking-wider">Fitimi</p>
            <p className={`text-lg font-bold ${profit >= 0 ? 'text-emerald-600' : 'text-red-600'}`}>{fmt(profit)} ALL</p>
          </div>
          <div>
            <p className="text-xs text-gray-500 uppercase tracking-wider">Situacione Paguar</p>
            <p className="text-lg font-bold text-gray-700">
              {situacions.filter((s) => s.payment_status === 'paid').length} / {situacions.length}
            </p>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 bg-gray-100 p-1 rounded-lg w-fit">
        {TAB_CONFIG.map((t) => (
          <button
            key={t.key}
            onClick={() => setTab(t.key)}
            className={`px-4 py-2 text-sm rounded-md transition-colors ${
              tab === t.key ? 'bg-white text-gray-800 shadow-sm font-medium' : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            {t.label}
            {t.key === 'costs' && costs.length > 0 && (
              <span className="ml-1.5 text-xs bg-gray-200 text-gray-600 px-1.5 py-0.5 rounded-full">{costs.length}</span>
            )}
            {t.key === 'situacion' && situacions.length > 0 && (
              <span className="ml-1.5 text-xs bg-gray-200 text-gray-600 px-1.5 py-0.5 rounded-full">{situacions.length}</span>
            )}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        {tab === 'liste-cmimesh' && (
          <DocumentSection title="Liste Cmimesh" type="liste-cmimesh" projectId={projectId} documents={listeCmimesh} onReload={load} services={services} />
        )}
        {tab === 'preventiv' && (
          <DocumentSection title="Preventiv" type="preventiv" projectId={projectId} documents={preventiv} onReload={load} refItems={listeCmimesh[0]?.items || []} services={services} />
        )}
        {tab === 'situacion' && (
          <DocumentSection title="Situacion" type="situacion" projectId={projectId} documents={situacions} onReload={load} refItems={preventiv[0]?.items || []} services={services} />
        )}
        {tab === 'costs' && (
          <CostsSection projectId={projectId} costs={costs} onReload={load} />
        )}
      </div>
    </div>
  );
}
