import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const postsDirectory = path.join(process.cwd(), 'src/content/blog');

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  author: string;
  category: string;
  tags: string[];
  image?: string;
  locale: string;
}

export function getPostSlugs(locale: string): string[] {
  const localeDir = path.join(postsDirectory, locale);
  if (!fs.existsSync(localeDir)) {
    return [];
  }
  return fs.readdirSync(localeDir).filter((file) => file.endsWith('.mdx'));
}

export function getPostBySlug(slug: string, locale: string): BlogPost | null {
  const realSlug = slug.replace(/\.mdx$/, '');
  const fullPath = path.join(postsDirectory, locale, `${realSlug}.mdx`);

  if (!fs.existsSync(fullPath)) {
    return null;
  }

  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = matter(fileContents);

  return {
    slug: realSlug,
    title: data.title || '',
    excerpt: data.excerpt || '',
    content,
    date: data.date || '',
    author: data.author || 'Torra Gips',
    category: data.category || '',
    tags: data.tags || [],
    image: data.image,
    locale,
  };
}

export function getAllPosts(locale: string): BlogPost[] {
  const slugs = getPostSlugs(locale);
  const posts = slugs
    .map((slug) => getPostBySlug(slug.replace(/\.mdx$/, ''), locale))
    .filter((post): post is BlogPost => post !== null)
    .sort((a, b) => (new Date(b.date) > new Date(a.date) ? 1 : -1));

  return posts;
}
