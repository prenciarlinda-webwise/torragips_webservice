'use client';

import { useLocale } from 'next-intl';

// Service areas listed on the Google Business profile.
const SERVICE_AREAS = [
  'Blloku',
  'Komuna e Parisit',
  'Blloku Vasil Shanto',
  'Sauk',
  'Farkë',
  'Lundër',
  'Mullet',
  'Surrel',
  'Petrelë',
  'Long Hill',
  'Rolling Hills',
  'Tiranë',
  'Durrës',
];

export default function Testimonials() {
  const locale = useLocale();

  return (
    <section className="section-padding bg-plaster-100">
      <div className="container-custom">
        <div className="sec-head is-center">
          <div className="contents">
            <h2 className="h2">{locale === 'sq' ? 'Vlerësimet e Klientëve' : 'Customer Reviews'}</h2>
          </div>
          <div className="contents">
            <p className="lead">
              {locale === 'sq'
                ? 'Shikoni çfarë thonë klientët tanë në Google'
                : 'See what our customers say on Google'}
            </p>
          </div>
        </div>

        <div className="grid border border-line lg:grid-cols-12">
            {/* Google Business summary */}
            <div className="on-dark flex flex-col items-center bg-plaster-50 p-8 text-center text-ink-800 md:p-10 lg:col-span-4">
              {/* Google Logo */}
              <div className="mb-8">
                <svg className="h-8 w-24" viewBox="0 0 272 92" xmlns="http://www.w3.org/2000/svg">
                  <path d="M115.75 47.18c0 12.77-9.99 22.18-22.25 22.18s-22.25-9.41-22.25-22.18C71.25 34.32 81.24 25 93.5 25s22.25 9.32 22.25 22.18zm-9.74 0c0-7.98-5.79-13.44-12.51-13.44S80.99 39.2 80.99 47.18c0 7.9 5.79 13.44 12.51 13.44s12.51-5.55 12.51-13.44z" fill="#EA4335"/>
                  <path d="M163.75 47.18c0 12.77-9.99 22.18-22.25 22.18s-22.25-9.41-22.25-22.18c0-12.85 9.99-22.18 22.25-22.18s22.25 9.32 22.25 22.18zm-9.74 0c0-7.98-5.79-13.44-12.51-13.44s-12.51 5.46-12.51 13.44c0 7.9 5.79 13.44 12.51 13.44s12.51-5.55 12.51-13.44z" fill="#FBBC05"/>
                  <path d="M209.75 26.34v39.82c0 16.38-9.66 23.07-21.08 23.07-10.75 0-17.22-7.19-19.66-13.07l8.48-3.53c1.51 3.61 5.21 7.87 11.17 7.87 7.31 0 11.84-4.51 11.84-13v-3.19h-.34c-2.18 2.69-6.38 5.04-11.68 5.04-11.09 0-21.25-9.66-21.25-22.09 0-12.52 10.16-22.26 21.25-22.26 5.29 0 9.49 2.35 11.68 4.96h.34v-3.61h9.25zm-8.56 20.92c0-7.81-5.21-13.52-11.84-13.52-6.72 0-12.35 5.71-12.35 13.52 0 7.73 5.63 13.36 12.35 13.36 6.63 0 11.84-5.63 11.84-13.36z" fill="#4285F4"/>
                  <path d="M225 3v65h-9.5V3h9.5z" fill="#34A853"/>
                  <path d="M262.02 54.48l7.56 5.04c-2.44 3.61-8.32 9.83-18.48 9.83-12.6 0-22.01-9.74-22.01-22.18 0-13.19 9.49-22.18 20.92-22.18 11.51 0 17.14 9.16 18.98 14.11l1.01 2.52-29.65 12.28c2.27 4.45 5.8 6.72 10.75 6.72 4.96 0 8.4-2.44 10.92-6.14zm-23.27-7.98l19.82-8.23c-1.09-2.77-4.37-4.7-8.23-4.7-4.95 0-11.84 4.37-11.59 12.93z" fill="#EA4335"/>
                  <path d="M35.29 41.41V32H67c.31 1.64.47 3.58.47 5.68 0 7.06-1.93 15.79-8.15 22.01-6.05 6.3-13.78 9.66-24.02 9.66C16.32 69.35.36 53.89.36 34.91.36 15.93 16.32.47 35.3.47c10.5 0 17.98 4.12 23.6 9.49l-6.64 6.64c-4.03-3.78-9.49-6.72-16.97-6.72-13.86 0-24.7 11.17-24.7 25.03 0 13.86 10.84 25.03 24.7 25.03 8.99 0 14.11-3.61 17.39-6.89 2.66-2.66 4.41-6.46 5.1-11.65l-22.49.01z" fill="#4285F4"/>
                </svg>
              </div>

              {/* Rating */}
              <div className="wide mb-3 text-7xl font-semibold leading-none tracking-tight text-ink-900">5.0</div>

              {/* Stars */}
              <div className="mb-3 flex">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="h-5 w-5 text-[#F2B01E]" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>

              <p className="mb-4 text-sm text-ink-500">
                {locale === 'sq' ? 'Bazuar në vlerësimet e Google' : 'Based on Google reviews'}
              </p>

              {/* Business Name */}
              <div className="mt-auto w-full border-t border-line pt-5">
                <p className="font-semibold text-ink-900">Torra Gips</p>
                <p className="mt-1 text-xs text-ink-500">
                  {locale === 'sq' ? 'Biznes i Verifikuar' : 'Verified Business'}
                </p>
              </div>

              {/* Write Review Button */}
              <a
                href="https://g.page/r/CQuw0pJA7PHgEAI/review"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-light mt-6"
              >
                {locale === 'sq' ? 'Shkruaj Vlerësim' : 'Write a Review'}
              </a>
            </div>

            {/* Right Side - Map Embed */}
            <div className="min-h-[400px] lg:col-span-8">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d383483.7474060648!2d19.649991999999994!3d41.33133579999999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xaa960a1e5eab1fc9%3A0xe0f1ec40292dfb0b!2sPunime%20Gipsi%20-%20Torra%20Gips!5e0!3m2!1sen!2s!4v1770036082020!5m2!1sen!2s"
                width="100%"
                height="100%"
                style={{ border: 0, minHeight: '400px' }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Torra Gips Location"
              />
            </div>
        </div>

        {/* Local profile: what we do and the areas we cover (mirrors the Google Business profile) */}
        <div className="mt-6 grid gap-6 lg:grid-cols-2">
          <div className="card p-6 md:p-8">
            <h3 className="h3 mb-3">{locale === 'sq' ? 'Punime Gipsi – Torra Gips' : 'Gypsum Works – Torra Gips'}</h3>
            <p className="copy">
              {locale === 'sq'
                ? 'Ne jemi lider në instalim, riparim dhe punime gipsi për shtëpi dhe biznese. Me përvojë të gjatë dhe një ekip profesionistësh, ne garantojmë punime të cilësisë së lartë dhe përkushtim ndaj çdo detaji. Për çfarëdo projekti të madh ose të vogël, jemi këtu për t’ju ndihmuar të realizoni vizionin tuaj.'
                : 'We are a leader in installation, repair and gypsum works for homes and businesses. With long experience and a team of professionals, we guarantee high-quality work and attention to every detail. For any project, large or small, we are here to help you realise your vision.'}
            </p>
            <p className="copy mt-4">
              {locale === 'sq'
                ? 'Ekipi ynë ekzekuton sisteme të plota të ndërtimit të thatë për apartamente, vila private, zyra, klinika, hotele dhe objekte komerciale. Ofrojmë shërbime gipsi në Tiranë, Durrës dhe qytetet përreth. Nuk kemi zyrë pritjeje: vijmë ne në objektin tuaj.'
                : 'Our team delivers complete dry-construction systems for apartments, private villas, offices, clinics, hotels and commercial buildings. We offer gypsum services in Tirana, Durrës and the surrounding towns. We have no walk-in office: we come to your site.'}
            </p>
          </div>

          <div className="card p-6 md:p-8">
            <h3 className="h3 mb-4">{locale === 'sq' ? 'Zonat Ku Ofrojmë Shërbime Gipsi' : 'Areas Where We Offer Gypsum Services'}</h3>
            <ul className="grid grid-cols-2 gap-x-6 gap-y-2.5 text-[0.9375rem] text-ink-800 sm:grid-cols-3">
              {SERVICE_AREAS.map((area) => (
                <li key={area} className="flex items-center gap-2.5">
                  <span className="h-1.5 w-1.5 shrink-0 bg-cta" aria-hidden="true" />
                  {area}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* View on Google Link */}
        <div className="mt-8 text-center">
          <a
            href="https://g.page/r/CQuw0pJA7PHgEAI"
            target="_blank"
            rel="noopener noreferrer"
            className="link-rule"
          >
            {locale === 'sq' ? 'Shiko profilin tonë në Google Maps' : 'View our profile on Google Maps'}
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
