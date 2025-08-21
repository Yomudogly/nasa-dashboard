import { useEffect, useState } from 'react';
import { cn } from '../../lib/utils';

interface Star {
  id: number;
  x: number;
  y: number;
  size: number;
  opacity: number;
  twinkleDelay: number;
}

interface SpaceBackgroundProps {
  className?: string;
}

export function SpaceBackground({ className }: SpaceBackgroundProps) {
  const [stars, setStars] = useState<Star[]>([]);

  useEffect(() => {
    const generateStars = () => {
      const newStars: Star[] = [];
      const starCount = 200;

      for (let i = 0; i < starCount; i++) {
        newStars.push({
          id: i,
          x: Math.random() * 100,
          y: Math.random() * 100,
          size: Math.random() * 2 + 1,
          opacity: Math.random() * 0.8 + 0.2,
          twinkleDelay: Math.random() * 4,
        });
      }

      setStars(newStars);
    };

    generateStars();
  }, []);

  return (
    <div className={cn('fixed inset-0 overflow-hidden', className)}>
      {/* Base gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-space-900 via-space-800 to-space-700" />
      
      {/* Nebula effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-nebula-purple-10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute top-3/4 right-1/4 w-96 h-96 bg-nebula-blue-8 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
        <div className="absolute bottom-1/4 left-1/3 w-48 h-48 bg-nebula-cyan-6 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '4s' }} />
      </div>

      {/* Stars */}
      <div className="absolute inset-0">
        {stars.map((star) => (
          <div
            key={star.id}
            className="absolute rounded-full bg-white animate-twinkle"
            style={{
              left: `${star.x}%`,
              top: `${star.y}%`,
              width: `${star.size}px`,
              height: `${star.size}px`,
              opacity: star.opacity,
              animationDelay: `${star.twinkleDelay}s`,
            }}
          />
        ))}
      </div>

      {/* Shooting stars */}
      <div className="absolute inset-0">
        <div className="absolute w-1 h-1 bg-white rounded-full animate-ping" style={{ top: '20%', left: '10%', animationDelay: '3s', animationDuration: '6s' }} />
        <div className="absolute w-1 h-1 bg-white rounded-full animate-ping" style={{ top: '60%', left: '80%', animationDelay: '8s', animationDuration: '6s' }} />
        <div className="absolute w-1 h-1 bg-white rounded-full animate-ping" style={{ top: '80%', left: '30%', animationDelay: '12s', animationDuration: '6s' }} />
      </div>
    </div>
  );
}
