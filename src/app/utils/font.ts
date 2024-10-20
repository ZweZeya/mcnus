import localFont from "next/font/local";
import { Roboto_Mono } from 'next/font/google'
import "../globals.css";

export const robotoMono = Roboto_Mono({
    subsets: ['latin'],
    variable: '--font-roboto-mono',
    weight: ['400', '700'],
    style: ['normal', 'italic'],
    display: 'swap',
  });

export const geistSans = localFont({
    src: "../fonts/GeistVF.woff",
    variable: "--font-geist-sans",
    weight: "100 900",
});

export const geistMono = localFont({
    src: "../fonts/GeistMonoVF.woff",
    variable: "--font-geist-mono",
    weight: "100 900",
});