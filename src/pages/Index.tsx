import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import Skills from "@/components/Skills";
import Portfolio from "@/components/Portfolio";
import Contact from "@/components/Contact";
import PastClients from "@/components/PastClients";
import DarkVeil from "@/components/DarkVeil";

const Index = () => {
  return (
    <div className="min-h-screen relative">
      <div className="fixed inset-0 -z-10">
        <DarkVeil />
      </div>
      <Navigation />
      
      <main>
        <div id="home">
          <Hero />
        </div>
        
        <div id="clients">
          <PastClients />
        </div>
        
        <div id="skills">
          <Skills />
        </div>
        
        <div id="portfolio">
          <Portfolio />
        </div>
        
        <div id="contact">
          <Contact />
        </div>
      </main>
      
      <footer className="bg-card border-t border-border py-8">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <p className="text-muted-foreground">
            © 2024 Creative Developer. Crafted with passion and code.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
