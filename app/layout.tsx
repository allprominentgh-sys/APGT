import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "APTG Wi-Fi | All Prominent Telecommunication Ghana",
  description:
    "Reliable, high-speed neighbourhood internet with simple internet packages from All Prominent Telecommunication Ghana.",
  applicationName: "APTG Wi-Fi"
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#102b45"
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}