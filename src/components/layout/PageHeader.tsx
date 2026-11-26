import Breadcrumbs from './Breadcrumbs';

type Props = {
  title: string;
  subtitle?: string;
  breadcrumbs?: { label: string; href?: string }[];
  // Extra content under the intro (stats row, meta line, ...).
  children?: React.ReactNode;
};

// Shared top-of-page block for inner pages: breadcrumb, large title, intro.
// Sits on the page background, directly under the fixed header.
export default function PageHeader({ title, subtitle, breadcrumbs, children }: Props) {
  return (
    <section className="border-b border-line bg-plaster-100 pt-[4.5rem]">
      <div className="container-custom pb-12 pt-8 md:pb-16 md:pt-10">
        {breadcrumbs && <Breadcrumbs items={breadcrumbs} className="mb-6 text-ink-800 md:mb-8" />}
        <h1 className="display max-w-4xl">{title}</h1>
        {subtitle && <p className="lead mt-5 max-w-2xl">{subtitle}</p>}
        {children}
      </div>
    </section>
  );
}
