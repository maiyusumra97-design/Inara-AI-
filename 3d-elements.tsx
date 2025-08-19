import { useEffect, useRef } from "react";

export default function ThreeDElements() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Create floating particles
    const createParticle = (index: number) => {
      const particle = document.createElement("div");
      particle.className = "particle";
      particle.style.top = `${Math.random() * 100}%`;
      particle.style.left = `${Math.random() * 100}%`;
      particle.style.animationDelay = `${index * 0.5}s`;
      particle.style.animationDuration = `${4 + Math.random() * 2}s`;
      return particle;
    };

    // Add particles to container
    for (let i = 0; i < 5; i++) {
      const particle = createParticle(i);
      containerRef.current.appendChild(particle);
    }

    // Cleanup function
    return () => {
      if (containerRef.current) {
        containerRef.current.innerHTML = "";
      }
    };
  }, []);

  return (
    <div 
      ref={containerRef}
      className="absolute inset-0 z-0 pointer-events-none"
      data-testid="3d-elements"
    >
      {/* Gradient overlays for depth */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-neon-blue/10 to-transparent rounded-full blur-3xl animate-float"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-tl from-neon-purple/10 to-transparent rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-r from-neon-pink/10 to-transparent rounded-full blur-3xl animate-float" style={{ animationDelay: '4s' }}></div>
    </div>
  );
}
