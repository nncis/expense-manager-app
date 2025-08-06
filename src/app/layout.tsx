import type { Metadata } from "next";
import { inter, josefin_sans } from '@/ui/fonts/fonts';
import "./globals.css";
import { Providers } from './providers'

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
      <body className={`${josefin_sans.className} antialiased`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
