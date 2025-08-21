import { useEffect, useMemo, useState } from 'react';
import { cn } from '../../../lib/utils';
import type { NearEarthObject, VisualizationObject } from '../types';

interface ObjectVisualizationProps {
  objects: NearEarthObject[];
  highlightedId?: string | null;
  selectedId?: string | null;
  onObjectHover?: (objectId: string | null) => void;
  onObjectClick?: (object: NearEarthObject) => void;
  className?: string;
}

export function ObjectVisualization({
  objects,
  highlightedId,
  selectedId,
  onObjectHover,
  onObjectClick,
  className,
}: ObjectVisualizationProps) {
  const [, setContainerSize] = useState({ width: 800, height: 600 });

  // Generate visualization objects with positions
  const visualizationObjects = useMemo<VisualizationObject[]>(() => {
    if (!objects.length) return [];

    // Sort by distance to create layered effect
    const sortedObjects = [...objects].sort((a, b) => a.close_approach - b.close_approach);
    
    return sortedObjects.map((object, index) => {
      // Create orbital-like positioning based on distance
      const normalizedDistance = Math.log(object.close_approach) / Math.log(Math.max(...objects.map(o => o.close_approach)));
      const angle = (index * 137.5) % 360; // Golden angle for good distribution
      const radius = 120 + normalizedDistance * 180; // Distance from center
      
      // Convert polar to cartesian coordinates
      const x = 50 + (radius * Math.cos(angle * Math.PI / 180)) / 5; // Scale to percentage
      const y = 35 + (radius * Math.sin(angle * Math.PI / 180)) / 5; // Offset up to avoid Earth
      
      // Keep objects within bounds and away from Earth (bottom 25%)
      const clampedX = Math.max(5, Math.min(95, x));
      const clampedY = Math.max(5, Math.min(70, y)); // Keep above Earth

      return {
        ...object,
        x: clampedX,
        y: clampedY,
        isHighlighted: highlightedId === object.id,
        isSelected: selectedId === object.id,
      };
    });
  }, [objects, highlightedId, selectedId]);

  useEffect(() => {
    const updateSize = () => {
      const container = document.getElementById('visualization-container');
      if (container) {
        const rect = container.getBoundingClientRect();
        setContainerSize({ width: rect.width, height: rect.height });
      }
    };

    updateSize();
    window.addEventListener('resize', updateSize);
    return () => window.removeEventListener('resize', updateSize);
  }, []);

  return (
    <div
      id="visualization-container"
      className={cn(
        'relative w-full h-full overflow-hidden rounded-lg bg-gradient-to-br from-space-900-50 to-space-700-50',
        className
      )}
    >
      {/* Earth representation - Large SVG taking 1/4 of screen */}
      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2" style={{ width: '25vw', height: '25vw', minWidth: '200px', minHeight: '200px' }}>
        <svg
          viewBox="0 0 200 200"
          className="w-full h-full earth-rotation"
          style={{ filter: 'drop-shadow(0 0 20px rgba(59, 130, 246, 0.3))' }}
        >
          <defs>
            <radialGradient id="earthGradient" cx="0.3" cy="0.3">
              <stop offset="0%" stopColor="#4ade80" />
              <stop offset="50%" stopColor="#3b82f6" />
              <stop offset="100%" stopColor="#1e40af" />
            </radialGradient>
            <radialGradient id="continentGradient" cx="0.4" cy="0.4">
              <stop offset="0%" stopColor="#22c55e" />
              <stop offset="100%" stopColor="#16a34a" />
            </radialGradient>
          </defs>
          
          {/* Earth base */}
          <circle
            cx="100"
            cy="100"
            r="90"
            fill="url(#earthGradient)"
            stroke="#60a5fa"
            strokeWidth="2"
          />
          
          {/* Continents - simplified shapes */}
          <g fill="url(#continentGradient)">
            {/* North America */}
            <path d="M 40 50 Q 60 40 80 55 Q 75 70 65 80 Q 50 75 40 70 Z" />
            {/* Europe/Africa */}
            <path d="M 90 45 Q 110 40 115 60 Q 120 80 110 90 Q 95 85 90 70 Z" />
            {/* Asia */}
            <path d="M 120 50 Q 140 45 155 65 Q 150 80 135 85 Q 125 75 120 65 Z" />
            {/* South America */}
            <path d="M 60 90 Q 75 85 80 105 Q 85 125 75 135 Q 65 130 60 115 Z" />
            {/* Australia */}
            <path d="M 130 110 Q 145 105 150 115 Q 145 125 135 120 Z" />
          </g>
          
          {/* Atmosphere glow */}
          <circle
            cx="100"
            cy="100"
            r="95"
            fill="none"
            stroke="rgba(59, 130, 246, 0.4)"
            strokeWidth="3"
            opacity="0.6"
          />
          
          {/* Cloud layer */}
          <g fill="rgba(255, 255, 255, 0.3)">
            <ellipse cx="70" cy="60" rx="15" ry="8" opacity="0.7" />
            <ellipse cx="120" cy="70" rx="20" ry="10" opacity="0.6" />
            <ellipse cx="85" cy="110" rx="18" ry="9" opacity="0.5" />
            <ellipse cx="140" cy="120" rx="12" ry="6" opacity="0.7" />
          </g>
        </svg>
        
        {/* Earth label */}
        <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-white-80 font-medium text-sm">
          Earth
        </div>
      </div>

      {/* Near-Earth Objects */}
      {visualizationObjects.map((object, index) => {
        const sizeScale = Math.log(object.size + 2) * 4 + 8; // Larger scaling for better visibility
        const isInteractive = object.isHighlighted || object.isSelected;
        
        // Choose shape based on object properties - use index and name for better distribution
        const getObjectShape = (obj: NearEarthObject, idx: number) => {
          const shapes = ['asteroid', 'comet', 'rocky', 'metallic'];
          // Use both index and name hash for better distribution
          const hash = obj.name.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
          const shapeIndex = (hash + idx) % shapes.length;
          return shapes[shapeIndex];
        };

        const shape = getObjectShape(object, index);
        const color = object.is_potentially_hazardous ? '#fb923c' : '#ffffff';
        const glowColor = object.is_potentially_hazardous ? 'rgba(251, 146, 60, 0.8)' : 'rgba(255, 255, 255, 0.8)';
        
        return (
          <div
            key={object.id}
            className={cn(
              'absolute cursor-pointer',
              'neo-object',
              isInteractive && 'neo-object-glow'
            )}
            style={{
              left: `${object.x}%`,
              top: `${object.y}%`,
              width: `${sizeScale}px`,
              height: `${sizeScale}px`,
              zIndex: isInteractive ? 20 : 10,
              animationDelay: `${Math.random() * 6}s`, // Random delay for varied movement
              transformOrigin: 'center center',
              filter: isInteractive
                ? `drop-shadow(0 0 ${sizeScale * 3}px ${glowColor})`
                : 'none',
            }}
            onMouseEnter={() => onObjectHover?.(object.id)}
            onMouseLeave={() => onObjectHover?.(null)}
            onClick={() => onObjectClick?.(object)}
            title={object.name}
          >
            <svg
              width="100%"
              height="100%"
              viewBox="0 0 24 24"
              className="w-full h-full"
            >
              {/* Different shapes based on object type */}
              {shape === 'asteroid' && (
                <path
                  d="M12 2 L16 8 L22 8 L18 14 L20 22 L12 18 L4 22 L6 14 L2 8 L8 8 Z"
                  fill={color}
                  stroke={color}
                  strokeWidth="0.5"
                />
              )}
              
              {shape === 'comet' && (
                <g>
                  <ellipse cx="12" cy="12" rx="4" ry="7" fill={color} />
                  <path
                    d="M12 5 Q16 1 20 3 Q18 5 16 7 Q14 6 12 5 Z"
                    fill={color}
                    opacity="0.6"
                  />
                </g>
              )}
              
              {shape === 'rocky' && (
                <polygon
                  points="12,2 17,7 22,12 17,17 12,22 7,17 2,12 7,7"
                  fill={color}
                  stroke={color}
                  strokeWidth="0.5"
                />
              )}
              
              {shape === 'metallic' && (
                <g>
                  <circle cx="12" cy="12" r="9" fill={color} />
                  <circle cx="12" cy="12" r="5" fill="none" stroke={color} strokeWidth="1" opacity="0.5" />
                  <circle cx="12" cy="12" r="2" fill={color} opacity="0.8" />
                </g>
              )}
              
              {/* Animated pulse ring for highlighted objects */}
              {isInteractive && (
                <circle
                  cx="12"
                  cy="12"
                  r="11"
                  fill="none"
                  stroke={color}
                  strokeWidth="1"
                  opacity="0.6"
                  className="animate-ping"
                />
              )}
            </svg>
          </div>
        );
      })}

      {/* Orbital paths (subtle guides) */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-20">
        <defs>
          <pattern id="grid" width="50" height="50" patternUnits="userSpaceOnUse">
            <circle cx="25" cy="25" r="1" fill="white" opacity="0.1" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
        
        {/* Orbital rings */}
        <circle cx="50%" cy="50%" r="100" fill="none" stroke="white" strokeWidth="0.5" opacity="0.2" />
        <circle cx="50%" cy="50%" r="150" fill="none" stroke="white" strokeWidth="0.5" opacity="0.15" />
        <circle cx="50%" cy="50%" r="200" fill="none" stroke="white" strokeWidth="0.5" opacity="0.1" />
      </svg>

      {/* Info overlay */}
      {objects.length === 0 && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white-60">
            <div className="text-4xl mb-2">🌌</div>
            <p>Select a date to view near-Earth objects</p>
          </div>
        </div>
      )}
    </div>
  );
}
