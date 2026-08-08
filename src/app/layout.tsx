import type { Metadata } from "next";
import { IBM_Plex_Mono } from "next/font/google";
import "./globals.css";

const ibmPlexMono = IBM_Plex_Mono({
  variable: "--font-ibm-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "M S Shreyank Sharma — DevOps / SRE",
  description:
    "Interactive resume of M S Shreyank Sharma — DevOps / Site Reliability Engineer (CKA). AWS, Kubernetes, observability, and IaC.",
  authors: [{ name: "M S Shreyank Sharma" }],
  openGraph: {
    title: "M S Shreyank Sharma — DevOps / SRE",
    description:
      "Interactive terminal resume — AWS, Kubernetes, observability, and reliability engineering.",
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
