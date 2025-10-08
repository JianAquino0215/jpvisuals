import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import Skills from "@/components/Skills";
import Portfolio from "@/components/Portfolio";
import Contact from "@/components/Contact";
import PastClients from "@/components/PastClients";
import DarkVeil from "@/components/DarkVeil";
import CurvedLoop from "@/components/CurvedLoop";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

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
        
        <section className="py-16 flex flex-col items-center justify-center relative z-20 bg-black/20">
          <div className="mb-8">
            <CurvedLoop marqueeText="Made over ✦ 200+ outputs ✦ for clients ✦ across the globe ✦" />
          </div>
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in delay-700">
            <Link to="/portfolio">
              <Button 
                size="lg" 
                className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-glow transition-all duration-300 hover:scale-105"
              >
                View My Works :0
              </Button>
            </Link>
            <Link to="/contact">
              <Button 
                variant="outline" 
                size="lg"
                className="border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-300 hover:scale-105"
              >
                Create w/ Me ;)
              </Button>
            </Link>
          </div>
        </section>
        
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
