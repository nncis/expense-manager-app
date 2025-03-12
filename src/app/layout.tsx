import type { Metadata } from "next";
import { inter } from '@/ui/fonts/fonts';
import "./globals.css";

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
        {children}
      </body>
    </html>
  );
}
