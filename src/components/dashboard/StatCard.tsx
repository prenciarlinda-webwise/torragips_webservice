'use client';

interface StatCardProps {
  label: string;
  value: string | number;
  color?: 'blue' | 'green' | 'red' | 'yellow' | 'gray';
  icon?: string;
}

const STYLES: Record<string, { bg: string; text: string; border: string }> = {
  blue: { bg: 'bg-[#1a365d]/5', text: 'text-[#1a365d]', border: 'border-l-[#1a365d]' },
  green: { bg: 'bg-emerald-50', text: 'text-emerald-700', border: 'border-l-emerald-500' },
  red: { bg: 'bg-red-50', text: 'text-red-600', border: 'border-l-red-400' },
  yellow: { bg: 'bg-amber-50', text: 'text-[#d97706]', border: 'border-l-[#d97706]' },
  gray: { bg: 'bg-gray-50', text: 'text-gray-700', border: 'border-l-gray-300' },
};

export default function StatCard({ label, value, color = 'gray' }: StatCardProps) {
  const s = STYLES[color] || STYLES.gray;
  return (
    <div className={`${s.bg} rounded-xl border border-gray-100 border-l-4 ${s.border} p-5 transition-all hover:shadow-sm`}>
      <p className="text-[11px] font-semibold text-gray-500 uppercase tracking-wider mb-1.5">{label}</p>
      <p className={`text-xl font-bold ${s.text}`}>{value}</p>
    </div>
  );
}
