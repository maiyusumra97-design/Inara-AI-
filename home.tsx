import Navigation from "@/components/navigation";
import HeroSection from "@/components/hero-section";
import FeaturesSection from "@/components/features-section";
import VideoGallery from "@/components/video-gallery";
import PricingSection from "@/components/pricing-section";
import HowItWorksSection from "@/components/how-it-works";
import Footer from "@/components/footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-dark-bg text-white">
      <Navigation />
      <HeroSection />
      <FeaturesSection />
      <VideoGallery />
      <PricingSection />
      <HowItWorksSection />
      <Footer />
    </div>
  );
}
