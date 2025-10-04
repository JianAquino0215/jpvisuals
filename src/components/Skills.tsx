import { useState } from "react";
import MagicBento from "./MagicBento";
import Folder from "./Folder";

const Skills = () => {
  const [modalImage, setModalImage] = useState<string | null>(null);
  const [modalLabel, setModalLabel] = useState<string>('');

  const openModal = (imageSrc: string, label: string) => {
    setModalImage(imageSrc);
    setModalLabel(label);
  };
  return (
    <section className="py-20 px-4 min-h-screen flex flex-col justify-end">
      <div className="w-full px-8">
        <div className="text-center mb-16">
          {/* <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Creative Expertise
          </h2>
          <div className="h-px w-24 bg-gradient-to-r from-transparent via-primary to-transparent mx-auto mb-6"></div>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Blending artistic vision with technical expertise across multiple disciplines
          </p> */}
        </div>

        <div className="text-center mb-15">
          <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-4 title-font">
            About Me :)
          </h1>
          <div className="h-px w-20 bg-gradient-to-r from-transparent via-primary to-transparent mx-auto mb-6"></div>
        </div>
        <MagicBento
          enableStars={true}
          enableSpotlight={true}
          enableBorderGlow={true}
          enableTilt={true}
          enableMagnetism={true}
          clickEffect={true}
          particleCount={4}
          spotlightRadius={180}
          glowColor="177, 158, 239"
          cardType="about"
        />

        <div className="text-center mb-12 mt-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 title-font">
            Experience Timeline
          </h2>
          <div className="h-px w-20 bg-gradient-to-r from-transparent via-primary to-transparent mx-auto mb-6"></div>
        </div>
        
        <div className="max-w-4xl mx-auto mb-20">
          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-1/2 w-0.5 h-full bg-primary"></div>
            
            <div className="space-y-12">
              <div className="flex items-center">
                <div className="w-1/2 pr-8 text-right">
                  <h3 className="text-xl font-bold text-foreground">2020 - Present</h3>
                  <h4 className="text-lg font-semibold text-primary">Freelance Video Editor</h4>
                  <p className="text-muted-foreground">Creating digital content for various clients</p>
                </div>
                <div className="w-4 h-4 bg-primary rounded-full relative z-10"></div>
                <div className="w-1/2 pl-8"></div>
              </div>
              
              <div className="flex items-center">
                <div className="w-1/2 pr-8"></div>
                <div className="w-4 h-4 bg-primary rounded-full relative z-10"></div>
                <div className="w-1/2 pl-8">
                  <h3 className="text-xl font-bold text-foreground">2021 - Present</h3>
                  <h4 className="text-lg font-semibold text-primary">Video Editor</h4>
                  <p className="text-muted-foreground">Creating digital content @Goat Studios</p>
                </div>
              </div>
              
              <div className="flex items-center">
                <div className="w-1/2 pr-8 text-right">
                  <h3 className="text-xl font-bold text-foreground">2024 - Present</h3>
                  <h4 className="text-lg font-semibold text-primary">Freelance Game & Web Developer</h4>
                  <p className="text-muted-foreground">Developing indie games and website applications for interactive experiences</p>
                </div>
                <div className="w-4 h-4 bg-primary rounded-full relative z-10"></div>
                <div className="w-1/2 pl-8"></div>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-16 mb-20 mt-16">
          
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 title-font">
              Skills & Expertise
            </h2>
            <div className="h-px w-20 bg-gradient-to-r from-transparent via-primary to-transparent mx-auto mb-6"></div>
          </div>
          <MagicBento
            enableStars={true}
            enableSpotlight={true}
            enableBorderGlow={true}
            enableTilt={true}
            enableMagnetism={true}
            clickEffect={true}
            particleCount={8}
            spotlightRadius={250}
            glowColor="195, 100, 50"
          />
          
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 title-font">
              Tools & Technologies
            </h2>
            <div className="h-px w-20 bg-gradient-to-r from-transparent via-primary to-transparent mx-auto mb-6"></div>
          </div>
          <MagicBento
            enableStars={true}
            enableSpotlight={true}
            enableBorderGlow={true}
            enableTilt={true}
            enableMagnetism={true}
            clickEffect={true}
            particleCount={6}
            spotlightRadius={200}
            glowColor="255, 159, 252"
            cardType="tools"
          />
        </div>
        
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 title-font">
            Hobbies & Interests
          </h2>
          <div className="h-px w-20 bg-gradient-to-r from-transparent via-primary to-transparent mx-auto mb-6"></div>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div className="p-6">
            <div className="flex justify-center mb-4">
              <Folder 
                size={1.5} 
                color="#87CEEB" 
                items={[
                  <img key="1" src="/IMG_0197.JPG" alt="Gig" className="w-full h-full object-cover rounded cursor-pointer" onClick={() => openModal('/IMG_0197.JPG', 'Ashanti Silonga "SHANNI"')} />,
                  <img key="2" src="/IMG_0187.JPG" alt="Gig" className="w-full h-full object-cover rounded cursor-pointer" onClick={() => openModal('/IMG_0187.JPG', 'Frank Ely')} />,
                  <img key="3" src="/img.png" alt="Gig" className="w-full h-full object-cover rounded cursor-pointer" onClick={() => openModal('/img.png', 'Blaster and The Celestial Klowns')} />
                ]}
              />
            </div>
            <h3 className="text-lg font-semibold text-foreground mb-2"><br></br></h3>
            <p className="text-sm text-muted-foreground">i like attending local gigs</p>
          </div>
          <div className="p-6">
            <div className="flex justify-center mb-4">
              <Folder 
                size={1.5} 
                color="#87CEEB" 
                items={[
                  <img key="1" src="/IMG_6528.JPG" alt="Concert" className="w-full h-full object-cover rounded cursor-pointer" onClick={() => openModal('/IMG_6528.JPG', 'NIKI Buzz Tour 2025')} />,
                  <img key="2" src="/con2.png" alt="Concert" className="w-full h-full object-cover rounded cursor-pointer" onClick={() => openModal('/con2.png', 'Le sserafim Easy Crazy Hot')} />,
                  <img key="3" src="/con3.png" alt="Concert" className="w-full h-full object-cover rounded cursor-pointer" onClick={() => openModal('/con3.png', 'Le sserafim Easy Crazy Hot')} />
                ]}
              />
            </div>
            <h3 className="text-lg font-semibold text-foreground mb-2"><br></br></h3>
            <p className="text-sm text-muted-foreground">i like attending concerts</p>
          </div>
          <div className="p-6">
            <div className="flex justify-center mb-4">
              <Folder 
                size={1.5} 
                color="#87CEEB" 
                items={[
                  <img key="1" src="/band1.jpg" alt="Band" className="w-full h-full object-cover rounded cursor-pointer" onClick={() => openModal('/band1.jpg', 'BOTB Foundation Day')} />,
                  <img key="2" src="/band2.jpg" alt="Band" className="w-full h-full object-cover rounded cursor-pointer" onClick={() => openModal('/band2.jpg', 'BOTB Foundation Day')} />,
                  <img key="3" src="/band3.jpg" alt="Band" className="w-full h-full object-cover rounded cursor-pointer" onClick={() => openModal('/band3.jpg', 'BOTB Foundation Day')} />
                ]}
              />
            </div>
            <h3 className="text-lg font-semibold text-foreground mb-2"><br></br></h3>
            <p className="text-sm text-muted-foreground">i like playing in a band</p>
          </div>
          <div className="p-6">
            <div className="flex justify-center mb-4">
              <Folder 
                size={1.5} 
                color="#87CEEB" 
                items={[
                  <img key="1" src="/music1.jpg" alt="Music" className="w-full h-full object-cover rounded cursor-pointer" onClick={() => openModal('/music1.jpg', 'NIKI')} />,
                  <img key="2" src="/music2.jpg" alt="Music" className="w-full h-full object-cover rounded cursor-pointer" onClick={() => openModal('/music2.jpg', 'KESHI')} />,
                  <img key="3" src="/music3.jpg" alt="Music" className="w-full h-full object-cover rounded cursor-pointer" onClick={() => openModal('/music3.jpg', 'SUYEN')} />
                ]}
              />
            </div>
            <h3 className="text-lg font-semibold text-foreground mb-2"><br></br></h3>
            <p className="text-sm text-muted-foreground">i love music</p>
          </div>
        </div>
      </div>
      
      {modalImage && (
        <div 
          className="fixed inset-0 bg-black/80 flex items-center justify-center z-50" 
          onClick={() => setModalImage(null)}
        >
          <div className="relative w-[90vw] h-[90vh] p-4">
            <img 
              src={modalImage} 
              alt="Modal" 
              className="w-full h-full object-contain rounded-lg"
            />
            {modalLabel && (
              <div className="absolute bottom-4 left-4 right-4 text-center">
                <p className="text-white text-lg bg-black/50 px-4 py-2 rounded-lg">{modalLabel}</p>
              </div>
            )}
            <button 
              className="absolute top-2 right-2 text-white text-2xl bg-black/50 rounded-full w-8 h-8 flex items-center justify-center"
              onClick={() => setModalImage(null)}
            >
              ×
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

export default Skills;