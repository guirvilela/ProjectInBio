"use client";

import React from "react";
import { manageAuth } from "../../actions/manage-auth";
import { TRIAL_DAYS } from "../../lib/config";
import { PriceCard } from "../commons/price-card";

export function Pricing() {
  const [loadingPrice, setLoadingPrice] = React.useState("");

  function handleSignPlan(planChoice: string) {
    setLoadingPrice(planChoice);

    manageAuth().then(() => {
      setLoadingPrice("");
    });
  }

  return (
    <div className="my-[150px] flex flex-col items-center gap-14">
      <div className="flex flex-col items-center gap-6">
        <h3 className="text-4xl font-bold text-white">
          Um valor acessível para todos
        </h3>
        <p className="text-content-body text-xl text-center">
          Junte-se à comunidade de criadores profissionais que já estão elevando
          sua <br /> presença online. Teste gratuitamente por{" "}
          <strong className="text-accent-pink">{TRIAL_DAYS} dias</strong>, sem
          compromisso!
        </p>
      </div>

      <div className="flex items-end gap-9">
        <PriceCard
          onSigning={() => handleSignPlan("monthly")}
          isLoadingPlan={loadingPrice === "monthly"}
        />
        <PriceCard
          onSigning={() => handleSignPlan("ever")}
          recommended
          isLoadingPlan={loadingPrice === "ever"}
        />
      </div>
    </div>
  );
}
