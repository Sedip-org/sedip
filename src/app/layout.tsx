import "./global.css";
import { Inter } from "next/font/google";
import { Metadata } from "next";
import LayoutClient from "./LayoutClient";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: 'Sedip - Social Entrepreneurship Development and Innovation Platform',
  description: 'SEDIP platform connecting social entrepreneurs, events, conferences, and innovation opportunities.',
  authors: [{ name: 'Esmer Quliyeva' }],
  keywords: ['social entrepreneurship', 'innovation', 'SEDIP', 'conferences', 'events'],
  icons: {
    icon: [
      { url: '/images/favicon.ico' },
      { url: '/images/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/images/avicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: [
      { url: '/images/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`container ${inter.className}`}>
        <LayoutClient>{children}</LayoutClient>
      </body>
    </html>
  );
}