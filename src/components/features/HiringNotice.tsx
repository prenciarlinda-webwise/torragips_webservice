// Hiring notice: we recruit locally and do not sponsor visas. Shown in both languages
// on every locale, since visa requests mostly come from foreign applicants.
const TEXT = {
  sq: {
    title: 'Kërkojmë Punëtorë Shqiptarë',
    body: 'Punësojmë vetëm mjeshtra gipsi, patinimi dhe lyerjeje që jetojnë në Shqipëri. Nuk ofrojmë sponsorizim vize, leje pune apo ftesa pune për aplikantë jashtë Shqipërisë.',
  },
  en: {
    title: 'Hiring: Albanian Workers Only',
    body: 'We only hire gypsum, plastering and painting tradesmen who already live in Albania. We do not offer visa sponsorship, work permits or job invitations to applicants from abroad, and we do not reply to such requests.',
  },
};

export default function HiringNotice({ locale, variant = 'footer' }: { locale: string; variant?: 'footer' | 'page' }) {
  const order = locale === 'sq' ? [TEXT.sq, TEXT.en] : [TEXT.en, TEXT.sq];

  if (variant === 'footer') {
    return (
      <div className="border-t border-white/10">
        <div className="container-custom py-5 grid md:grid-cols-2 gap-3 text-xs text-neutral-400">
          {order.map((t) => (
            <p key={t.title}>
              <strong className="text-neutral-300">{t.title}.</strong> {t.body}
            </p>
          ))}
        </div>
      </div>
    );
  }

  return (
    <section className="py-10 bg-neutral-100 border-t border-neutral-200">
      <div className="container-custom max-w-4xl grid md:grid-cols-2 gap-6">
        {order.map((t) => (
          <div key={t.title}>
            <h2 className="text-lg font-bold text-dark-800 mb-2">{t.title}</h2>
            <p className="text-sm text-text-light">{t.body}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
