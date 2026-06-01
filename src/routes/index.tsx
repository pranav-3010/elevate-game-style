import { createFileRoute } from "@tanstack/react-router";
import { Hero } from "@/components/home/Hero";
import { Marquee } from "@/components/layout/Marquee";
import { CategoryGrid } from "@/components/home/CategoryGrid";
import { SneakerScroll } from "@/components/home/SneakerScroll";
import { FeaturedDrops } from "@/components/home/FeaturedDrops";
import { LifestyleBanner } from "@/components/home/LifestyleBanner";
import { LimitedDrops } from "@/components/home/LimitedDrops";
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
      <Marquee items={["NEW SEASON", "LIMITED DROP", "ATHLETIC LUXURY", "MADE FOR THE GAME", "SHIPS IN 48H"]} />
      <CategoryGrid />
      <SneakerScroll />
      <FeaturedDrops />
      <LifestyleBanner />
      <LimitedDrops />
      <Newsletter />
    </>
  );
}
