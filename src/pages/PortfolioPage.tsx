import Navigation from "@/components/Navigation";
import Portfolio from "@/components/Portfolio";
import PageTransition from "@/components/PageTransition";

const PortfolioPage = () => {
  return (
    <PageTransition>
      <div className="min-h-screen bg-section-gradient">
        <Navigation />
        <main>
          <Portfolio />
        </main>
      </div>
    </PageTransition>
  );
};

export default PortfolioPage;