import {
  Bricolage_Grotesque,
  Fraunces,
  JetBrains_Mono,
} from 'next/font/google';

/**
 * Type kit — deliberately distinctive, away from the "AI slop" font set.
 *
 * - Fraunces: display headings. Variable font with an optical-size axis
 *   and a real italic. The serif of choice for editorial work that wants
 *   personality without going into Playfair territory.
 * - Bricolage Grotesque: body and UI. Variable, has a width axis,
 *   geometric but warm. Not Inter, not Roboto, not Geist.
 * - JetBrains Mono: meta, dates, code, stats. More character than
 *   Plex Mono and the italic has actual flair.
 */
export const fontDisplay = Fraunces({
  variable: '--font-display',
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800', '900'],
  style: ['normal', 'italic'],
  display: 'swap',
});

export const fontSans = Bricolage_Grotesque({
  variable: '--font-sans',
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800'],
  display: 'swap',
});

export const fontMono = JetBrains_Mono({
  variable: '--font-mono',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  style: ['normal', 'italic'],
  display: 'swap',
});

export const fontVariables = `${fontSans.variable} ${fontDisplay.variable} ${fontMono.variable}`;
