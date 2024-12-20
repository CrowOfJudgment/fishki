"use client";
import CheckIcon from "../assets/check.svg";
import { twMerge } from "tailwind-merge";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/lib/firebaseConfig";
import { useRouter } from "next/navigation";

export const runtime = "edge";

const yearlyPlanFeaturesEN = [
  "Save 20% by opting for an annual subscription.",
  "Unlimited reviews and menu items.",
  "Unlimited QR code downloads",
];

const yearlyPlanFeaturesPL = [
  "Zaoszczędź 20%, wybierając roczną subskrypcję.",
  "Nieograniczona liczba recenzji i pozycji w menu.",
  "Nieograniczone pobieranie kodów QR.",
];

const monthlyPlanFeaturesEN = [
  "Ideal for businesses that need flexibility with monthly payments.",
  "Unlimited reviews and menu items.",
  "Unlimited QR code downloads",
];

const monthlyPlanFeaturesPL = [
  "Idealne dla firm potrzebujących elastyczności w miesięcznych płatnościach.",
  "Nieograniczona liczba recenzji i pozycji w menu.",
  "Nieograniczone pobieranie kodów QR.",
];

export const Pricing = ({ intl }) => {
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        if (currentUser.emailVerified) {
          setUser(currentUser);
        }
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, [router]);

  const handleSubscription = (planLink) => {
    if (!user) {
      router.push("/signup");
    } else {
      const userEmail = user.email;
      const subscriptionLink = `${planLink}?prefilled_email=${encodeURIComponent(userEmail)}`;

      const anchor = document.createElement("a");
      anchor.href = subscriptionLink;
      anchor.target = "_blank";
      anchor.rel = "noopener noreferrer";
      anchor.click();
    }
  };

  if (!intl) return null;

  // Determine language based on intl locale
  const isPolish = intl.locale === "pl";

  const yearlyPlanFeatures = isPolish ? yearlyPlanFeaturesPL : yearlyPlanFeaturesEN;
  const monthlyPlanFeatures = isPolish ? monthlyPlanFeaturesPL : monthlyPlanFeaturesEN;

  return (
      <section className="py-24 bg-white" id="pricing">
        <div className="container">
          <div className="section-heading">
            <h2 className="section-title">{intl.formatMessage({ id: "pricing.title" })}</h2>
            <p className="section-description mt-5">
              {intl.formatMessage({ id: "pricing.subtitle" })}
            </p>
          </div>
          <div className="flex flex-col gap-6 items-center mt-10 lg:flex-row lg:items-end lg:justify-center">
            <div className={"card border-black bg-black text-white"}>
              <div className="flex justify-between">
                <h3 className={"text-lg font-bold text-white/60"}>
                  {intl.formatMessage({ id: "pricing.yearlyTitle" })}
                </h3>
                <div className="inline-flex text-sm px-4 py-1.5 rounded-xl border border-white/20">
                  <motion.span
                      animate={{
                        backgroundPositionX: "100%",
                      }}
                      transition={{
                        duration: 1,
                        repeat: Infinity,
                        ease: "linear",
                        repeatType: "loop",
                      }}
                      className="bg-[linear-gradient(to_right,#DD7DDF,#E1CD86,#BBCB92,#71C2EF,#3BFFFF,#DD7DDF,#E1CD86,#BBCB92,#71C2EF,#3BFFFF,#DD7DDF)] [background-size:200%] text-transparent bg-clip-text font-medium"
                  >
                    {intl.formatMessage({ id: "pricing.popular" })}
                  </motion.span>
                </div>
              </div>
              <div className="flex items-baseline gap-1 mt-[30px]">
                <span className="text-4xl font-bold tracking-tighter leading-none">1152 PLN</span>
                <span className="tracking-tight font-bold text-white/50">
                {intl.formatMessage({ id: "pricing.perYear" })}
              </span>
              </div>
              <button
                  className={"btn btn-primary w-full mt-[30px] bg-white text-black"}
                  onClick={() => handleSubscription("https://buy.stripe.com/7sI14A5Es5KSbBecMN")}
              >
                {intl.formatMessage({ id: "pricing.choosePlan" })}
              </button>
              <ul className="flex flex-col gap-5 mt-8">
                {yearlyPlanFeatures.map((feature, featureIndex) => (
                    <li key={`feature-${featureIndex}`} className="text-sm flex items-center gap-4">
                      <CheckIcon className="h-6 w-6" />
                      <span>{feature}</span>
                    </li>
                ))}
              </ul>
            </div>

            <div className={"card"}>
              <div className="flex justify-between">
                <h3 className={"text-lg font-bold text-black/50"}>
                  {intl.formatMessage({ id: "pricing.monthlyTitle" })}
                </h3>
              </div>
              <div className="flex items-baseline gap-1 mt-[30px]">
                <span className="text-4xl font-bold tracking-tighter leading-none">120 PLN</span>
                <span className="tracking-tight font-bold text-black/50">
                {intl.formatMessage({ id: "pricing.perMonth" })}
              </span>
              </div>
              <button
                  className={"btn btn-primary w-full mt-[30px]"}
                  onClick={() => handleSubscription("https://buy.stripe.com/8wM14Aff2c9g0WA000")}
              >
                {intl.formatMessage({ id: "pricing.choosePlan" })}
              </button>
              <ul className="flex flex-col gap-5 mt-8">
                {monthlyPlanFeatures.map((feature, featureIndex) => (
                    <li key={`feature-${featureIndex}`} className="text-sm flex items-center gap-4">
                      <CheckIcon className="h-6 w-6" />
                      <span>{feature}</span>
                    </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>
  );
};
