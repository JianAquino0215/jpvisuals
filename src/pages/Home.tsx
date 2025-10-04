import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import VideoSection from "@/components/VideoSection";
import PageTransition from "@/components/PageTransition";

const Home = () => {
  return (
    <PageTransition>

      <div className="relative z-10 min-h-screen">
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