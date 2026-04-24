import "./globals.css";
import type { Metadata } from "next";
import { ToastViewport } from "@/components/ui/toast";

export const metadata: Metadata = {
  title: "Portal e-Proc Acre",
  description: "Plataforma institucional para advocacia digital no Acre"
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body>
        {children}
        <ToastViewport />
      </body>
    </html>
  );
}
