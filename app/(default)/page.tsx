export const metadata = {
  title: "Fishki",
  description: "Land your next job faster!",
};

import Hero from "@/components/hero-home";
import Cta from "@/components/cta";
import Features from "@/components/features";
import Carousel from "@/components/carousel";
import FloatingCTA from "@/components/floating-cta";

export default async function Home() {
  return (
    <main className="flex flex-col">
      <Hero />
      <FloatingCTA />
      <Carousel />
      <Features />
      <Cta />
    </main>
  );
}
