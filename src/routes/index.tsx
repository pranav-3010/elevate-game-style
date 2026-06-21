import { createFileRoute } from "@tanstack/react-router";
import { Hero } from "@/components/home/Hero";
import { Marquee } from "@/components/layout/Marquee";
import { CategoryGrid } from "@/components/home/CategoryGrid";
import { SneakerScroll } from "@/components/home/SneakerScroll";
import { FeaturedDrops } from "@/components/home/FeaturedDrops";
import { StorySection } from "@/components/home/StorySection";
import { LifestyleBanner } from "@/components/home/LifestyleBanner";
import { LimitedDrops } from "@/components/home/LimitedDrops";
import { Testimonials } from "@/components/home/Testimonials";
import { Newsletter } from "@/components/home/Newsletter";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "One8 Commune — Own The Game" },
      { name: "description", content: "Athletic luxury streetwear, sneakers, watches and gear. Season 04 is live." },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <>
      <Hero />
      <Marquee items={["ATHLETIC LUXURY", "MADE FOR THE GAME", "SHIPS IN 48H", "PREMIUM QUALITY", "NEW DROP"]} />
      <CategoryGrid />
      <SneakerScroll />
      <FeaturedDrops />
      <StorySection />
      <LifestyleBanner />
      <LimitedDrops />
      <Testimonials />
      <Newsletter />
    </>
  );
}
