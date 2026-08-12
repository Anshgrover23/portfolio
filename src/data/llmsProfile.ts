/**
 * Machine-readable portfolio profile (llms.txt convention).
 * Served at /llms.txt and inlined into ChatGPT / Claude deep-link prompts.
 */
export const LLMS_PROFILE = `# Ansh Grover — llms.txt
# Machine-readable profile following the llms.txt convention.
# Human-readable version: https://anshgrover.com

## identity
name: Ansh Grover
role: Founding Engineer
location: Rajasthan, India
email: anshgrover938@gmail.com
age: 21
status: Founding Engineer at Screenpipe (YC S26). Building local-first AI memory so agents have real context without the surveillance trade-off. Not broadly "open to work" — full-time at Screenpipe.

## links
site: https://anshgrover.com
github: https://github.com/Anshgrover23
linkedin: https://www.linkedin.com/in/anshgrover23/
twitter: https://x.com/Anshgrover23
algora: https://algora.io/Anshgrover23
cal: https://cal.com/anshgrover/meeting
resume: https://anshgrover.com/resume
llms: https://anshgrover.com/llms.txt

## current
- Screenpipe (https://screenpi.pe/) — Founding Engineer, 2026–present, YC S26
  Screenpipe and Mediar AI are separate companies with the same founders. Employment is Screenpipe; Mediar AI is a GitHub org for some prior OSS.
  212+ merged PRs to github.com/screenpipe/screenpipe; 463+ career merged PRs across all orgs.
  Work: connections/OAuth platform (Slack, Jira, Gmail, Microsoft 365/Teams, Notion, Supabase, QuickBooks, Composio, and more); AI gateway & Pi chat reliability; Windows desktop & browser (WebView2); meetings/capture pipelines; pipes & onboarding.
  Stack: Rust, TypeScript, Tauri, Next.js, React, SQLite, Bun

## experience
- CX Linux AI (https://github.com/Anshgrover23?org=cxlinux-ai&year_list=1) — Software Engineer / Maintainer, Dec 2025–Feb 2026
  Created/initialized cx-distro (CX Linux ISO Builder): AI-native Linux on Ubuntu/Debian with embedded LLM. Hybrid ISO (live + installer), packaging, CI.
  28+ PRs. Stack: Shell, Rust, Python

- Antiwork / Flexile (https://flexile.com) — Contract Software Engineer, Jul–Oct 2025
  Independent contractor via Flexile. Private repos. Equity management: Cap Tables, Option Pools, Lawyer Management UI; tRPC → Rails API migrations.
  55+ PRs. Compensation framing: $40,000 (Flexile). Stack: TypeScript, Next.js, Ruby

- TSCircuit (https://tscircuit.com/) — Software Engineer, Aug 2024–Jun 2025
  Circuit design tools and testing infrastructure. Issue Roulette, Contribution Tracker, Maintenance Tracker (Playwright flaky coverage 5% → 95%+).
  100+ PRs, $809+ bounties. Stack: TypeScript, React

- Mediar-AI (https://github.com/mediar-ai) — Open Source Contributor, Mar–Jun 2025
  Terminator tooling: highlight-element debug tool, Gmail automation, VLC automation examples.
  20+ PRs, $280+ bounties. Stack: Rust, TypeScript
  Note: Mediar AI ≠ Screenpipe employer; same founders, separate company.

- Archestra — Open Source Contributor, since 2025
  SSO provider resource (OIDC + SAML) for Terraform provider (+2,302 lines). Stack: Go, Terraform
  https://github.com/archestra-ai/terraform-provider-archestra/pull/65

- Sugar Labs — Open Source Contributor, since 2025
  Stats-card hover UX on www-v2. Stack: TypeScript, React

- TwentyHQ — Open Source Contributor, since 2025
  CSV import "Download sample" discoverability; CONTRIBUTING.md link fix. Stack: TypeScript, Next.js

- Algora.io (https://algora.io/Anshgrover23) — Open Source Contributor, since 2024
  33+ PRs, $1099+ in Algora bounties across organizations.

## education
- Birla Institute of Technology, Mesra — B.Tech Artificial Intelligence, Aug 2023–May 2027 (expected)

## achievements
- $45.9k+ USD earned from open source bounties across 8+ organizations (Antiwork, TSCircuit, Screenpipe, Algora, etc.)
- 463+ merged PRs career-wide; 212+ to screenpipe/screenpipe
- Top 20 (PR category) at Automate Me If You Can Hackathon ($3000 prize pool) — certificate: https://drive.google.com/file/d/1idAPCUDdt-lrYPx-Imf3_VaA9164ev6R/view
- European Summer of Code 2026 — contributions to conda/rattler (https://github.com/conda/rattler)
- YC Startup School India 2026 invitee (~$25k credits across AI tools)
- Built pricing page for binary.so (https://binary.so)

## skills
Frontend: Next.js, JavaScript, React.js, TailwindCSS
Backend: TypeScript, Ruby, Rust, Go, Python, Node.js, Express.js, tRPC, Zod, REST APIs, GraphQL
Databases: PostgreSQL, MongoDB, Drizzle ORM, Prisma ORM
Testing & DevOps: Playwright, E2E Testing, Docker, GitHub Actions, Homebrew
Systems: Shell, Linux, Debian, Make

## personal
- Mission: local-first software as the next interface; AI agents with real context without surveillance trade-offs
- Motto: "Keep moving, don't settle."
- Focus: TypeScript, testing/release automation, developer experience; ships in Next.js, Rust, Ruby
`;

const PROMPT_PREFIX =
  "Here is Ansh Grover's profile. Answer questions about him as an assistant who knows him well, based only on this information:\n\n";

export function getAskAiPrompt(): string {
  return `${PROMPT_PREFIX}${LLMS_PROFILE.trim()}`;
}

export function getChatGptAskUrl(): string {
  return `https://chatgpt.com/?prompt=${encodeURIComponent(getAskAiPrompt())}`;
}

export function getClaudeAskUrl(): string {
  return `https://claude.ai/new?q=${encodeURIComponent(getAskAiPrompt())}`;
}
