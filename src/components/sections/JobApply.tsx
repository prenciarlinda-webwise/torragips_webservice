import { useLocale } from 'next-intl';
import { COMPANY } from '@/lib/constants';
import { ArrowIcon } from '@/components/ui/Icons';

const TEXT = {
  sq: {
    title: 'Apliko Këtu për Vend Pune',
    body: 'Kërkojmë mjeshtra gipsi, patinimi dhe lyerjeje. Aplikimet pranohen vetëm me shkrim, përmes butonit më poshtë.',
    rules: ['Pa mesazhe në WhatsApp', 'Pa telefonata'],
    warningTitle: 'Punësojmë vetëm punëtorë shqiptarë',
    warning:
      'Punësojmë vetëm mjeshtra që jetojnë në Shqipëri. Nuk ofrojmë sponsorizim vize, leje pune apo ftesa pune për aplikantë jashtë Shqipërisë.',
    button: 'Apliko Këtu',
    subject: 'Aplikim për vend pune',
  },
  en: {
    title: 'Apply Here for a Work Position',
    body: 'We are looking for gypsum, plastering and painting tradesmen. Applications are accepted in writing only, through the button below.',
    rules: ['No WhatsApp messages', 'No phone calls'],
    warningTitle: 'We only hire Albanian workers',
    warning:
      'We only hire tradesmen who already live in Albania. We do not offer visa sponsorship, work permits or job invitations to applicants from abroad.',
    button: 'Apply Here',
    subject: 'Job application',
  },
};

// Job applications box: written applications only, plus the hiring-policy warning.
export default function JobApply() {
  const locale = useLocale();
  const t = locale === 'sq' ? TEXT.sq : TEXT.en;

  return (
    <section className="section-padding bg-plaster-100">
      <div className="container-custom">
        <div className="grid border border-line bg-plaster-50 lg:grid-cols-5">
          <div className="p-7 md:p-10 lg:col-span-3">
            <h2 className="h2">{t.title}</h2>
            <p className="lead mt-4 max-w-xl">{t.body}</p>

            <ul className="mt-6 flex flex-wrap gap-3 text-[0.9375rem] font-bold text-ink-900">
              {t.rules.map((rule) => (
                <li key={rule} className="flex items-center gap-2.5 border border-line px-4 py-2.5">
                  <svg className="h-4 w-4 shrink-0 text-red-600" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                    <path d="M3 3l10 10M13 3L3 13" />
                  </svg>
                  {rule}
                </li>
              ))}
            </ul>

            <a href={`mailto:${COMPANY.email}?subject=${encodeURIComponent(t.subject)}`} className="btn-ink btn-lg mt-8">
              {t.button}
              <ArrowIcon />
            </a>
          </div>

          <div className="border-t-4 border-cta bg-plaster-100 p-7 md:p-10 lg:col-span-2 lg:border-l-4 lg:border-t-0">
            <h3 className="h3">{t.warningTitle}</h3>
            <p className="copy mt-3">{t.warning}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
