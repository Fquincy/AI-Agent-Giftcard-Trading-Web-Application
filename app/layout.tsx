import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Leyou Exchange - Gift Card Trading Platform",
  description: "Experience lightning-fast gift card trading with the most competitive rates. Turn your gift cards into cash or crypto in seconds with our secure platform. Trusted by 100,000+ users.",
  keywords: ["gift card trading", "gift card exchange", "crypto trading", "gift card to cash", "Nigeria", "Ghana"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
