import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = { title: "blink — understand anything in 30 seconds", description: "Turn long content into a beautiful visual brief." };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en" suppressHydrationWarning><body>{children}</body></html>;
}
