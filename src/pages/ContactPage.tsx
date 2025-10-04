import Navigation from "@/components/Navigation";
import Contact from "@/components/Contact";
import PageTransition from "@/components/PageTransition";

const ContactPage = () => {
  return (
    <PageTransition>

      <div className="relative z-10 min-h-screen">
        <Navigation />
        <main>
          <Contact />
        </main>
      </div>
    </PageTransition>
  );
};

export default ContactPage;