import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Image from "next/image";
import "./globals.css";
import Navbar from "@/components/navbar/Navbar";
import { DataProvider } from "./store/data-context";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Culinary Canvas",
  description: "Your Home For The Best Recipes",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <DataProvider>
        <body className={inter.className}>
          <Navbar />
          {children}
        </body>
      </DataProvider>
    </html>
  );
}
