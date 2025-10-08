import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import heroImage from "@/assets/hero-image.jpg";
import ScrollFloat from "./ScrollFloat";
import CurvedLoop from "./CurvedLoop";
import FuzzyText from "./FuzzyText";
import DecryptedText from "./DecryptedText";
import ModelViewer from "./ModelViewer";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* 3D Model Viewer - Left Side */}
      <div 
        className="absolute bottom-85 transform translate-y-1/4 z-10"
        style={{ left: '-38rem', top: '-45rem' }}
        
        onMouseEnter={() => document.body.style.overflow = 'hidden'}
        onMouseLeave={() => document.body.style.overflow = 'auto'}
      >
        <ModelViewer
          key={Date.now()}
          url="/hechosetobehappy.fbx.glb"
          width={1800}
          height={1800}
          autoRotate={true}
          autoRotateSpeed={0.3}
          defaultZoom={2.5}
          enableManualZoom={false}
        />
      </div>

      
      {/* Floating Elements */}
      <div className="absolute top-20 left-20 w-2 h-2 bg-primary rounded-full animate-pulse"></div>
      <div className="absolute top-40 right-32 w-3 h-3 bg-accent rounded-full animate-pulse delay-1000"></div>
      <div className="absolute bottom-32 left-40 w-1 h-1 bg-primary rounded-full animate-pulse delay-500"></div>
      
      {/* Content */}
      <div className="relative z-10 text-right px-4 max-w-4xl ml-auto mr-8 mt-20">
        <div className="mb-6 relative">
          <div className="mb-6">
            <div style={{position: 'relative', display: 'inline-block', width: '780px', margin: '0'}}>
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
          textClassName="text-lg text-muted-foreground max-w-3xl ml-auto text-right"
        >
          Crafting immersive digital experiences through code, design, and interactive storytelling. From web applications to game worlds, I bring creative visions to life.
        </ScrollFloat>


        <div className="mb-8">
          <CurvedLoop marqueeText="Made over ✦ 200+ outputs ✦ for clients ✦ across the globe ✦" />
        </div>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
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
      
      {/* Scroll Indicator */}
      {/* <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-primary rounded-full flex justify-center">
          <div className="w-1 h-3 bg-primary rounded-full mt-2"></div>
        </div>
      </div> */}
    </section>
  );
};

export default Hero;