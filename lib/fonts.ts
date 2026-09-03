import { IBM_Plex_Mono, Instrument_Sans, Newsreader } from "next/font/google";

/** Shared type system for CoreState and Prism. */
export const fontSans = Instrument_Sans({
  variable: "--font-sans-face",
  subsets: ["latin"],
  display: "swap",
});

export const fontDisplay = Newsreader({
  variable: "--font-display-face",
  subsets: ["latin"],
  display: "swap",
});

export const fontMono = IBM_Plex_Mono({
  variable: "--font-mono-face",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

export const fontVariables = `${fontSans.variable} ${fontDisplay.variable} ${fontMono.variable}`;
