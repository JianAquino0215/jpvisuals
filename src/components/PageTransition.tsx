import { motion } from 'framer-motion';
import { ReactNode, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface PageTransitionProps {
  children: ReactNode;
}

const PageTransition = ({ children }: PageTransitionProps) => {
  useEffect(() => {
    // Refresh ScrollTrigger after page transition
    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 700); // After transition completes

    return () => clearTimeout(timer);
  }, []);

  return (
    <motion.div
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: -100, opacity: 0 }}
      transition={{
        type: "tween",
        ease: "easeInOut",
        duration: 0.6
      }}
      onAnimationComplete={() => {
        // Trigger ScrollFloat animations after page transition
        ScrollTrigger.refresh();
      }}
    >
      {children}
    </motion.div>
  );
};

export default PageTransition;