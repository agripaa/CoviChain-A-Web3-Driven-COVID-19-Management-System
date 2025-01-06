import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "CoviChain: Web3 Based COVID-19 CRUD",
  description: "CoviChain adalah aplikasi desentralisasi (DApp) yang mengadopsi teknologi Web3 untuk mengelola data terkait COVID-19 (hasil tes, tanggal tes, status vaksinasi, dan lain-lain) dengan fitur CRUD (Create, Read, Update, Delete). Aplikasi ini dibangun menggunakan smart contract di blockchain, memastikan integritas dan transparansi data.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
      >
        {children}
      </body>
    </html>
  );
}
