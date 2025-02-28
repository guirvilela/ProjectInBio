"use client";

import { Loader2 } from "lucide-react";
import { Button } from "../ui/button";

interface PriceCardProps {
  recommended?: boolean;
  isLoadingPlan: boolean;
  onSigning: (type: string) => void;
}

export function PriceCard({
  recommended,
  isLoadingPlan,
  onSigning,
}: PriceCardProps) {
  return (
    <>
      {recommended ? (
        <div className="flex flex-col">
          <div className="flex justify-center items-center rounded-t-2xl p-2 w-[304px] bg-[linear-gradient(90deg,#4b2dbb_0%,#B5446B_100%)]">
            <span className="uppercase text-xs font-bold ">Recomendado</span>
          </div>

          <div className="p-[1.6px] bg-[linear-gradient(90deg,#4b2dbb_0%,#B5446B_100%)] rounded-b-2xl">
            <div className="w-full bg-background-secondary p-8 flex flex-col gap-7 rounded-b-2xl">
              <div className="flex flex-col ">
                <span className="text-white font-bold text-2xl">Vitalício</span>
                <span className="text-content-body">Economize com </span>
              </div>

              <div className="flex items-center gap-1">
                <span className="text-white font-bold text-[48px]">
                  R$ 99,90
                </span>
              </div>
              <Button
                onClick={() => onSigning("lifetime")}
                disabled={isLoadingPlan}
              >
                {isLoadingPlan ? (
                  <Loader2 className="animate-spin" />
                ) : (
                  "Assinar"
                )}
              </Button>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex items-end gap-9">
          <div className="w-[304px] p-8 flex flex-col gap-7 rounded-2xl border border-[#1e1e1e]">
            <div className="flex flex-col">
              <span className="text-white font-bold text-2xl">Mensal</span>
              <span className="text-content-body">Apenas</span>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-white font-bold text-[48px]">R$ 9,90</span>
              <span className="text-content-headline text-2xl">/mês</span>
            </div>

            <Button
              variant="secondary"
              onClick={() => onSigning("month")}
              disabled={isLoadingPlan}
            >
              {isLoadingPlan ? <Loader2 className="animate-spin" /> : "Assinar"}
            </Button>
          </div>
        </div>
      )}
    </>
  );
}
