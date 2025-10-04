import { useEffect, useRef, useState } from 'react';

interface Star {
  x: number;
  y: number;
  size: number;
  opacity: number;
  originalOpacity: number;
  originalX: number;
  originalY: number;
  vx: number;
  vy: number;
}

const StarConstellation = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [stars, setStars] = useState<Star[]>([]);
  const mousePos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = Math.max(document.body.scrollHeight, window.innerHeight);
    };

    const generateStars = () => {
      const pageHeight = Math.max(document.body.scrollHeight, window.innerHeight);
      const starCount = Math.floor((pageHeight / window.innerHeight) * 100);
      const newStars: Star[] = [];
      
      for (let i = 0; i < starCount; i++) {
        const opacity = Math.random() * 0.8 + 0.2;
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        newStars.push({
          x,
          y: Math.random() * pageHeight,
          size: Math.random() * 2 + 1,
          opacity,
          originalOpacity: opacity,
          originalX: x,
          originalY: Math.random() * pageHeight,
          vx: 0,
          vy: 0
        });
      }
      setStars(newStars);
    };

    const handleMouseMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      stars.forEach((star, index) => {
        const dx = mousePos.current.x - star.x;
        const dy = mousePos.current.y - star.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const maxDistance = 150;
        
        if (distance < maxDistance) {
          const attraction = (1 - distance / maxDistance) * 0.1;
          star.x += dx * attraction;
          star.y += dy * attraction;
          star.opacity = star.originalOpacity + (1 - distance / maxDistance) * 0.5;
          star.size = (star.size * 0.9) + ((Math.random() * 2 + 2) * 0.1);
        } else {
          // Return to original position
          star.x += (star.originalX - star.x) * 0.05;
          star.y += (star.originalY - star.y) * 0.05;
          star.opacity = star.originalOpacity;
          star.size = star.size * 0.98 + (Math.random() * 2 + 1) * 0.02;
        }

        // Draw star
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0, 191, 255, ${star.opacity})`;
        ctx.fill();

        // Draw connections
        stars.forEach((otherStar, otherIndex) => {
          if (index !== otherIndex) {
            const dx2 = star.x - otherStar.x;
            const dy2 = star.y - otherStar.y;
            const dist = Math.sqrt(dx2 * dx2 + dy2 * dy2);
            
            if (dist < 100) {
              const mouseDistance = Math.min(
                Math.sqrt((mousePos.current.x - star.x) ** 2 + (mousePos.current.y - star.y) ** 2),
                Math.sqrt((mousePos.current.x - otherStar.x) ** 2 + (mousePos.current.y - otherStar.y) ** 2)
              );
              
              const lineOpacity = mouseDistance < 150 ? 
                (1 - dist / 100) * 0.3 * (1 - mouseDistance / 150) : 
                (1 - dist / 100) * 0.1;
              
              ctx.beginPath();
              ctx.moveTo(star.x, star.y);
              ctx.lineTo(otherStar.x, otherStar.y);
              ctx.strokeStyle = `rgba(0, 191, 255, ${lineOpacity})`;
              ctx.lineWidth = 0.5;
              ctx.stroke();
            }
          }
        });
      });

      requestAnimationFrame(animate);
    };

    resizeCanvas();
    generateStars();
    window.addEventListener('resize', () => {
      resizeCanvas();
      generateStars();
    });
    window.addEventListener('mousemove', handleMouseMove);
    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [stars.length]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-[5]"
      style={{ background: 'transparent' }}
    />
  );
};

export default StarConstellation;