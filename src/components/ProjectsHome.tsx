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
        <div className="flex min-w-0 flex-1 flex-col">
          <h2
            id="projects-heading"
            className="font-display text-[1.875rem] font-bold tracking-tight text-foreground md:text-[2.5rem]"
            style={{ letterSpacing: '-0.03em' }}
          >
            Selected work
          </h2>
          <p className="mt-3 max-w-prose text-sm text-muted-foreground">
            Products I built and shipped, from the first idea to the live app.
          </p>
        </div>
      </div>

      <ul className="grid list-none gap-10 border-b border-line/80 pb-9 md:grid-cols-2 md:gap-8">
        {products.map(product => (
          <li key={product.slug} className="min-w-0">
            <article className="flex h-full flex-col gap-6">
              <a
                href={product.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative block aspect-[16/9] overflow-hidden rounded-lg border border-foreground/10 bg-muted"
                aria-label={`Open ${product.name} live site`}
              >
                <Image
                  src={product.coverImage}
                  alt={`${product.name} product screenshot`}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 40vw, 400px"
                  className="object-cover object-center transition-transform duration-300 group-hover:scale-[1.02]"
                />
              </a>

              <div className="flex min-w-0 flex-1 flex-col">
                <p className="text-xs font-medium text-muted-foreground">
                  <span className="text-accent">{product.status}</span>
                  <span className="text-muted-foreground/50" aria-hidden>
                    {' '}
                    ·{' '}
                  </span>
                  <span className="tabular-nums">{product.year}</span>
                </p>

                <h3 className="font-display mt-2 text-2xl font-semibold tracking-tight text-foreground md:text-3xl">
                  <Link
                    href={`/work/${product.slug}`}
                    className="underline-offset-4 hover:underline"
                  >
                    {product.name}
                  </Link>
                </h3>

                <p
                  className="mt-1.5 text-sm font-medium text-foreground/80"
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
                      className="inline-flex items-center gap-1.5 rounded-md bg-muted/60 px-2 py-1 text-xs text-muted-foreground"
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

                <div className="mt-auto flex flex-wrap items-center gap-x-5 gap-y-2 pt-5">
                  <Link
                    href={`/work/${product.slug}`}
                    className="group inline-flex min-h-10 items-center gap-1.5 text-sm font-medium text-foreground underline-offset-4 hover:underline"
                  >
                    Read case study
                    <ArrowRight
                      className="h-3.5 w-3.5 shrink-0 transition-transform group-hover:translate-x-0.5"
                      strokeWidth={1.5}
                    />
                  </Link>
                  <a
                    href={product.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-10 items-center gap-1 text-sm text-muted-foreground underline-offset-4 hover:text-foreground hover:underline"
                  >
                    Try {product.name}
                    <ExternalLink
                      className="h-3 w-3 shrink-0"
                      strokeWidth={1.5}
                    />
                  </a>
                  <a
                    href={product.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-10 items-center gap-1 text-sm text-muted-foreground underline-offset-4 hover:text-foreground hover:underline"
                  >
                    Code
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
