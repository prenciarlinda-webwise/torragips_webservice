'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { listeCmimeshApi, preventivApi, situacionApi } from '@/lib/api';

function fmt(n: number) {
  return n.toLocaleString('sq-AL', { maximumFractionDigits: 0 });
}

const TYPE_LABELS: Record<string, string> = {
  supply_work: 'Furnizim + Pune',
  work_only: 'Vetem Pune',
};

export default function PrintPage() {
  const params = useParams();
  const type = params.type as string;
  const id = Number(params.id);
  const [doc, setDoc] = useState<any>(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const api = type === 'liste-cmimesh' ? listeCmimeshApi : type === 'preventiv' ? preventivApi : situacionApi;
    api.get(id)
      .then((d) => {
        setDoc(d);
        // Set page title → becomes the default PDF filename
        const p = d.project_detail || {};
        const label = type === 'preventiv' ? 'Preventiv' : type === 'situacion' ? 'Situacion' : 'Liste Cmimesh';
        const nr = type === 'preventiv' ? d.preventiv_number : type === 'situacion' ? d.situacion_number : 1;
        document.title = `#${nr} - ${p.client_name || 'Klient'} - ${p.name || 'Projekt'} - ${label}`;
        setTimeout(() => window.print(), 600);
      })
      .catch(() => setError('Dokumenti nuk u gjet.'));
  }, [type, id]);

  if (error) return <div style={{ padding: 40, color: 'red', fontFamily: 'Inter, Helvetica, sans-serif' }}>{error}</div>;
  if (!doc) return <div style={{ padding: 40, color: '#999', fontFamily: 'Inter, Helvetica, sans-serif' }}>Duke ngarkuar...</div>;

  const isListe = type === 'liste-cmimesh';
  const showQuantity = !isListe;
  const items = doc.items || [];
  const proj = doc.project_detail || {};

  const docTitle = type === 'preventiv'
    ? `PREVENTIV #${doc.preventiv_number}`
    : type === 'situacion'
    ? `SITUACION Nr. ${doc.situacion_number}`
    : 'LISTE CMIMESH';

  // Build filename: #Nr - Client - Project - DocType
  const docLabel = type === 'preventiv'
    ? `Preventiv`
    : type === 'situacion'
    ? `Situacion`
    : `Liste Cmimesh`;
  const docNr = type === 'preventiv'
    ? doc.preventiv_number
    : type === 'situacion'
    ? doc.situacion_number
    : 1;
  const fileName = `#${docNr} - ${proj.client_name || 'Klient'} - ${proj.name || 'Projekt'} - ${docLabel}`;

  const grandTotal = showQuantity
    ? items.reduce((s: number, i: any) => s + (parseFloat(i.quantity || 0) * parseFloat(i.price || 0)), 0)
    : items.reduce((s: number, i: any) => s + parseFloat(i.price || 0), 0);

  const dateFormatted = doc.date
    ? new Date(doc.date).toLocaleDateString('sq-AL', { day: '2-digit', month: '2-digit', year: 'numeric' })
    : '-';

  return (
    <>
      <style jsx global>{`
        @page {
          size: A4;
          margin: 0;
        }
        @media print {
          html, body { margin: 0; padding: 0; }
          body { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
          .no-print { display: none !important; }
          .page { padding: 15mm 18mm; }
        }
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body {
          font-family: 'Inter', 'Helvetica Neue', Helvetica, Arial, sans-serif;
          font-size: 9.5pt;
          color: #1f2937;
          line-height: 1.5;
          background: #f3f4f6;
        }
        .page {
          max-width: 210mm;
          margin: 0 auto;
          background: white;
          padding: 0;
        }
        @media screen {
          .page {
            margin: 20px auto;
            box-shadow: 0 4px 24px rgba(0,0,0,0.12);
            min-height: 297mm;
          }
        }

        /* ── Header ── */
        .header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          padding: 24px 32px 18px;
          border-bottom: 3px solid #1a365d;
          position: relative;
        }
        .header::after {
          content: '';
          position: absolute;
          bottom: -6px;
          left: 0;
          right: 0;
          height: 2px;
          background: #d97706;
        }
        .header-left {
          display: flex;
          align-items: center;
          gap: 14px;
        }
        .logo-img {
          width: 52px;
          height: 52px;
          object-fit: contain;
        }
        .brand-text h1 {
          font-size: 18pt;
          font-weight: 800;
          color: #1a365d;
          letter-spacing: 3px;
          line-height: 1;
        }
        .brand-text .tagline {
          font-size: 7pt;
          color: #6b7280;
          margin-top: 3px;
          letter-spacing: 0.3px;
        }
        .header-right {
          text-align: right;
          font-size: 7.5pt;
          color: #4b5563;
          line-height: 1.8;
        }
        .header-right .city {
          font-weight: 600;
          color: #1a365d;
          font-size: 8pt;
        }
        .header-right .nipt {
          font-size: 7pt;
          color: #9ca3af;
        }

        /* ── Document title bar ── */
        .doc-bar {
          background: #1a365d;
          color: white;
          padding: 10px 32px;
          margin-top: 20px;
        }
        .doc-bar h2 {
          font-size: 12pt;
          font-weight: 700;
          letter-spacing: 2px;
          color: white;
        }

        /* ── Meta info ── */
        .meta {
          padding: 16px 32px;
          border-bottom: 1px solid #e5e7eb;
        }
        .meta-row {
          display: flex;
          gap: 6px;
          padding: 3px 0;
          font-size: 9pt;
        }
        .meta-row .label {
          color: #6b7280;
          min-width: 80px;
          flex-shrink: 0;
        }
        .meta-row .value {
          font-weight: 600;
          color: #1f2937;
        }

        /* ── Table ── */
        .items-wrapper {
          padding: 16px 32px 24px;
        }
        table.items {
          width: 100%;
          border-collapse: collapse;
        }
        table.items thead th {
          background-color: #1a365d;
          color: white;
          padding: 8px 10px;
          font-size: 7.5pt;
          text-transform: uppercase;
          letter-spacing: 0.8px;
          font-weight: 600;
          border: none;
        }
        table.items thead th:first-child {
          border-left: 3px solid #d97706;
        }
        table.items tbody td {
          padding: 7px 10px;
          font-size: 9pt;
          border-bottom: 1px solid #e5e7eb;
          color: #374151;
        }
        table.items tbody tr:nth-child(even) {
          background-color: #f9fafb;
        }
        table.items tbody td:first-child {
          border-left: 3px solid transparent;
        }
        table.items tfoot td {
          padding: 10px 10px;
          font-weight: 700;
          font-size: 10.5pt;
          border-top: 2px solid #1a365d;
          color: #1a365d;
        }
        .text-right { text-align: right; }
        .text-center { text-align: center; }
        .text-muted { color: #9ca3af; }
        .num { font-variant-numeric: tabular-nums; }

        /* ── Footer ── */
        .footer {
          padding: 14px 32px;
          margin-top: 24px;
          border-top: 2px solid #1a365d;
          position: relative;
          text-align: center;
          font-size: 7pt;
          color: #9ca3af;
        }
        .footer::before {
          content: '';
          position: absolute;
          top: -4px;
          left: 0;
          right: 0;
          height: 1.5px;
          background: #d97706;
        }

        /* ── Print button ── */
        .print-btn {
          position: fixed;
          bottom: 24px;
          right: 24px;
          padding: 12px 28px;
          background: #1a365d;
          color: white;
          border: none;
          border-radius: 10px;
          font-size: 14px;
          font-weight: 600;
          cursor: pointer;
          z-index: 100;
          box-shadow: 0 4px 16px rgba(26,54,93,0.35);
          transition: all 0.2s;
        }
        .print-btn:hover { background: #102a43; transform: translateY(-1px); }
      `}</style>

      <button className="print-btn no-print" onClick={() => window.print()}>
        Shkarko PDF
      </button>

      <div className="page">
        {/* Header */}
        <div className="header">
          <div className="header-left">
            <img src="/images/logo.webp" alt="Torra Gips" className="logo-img" />
            <div className="brand-text">
              <h1>TORRA GIPS</h1>
              <div className="tagline">Punime Gipsi, Patinim, Lyerje ne Tirane dhe Durres</div>
            </div>
          </div>
          <div className="header-right">
            <div className="city">Durres, Shqiperi</div>
            <div>(+355) 68 858 0058</div>
            <div>torragips@gmail.com</div>
            <div>www.torragips.com</div>
            <div className="nipt">NIPT: M51624508V</div>
          </div>
        </div>

        {/* Document Title Bar */}
        <div className="doc-bar">
          <h2>{docTitle}</h2>
        </div>

        {/* Meta Info - single column */}
        <div className="meta">
          <div className="meta-row">
            <span className="label">Klienti:</span>
            <span className="value">{proj.client_name || '-'}</span>
          </div>
          <div className="meta-row">
            <span className="label">Projekti:</span>
            <span className="value">{proj.name || '-'}</span>
          </div>
          <div className="meta-row">
            <span className="label">Lloji:</span>
            <span className="value">{TYPE_LABELS[proj.project_type] || proj.project_type || '-'}</span>
          </div>
          <div className="meta-row">
            <span className="label">Data:</span>
            <span className="value">{dateFormatted}</span>
          </div>
          {type === 'situacion' && (
            <div className="meta-row">
              <span className="label">Statusi:</span>
              <span className="value">{doc.payment_status === 'paid' ? 'Paguar' : 'Ne pritje'}</span>
            </div>
          )}
        </div>

        {/* Items Table */}
        <div className="items-wrapper">
          <table className="items">
            <thead>
              <tr>
                <th style={{ width: 36 }}>#</th>
                <th>Objekti / Sherbimi</th>
                <th>Pershkrimi</th>
                {showQuantity && <th className="text-center">Sasia</th>}
                <th className="text-center">Njesia</th>
                <th className="text-right">Cmimi (ALL)</th>
                {showQuantity && <th className="text-right">Total (ALL)</th>}
              </tr>
            </thead>
            <tbody>
              {items.length === 0 ? (
                <tr>
                  <td colSpan={showQuantity ? 7 : 5} className="text-center text-muted">
                    Nuk ka artikuj.
                  </td>
                </tr>
              ) : (
                items.map((item: any, idx: number) => {
                  const rowTotal = parseFloat(item.quantity || 0) * parseFloat(item.price || 0);
                  return (
                    <tr key={item.id || idx}>
                      <td className="text-center text-muted">{idx + 1}</td>
                      <td style={{ fontWeight: 500 }}>{item.service_name}</td>
                      <td>{item.description}</td>
                      {showQuantity && <td className="text-center num">{parseFloat(item.quantity || 0).toFixed(2)}</td>}
                      <td className="text-center">{item.unit}</td>
                      <td className="text-right num">{fmt(parseFloat(item.price || 0))}</td>
                      {showQuantity && <td className="text-right num" style={{ fontWeight: 600 }}>{fmt(rowTotal)}</td>}
                    </tr>
                  );
                })
              )}
            </tbody>
            {items.length > 0 && (
              <tfoot>
                <tr>
                  <td colSpan={showQuantity ? 6 : 4} className="text-right">TOTAL:</td>
                  <td className="text-right">{fmt(grandTotal)} ALL</td>
                </tr>
              </tfoot>
            )}
          </table>
        </div>

        {/* Footer */}
        <div className="footer">
          Durres, Shqiperi | (+355) 68 858 0058 | torragips@gmail.com | www.torragips.com | NIPT: M51624508V
        </div>
      </div>
    </>
  );
}
