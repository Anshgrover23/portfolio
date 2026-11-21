import type { ReactNode } from 'react';

const PROOF_POINTS: { idx: string; body: ReactNode }[] = [
  {
    idx: '01',
    body: (
      <>
        Earned more than{' '}
        <span className="font-mono tabular-nums text-foreground">$45,000</span>{' '}
        USD in open source bounties across{' '}
        <span className="font-mono tabular-nums text-foreground">8+</span> orgs
        (
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
        , etc.).
      </>
    ),
  },
  {
    idx: '02',
    body: (
      <>
        Placed in the Top 20 at the{' '}
        <a
          href="https://drive.google.com/file/d/1idAPCUDdt-lrYPx-Imf3_VaA9164ev6R/view"
          target="_blank"
          rel="noopener noreferrer"
          className="text-foreground underline-offset-4 hover:underline"
        >
          Automate me if u can
        </a>{' '}
        hackathon in the PR category. The event had a{' '}
        <span className="font-mono tabular-nums text-foreground">$3,000</span>{' '}
        prize pool.
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
  {
    idx: '04',
    body: (
      <>
        Invitee under YC Startup School India 2026 — around{' '}
        <span className="font-mono tabular-nums text-foreground">$25k</span> in
        credits across different AI tools.
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
          About
          <span className="block h-px flex-1 self-center bg-foreground/15" />
        </h2>
      </div>

      <div className="grid gap-10 md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] md:gap-12 lg:gap-14">
        <div className="min-w-0 space-y-4 text-base leading-relaxed text-muted-foreground">
          <p className="text-pretty">
            I&apos;m a{' '}
            <span className="font-medium text-foreground">
              software engineer at River AI
            </span>{' '}
            (YC F26), building the AI computer. Previously, I was a founding
            engineer at Screenpipe (YC S26), working on personal context and
            memory.
          </p>
          <p className="text-pretty">
            My work connects AI to real apps through{' '}
            <span className="font-medium text-foreground">MCP and OAuth</span>.
            I build chat and file workflows, keep state consistent across
            windows, and make failures recoverable.
          </p>
          <p className="text-pretty">
            Over <span className="tabular-nums text-foreground">3 years</span>{' '}
            across 3 remote startups, I&apos;ve taken features from the first
            interface through backend integration, testing, and release.
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
