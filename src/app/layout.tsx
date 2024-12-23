import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Three from "@/components/three";
import SmoothScrolling from "@/components/SmoothScrolling";
import { TransitionProviders } from "@/components/Transition";


const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Three js Testing",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <SmoothScrolling>
        < TransitionProviders>
          {children}
        </TransitionProviders>
          </SmoothScrolling>
        <div className="fixed top-0 h-full w-full -z-10">
        <Three />
        </div>
      </body>
    </html>
  );
}
