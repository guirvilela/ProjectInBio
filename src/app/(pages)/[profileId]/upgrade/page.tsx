import { Header } from "@/src/app/components/lading-page/header";
import { UpgradePricing } from "@/src/app/components/pages/upgrade";

export default function UpgradePage() {
  return (
    <div className="h-screen flex flex-col items-center justify-center gap-4">
      <Header />

      <h2 className="text-2xl font-bold">Escolha o plano</h2>

      <div className="flex gap-4">
        <UpgradePricing />
      </div>
    </div>
  );
}
