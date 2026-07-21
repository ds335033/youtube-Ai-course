"use client";

import { useState, useEffect } from "react";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { createStripeCheckoutSession } from "@/app/actions/stripe";
import { remoteConfig } from "@/lib/firebase";
import { fetchAndActivate, getString } from "firebase/remote-config";

const defaultPlans = [
  {
    name: "Creator Free",
    description: "For beginners getting started.",
    price: "$0",
    features: ["Access to 1 introductory course", "Basic community access", "Limited AI Tool usages"],
    priceId: null,
    buttonText: "Current Plan",
  },
  {
    name: "Pro Creator",
    description: "For serious creators who want to go viral.",
    price: "$49/mo",
    features: [
      "Access to ALL premium courses",
      "Unlimited AI Title Generator",
      "Unlimited AI Script Builder",
      "Private Discord Community",
      "Weekly Q&A Calls"
    ],
    priceId: "price_placeholder_pro_monthly",
    buttonText: "Upgrade to Pro",
  },
  {
    name: "Lifetime Access",
    description: "Pay once, access the academy forever.",
    price: "$499",
    features: [
      "Everything in Pro",
      "Never pay a subscription fee again",
      "1-on-1 Channel Audit",
      "Priority Support"
    ],
    priceId: "price_placeholder_lifetime",
    buttonText: "Get Lifetime Access",
  }
];

export default function BillingPage() {
  const [loading, setLoading] = useState<string | null>(null);
  const [plans, setPlans] = useState(defaultPlans);

  useEffect(() => {
    async function loadRemoteConfig() {
      if (remoteConfig) {
        try {
          await fetchAndActivate(remoteConfig);
          
          const proPrice = getString(remoteConfig, "pro_plan_price");
          const proStripeId = getString(remoteConfig, "pro_plan_stripe_id");
          const lifetimePrice = getString(remoteConfig, "lifetime_plan_price");
          const lifetimeStripeId = getString(remoteConfig, "lifetime_plan_stripe_id");
          
          setPlans(prevPlans => {
            const newPlans = [...prevPlans];
            // Pro Plan is index 1
            if (proPrice) newPlans[1].price = proPrice;
            if (proStripeId) newPlans[1].priceId = proStripeId;
            
            // Lifetime Plan is index 2
            if (lifetimePrice) newPlans[2].price = lifetimePrice;
            if (lifetimeStripeId) newPlans[2].priceId = lifetimeStripeId;
            
            return newPlans;
          });
          
        } catch (error) {
          console.error("Failed to load Remote Config", error);
        }
      }
    }
    loadRemoteConfig();
  }, []);

  const handleCheckout = async (priceId: string | null) => {
    if (!priceId) return; // Free plan
    
    setLoading(priceId);
    try {
      const url = await createStripeCheckoutSession(priceId);
      if (url) {
        window.location.href = url;
      }
    } catch (error) {
      console.error(error);
      alert("Failed to initiate checkout. Check if STRIPE_SECRET_KEY is configured.");
    } finally {
      setLoading(null);
    }
  };

  return (
    <div className="flex flex-col gap-8 max-w-5xl mx-auto w-full pb-10">
      <div className="text-center">
        <h1 className="text-3xl font-bold tracking-tight">Upgrade Your Plan</h1>
        <p className="text-muted-foreground mt-2 max-w-xl mx-auto">
          Unlock the full potential of the YouTube PhD Academy and the AI Creator Toolkit.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {plans.map((plan) => (
          <Card key={plan.name} className={`flex flex-col ${plan.name === 'Pro Creator' ? 'border-primary shadow-md shadow-primary/10' : ''}`}>
            <CardHeader>
              <CardTitle>{plan.name}</CardTitle>
              <CardDescription>{plan.description}</CardDescription>
            </CardHeader>
            <CardContent className="flex-1">
              <div className="text-4xl font-bold mb-6">{plan.price}</div>
              <ul className="space-y-3 text-sm">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-green-500 shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter>
              <Button 
                variant={plan.priceId ? "default" : "outline"} 
                className="w-full"
                disabled={!plan.priceId || loading === plan.priceId}
                onClick={() => handleCheckout(plan.priceId)}
              >
                {loading === plan.priceId ? "Redirecting..." : plan.buttonText}
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
