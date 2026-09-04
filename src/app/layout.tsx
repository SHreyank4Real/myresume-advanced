import type { Metadata } from "next";
import { IBM_Plex_Mono } from "next/font/google";
import "./globals.css";

const ibmPlexMono = IBM_Plex_Mono({
  variable: "--font-ibm-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "M S Shreyank Sharma — Senior DevOps Engineer",
  description:
    "Interactive resume of M S Shreyank Sharma — Senior DevOps Engineer (CKA). Kubernetes, GitOps, Kargo, AWS, and observability.",
  authors: [{ name: "M S Shreyank Sharma" }],
  openGraph: {
    title: "M S Shreyank Sharma — Senior DevOps Engineer",
    description:
      "Interactive terminal resume — Kubernetes, GitOps, Kargo, and reliability engineering.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={ibmPlexMono.variable}>
      <body>{children}</body>
    </html>
  );
}
