import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Image from "next/image";
import "./globals.css";
import Navbar from "@/components/navbar/Navbar";

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
      <body className={inter.className}>
        {/*  <nav className="bg-black p-5 z-10 w-full">
          <div>
            <Image
              src={"/logo.jpg"}
              alt="logo image"
              width={40}
              height={40}
              className="w-16 h-16 rounded-full"
            />
          </div>
        </nav> */}
        <Navbar />
        {children}
      </body>
    </html>
  );
}
