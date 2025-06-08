import type { Metadata } from "next";
import "./globals.css";
import { robotoMono } from "./utils/font";
import Navbar from "./components/navbar/Navbar";
import Footer from "./components/footer/Footer";
import { navy } from "./utils/colors";

export const metadata: Metadata = {
  title: 'Myanmar Community @ NUS | Cultural Events & Student Support',
  description: 'Join the vibrant Myanmar Community at NUS. Connect with fellow students, celebrate culture, and build lasting bonds through events and support networks.',
  metadataBase: new URL('https://myanmarcommunitynus.com'),
  alternates: {
    canonical: 'https://myanmarcommunitynus.com',
  },
  appleWebApp: {
    title: 'MC@NUS',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${robotoMono.variable} antialiased min-h-screen flex flex-col`}
        style={{ color: navy }}
      >
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}