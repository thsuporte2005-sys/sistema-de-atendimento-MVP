import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Atendimento IA MVP",
  description: "Sistema de atendimento com IA para leads",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
