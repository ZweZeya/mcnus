import type { Metadata } from "next";
import "./globals.css";
import { robotoMono } from "./utils/font";
import Navbar from "./components/navbar/Navbar";
import Footer from "./components/footer/Footer";
import { navy } from "./utils/colors";

export const metadata: Metadata = {
  title: "MC@NUS",
  description: "A community established by Myanmar Students in NUS for NUS networks.",
  icons: {
    icon: "/lion.png",
  },
};

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
