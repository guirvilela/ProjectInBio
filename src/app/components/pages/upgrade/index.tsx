"use client";

import { useStripe } from "@/src/app/hooks/use-stripe";
import { useParams } from "next/navigation";
import { PriceCard } from "../../commons/price-card";

export function UpgradePricing() {
  const { formStripe, createStripeCheckout } = useStripe();
  const { profileId } = useParams();

  console.log(formStripe.value.loadingPlan === "permanent");

  return (
    <div className="flex gap-4">
      <PriceCard
        onSigning={(v) =>
          createStripeCheckout({
            metadata: { profileId },
            isSubscription: true,
          })
        }
        isLoadingPlan={formStripe.value.loadingPlan === "subscription"}
      />
      <PriceCard
        recommended
        onSigning={(v) =>
          createStripeCheckout({
            metadata: { profileId },
            isSubscription: false,
          })
        }
        isLoadingPlan={formStripe.value.loadingPlan === "permanent"}
      />
    </div>
  );
}
