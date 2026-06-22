import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import { ImageResponse } from 'next/og';
import { OG_IMAGE_SIZE } from '@/lib/og';

export const ogImageContentType = 'image/png';
export const ogImageSize = OG_IMAGE_SIZE;

const COLORS = {
  background: '#12100E',
  foreground: '#EDE8DF',
  muted: '#9A9288',
  accent: '#D9642E',
  border: 'rgba(237, 232, 223, 0.12)',
  panel: 'rgba(237, 232, 223, 0.04)',
} as const;

export type OgImageContent = {
  eyebrow?: string;
  title?: string;
  titleItalic?: string;
  subtitle?: string;
  body?: string;
  stats?: Array<{ value: string; label: string }>;
  footer?: string;
  showPortrait?: boolean;
};

const DEFAULT_CONTENT: Required<OgImageContent> = {
  eyebrow: 'Founding engineer · YC S26',
  title: 'Ansh',
  titleItalic: 'Grover',
  subtitle: 'Founding Engineer @ Screenpipe · YC S26',
  body: 'Building local-first context for AI agents.',
  stats: [
    { value: '315+', label: 'Merged PRs' },
    { value: '$45.9k+', label: 'Bounties' },
    { value: '8+', label: 'Orgs' },
  ],
  footer: 'anshgrover.com',
  showPortrait: true,
};

async function loadGoogleFont(
  family: string,
  weights: string,
  style: 'normal' | 'italic' = 'normal'
) {
  const css = await fetch(
    `https://fonts.googleapis.com/css2?family=${family}:${style === 'italic' ? 'ital,' : ''}wght@${weights}&display=swap`,
    {
      headers: {
        // Older Safari UA returns TTF files, which ImageResponse supports.
        'User-Agent':
          'Mozilla/5.0 (Macintosh; U; Intel Mac OS X 10_6_8; de-at) AppleWebKit/533.21.1 (KHTML, like Gecko) Version/5.0.5 Safari/533.21.1',
      },
    }
  ).then(response => response.text());

  const resource =
    css.match(/src: url\((.+)\) format\('(?:truetype|opentype)'\)/)?.[1] ??
    css.match(/src: url\((.+)\) format\('woff'\)/)?.[1];

  if (!resource) {
    throw new Error(`Unable to load font: ${family}`);
  }

  return fetch(resource).then(response => response.arrayBuffer());
}

async function loadOgFonts() {
  const [display, sans, mono] = await Promise.all([
    loadGoogleFont('Fraunces', '1,800', 'italic'),
    loadGoogleFont('Bricolage+Grotesque', '700'),
    loadGoogleFont('JetBrains+Mono', '500'),
  ]);

  return { display, sans, mono };
}

async function loadPortraitDataUrl() {
  try {
    const avatar = await readFile(join(process.cwd(), 'public/avatar.jpg'));
    return `data:image/jpeg;base64,${avatar.toString('base64')}`;
  } catch {
    return null;
  }
}

function mergeContent(content: OgImageContent = {}) {
  return { ...DEFAULT_CONTENT, ...content };
}

export async function generateOgImage(content: OgImageContent = {}) {
  const merged = mergeContent(content);
  const [fonts, portrait] = await Promise.all([
    loadOgFonts(),
    merged.showPortrait ? loadPortraitDataUrl() : Promise.resolve(null),
  ]);

  const titleLength = merged.title.length + merged.titleItalic.length;
  const titleFontSize = titleLength > 42 ? 56 : titleLength > 28 ? 72 : 92;
  const hasItalicTitle = merged.titleItalic.trim().length > 0;

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          backgroundColor: COLORS.background,
          backgroundImage:
            'radial-gradient(ellipse 90% 70% at 0% 0%, rgba(217, 100, 46, 0.18), transparent 55%), radial-gradient(ellipse 60% 50% at 100% 100%, rgba(237, 232, 223, 0.06), transparent 60%)',
          color: COLORS.foreground,
          padding: '64px 72px',
          position: 'relative',
          fontFamily: 'Bricolage Grotesque',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 10,
            fontSize: 22,
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            color: COLORS.accent,
          }}
        >
          <div
            style={{
              width: 10,
              height: 10,
              borderRadius: 999,
              backgroundColor: COLORS.accent,
            }}
          />
          {merged.eyebrow}
        </div>

        <div
          style={{
            marginTop: 36,
            display: 'flex',
            flex: 1,
            justifyContent: 'space-between',
            gap: 48,
          }}
        >
          <div style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                alignItems: 'baseline',
                gap: hasItalicTitle ? 18 : 0,
                fontFamily: 'Fraunces',
                fontSize: titleFontSize,
                lineHeight: 1.02,
                letterSpacing: '-0.045em',
                maxWidth: portrait ? 760 : 980,
              }}
            >
              <span style={{ fontWeight: 800 }}>{merged.title}</span>
              {hasItalicTitle ? (
                <span
                  style={{
                    fontWeight: 300,
                    fontStyle: 'italic',
                    color: 'rgba(237, 232, 223, 0.88)',
                  }}
                >
                  {merged.titleItalic}
                </span>
              ) : null}
            </div>

            <div
              style={{
                marginTop: 18,
                fontSize: 30,
                lineHeight: 1.25,
                color: COLORS.muted,
                maxWidth: 760,
              }}
            >
              {merged.subtitle}
            </div>

            <div
              style={{
                marginTop: 42,
                fontSize: 38,
                lineHeight: 1.35,
                maxWidth: 720,
                color: COLORS.foreground,
              }}
            >
              {merged.body}
            </div>

            <div
              style={{
                marginTop: 'auto',
                paddingTop: 48,
                display: 'flex',
                gap: 28,
                borderTop: `1px solid ${COLORS.border}`,
              }}
            >
              {merged.stats.map(stat => (
                <div
                  key={stat.label}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    minWidth: 150,
                  }}
                >
                  <span
                    style={{
                      fontFamily: 'JetBrains Mono',
                      fontSize: 34,
                      fontWeight: 500,
                      color: COLORS.foreground,
                    }}
                  >
                    {stat.value}
                  </span>
                  <span
                    style={{
                      marginTop: 8,
                      fontSize: 18,
                      letterSpacing: '0.06em',
                      textTransform: 'uppercase',
                      color: COLORS.muted,
                    }}
                  >
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {portrait ? (
            <div
              style={{
                display: 'flex',
                alignItems: 'flex-end',
                justifyContent: 'flex-end',
              }}
            >
              <div
                style={{
                  width: 240,
                  height: 300,
                  borderRadius: 24,
                  overflow: 'hidden',
                  border: `1px solid ${COLORS.border}`,
                  boxShadow: '0 24px 80px rgba(0, 0, 0, 0.35)',
                  display: 'flex',
                }}
              >
                <img
                  src={portrait}
                  alt=""
                  width={240}
                  height={300}
                  style={{
                    objectFit: 'cover',
                    objectPosition: 'center 28%',
                  }}
                />
              </div>
            </div>
          ) : null}
        </div>

        <div
          style={{
            marginTop: 28,
            display: 'flex',
            justifyContent: 'flex-end',
            fontSize: 22,
            color: COLORS.muted,
          }}
        >
          <span>{merged.footer}</span>
        </div>
      </div>
    ),
    {
      ...OG_IMAGE_SIZE,
      fonts: [
        {
          name: 'Fraunces',
          data: fonts.display,
          style: 'italic',
          weight: 800,
        },
        {
          name: 'Bricolage Grotesque',
          data: fonts.sans,
          style: 'normal',
          weight: 700,
        },
        {
          name: 'JetBrains Mono',
          data: fonts.mono,
          style: 'normal',
          weight: 500,
        },
      ],
    }
  );
}
