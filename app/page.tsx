import { HowItWorks } from "@/components/home/how-it-works";
import { DemoSection } from "@/components/home/demo-section";
import HeroSection from "@/components/home/hero-section";
// import { PriceCard } from "@/components/home/price-card";
import { PricingSection } from "@/components/home/pricing-section";
import { CTASection } from "@/components/home/cta-section";
import BGGradient from "@/components/common/bggradient";


export default function Home() {
  return (
    <div className="">
      <BGGradient/>
     <HeroSection/>
     <DemoSection/>
     <HowItWorks/>
    <PricingSection/>
    <CTASection/>
    </div>
  );
}
 