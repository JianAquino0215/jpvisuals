import Navigation from "@/components/Navigation";
import Skills from "@/components/Skills";
import PageTransition from "@/components/PageTransition";

const SkillsPage = () => {
  return (
    <PageTransition>
      <div className="min-h-screen bg-section-gradient">
        <Navigation />
        <main>
          <Skills />
        </main>
      </div>
    </PageTransition>
  );
};

export default SkillsPage;