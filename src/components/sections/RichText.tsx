import { Fragment } from 'react';

const LINK = /\[([^\]]+)\]\(([^)\s]+)\)/g;

// Renders text with inline [anchor](href) links. Internal paths stay as plain <a>
// with their trailing slash so no link ever triggers a redirect.
export default function RichText({ text }: { text: string }) {
  const parts: React.ReactNode[] = [];
  let last = 0;
  for (const m of text.matchAll(LINK)) {
    const i = m.index ?? 0;
    if (i > last) parts.push(text.slice(last, i));
    parts.push(
      <a key={i} href={m[2]} className="link font-medium">
        {m[1]}
      </a>
    );
    last = i + m[0].length;
  }
  if (last < text.length) parts.push(text.slice(last));
  return <Fragment>{parts}</Fragment>;
}

// Plain-text version for JSON-LD and meta usage.
export function stripLinks(text: string): string {
  return text.replace(LINK, '$1');
}
