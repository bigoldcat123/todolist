import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Montserrat } from 'next/font/google'
const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
});
const edu = localFont({
  src: './fonts/edu.ttf',
  variable: "--font-edu",
})
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
});
const chinese = localFont({
  src:'./fonts/chinese.ttf',
  variable: "--font-chinese",
  // weight:'100 200 300 400 500 600 700 800 900'
})
const m = Montserrat({ subsets: ['latin'], variable: '--font-montserrat' })

export const metadata: Metadata = {
  title: "TODO List APP",
  description: "this is a interesting app",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} ${m.variable} ${edu.variable} ${chinese.className}`}>
        {children}
      </body>
    </html>
  );
}
