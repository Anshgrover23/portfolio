import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, ExternalLink } from 'lucide-react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getProductBySlug, getProductSlugs } from '@/data/products';

type Props = {
  params: Promise<{ slug: string }>;
};

function externalHost(url: string, fallback: string) {
  try {
    return new URL(url).hostname.replace(/^www\./, '');
  } catch {
    return fallback;
  }
}

export function generateStaticParams() {
  return getProductSlugs().map(slug => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const slug = (await params).slug;
  const product = getProductBySlug(slug);

  if (!product) {
    return { title: 'Project not found' };
  }

  return {
    title: `${product.name} — project`,
    description: product.summary,
    openGraph: {
      title: `${product.name} — ${product.tagline}`,
      description: product.summary,
      images: [{ url: product.coverImage }],
    },
  };
}

export default async function WorkCaseStudyPage({ params }: Props) {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div
        className="pointer-events-none fixed inset-0 -z-10 opacity-[0.35]"
        aria-hidden
        style={{
          backgroundImage:
            'radial-gradient(ellipse 80% 50% at 50% -20%, hsl(40 25% 94%), transparent), radial-gradient(ellipse 60% 40% at 100% 0%, hsl(172 15% 94% / 0.5), transparent)',
        }}
      />
      <main className="mx-auto max-w-3xl px-6 pb-16 pt-8 md:pb-14 md:pt-12">
        <nav className="mb-8 flex flex-wrap items-center gap-x-3 gap-y-2 font-mono text-xs uppercase tracking-wide text-muted-foreground">
          <Link href="/" className="transition-colors hover:text-foreground">
            Home
          </Link>
          <span aria-hidden>/</span>
          <Link
            href="/#projects"
            className="transition-colors hover:text-foreground"
          >
            Projects
          </Link>
          <span aria-hidden>/</span>
          <span className="text-foreground">{product.name}</span>
        </nav>

        <Link
          href="/#projects"
          className="mb-8 inline-flex items-center gap-2 font-mono text-xs font-medium uppercase tracking-wide text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="h-3.5 w-3.5 shrink-0" strokeWidth={1.5} />
          All projects
        </Link>

        <article>
          <header className="mb-8 border-b border-line pb-8">
            <p className="type-meta text-muted-foreground">
              <span className="text-accent">{product.status}</span>
              <span className="text-muted-foreground/50" aria-hidden>
                {' '}
                ·{' '}
              </span>
              <span className="tabular-nums">{product.year}</span>
            </p>

            <h1 className="font-display mt-3 text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
              {product.name}
            </h1>
            <p
              className="font-display mt-2 text-lg italic font-light text-accent md:text-xl"
              style={{ fontVariationSettings: "'opsz' 36, 'SOFT' 100" }}
            >
              {product.tagline}
            </p>
            <p className="mt-4 max-w-prose text-sm leading-relaxed text-muted-foreground md:text-base">
              {product.summary}
            </p>

            <div className="mt-5 flex flex-wrap gap-x-5 gap-y-2">
              <a
                href={product.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-sm font-medium text-foreground underline-offset-4 hover:underline"
              >
                {externalHost(product.liveUrl, product.name)}
                <ExternalLink className="h-3.5 w-3.5" strokeWidth={1.5} />
              </a>
              <a
                href={product.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-sm font-medium text-foreground underline-offset-4 hover:underline"
              >
                GitHub
                <ExternalLink className="h-3.5 w-3.5" strokeWidth={1.5} />
              </a>
            </div>
          </header>

          <a
            href={product.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="relative mb-10 block aspect-[16/10] overflow-hidden rounded-sm border border-foreground/10 bg-muted shadow-[0_10px_30px_-12px_rgba(20,16,12,0.18)] transition-opacity hover:opacity-95"
            aria-label={`Open ${product.name} live site`}
          >
            <Image
              src={product.coverImage}
              alt={`${product.name} product screenshot`}
              fill
              priority
              sizes="(max-width: 768px) 100vw, 768px"
              className="object-cover object-top"
            />
          </a>

          <div className="space-y-10">
            <section aria-labelledby="problem-heading">
              <h2
                id="problem-heading"
                className="mb-3 font-mono text-[10px] font-semibold uppercase tracking-wider text-muted-foreground"
              >
                Problem
              </h2>
              <p className="max-w-prose text-sm leading-relaxed text-foreground/90 md:text-base">
                {product.problem}
              </p>
            </section>

            <section aria-labelledby="approach-heading">
              <h2
                id="approach-heading"
                className="mb-3 font-mono text-[10px] font-semibold uppercase tracking-wider text-muted-foreground"
              >
                Approach
              </h2>
              <p className="max-w-prose text-sm leading-relaxed text-foreground/90 md:text-base">
                {product.approach}
              </p>
            </section>

            <section aria-labelledby="outcomes-heading">
              <h2
                id="outcomes-heading"
                className="mb-3 font-mono text-[10px] font-semibold uppercase tracking-wider text-muted-foreground"
              >
                What shipped
              </h2>
              <ul className="space-y-2.5 rounded-lg border border-line bg-canvas-muted/40 p-5">
                {product.outcomes.map(item => (
                  <li
                    key={item}
                    className="flex gap-2.5 text-sm leading-relaxed text-foreground/90"
                  >
                    <span
                      className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent"
                      aria-hidden
                    />
                    {item}
                  </li>
                ))}
              </ul>
            </section>

            <section aria-labelledby="stack-heading">
              <h2
                id="stack-heading"
                className="mb-2.5 font-mono text-[10px] font-semibold uppercase tracking-wider text-muted-foreground"
              >
                Stack
              </h2>
              <ul className="flex list-none flex-wrap gap-1.5">
                {product.stack.map(item => (
                  <li
                    key={item.label}
                    className="inline-flex items-center gap-1.5 rounded-md border border-line/80 bg-card px-2.5 py-1 font-mono text-[11px] font-medium uppercase tracking-wide text-foreground/85"
                  >
                    {item.icon && (
                      <Image
                        src={item.icon}
                        alt=""
                        width={14}
                        height={14}
                        className={`h-3.5 w-3.5 shrink-0 ${item.invert ? 'invert' : ''}`}
                        unoptimized
                      />
                    )}
                    {item.label}
                  </li>
                ))}
              </ul>
            </section>
          </div>

          <div className="mt-12 flex flex-wrap gap-3 border-t border-line pt-8">
            <a
              href={product.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-md bg-foreground px-5 py-3 text-sm font-semibold text-background transition-transform hover:-translate-y-[1px] active:translate-y-0 active:scale-[0.98]"
            >
              Open live app
              <ExternalLink className="h-3.5 w-3.5" strokeWidth={1.5} />
            </a>
            <a
              href={product.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-md border border-line bg-card px-5 py-3 text-sm font-medium text-foreground transition-colors hover:bg-canvas-muted active:scale-[0.98]"
            >
              View source
              <ExternalLink className="h-3.5 w-3.5" strokeWidth={1.5} />
            </a>
          </div>
        </article>
      </main>
    </div>
  );
}
