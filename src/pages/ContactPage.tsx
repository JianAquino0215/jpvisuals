import Navigation from "@/components/Navigation";
import Contact from "@/components/Contact";
import PageTransition from "@/components/PageTransition";

const ContactPage = () => {
  return (
    <PageTransition>
      <div className="min-h-screen bg-section-gradient">
        <Navigation />
        <main>
          <Contact />
        </main>
      </div>
    </PageTransition>
  );
};

export default ContactPage;