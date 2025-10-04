import ScrollFloat from "./ScrollFloat";

const PastClients = () => {
  const clients = [
    "Netflix", "Google", "Microsoft"
  ];

  return (
    <section className="pt-100 pb-20 px-4">
      <div className="max-w-6xl mx-auto text-center">
        <ScrollFloat
          animationDuration={1}
          ease="back.inOut(2)"
          scrollStart="top bottom-=20%"
          scrollEnd="bottom bottom-=60%"
          stagger={0.05}
          containerClassName="mb-4"
          textClassName="text-4xl md:text-5xl font-bold text-foreground title-font"
        >
          Past Clients
        </ScrollFloat>
        
        <ScrollFloat
          animationDuration={1.2}
          ease="back.inOut(2)"
          scrollStart="top bottom-=10%"
          scrollEnd="bottom bottom-=50%"
          stagger={0.02}
          containerClassName="mb-16"
          textClassName="text-xl text-muted-foreground max-w-2xl mx-auto"
        >
          Trusted by leading content creators and companies worldwide   
        </ScrollFloat>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 items-center">
          {clients.map((client, index) => (
            <div 
              key={client}
              className="text-2xl font-semibold text-muted-foreground hover:text-primary transition-colors duration-300"
              style={{animationDelay: `${index * 0.1}s`}}
            >
              {client}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PastClients;