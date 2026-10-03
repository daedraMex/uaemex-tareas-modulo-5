import type { ReactNode } from "react";
import { Header } from "../organisms/Header";
import { Footer } from "../organisms/Footer";

export function MainLayout({ total, children }: { total: number; children: ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
      <Header total={total} />
      <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-8 sm:px-6 sm:py-10">{children}</main>
      <Footer />
    </div>
  );
}
