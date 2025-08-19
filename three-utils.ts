// Utility functions for Three.js integration
// This file provides helper functions for 3D elements and animations

export interface Particle {
  x: number;
  y: number;
  z: number;
  vx: number;
  vy: number;
  vz: number;
  life: number;
  maxLife: number;
}

export class ParticleSystem {
  particles: Particle[] = [];
  maxParticles: number;

  constructor(maxParticles: number = 50) {
    this.maxParticles = maxParticles;
  }

  createParticle(): Particle {
    return {
      x: (Math.random() - 0.5) * 2,
      y: (Math.random() - 0.5) * 2,
      z: (Math.random() - 0.5) * 2,
      vx: (Math.random() - 0.5) * 0.02,
      vy: (Math.random() - 0.5) * 0.02,
      vz: (Math.random() - 0.5) * 0.02,
      life: 1.0,
      maxLife: Math.random() * 2 + 1,
    };
  }

  update() {
    // Add new particles if needed
    while (this.particles.length < this.maxParticles) {
      this.particles.push(this.createParticle());
    }

    // Update existing particles
    this.particles = this.particles.filter(particle => {
      particle.x += particle.vx;
      particle.y += particle.vy;
      particle.z += particle.vz;
      particle.life -= 0.01;

      return particle.life > 0;
    });
  }

  getParticlePositions(): Float32Array {
    const positions = new Float32Array(this.particles.length * 3);
    this.particles.forEach((particle, i) => {
      positions[i * 3] = particle.x;
      positions[i * 3 + 1] = particle.y;
      positions[i * 3 + 2] = particle.z;
    });
    return positions;
  }
}

export const createFloatingAnimation = (element: HTMLElement, duration: number = 4000) => {
  const startTime = Date.now();
  const startY = element.offsetTop;
  
  const animate = () => {
    const elapsed = Date.now() - startTime;
    const progress = (elapsed % duration) / duration;
    const offset = Math.sin(progress * Math.PI * 2) * 20;
    
    element.style.transform = `translateY(${offset}px)`;
    
    requestAnimationFrame(animate);
  };
  
  animate();
};

export const create3DRotation = (element: HTMLElement, speed: number = 0.01) => {
  let rotation = 0;
  
  const animate = () => {
    rotation += speed;
    element.style.transform = `rotateY(${rotation}rad)`;
    requestAnimationFrame(animate);
  };
  
  animate();
};

export const createGlowEffect = (element: HTMLElement, color: string = '#00D4FF') => {
  const intensity = Math.sin(Date.now() * 0.001) * 0.5 + 0.5;
  const glowSize = 20 + intensity * 10;
  
  element.style.boxShadow = `0 0 ${glowSize}px ${color}`;
  
  requestAnimationFrame(() => createGlowEffect(element, color));
};

// Intersection Observer for scroll-triggered animations
export const createScrollTrigger = (
  elements: NodeListOf<Element> | Element[],
  callback: (element: Element, isVisible: boolean) => void,
  threshold: number = 0.1
) => {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        callback(entry.target, entry.isIntersecting);
      });
    },
    { threshold }
  );

  elements.forEach(element => observer.observe(element));
  
  return observer;
};

export const animateOnScroll = (selector: string) => {
  const elements = document.querySelectorAll(selector);
  
  createScrollTrigger(elements, (element, isVisible) => {
    if (isVisible) {
      element.classList.add('animate-slideUp');
    }
  });
};

// Color utilities for neon effects
export const neonColors = {
  blue: 'hsl(200, 100%, 50%)',
  purple: 'hsl(262, 83%, 70%)',
  pink: 'hsl(328, 86%, 70%)',
  green: 'hsl(158, 100%, 50%)',
};

export const createNeonGradient = (colors: string[], direction: string = '45deg') => {
  return `linear-gradient(${direction}, ${colors.join(', ')})`;
};
