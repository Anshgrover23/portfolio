'use client';

const PROOF_POINTS: { idx: string; body: React.ReactNode }[] = [
  {
    idx: '01',
    body: (
      <>
        <span className="font-mono tabular-nums text-foreground">$45.9k+</span>{' '}
        in open source bounties across{' '}
        <span className="font-mono tabular-nums text-foreground">8+</span> orgs (
        <a
          href="https://github.com/antiwork"
          target="_blank"
          rel="noopener noreferrer"
          className="text-foreground underline-offset-4 hover:underline"
        >
          Antiwork
        </a>
        ,{' '}
        <a
          href="https://tscircuit.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-foreground underline-offset-4 hover:underline"
        >
          TSCircuit
        </a>
        ,{' '}
        <a
          href="https://github.com/mediar-ai/screenpipe"
          target="_blank"
          rel="noopener noreferrer"
          className="text-foreground underline-offset-4 hover:underline"
        >
          Screenpipe
        </a>
        ).
      </>
    ),
  },
  {
    idx: '02',
    body: (
      <>
        Top 20 in the PR track at Automate Me If You Can (
        <a
          href="https://drive.google.com/file/d/1idAPCUDdt-lrYPx-Imf3_VaA9164ev6R/view"
          target="_blank"
          rel="noopener noreferrer"
          className="text-foreground underline-offset-4 hover:underline"
        >
          certificate
        </a>
        ).
      </>
    ),
  },
  {
    idx: '03',
    body: (
      <>
        European Summer of Code 2026 — contributions to{' '}
        <a
          href="https://github.com/conda/rattler"
          target="_blank"
          rel="noopener noreferrer"
          className="text-foreground underline-offset-4 hover:underline"
        >
          Rattler
        </a>
        .
      </>
    ),
  },
];

export const About = () => {
  return (
    <section
      className="mb-16 md:mb-20 section-rise"
      aria-labelledby="about-heading"
    >
      <div className="mb-10 flex items-baseline gap-4">
        <span className="type-numeral shrink-0 text-[1.6rem] text-accent">
          01
        </span>
        <h2
          id="about-heading"
          className="font-display flex items-baseline gap-3 text-[1.875rem] font-bold tracking-tight text-foreground md:text-[2.5rem]"
          style={{ letterSpacing: '-0.03em' }}
        >
          History
          <span className="block h-px flex-1 self-center bg-foreground/15" />
        </h2>
      </div>

      <div className="grid gap-10 md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] md:gap-12 lg:gap-14">
        <div className="min-w-0 space-y-4 text-base leading-relaxed text-muted-foreground">
          <p className="text-pretty">
            I am a{' '}
            <span className="font-medium text-foreground">
              founding engineer at Screenpipe
            </span>{' '}
            (YC S26) with{' '}
            <span className="font-mono tabular-nums text-foreground">2.5+</span>{' '}
            years shipping production software, focused on{' '}
            <span className="font-medium text-foreground">TypeScript</span>,
            testing and release automation, and developer experience. I ship in{' '}
            <span className="font-medium text-foreground">Next.js</span>,{' '}
            <span className="font-medium text-foreground">Rust</span>, and{' '}
            <span className="font-medium text-foreground">Ruby</span> across
            product teams and bounty programs.
          </p>
          <p className="text-pretty">
            Alongside Screenpipe, my public track record includes{' '}
            <span className="font-medium text-foreground">
              open source and contract work
            </span>
            : dense merges, packaging and distro work, and features defined by
            what ships in version control.
          </p>
        </div>

        <div className="min-w-0">
          <ul className="divide-y divide-line/80 border-y border-line/80">
            {PROOF_POINTS.map(p => (
              <li
                key={p.idx}
                className="flex gap-4 py-3.5 text-sm leading-relaxed text-muted-foreground"
              >
                <span className="type-numeral shrink-0 text-[1.1rem] text-accent leading-none pt-[2px]">
                  {p.idx}
                </span>
                <span className="min-w-0 text-pretty">{p.body}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};
