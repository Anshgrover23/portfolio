export type ExperienceTech = {
  label: string;
  icon?: string;
};

export type ExperienceContribution = {
  title: string;
  description: string;
  bounty?: string;
  badge?: string;
  link?: string;
  pullRequests?: { title: string; link: string }[];
};

export type Experience = {
  company: string;
  role: string;
  period: string;
  description?: string;
  logo: string;
  link: string;
  totalPRs: string;
  totalBounties?: string;
  techStack: ExperienceTech[];
  contributions: ExperienceContribution[];
  badge?: string;
  highlights?: string[];
  isCurrent?: boolean;
  featured?: boolean;
  reposPrivate?: boolean;
  compensationDetailsImage?: string;
  /** GitHub repo scope for totalPRs (e.g. screenpipe/screenpipe). */
  mergedPRsRepo?: string;
  /** All-orgs merged PR count shown alongside repo-scoped totalPRs. */
  careerMergedPRs?: string;
  location?: string;
};

export const experiences = [
  {
    company: 'Screenpipe',
    role: 'Founding Engineer',
    period: '2026 — Present',
    badge: 'YC S26',
    isCurrent: true,
    featured: true,
    logo: 'screenpipe.png',
    link: 'https://screenpi.pe/',
    totalPRs: '212+',
    mergedPRsRepo: 'screenpipe/screenpipe',
    careerMergedPRs: '463+',
    techStack: [
      { label: 'Rust', icon: '/svg-icons/rust.svg' },
      { label: 'TypeScript', icon: '/svg-icons/typescript.svg' },
      {
        label: 'Tauri',
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tauri/tauri-original.svg',
      },
      { label: 'Next.js', icon: '/svg-icons/nextjs.svg' },
      { label: 'React', icon: '/svg-icons/reactjs.svg' },
      {
        label: 'SQLite',
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/sqlite/sqlite-original.svg',
      },
      {
        label: 'Bun',
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/bun/bun-original.svg',
      },
    ] satisfies ExperienceTech[],
    highlights: [
      'Built the connections platform: generic OAuth plus Slack, Jira, Gmail, Microsoft 365, Notion, Supabase, QuickBooks, Composio, and more — wired into Pi chat and pipes',
      'Owned AI gateway and chat reliability: usage limits, provider outages, streaming, drafts, attachments, and presets',
      'Shipped Windows desktop reliability: WebView2 browser, extension pairing, locked-binary installs, overlay routing, and capture edge cases',
      'Fixed meetings and capture pipelines: live STT recovery, audio-stall false positives, recording schedules, and vision permissions',
    ],
    contributions: [
      {
        title: 'Built the connections & OAuth platform end-to-end',
        description:
          'Introduced shared OAuth infrastructure and shipped production connectors (Slack, Jira, Gmail, Microsoft 365/Teams, Notion, Supabase, QuickBooks, Google Drive/Docs/Sheets, HubSpot, Cal.com, IMAP, Composio multi-account). Wired connected accounts into Pi’s system prompt; onboarding and pipe install guide users through setup.',
        badge: 'Platform',
        pullRequests: [
          {
            title:
              '#2664 · feat(oauth): introduce generic OAuth infrastructure with Notion integration',
            link: 'https://github.com/screenpipe/screenpipe/pull/2664',
          },
          {
            title:
              '#2699 · feat: Gmail integration via Google OAuth (read + send)',
            link: 'https://github.com/screenpipe/screenpipe/pull/2699',
          },
          {
            title:
              '#3051 · feat(connections): add Microsoft Graph OAuth for Microsoft 365 and Teams',
            link: 'https://github.com/screenpipe/screenpipe/pull/3051',
          },
          {
            title: '#3118 · feat(connections): migrate Jira to OAuth 2.0 (3LO)',
            link: 'https://github.com/screenpipe/screenpipe/pull/3118',
          },
          {
            title:
              '#3015 · feat(connect): add QuickBooks Online and Google Sheets OAuth connectors',
            link: 'https://github.com/screenpipe/screenpipe/pull/3015',
          },
          {
            title: '#3070 · feat: add Supabase OAuth app integration support',
            link: 'https://github.com/screenpipe/screenpipe/pull/3070',
          },
          {
            title:
              '#5362 · feat(connections): add google drive, docs, and sheets via composio',
            link: 'https://github.com/screenpipe/screenpipe/pull/5362',
          },
          {
            title:
              '#5399 · feat(connections): multi-account support for composio integrations',
            link: 'https://github.com/screenpipe/screenpipe/pull/5399',
          },
          {
            title:
              '#5277 · feat(connections): add email inbox (IMAP) connection',
            link: 'https://github.com/screenpipe/screenpipe/pull/5277',
          },
          {
            title:
              "#3254 · feat(connections): wire connected integrations into Pi's system prompt for chat & pipes",
            link: 'https://github.com/screenpipe/screenpipe/pull/3254',
          },
          {
            title: '#3671 · feat(mcp): add OAuth login for MCP servers',
            link: 'https://github.com/screenpipe/screenpipe/pull/3671',
          },
          {
            title:
              '#5762 · fix(connections): route MCP OAuth through HTTPS relay to survive HTTPS-Only browsers',
            link: 'https://github.com/screenpipe/screenpipe/pull/5762',
          },
        ],
      },
      {
        title: 'AI gateway, Pi chat & presets',
        description:
          'Hardened AI gateway for usage limits, provider outages, and geo blocks; improved Pi streaming and cloud-token refresh; shipped chat UX (drafts, attachments, filters, always-on-top, connection suggestions) and preset reliability.',
        badge: 'Chat & AI',
        pullRequests: [
          {
            title:
              '#5875 · fix(ai): inline upgrade recovery for AI usage limits across all surfaces',
            link: 'https://github.com/screenpipe/screenpipe/pull/5875',
          },
          {
            title:
              '#5653 · fix(ai-gateway): classify Anthropic spend-cap 400 as provider outage',
            link: 'https://github.com/screenpipe/screenpipe/pull/5653',
          },
          {
            title:
              '#5618 · fix(ai-gateway): recognize Anthropic geo-403 and stop recommending Auto in blocked regions',
            link: 'https://github.com/screenpipe/screenpipe/pull/5618',
          },
          {
            title:
              '#3616 · fix(ai-gateway): emit finish_reason before [DONE] for Pi streaming',
            link: 'https://github.com/screenpipe/screenpipe/pull/3616',
          },
          {
            title:
              '#3711 · feat(chat): document attachments with unified composer + bubble UI',
            link: 'https://github.com/screenpipe/screenpipe/pull/3711',
          },
          {
            title:
              '#3739 · feat(chat): per-conversation composer drafts (no more cross-chat leaks)',
            link: 'https://github.com/screenpipe/screenpipe/pull/3739',
          },
          {
            title:
              '#3427 · feat: add smart connection suggestions to chat dashboard',
            link: 'https://github.com/screenpipe/screenpipe/pull/3427',
          },
          {
            title:
              '#2826 · feat: add retry, branch in new chat, and rename to chat UI',
            link: 'https://github.com/screenpipe/screenpipe/pull/2826',
          },
          {
            title: '#5243 · feat(chat): edit saved prompts before running',
            link: 'https://github.com/screenpipe/screenpipe/pull/5243',
          },
          {
            title: '#5549 · feat(app): add native Business upgrade flow',
            link: 'https://github.com/screenpipe/screenpipe/pull/5549',
          },
        ],
      },
      {
        title: 'Windows desktop, browser & installs',
        description:
          'Owned-browser WebView2 startup and session reuse, one-click extension pairing, locked-binary and Bun update unblocks, overlay/timeline routing, and capture filtering on Windows.',
        badge: 'Desktop',
        pullRequests: [
          {
            title:
              '#3357 · fix Windows owned browser WebView2 startup and loading',
            link: 'https://github.com/screenpipe/screenpipe/pull/3357',
          },
          {
            title: '#3351 · feat: add one-click browser extension pairing',
            link: 'https://github.com/screenpipe/screenpipe/pull/3351',
          },
          {
            title:
              '#3419 · feat: browser session reuse on windows + smarter extension popup',
            link: 'https://github.com/screenpipe/screenpipe/pull/3419',
          },
          {
            title:
              '#5468 · fix(windows): move locked binaries aside so installs never fail',
            link: 'https://github.com/screenpipe/screenpipe/pull/5468',
          },
          {
            title:
              '#3650 · fix(windows): unblock app updates when bundled Bun is still running',
            link: 'https://github.com/screenpipe/screenpipe/pull/3650',
          },
          {
            title:
              '#3592 · fix(windows): excluded apps are now properly filtered from capture',
            link: 'https://github.com/screenpipe/screenpipe/pull/3592',
          },
          {
            title:
              '#2572 · fix: move overlay off root route to prevent cross-window execution',
            link: 'https://github.com/screenpipe/screenpipe/pull/2572',
          },
          {
            title:
              '#3286 · fix(connections): Claude Desktop MSIX support + auth key injection on windows',
            link: 'https://github.com/screenpipe/screenpipe/pull/3286',
          },
        ],
      },
      {
        title: 'Meetings, capture & vision',
        description:
          'Meeting transcript recovery when live STT fails, audio-stall false positives, recording schedule enforcement, macOS screen-recording permission detection, and notes/attendee UX.',
        badge: 'Capture',
        pullRequests: [
          {
            title: '#3410 · fix: meeting transcript loss when live STT fails',
            link: 'https://github.com/screenpipe/screenpipe/pull/3410',
          },
          {
            title:
              '#5011 · fix(health): stop false audio stall/503 during post-meeting transcription catch-up',
            link: 'https://github.com/screenpipe/screenpipe/pull/5011',
          },
          {
            title:
              '#4770 · fix(db): partial index for snapshot compaction to stop false audio-stall notifications',
            link: 'https://github.com/screenpipe/screenpipe/pull/4770',
          },
          {
            title:
              '#5393 · fix(vision): detect stale screen-recording permission when macOS enumerates zero displays',
            link: 'https://github.com/screenpipe/screenpipe/pull/5393',
          },
          {
            title:
              '#2952 · fix: enforce recording schedule and reset stale pause flag on restart',
            link: 'https://github.com/screenpipe/screenpipe/pull/2952',
          },
          {
            title:
              '#5605 · fix(meetings): stop live transcript stall notification firing on silence',
            link: 'https://github.com/screenpipe/screenpipe/pull/5605',
          },
          {
            title: '#5033 · feat(meeting): pill-based attendee editor',
            link: 'https://github.com/screenpipe/screenpipe/pull/5033',
          },
          {
            title:
              '#4332 · fix: Screenpipe Cloud transcription fallback for paid Basic users',
            link: 'https://github.com/screenpipe/screenpipe/pull/4332',
          },
        ],
      },
      {
        title: 'Pipes, notifications & onboarding',
        description:
          'Event/cron pipe reliability, /notify boundary enforcement, discover/offline UX, Business upgrade and timeline opt-out onboarding, and first-run fail-open guidance.',
        badge: 'Pipes',
        pullRequests: [
          {
            title:
              '#5487 · fix(pipes): run event-triggered pipes once per event',
            link: 'https://github.com/screenpipe/screenpipe/pull/5487',
          },
          {
            title:
              '#4540 · fix(pipes): enforce notification toggle at /notify boundary',
            link: 'https://github.com/screenpipe/screenpipe/pull/4540',
          },
          {
            title:
              '#4535 · fix(notifications): prevent /notify hangs when panel UI stalls',
            link: 'https://github.com/screenpipe/screenpipe/pull/4535',
          },
          {
            title:
              '#3315 · fix(pipes): dropdown lag, stuck skeleton, offline UX, and discover feedback',
            link: 'https://github.com/screenpipe/screenpipe/pull/3315',
          },
          {
            title:
              '#5506 · feat(onboarding): offer timeline opt-out only on low-tier devices',
            link: 'https://github.com/screenpipe/screenpipe/pull/5506',
          },
          {
            title:
              '#5428 · fix(onboarding): make first-run guide fail open and opt-in',
            link: 'https://github.com/screenpipe/screenpipe/pull/5428',
          },
          {
            title: '#2949 · feat: add connection step to onboarding',
            link: 'https://github.com/screenpipe/screenpipe/pull/2949',
          },
          {
            title:
              '#2599 · feat: inline connection setup modal on pipe install',
            link: 'https://github.com/screenpipe/screenpipe/pull/2599',
          },
        ],
      },
      {
        title: 'App architecture cleanup (hooks & data fetching)',
        description:
          'Led a useEffect cleanup pass: shared Tauri/DOM/interval hooks, TanStack Query for installed apps, store-sourced pipe-watch messages, and lint guardrails so effects stay intentional.',
        badge: 'Architecture',
        pullRequests: [
          {
            title:
              '#4790 · feat(app): add useEffect cleanup infra — shared hooks, TanStack Query, lint guardrail',
            link: 'https://github.com/screenpipe/screenpipe/pull/4790',
          },
          {
            title:
              '#4938 · refactor(app): subscribe to Tauri events via the shared useTauriEvent hook',
            link: 'https://github.com/screenpipe/screenpipe/pull/4938',
          },
          {
            title:
              '#4939 · refactor(app): drive periodic re-render tickers with the useInterval hook',
            link: 'https://github.com/screenpipe/screenpipe/pull/4939',
          },
          {
            title:
              '#4940 · refactor(app): use the useEventListener hook for window DOM listeners',
            link: 'https://github.com/screenpipe/screenpipe/pull/4940',
          },
          {
            title:
              '#4898 · refactor(app): convert useInstalledApps to TanStack Query (useEffect cleanup phase 2)',
            link: 'https://github.com/screenpipe/screenpipe/pull/4898',
          },
          {
            title:
              '#4896 · refactor(chat): source pipe-watch messages from store, drop mirror effect',
            link: 'https://github.com/screenpipe/screenpipe/pull/4896',
          },
          {
            title:
              '#5021 · refactor(effects): route listeners, pollers & DOM events through custom hooks',
            link: 'https://github.com/screenpipe/screenpipe/pull/5021',
          },
        ],
      },
      {
        title: 'Homebrew release for Screenpipe',
        description:
          'Published Screenpipe to official Homebrew/core with CI/CD integration.',
        bounty: '$50 bounty',
        link: 'https://github.com/screenpipe/screenpipe/pull/623',
        pullRequests: [
          {
            title: '#623 · chore: release screenpipe to official Homebrew/core',
            link: 'https://github.com/screenpipe/screenpipe/pull/623',
          },
        ],
      },
    ],
  },
  {
    company: 'CX Linux AI',
    role: 'Software Engineer / Maintainer',
    period: 'Dec 2025 - Feb 2026',
    description:
      'AI-native Linux distribution. Reviewed PRs across the codebase, shipped distro tooling, packaging, and CI. Created and initialized cx-distro (CX Linux ISO Builder).',
    logo: 'https://unavatar.io/github/cxlinux-ai',
    link: 'https://github.com/Anshgrover23?org=cxlinux-ai&year_list=1',
    totalPRs: '28+',
    techStack: [
      { label: 'Shell' },
      { label: 'Rust', icon: '/svg-icons/rust.svg' },
      {
        label: 'Python',
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg',
      },
    ] satisfies ExperienceTech[],
    contributions: [
      {
        title: 'Created & initialized CX Linux ISO Builder (cx-distro)',
        description:
          'Bootstrapped the CX Linux distro — AI-native Linux distribution. Ubuntu/Debian base with embedded LLM. Built hybrid ISO (live boot + full installer), branding, and build pipeline.',
        badge: 'Project lead',
        pullRequests: [
          {
            title:
              '#10 · Bootstrap cortex linux distro hybrid ISO (Live boot + Full installer mode)',
            link: 'https://github.com/cxlinux-ai/cx-distro/pull/10',
          },
          {
            title: '#53 · [WIP] rebrand to CX linux',
            link: 'https://github.com/cxlinux-ai/cx-distro/pull/53',
          },
        ],
      },
      {
        title: 'Core platform: packaging, CI, and developer experience',
        description:
          'Added Debian package infrastructure for cx-core, Python 3.13 support, release workflow fixes, unified CI dependency steps, and automated formatting/stale PR workflows.',
        badge: 'cx-core',
        pullRequests: [
          {
            title: '#660 · feat(packaging): Add Debian package infrastructure',
            link: 'https://github.com/cxlinux-ai/cx-core/pull/660',
          },
          {
            title: '#646 · feat: add Python 3.13 support',
            link: 'https://github.com/cxlinux-ai/cx-core/pull/646',
          },
          {
            title: '#655 · fix: add permissions to release workflow build job',
            link: 'https://github.com/cxlinux-ai/cx-core/pull/655',
          },
          {
            title:
              '#640 · chore: unify dependency installation steps across workflows',
            link: 'https://github.com/cxlinux-ai/cx-core/pull/640',
          },
          {
            title:
              '#618 · fix: add autofix-ci bot to CLA ignore list and fix lint error',
            link: 'https://github.com/cxlinux-ai/cx-core/pull/618',
          },
          {
            title:
              '#614 · ci: add autofix.ci workflow for automatic formatting fixes',
            link: 'https://github.com/cxlinux-ai/cx-core/pull/614',
          },
          {
            title: '#613 · feat(ci): add stale PR management workflow',
            link: 'https://github.com/cxlinux-ai/cx-core/pull/613',
          },
        ],
      },
    ],
  },
  {
    company: 'Antiwork',
    role: 'Contract Software Engineer',
    period: 'Jul 2025 - Oct 2025',
    description:
      'Shipped major features end-to-end. Contract work in private repos; compensation details below.',
    logo: 'antiwork.svg',
    link: 'https://flexile.com',
    totalPRs: '55+',
    totalBounties: '$40,000 (Flexile)',
    techStack: [
      { label: 'TypeScript', icon: '/svg-icons/typescript.svg' },
      { label: 'Next.js', icon: '/svg-icons/nextjs.svg' },
      { label: 'Ruby', icon: '/svg-icons/ruby.svg' },
    ] satisfies ExperienceTech[],
    reposPrivate: true,
    compensationDetailsImage: '/payment.png',
    contributions: [
      {
        title:
          'Designed and shipped Flexile equity management experiences end-to-end',
        description:
          'Designed and shipped Equity Management features in Flexile — including Cap Tables, Option Pools, and Lawyer Management UI — while migrating company updates and related modules from tRPC to a Rails API for improved consistency and backend performance.',
        badge: '$15k total bounties earned',
        pullRequests: [
          {
            title: '#691 · feat: Manage lawyers via UI',
            link: 'https://github.com/antiwork/flexile/pull/691',
          },
          {
            title: '#1031 · feat: cap table UI',
            link: 'https://github.com/antiwork/flexile/pull/1031',
          },
          {
            title: '#1128 · feat: create option pools via UI',
            link: 'https://github.com/antiwork/flexile/pull/1128',
          },
          {
            title:
              '#1210 · refactor(cap_table): make cap_table a singular resource',
            link: 'https://github.com/antiwork/flexile/pull/1210',
          },
          {
            title:
              '#1093 · feat(equity-settings): require company name before enabling equity',
            link: 'https://github.com/antiwork/flexile/pull/1093',
          },
          {
            title:
              '#1030 · Refactor InviteLawyer service to improve user invitation logic',
            link: 'https://github.com/antiwork/flexile/pull/1030',
          },
          {
            title: '#913 · Remove expenses feature flag and related check',
            link: 'https://github.com/antiwork/flexile/pull/913',
          },
          {
            title:
              '#907 · Remove QuickBooks feature flag checks from backend and frontend',
            link: 'https://github.com/antiwork/flexile/pull/907',
          },
          {
            title: '#673 · feat: add equity management feature in settings',
            link: 'https://github.com/antiwork/flexile/pull/673',
          },
          {
            title:
              '#660 · refactor: consolidate equity flags into equity_enabled',
            link: 'https://github.com/antiwork/flexile/pull/660',
          },
          {
            title: '#641 · remove use of companyUpdatesEnabled flag',
            link: 'https://github.com/antiwork/flexile/pull/641',
          },
        ],
      },
      {
        title: 'Enabled automated CI and hardened end-to-end test coverage',
        description:
          'Enabled automated CI runs for contributor pull requests and expanded Playwright coverage across Helper, eliminating fragile page objects and strengthening accessibility selectors for more reliable contributions.',
        badge: '7.5k$ total bounties earned',
        pullRequests: [
          {
            title:
              '#1019 · Enable CI to run automatically on contributor pull requests',
            link: 'https://github.com/antiwork/helper/pull/1019',
          },
          {
            title:
              '#902 · fix(e2e): mock FIRECRAWL_API_KEY in CI & improve accessibility selectors',
            link: 'https://github.com/antiwork/helper/pull/902',
          },
          {
            title:
              '#900 · fix: E2E tests and remove page object from newMessageWithsavedRepliesPage',
            link: 'https://github.com/antiwork/helper/pull/900',
          },
          {
            title: '#895 · Remove widget page object usage',
            link: 'https://github.com/antiwork/helper/pull/895',
          },
          {
            title: '#873 · remove base page object usage',
            link: 'https://github.com/antiwork/helper/pull/873',
          },
          {
            title: '#872 · remove login page object usage',
            link: 'https://github.com/antiwork/helper/pull/872',
          },
          {
            title: '#854 · tests: add E2E tests for customer settings page',
            link: 'https://github.com/antiwork/helper/pull/854',
          },
          {
            title:
              '#851 · Refactor Conversations E2E Tests: Inline Locators and Remove Page Object',
            link: 'https://github.com/antiwork/helper/pull/851',
          },
        ],
      },
      {
        title:
          'Removed legacy encrypted-field logic by migrating to plaintext storage',
        description:
          'Simplified Helper setup and data handling by replacing encrypted-field workflow with plaintext columns, a safe conversion job, and follow-up cleanup across schema and app logic.',
        badge: '5k$ bountied issue',
        pullRequests: [
          {
            title:
              '#865 · Refactor: replace encrypted fields with plaintext columns in database schema',
            link: 'https://github.com/antiwork/helper/pull/865',
          },
          {
            title:
              '#912 · Remove encrypted fields from database schema and related logic',
            link: 'https://github.com/antiwork/helper/pull/912',
          },
          {
            title:
              '#839 · refactor: add plaintext columns for encrypted fields in database schema',
            link: 'https://github.com/antiwork/helper/pull/839',
          },
          {
            title:
              '#858 · feat: add migration job for encrypted to plaintext data conversion',
            link: 'https://github.com/antiwork/helper/pull/858',
          },
        ],
      },
      {
        title: 'Refactored Helper into a single-tenant mailbox platform',
        description:
          'Refactored Helper from a multi-tenant to single-tenant architecture and simplified mailbox logic to improve maintainability and deployment simplicity.',
        badge: '2.5k$ bountied issue',
        pullRequests: [
          {
            title:
              '#703 · Remove mailbox switcher dropdown and mailboxes.list procedure',
            link: 'https://github.com/antiwork/helper/pull/703',
          },
          {
            title:
              '#704 · refactor: replace getMailboxById/getMailboxBySlug with getMailbox',
            link: 'https://github.com/antiwork/helper/pull/704',
          },
          {
            title: '#706 · refactor: rename mailboxId to unused_mailboxId',
            link: 'https://github.com/antiwork/helper/pull/706',
          },
          {
            title:
              '#733 · fix: remove flexile and helper fixtures & fix nesting structure',
            link: 'https://github.com/antiwork/helper/pull/733',
          },
          {
            title:
              '#721 · Remove mailboxSlug from all frontend routes, components, and widget code for single-tenant migration',
            link: 'https://github.com/antiwork/helper/pull/721',
          },
        ],
      },
      {
        title: 'Added GitHub authentication to Gumboard',
        description:
          'Implemented OAuth-based GitHub authentication in Gumboard with end-to-end tests and documentation updates, showcasing ability to ship secure, scalable login flows.',
        badge: '1k$ total bounty',
        pullRequests: [
          {
            title: '#125 · Add GitHub auth',
            link: 'https://github.com/antiwork/gumboard/pull/125',
          },
        ],
      },
      {
        title:
          'Moved company update workflows from tRPC to the Rails API surface',
        description:
          'Migrated frontend company updates database calls onto the Rails API to standardize data access patterns and unlock backend performance improvements.',
        badge: '$500 total bounty',
        pullRequests: [
          {
            title:
              '#1207 · feat(company_updates): migrate frontend db calls to Rails API',
            link: 'https://github.com/antiwork/flexile/pull/1207',
          },
        ],
      },
    ],
  },
  {
    company: 'TSCircuit',
    role: 'Software Engineer',
    period: 'Aug 2024 - Jun 2025',
    description:
      'Built and maintained circuit design tools and testing infrastructure',
    logo: 'tscircuit.svg',
    link: 'https://tscircuit.com/',
    totalPRs: '100+',
    totalBounties: '$809+',
    techStack: [
      { label: 'TypeScript', icon: '/svg-icons/typescript.svg' },
      { label: 'React', icon: '/svg-icons/reactjs.svg' },
    ] satisfies ExperienceTech[],
    contributions: [
      {
        title: 'Issue Roulette Game',
        description:
          'Built a full frontend using React & TypeScript that randomly assigns GitHub issues to contributors.',
        bounty: '$40 bounty',
        link: 'https://issue-roulette-red.vercel.app/',
      },
      {
        title: 'Contribution Tracker',
        description:
          'Designed and implemented the frontend for tracking contributor activities.',
        link: 'https://contributions.tscircuit.com/',
      },
      {
        title: 'Maintenance Tracker',
        description:
          'Boosted flaky test coverage from 5% to 95%+ using Playwright.',
        bounty: '$20+ bounty',
        link: 'https://maintenance.tscircuit.com/',
      },
      {
        title: 'Fake Reddit',
        description: 'Set up initial fake-backend endpoints and architecture.',
        bounty: '$25+ bounty',
        link: 'https://github.com/tscircuit/fake-reddit/pull/3',
      },
    ],
  },
  {
    company: 'Mediar-AI',
    role: 'Open Source Contributor',
    period: 'Mar 2025 - Jun 2025',
    description: 'Built dev tools and automation scripts for Terminator.',
    logo: 'mediar-ai.png',
    link: 'https://github.com/mediar-ai',
    totalPRs: '20+',
    totalBounties: '$280+',
    techStack: [
      { label: 'Rust', icon: '/svg-icons/rust.svg' },
      { label: 'TypeScript', icon: '/svg-icons/typescript.svg' },
    ] satisfies ExperienceTech[],
    contributions: [
      {
        title: 'Highlight Element Debugging Tool',
        description:
          'Created a visual bounding box feature for Terminator to help devs debug AI workflows.',
        bounty: '$100 bounty',
        link: 'https://github.com/mediar-ai/terminator/pull/41',
      },
      {
        title: 'Gmail Automation Tool',
        description:
          'Implements a script to automate Gmail operations like sending mail.',
        bounty: '$100 bounty',
        link: 'https://github.com/mediar-ai/terminator/pull/38',
      },
      {
        title: 'VLC Media Player Automation',
        description:
          'Add VLC media player automation example script with support for YouTube streams and local video playback.',
        bounty: '$80 bounty',
        link: 'https://github.com/mediar-ai/terminator/pull/35',
      },
    ],
  },
  {
    company: 'Archestra',
    role: 'Open Source Contributor',
    period: 'Contributing since 2025',
    description:
      'Built SSO provider infrastructure for the Terraform provider enabling enterprise authentication.',
    logo: 'archestra.png',
    link: 'https://github.com/archestra-ai/terraform-provider-archestra',
    totalPRs: '1+',
    techStack: [
      { label: 'Terraform', icon: '/svg-icons/terraform.svg' },
      {
        label: 'Go',
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/go/go-original.svg',
      },
    ] satisfies ExperienceTech[],
    contributions: [
      {
        title: 'Added SSO provider resource for OIDC and SAML',
        description:
          'Implemented full archestra_sso_provider resource with CRUD operations for both OIDC and SAML SSO configurations, including terraform import support, acceptance tests, and comprehensive field mappings (+2,302 lines).',
        link: 'https://github.com/archestra-ai/terraform-provider-archestra/pull/65',
      },
    ],
  },
  {
    company: 'Sugar Labs',
    role: 'Open Source Contributor',
    period: 'Contributing since 2025',
    description:
      'Fixed UI bugs and improved user experience on the Sugar Labs website.',
    logo: 'sugarlabs.svg',
    link: 'https://github.com/sugarlabs',
    totalPRs: '1+',
    techStack: [
      { label: 'TypeScript', icon: '/svg-icons/typescript.svg' },
      { label: 'React', icon: '/svg-icons/reactjs.svg' },
    ] satisfies ExperienceTech[],
    contributions: [
      {
        title: 'Fixed UI bugs on stats cards',
        description:
          'Added hover functionality to stats cards to display full text descriptions when hovering over truncated text, improving readability and UX.',
        link: 'https://github.com/sugarlabs/www-v2/pull/583',
      },
    ],
  },
  {
    company: 'TwentyHQ',
    role: 'Open Source Contributor',
    period: 'Contributing since 2025',
    description:
      'Improved CSV import UX by making the download sample feature more discoverable.',
    logo: 'twentyhq.svg',
    link: 'https://github.com/twentyhq',
    totalPRs: '2+',
    techStack: [
      { label: 'TypeScript', icon: '/svg-icons/typescript.svg' },
      { label: 'Next.js', icon: '/svg-icons/nextjs.svg' },
    ] satisfies ExperienceTech[],
    contributions: [
      {
        title: 'Fixed markdown link formatting',
        description:
          'Fixed markdown link formatting in CONTRIBUTING.md by correcting the syntax from (text)[url] to the proper [text](url) format.',
        link: 'https://github.com/twentyhq/twenty/pull/16176',
      },
      {
        title: 'Added prominent Download sample button',
        description:
          'Improved discoverability of the "Download sample" feature in the CSV import flow by replacing the text link with a prominent button, addressing customer feedback.',
        link: 'https://github.com/twentyhq/twenty/pull/16193',
      },
    ],
  },
  {
    company: 'Algora.io',
    role: 'Open Source Contributor',
    period: 'Contributing since 2024',
    description:
      'Delivered solutions across multiple organizations, recognized with $1099+ in compensation.',
    logo: 'algora.svg',
    link: 'https://algora.io/Anshgrover23',
    totalPRs: '33+',
    totalBounties: '$1099+',
    techStack: [] satisfies ExperienceTech[],
    contributions: [
      {
        title: 'Multiple Bounty Completions',
        description:
          'Successfully completed various development challenges across different organizations, earning significant bounties for quality contributions.',
        bounty: '$1099+ total earned',
        link: 'https://algora.io/Anshgrover23',
      },
    ],
  },
] satisfies Experience[];
