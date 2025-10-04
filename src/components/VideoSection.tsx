import ScrollFloat from "./ScrollFloat";

const VideoSection = () => {
  return (
    <section className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Past Clients Section */}
        <div className="text-center mb-48">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4 title-font">
            Past Clients
          </h2>
          <div className="h-px w-24 bg-gradient-to-r from-transparent via-primary to-transparent mx-auto mb-16"></div>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-16">
            Trusted by leading content creators and companies worldwide   
          </p>
          
          <div className="relative overflow-hidden mb-48">
            <div className="flex space-x-6" style={{animation: 'scroll 30s linear infinite'}}>
              {[...Array(2)].map((_, i) => (
                <div key={i} className="flex space-x-6 min-w-max">
                  {[
                    {name: "Sanjay", desc: "Video editing & motion graphics for content creation", photo: "/C3.png"},
                    {name: "Patchara", desc: "Video editing & motion graphics for content creations", photo: "/C2.png"},
                    {name: "GoatFather", desc: "Video editing & motion graphics for content creation", photo: "/C1.png"},
                    {name: "JLCMTC", desc: "Web development & UI design solutions", photo: "/C4.png"},
                    {name: "Sanjay", desc: "Video editing & motion graphics for content creation", photo: "/C3.png"},
                    {name: "Patchara", desc: "Video editing & motion graphics for content creations", photo: "/C2.png"},
                    {name: "GoatFather", desc: "Video editing & motion graphics for content creation", photo: "/C1.png"},
                    {name: "JLCMTC", desc: "Web development & UI design solutions", photo: "/C4.png"},
                    {name: "Sanjay", desc: "Video editing & motion graphics for content creation", photo: "/C3.png"},
                    {name: "Patchara", desc: "Video editing & motion graphics for content creations", photo: "/C2.png"},
                    {name: "GoatFather", desc: "Video editing & motion graphics for content creation", photo: "/C1.png"},
                    {name: "JLCMTC", desc: "Web development & UI design solutions", photo: "/C4.png"}
                  ].map((client) => (
                    <div 
                      key={`${client.name}-${i}`}
                      className="bg-card/20 backdrop-blur-sm border border-border/30 rounded-lg overflow-hidden hover:bg-card/40 transition-all duration-300 hover:scale-105 w-96 flex-shrink-0"
                    >
                      <div className="h-[500px] relative">
                        <img 
                          src={client.photo} 
                          alt={client.name}
                          className="w-full h-full object-contain"
                        />
                      </div>
                      <div className="p-4">
                        <h3 className="text-lg font-semibold text-foreground mb-2">{client.name}</h3>
                        <p className="text-sm text-muted-foreground">{client.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              ))}
            </div>
            <style>{`
              @keyframes scroll {
                0% { transform: translateX(0); }
                100% { transform: translateX(-50%); }
              }
            `}</style>
          </div>
        </div>
        
        <div className="text-center mb-16">
          <ScrollFloat
            animationDuration={1}
            ease="back.inOut(2)"
            scrollStart="top bottom-=20%"
            scrollEnd="bottom bottom-=60%"
            stagger={0.05}
            containerClassName="mb-4"
            textClassName="text-4xl md:text-5xl font-bold text-foreground title-font"
          >
            MY DEMO REEL
          </ScrollFloat>
          <div className="h-px w-24 bg-gradient-to-r from-transparent via-primary to-transparent mx-auto mb-6"></div>
          <ScrollFloat
            animationDuration={1.2}
            ease="back.inOut(2)"
            scrollStart="top bottom-=10%"
            scrollEnd="bottom bottom-=50%"
            stagger={0.02}
            containerClassName=""
            textClassName="text-xl text-muted-foreground max-w-2xl mx-auto"
          >
            A showcase of my multimedia artistry, web development, and game design skills, all woven into a dynamic visual experience.
          </ScrollFloat>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="aspect-video bg-card border border-border rounded-lg overflow-hidden shadow-glow">
            <iframe
              className="w-full h-full"
              src="https://www.youtube.com/embed/g3BVlSpiWSY"
              title="Demo Reel"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      </div>

    </section>
  );
};

export default VideoSection;