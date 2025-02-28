import { loadStripe, Stripe } from "@stripe/stripe-js";
import React from "react";
import { useForm } from "./useForm";

export interface FormStripe {
  stripe: Stripe | null;
  loadingPlan: "subscription" | "permanent" | "";
}

interface StripeCheckoutProps {
  metadata: any;
  isSubscription: boolean;
}

export function useStripe() {
  const formStripe = useForm<FormStripe>({
    stripe: null,
    loadingPlan: "",
  });

  async function createStripeCheckout({
    metadata,
    isSubscription,
  }: StripeCheckoutProps) {
    try {
      const typePlan = isSubscription ? "subscription" : "permanent";
      formStripe.set("loadingPlan")(typePlan);

      const response = await fetch("/api/stripe/create-checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ metadata, isSubscription }),
      });

      const data = await response.json();

      await formStripe.value.stripe?.redirectToCheckout({
        sessionId: data.sessionId,
      });

      formStripe.set("loadingPlan")("");
    } catch (error) {}
  }

  async function handleCreateStripePortal() {
    const response = await fetch("/api/stripe/create-portal", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();

    window.location.href = data.url;
  }

  React.useEffect(() => {
    async function loadStripeAsync() {
      const stripeInstance = await loadStripe(
        process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY!
      );

      formStripe.set("stripe")(stripeInstance);
    }

    loadStripeAsync();
  }, []);

  return {
    formStripe,
    handleCreateStripePortal,
    createStripeCheckout,
  };
}
