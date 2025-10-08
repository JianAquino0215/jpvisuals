import { useEffect } from "react";
import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import VideoSection from "@/components/VideoSection";
import PageTransition from "@/components/PageTransition";

const Home = () => {
  useEffect(() => {
    if (!window.location.href.includes('?refreshed')) {
      window.location.href = window.location.href + '?refreshed=true';
    }
  }, []);

  return (
    <PageTransition>
      <div className="min-h-screen">
        <Navigation />
        <main>
          <Hero />
          <VideoSection />
        </main>
      </div>
    </PageTransition>
  );
};

export default Home;