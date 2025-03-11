import type { Metadata } from "next";
import { inter } from '@/ui/fonts/fonts';
import "./globals.css";
import Navbar from "@/ui/Navbar";
import style from '@/styles/dashboard.module.css';

export const metadata: Metadata = {
  title: "Expense Manager",
  description: "An app to manager daily expenses",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>
        <Navbar/>
        {children}
      </body>
    </html>
  );
}
