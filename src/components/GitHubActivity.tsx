import { CalendarDays } from 'lucide-react';

type ContributionDay = {
  date: string;
  contributionCount: number;
  color: string;
};

type ContributionWeek = {
  contributionDays: ContributionDay[];
};

type ContributionCalendar = {
  totalContributions: number;
  weeks: ContributionWeek[];
};

type ContributionResult =
  | {
      calendar: ContributionCalendar;
      totalDays: number;
      username: string;
      from: string;
      to: string;
    }
  | {
      error: string;
    };

const GITHUB_GRAPHQL_ENDPOINT = 'https://api.github.com/graphql';
const DEFAULT_USERNAME = 'Anshgrover23';

const contributionsQuery = `
  query($login: String!, $from: DateTime!, $to: DateTime!) {
    user(login: $login) {
      contributionsCollection(from: $from, to: $to) {
        contributionCalendar {
          totalContributions
          weeks {
            contributionDays {
              color
              contributionCount
              date
            }
          }
        }
      }
    }
  }
`;

async function fetchContributions(): Promise<ContributionResult> {
  const githubToken = process.env.GRAPHQL_TOKEN;
  const username = process.env.NEXT_PUBLIC_GITHUB_USERNAME || DEFAULT_USERNAME;

  if (!githubToken) {
    return {
      error:
        'Contribution graph is optional. Add GRAPHQL_TOKEN to your server environment to load live GitHub data.',
    };
  }

  const to = new Date();
  const from = new Date();
  from.setFullYear(to.getFullYear() - 1);

  const response = await fetch(GITHUB_GRAPHQL_ENDPOINT, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${githubToken}`,
    },
    body: JSON.stringify({
      query: contributionsQuery,
      variables: {
        login: username,
        from: from.toISOString(),
        to: to.toISOString(),
      },
    }),
    next: { revalidate: 60 * 60 * 6 },
  });

  if (!response.ok) {
    return {
      error: `GitHub returned HTTP ${response.status}. The graph stays hidden until the request succeeds.`,
    };
  }

  const payload = await response.json();

  if (payload.errors) {
    return {
      error: payload.errors
        .map(
          (item: { message?: string }) =>
            item?.message ?? 'Unknown GitHub API error'
        )
        .join(', '),
    };
  }

  const calendar: ContributionCalendar | undefined =
    payload?.data?.user?.contributionsCollection?.contributionCalendar;

  if (!calendar) {
    return {
      error: 'GitHub did not return contribution calendar data for this user.',
    };
  }

  const totalDays = calendar.weeks.reduce(
    (acc, week) => acc + week.contributionDays.length,
    0
  );

  return {
    calendar,
    totalDays,
    username,
    from: from.toISOString(),
    to: to.toISOString(),
  };
}

function formatDateRange(fromISO: string, toISO: string) {
  const fromDate = new Date(fromISO);
  const toDate = new Date(toISO);

  const formatter = new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
  });

  const sameYear = fromDate.getFullYear() === toDate.getFullYear();

  return sameYear
    ? `${formatter.format(fromDate)} - ${formatter.format(toDate)}`
    : `${formatter.format(fromDate)}, ${fromDate.getFullYear()} - ${formatter.format(toDate)}, ${toDate.getFullYear()}`;
}

export async function GitHubActivity() {
  const result = await fetchContributions();

  if ('error' in result) {
    return (
      <section
        className="mb-16 md:mb-20"
        aria-labelledby="github-activity-heading"
      >
        <div className="border-t border-line/80 pt-6">
          <div className="flex items-start gap-3">
            <CalendarDays
              className="mt-0.5 h-5 w-5 shrink-0 text-accent"
              strokeWidth={1.5}
            />
            <div className="min-w-0">
              <h3
                id="github-activity-heading"
                className="font-display text-lg font-semibold tracking-tight text-foreground md:text-xl"
              >
                GitHub activity
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {result.error}
              </p>
              <p className="mt-4 font-mono text-[11px] uppercase tracking-wide text-muted-foreground">
                Optional · the block stays minimal without a token.
              </p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  const { calendar, totalDays, username, from, to } = result;
  const weeks = calendar.weeks;
  const dateRangeLabel = formatDateRange(from, to);

  return (
    <section
      className="mb-16 md:mb-20"
      aria-labelledby="github-activity-heading"
    >
      <div className="flex flex-col gap-3 border-t border-line/80 pt-6 md:flex-row md:items-end md:justify-between">
        <div className="flex items-start gap-3">
          <CalendarDays
            className="mt-1 h-5 w-5 shrink-0 text-accent"
            strokeWidth={1.5}
          />
          <div>
            <h3
              id="github-activity-heading"
              className="font-display text-xl font-semibold tracking-tight text-foreground md:text-2xl"
            >
              GitHub activity
            </h3>
            <p className="mt-1 text-sm text-muted-foreground">
              <span className="font-mono tabular-nums text-foreground">
                {calendar.totalContributions.toLocaleString()}
              </span>{' '}
              contributions in the last year · {dateRangeLabel}
            </p>
          </div>
        </div>
        <a
          href={`https://github.com/${username}`}
          target="_blank"
          rel="noopener noreferrer"
          className="shrink-0 self-start font-mono text-[11px] uppercase tracking-meta text-muted-foreground transition-colors hover:text-foreground md:self-end"
        >
          @{username} ↗
        </a>
      </div>

      <div className="mt-6 overflow-x-auto rounded-md border border-line/80 bg-canvas-muted/60 p-2">
        <div
          className="grid gap-1"
          style={{
            gridTemplateColumns: `repeat(${weeks.length}, minmax(10px, 1fr))`,
            gridTemplateRows: 'repeat(7, 12px)',
          }}
        >
          {weeks.map((week, weekIndex) =>
            week.contributionDays.map((day, dayIndex) => (
              <div
                key={`${weekIndex}-${day.date}`}
                className="rounded-[2px]"
                style={{
                  backgroundColor: day.color || 'hsl(var(--muted))',
                  gridColumn: weekIndex + 1,
                  gridRow: dayIndex + 1,
                }}
                title={`${day.contributionCount} contributions on ${new Date(
                  day.date
                ).toLocaleDateString()}`}
              />
            ))
          )}
        </div>
      </div>

      <div className="mt-4 flex flex-col gap-2 text-sm text-muted-foreground md:flex-row md:items-center md:justify-between">
        <div className="flex flex-wrap items-center gap-2">
          <span>Less</span>
          <div className="flex items-center gap-1">{buildLegend(calendar.weeks)}</div>
          <span>More</span>
        </div>
        <p className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
          {Math.round(
            (calendar.totalContributions / Math.max(totalDays, 1)) * 100
          ) / 100}{' '}
          avg/day
        </p>
      </div>
    </section>
  );
}

function buildLegend(weeks: ContributionWeek[]) {
  const legendColors = selectLegendColors(weeks);

  return legendColors.map((color, index) => (
    <span
      key={`${color}-${index}`}
      className="h-3 w-3 rounded-[2px]"
      style={{
        backgroundColor: color,
      }}
    />
  ));
}

function selectLegendColors(weeks: ContributionWeek[]) {
  const colorToContribution = new Map<string, number>();

  weeks.forEach(week => {
    week.contributionDays.forEach(day => {
      if (!day.color) return;

      const existing = colorToContribution.get(day.color);
      if (existing === undefined || day.contributionCount > existing) {
        colorToContribution.set(day.color, day.contributionCount);
      }
    });
  });

  const sorted = Array.from(colorToContribution.entries())
    .sort((a, b) => a[1] - b[1])
    .map(([color]) => color);

  if (sorted.length >= 5) {
    return sorted.slice(0, 5);
  }

  const fallback = [
    'hsl(var(--muted))',
    'hsl(172 18% 78%)',
    'hsl(172 22% 58%)',
    'hsl(172 24% 44%)',
    'hsl(172 26% 32%)',
  ];

  if (sorted.length === 0) {
    return fallback;
  }

  return [...sorted, ...fallback].slice(0, 5);
}
