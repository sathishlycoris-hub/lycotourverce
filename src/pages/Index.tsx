import { Layout } from "@/components/layout/Layout";
import { HeroSection } from "@/components/home/HeroSection";
import { IntroSection } from "@/components/home/IntroSection";
import { TourPackagesSection } from "@/components/home/TourPackagesSection";
import { PopularDestinations } from "@/components/home/PopularDestinations";
import { StoriesSection } from "@/components/home/StoriesSection";

const Index = () => {
  return (
    <Layout>
      <HeroSection />
      <IntroSection />
      <TourPackagesSection />
      <PopularDestinations />
      <StoriesSection />
    </Layout>
  );
};

export default Index;
