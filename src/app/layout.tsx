import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar/Navbar";
import { DataProvider } from "./store/data-context";
import { UserProvider } from "./store/userContext";
import { AlertDialogProvider } from "./store/alertDialogContext";
import AlertDialogComponent from "@/components/alertDialog";
import { Providers } from "./providers";
import { OperationProvider } from "./store/operationsContext";

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
      <AlertDialogProvider>
        <OperationProvider>
          <UserProvider>
            <DataProvider>
              <Providers>
                <body className={inter.className}>
                  <Navbar />
                  <AlertDialogComponent />
                  {children}
                </body>
              </Providers>
            </DataProvider>
          </UserProvider>
        </OperationProvider>
      </AlertDialogProvider>
    </html>
  );
}
