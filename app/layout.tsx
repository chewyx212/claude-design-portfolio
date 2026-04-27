import type { Metadata } from 'next';
import {
  JetBrains_Mono,
  Geist,
  Geist_Mono,
  IBM_Plex_Mono,
  IBM_Plex_Sans,
  Fira_Code,
} from 'next/font/google';
import './globals.css';

const jetbrainsMono = JetBrains_Mono({
  variable: '--font-jetbrains-mono',
  subsets: ['latin'],
  weight: ['400', '500', '600'],
});
const geist = Geist({
  variable: '--font-geist',
  subsets: ['latin'],
});
const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});
const ibmPlexMono = IBM_Plex_Mono({
  variable: '--font-ibm-plex-mono',
  subsets: ['latin'],
  weight: ['400', '500'],
});
const ibmPlexSans = IBM_Plex_Sans({
  variable: '--font-ibm-plex-sans',
  subsets: ['latin'],
  weight: ['400', '500'],
});
const firaCode = Fira_Code({
  variable: '--font-fira-code',
  subsets: ['latin'],
  weight: ['400', '500'],
});

export const metadata: Metadata = {
  title: 'Chew Yuen Xuen — Portfolio',
  description: 'Frontend developer · full stack capable · 5 years · Singapore / Malaysia',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const fontVars = [
    jetbrainsMono.variable,
    geist.variable,
    geistMono.variable,
    ibmPlexMono.variable,
    ibmPlexSans.variable,
    firaCode.variable,
  ].join(' ');

  return (
    <html lang="en" className={fontVars}>
      <body>{children}</body>
    </html>
  );
}
