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
    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 800);

    return () => clearTimeout(timer);
  }, []);

  return (
    <motion.div
      initial={{ 
        clipPath: "polygon(0 0, 0 0, 0 100%, 0% 100%)",
        filter: "blur(0px) contrast(1) brightness(1)"
      }}
      animate={{ 
        clipPath: "polygon(0 0, 100% 0, 100% 100%, 0% 100%)",
        filter: "blur(0px) contrast(1) brightness(1)"
      }}
      exit={{ 
        clipPath: "polygon(100% 0, 100% 0, 100% 100%, 100% 100%)",
        filter: "blur(0px) contrast(1) brightness(1)"
      }}
      transition={{
        duration: 0.8,
        ease: [0.76, 0, 0.24, 1],
        filter: {
          duration: 0.4,
          times: [0, 0.5, 1],
          values: [
            "blur(0px) contrast(1) brightness(1)",
            "blur(2px) contrast(2) brightness(0.8)",
            "blur(0px) contrast(1) brightness(1)"
          ]
        }
      }}
      onAnimationComplete={() => {
        ScrollTrigger.refresh();
      }}
      className="transition-pixelate"
    >
      {children}
    </motion.div>
  );
};

export default PageTransition;