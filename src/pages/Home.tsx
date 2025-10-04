import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import VideoSection from "@/components/VideoSection";
import PageTransition from "@/components/PageTransition";

const Home = () => {
  return (
    <PageTransition>
      <div className="min-h-screen bg-section-gradient">
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