import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import heroImage from "@/assets/hero-image.jpg";
import ScrollFloat from "./ScrollFloat";
import CurvedLoop from "./CurvedLoop";
import FuzzyText from "./FuzzyText";
import DecryptedText from "./DecryptedText";

const Hero = () => {
  return (
    <>
    <section className="relative min-h-screen flex items-center justify-end overflow-hidden pr-20">

      
      {/* Floating Elements */}
      <div className="absolute top-20 left-20 w-2 h-2 bg-primary rounded-full animate-pulse"></div>
      <div className="absolute top-40 right-32 w-3 h-3 bg-accent rounded-full animate-pulse delay-1000"></div>
      <div className="absolute bottom-32 left-40 w-1 h-1 bg-primary rounded-full animate-pulse delay-500"></div>
      
      {/* Content */}
      <div className="relative z-10 text-right px-4 max-w-4xl mt-20">
        <div className="mb-6 relative">
          <div className="mb-2" style={{position: 'relative', display: 'inline-block', width: '780px', margin: '0 auto'}}>
            <span className="text-3xl font-bold text-muted-foreground" style={{position: 'absolute', left: '80px', top: '-30px'}}>HI! I'M</span>
          </div>
          <div className="mb-6">
            <div style={{position: 'relative', display: 'inline-block', width: '780px', margin: '0 auto'}}>
              <FuzzyText 
                baseIntensity={0.2} 
                hoverIntensity={0.5} 
                enableHover={true}
                fontFamily="'Midnight Gelactic', sans-serif"
                color="#87CEEB"
              >
                Jian
              </FuzzyText>
              <div style={{position: 'absolute', top: '0', left: '260px'}}>
                <FuzzyText 
                  baseIntensity={0.2} 
                  hoverIntensity={0.5} 
                  enableHover={true}
                  fontFamily="'Midnight Gelactic', sans-serif"
                  color="#fff"
                >
                  Aquino
                </FuzzyText>
              </div>
            </div>
          </div>
          <div className="h-px w-32 bg-gradient-to-r from-transparent via-primary to-transparent ml-auto mb-6"></div>
        </div>
        
        <div className="mb-8 text-lg md:text-xl text-white max-w-2xl ml-auto leading-relaxed">
          <DecryptedText
            text="Multimedia Artist • Web Developer • Game Developer"
            animateOn="view"
            sequential={true}
            revealDirection="center"
            speed={100}
            className="text-lg md:text-xl text-white whitespace-nowrap"
            parentClassName="text-lg md:text-xl text-white whitespace-nowrap"
          />
        </div>
        
        <ScrollFloat
          animationDuration={1.2}
          ease="back.inOut(2)"
          scrollStart="center bottom+=30%"
          scrollEnd="bottom bottom-=20%"
          stagger={0.02}
          containerClassName="mb-12"
          textClassName="text-lg text-muted-foreground max-w-3xl ml-auto"
        >
          Crafting immersive digital experiences through code, design, and interactive storytelling. From web applications to game worlds, I bring creative visions to life.
        </ScrollFloat>
        
      </div>
      
    </section>
    
    {/* CurvedLoop Section */}
    <section className="py-16">
      <div className="max-w-6xl mx-auto text-center">
        <div className="scale-75">
          <CurvedLoop marqueeText="Made over ✦ 200+ outputs ✦ for clients ✦ across the globe ✦" />
        </div>
      </div>
    </section>
    
    {/* Buttons Section */}
    <section className="pb-20">
      <div className="max-w-6xl mx-auto text-center">
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
      </div>
    </section>
    </>
  );
};

export default Hero;