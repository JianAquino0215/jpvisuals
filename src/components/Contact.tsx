import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import ScrollFloat from "./ScrollFloat";

const Contact = () => {
  return (
    <section className="py-20 px-4">
      <div className="max-w-4xl mx-auto">
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
            Let's Create Together
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
            Ready to bring your creative vision to life? Let's discuss your next project.
          </ScrollFloat>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <Card className="p-6 bg-card border-border shadow-card hover:shadow-glow transition-all duration-300">
            <div className="text-center">
              <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">📧</span>
              </div>
              <h3 className="text-xl font-bold text-foreground mb-2">Email</h3>
              <p className="text-muted-foreground">jianaquino0215@gmail.com</p>
            </div>
          </Card>

          <Card className="p-6 bg-card border-border shadow-card hover:shadow-glow transition-all duration-300">
            <div className="text-center">
              <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">💼</span>
              </div>
              <h3 className="text-xl font-bold text-foreground mb-2">LinkedIn</h3>
              <p className="text-muted-foreground">Connect with me professionally</p>
            </div>
          </Card>
        </div>

        <Card className="p-8 bg-card border-border shadow-card">
          <form className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Name
                </label>
                <input 
                  type="text"
                  className="w-full px-4 py-3 bg-input border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-colors duration-200 text-foreground"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Email
                </label>
                <input 
                  type="email"
                  className="w-full px-4 py-3 bg-input border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-colors duration-200 text-foreground"
                  placeholder="your.email@example.com"
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Project Type
              </label>
              <select className="w-full px-4 py-3 bg-input border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-colors duration-200 text-foreground">
                <option>Web Development</option>
                <option>Multimedia Art</option>
                <option>Game Development</option>
                <option>Consultation</option>
                <option>Other</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Message
              </label>
              <textarea 
                rows={6}
                className="w-full px-4 py-3 bg-input border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-colors duration-200 text-foreground resize-none"
                placeholder="Tell me about your project..."
              ></textarea>
            </div>
            
            <Button 
              type="submit"
              size="lg"
              className="w-full bg-primary hover:bg-primary/90 text-primary-foreground shadow-glow transition-all duration-300 hover:scale-105"
            >
              Send Message
            </Button>
          </form>
        </Card>
      </div>
    </section>
  );
};

export default Contact;