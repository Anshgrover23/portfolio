import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, ExternalLink } from 'lucide-react';
import { products } from '@/data/products';

export function ProjectsHome() {
  if (products.length === 0) return null;

  return (
    <section className="mb-16 md:mb-20" aria-labelledby="projects-heading">
      <div className="mb-10 flex items-baseline gap-4">
        <span className="type-numeral shrink-0 text-[1.6rem] text-accent">
          03
        </span>
        <div className="min-w-0">
          <h2
            id="projects-heading"
            className="font-display text-[1.875rem] font-bold tracking-tight text-foreground md:text-[2.5rem]"
            style={{ letterSpacing: '-0.03em' }}
          >
            Projects
          </h2>
          <p className="mt-3 max-w-prose text-sm text-muted-foreground">
            Products I&apos;ve built end-to-end.
          </p>
        </div>
      </div>

      <ul className="list-none border-t border-line/80">
        {products.map(product => (
          <li
            key={product.slug}
            className="border-b border-line/80 py-8 md:py-10"
          >
            <article className="grid gap-8 md:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)] md:items-center md:gap-10 lg:gap-12">
              <a
                href={product.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative aspect-[16/10] overflow-hidden rounded-sm border border-foreground/10 bg-muted shadow-[0_10px_30px_-12px_rgba(20,16,12,0.18)]"
                aria-label={`Open ${product.name} live site`}
              >
                <Image
                  src={product.coverImage}
                  alt={`${product.name} product screenshot`}
                  fill
                  sizes="(max-width: 768px) 100vw, 55vw"
                  className="object-cover object-top transition-transform duration-300 group-hover:scale-[1.02]"
                />
              </a>

              <div className="min-w-0">
                <p className="type-meta text-muted-foreground">
                  <span className="text-accent">{product.status}</span>
                  <span className="text-muted-foreground/50" aria-hidden>
                    {' '}
                    ·{' '}
                  </span>
                  <span className="tabular-nums">{product.year}</span>
                </p>

                <h3 className="font-display mt-3 text-2xl font-semibold tracking-tight text-foreground md:text-3xl">
                  <Link
                    href={`/work/${product.slug}`}
                    className="underline-offset-4 hover:underline"
                  >
                    {product.name}
                  </Link>
                </h3>

                <p
                  className="font-display mt-1.5 text-base italic font-light text-accent md:text-lg"
                  style={{ fontVariationSettings: "'opsz' 36, 'SOFT' 100" }}
                >
                  {product.tagline}
                </p>

                <p className="mt-4 max-w-prose text-sm leading-relaxed text-muted-foreground md:text-[0.95rem]">
                  {product.summary}
                </p>

                <ul className="mt-5 flex list-none flex-wrap gap-1.5">
                  {product.stack.slice(0, 5).map(item => (
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

                <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-3">
                  <Link
                    href={`/work/${product.slug}`}
                    className="group inline-flex items-center gap-1.5 font-mono text-[11px] font-medium uppercase tracking-[0.16em] text-foreground transition-colors hover:text-accent"
                  >
                    Case study
                    <ArrowRight
                      className="h-3.5 w-3.5 shrink-0 transition-transform group-hover:translate-x-0.5"
                      strokeWidth={1.5}
                    />
                  </Link>
                  <a
                    href={product.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 font-mono text-[11px] font-medium uppercase tracking-[0.16em] text-muted-foreground transition-colors hover:text-foreground"
                  >
                    Live
                    <ExternalLink
                      className="h-3 w-3 shrink-0"
                      strokeWidth={1.5}
                    />
                  </a>
                  <a
                    href={product.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 font-mono text-[11px] font-medium uppercase tracking-[0.16em] text-muted-foreground transition-colors hover:text-foreground"
                  >
                    GitHub
                    <ExternalLink
                      className="h-3 w-3 shrink-0"
                      strokeWidth={1.5}
                    />
                  </a>
                </div>
              </div>
            </article>
          </li>
        ))}
      </ul>
    </section>
  );
}
