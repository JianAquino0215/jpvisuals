import Navigation from "@/components/Navigation";
import Skills from "@/components/Skills";
import PageTransition from "@/components/PageTransition";

const SkillsPage = () => {
  return (
    <PageTransition>

      <div className="relative z-10 min-h-screen">
        <Navigation />
        <main>
          <Skills />
        </main>
      </div>
    </PageTransition>
  );
};

export default SkillsPage;