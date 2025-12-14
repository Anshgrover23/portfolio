export const experiences = [
  {
    company: 'Antiwork',
    role: 'Open Source Contributor',
    period: '2025 - Present',
    headline: 'Build multiple major features and shipped them perfectly.',
    logo: 'antiwork.svg',
    link: 'https://github.com/antiwork/helper',
    totalPRs: '55+',
    totalBounties: '$40,000 (Flexile)',
    techStack: ['TypeScript', 'Next.js', 'Ruby'],
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
        techStack: ['TypeScript', 'Next.js', 'Ruby'],
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
        techStack: ['TypeScript', 'Next.js', 'Ruby'],
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
        techStack: ['TypeScript', 'Next.js', 'Ruby'],
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
        techStack: ['TypeScript', 'Next.js', 'Ruby'],
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
    role: 'Open Source Contributor/Maintainer',
    period: '2024 - Present',
    description:
      'Contributing to circuit design tools and testing infrastructure',
    logo: 'tscircuit.svg',
    link: 'https://tscircuit.com/',
    totalPRs: '100+',
    totalBounties: '$809+',
    techStack: ['TypeScript', 'Next.js', 'Ruby'],
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
    period: '2024 - Present',
    description:
      'Built dev tools, automation scripts, and published Screenpipe to Homebrew.',
    logo: 'mediar-ai.svg',
    link: 'https://www.mediar.ai/',
    totalPRs: '20+',
    totalBounties: '$250+',
    techStack: ['TypeScript', 'Next.js', 'Ruby'],
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
        link: 'https://github.com/mediar-ai/terminator/pull/35',
      },
      {
        title: 'Homebrew Release for Screenpipe',
        description:
          'Published the Screenpipe tool to Homebrew with CI/CD integration.',
        bounty: '$50 bounty',
        link: 'https://github.com/mediar-ai/screenpipe/pull/623',
      },
    ],
  },
  {
    company: 'Sugar Labs',
    role: 'Open Source Contributor',
    period: '2025 - Present',
    description:
      'Fixed UI bugs and improved user experience on the Sugar Labs website.',
    logo: 'sugarlabs.svg',
    link: 'https://github.com/sugarlabs',
    totalPRs: '1+',
    techStack: ['TypeScript', 'Next.js', 'Ruby'],
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
    period: '2025 - Present',
    description:
      'Improved CSV import UX by making the download sample feature more discoverable.',
    logo: 'twentyhq.svg',
    link: 'https://github.com/twentyhq',
    totalPRs: '2+',
    techStack: ['TypeScript', 'Next.js', 'Ruby'],
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
    role: 'Bounty Hunter',
    period: '2024 - Present',
    description: 'Earned $1099+ in bounties by solving github issues.',
    logo: 'algora.svg',
    link: 'https://algora.io/Anshgrover23',
    totalPRs: '33+',
    totalBounties: '$1099+',
    techStack: ['TypeScript', 'Next.js', 'Ruby'],
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
];
