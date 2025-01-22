"use client";

import { PriceCard } from "@/src/app/components/commons/price-card";
import { Header } from "@/src/app/components/lading-page/header";

export default function UpgradePage() {
  return (
    <div className="h-screen flex flex-col items-center justify-center gap-4">
      <Header />

      <h2 className="text-2xl font-bold">Escolha o plano</h2>

      <div className="flex gap-4">
        <PriceCard onSigning={(v) => console.log(v)} />
        <PriceCard onSigning={() => console.log()} recommended />
      </div>
    </div>
  );
}
