import { ExclamationTriangleIcon } from '@heroicons/react/24/outline';
import { cn, formatDistance, formatSize, formatVelocity } from '../../../lib/utils';
import type { NearEarthObject } from '../types';

interface ObjectListItemProps {
  object: NearEarthObject;
  onHover?: (objectId: string | null) => void;
  onClick?: (object: NearEarthObject) => void;
  isHighlighted?: boolean;
  isSelected?: boolean;
}

export function ObjectListItem({ 
  object, 
  onHover, 
  onClick,
  isHighlighted = false,
  isSelected = false
}: ObjectListItemProps) {
  return (
    <div
      className={cn(
        'p-4 rounded-lg border-2 transition-all duration-300 cursor-pointer',
        'hover:border-nebula-purple-50 hover:bg-white-5',
        isSelected
          ? 'border-cosmic-blue bg-cosmic-blue-10 shadow-lg shadow-cosmic-blue-30'
          : isHighlighted
          ? 'border-nebula-purple bg-nebula-purple-10 shadow-lg shadow-nebula-purple-20'
          : 'border-white-20 bg-white-5'
      )}
      onClick={() => onClick?.(object)}
      onMouseEnter={() => onHover?.(object.id)}
      onMouseLeave={() => onHover?.(null)}
    >
      {/* Header with name and hazard warning */}
      <div className="flex items-start justify-between mb-3">
        <h3 className="text-lg font-semibold text-white truncate pr-2">
          {object.name}
        </h3>
        {object.is_potentially_hazardous && (
          <div className="flex items-center gap-1 px-2 py-1 bg-orange-500-20 border border-orange-500-30 rounded text-orange-300 text-xs font-medium whitespace-nowrap">
            <ExclamationTriangleIcon className="w-3 h-3" />
            HAZARDOUS
          </div>
        )}
      </div>

      {/* Object details in a clean grid */}
      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <span className="text-white-60 text-sm">Distance:</span>
          <span className="text-white font-medium text-sm">
            {formatDistance(object.close_approach)}
          </span>
        </div>
        
        <div className="flex justify-between items-center">
          <span className="text-white-60 text-sm">Size:</span>
          <span className="text-white font-medium text-sm">
            {formatSize(object.size)}
          </span>
        </div>
        
        <div className="flex justify-between items-center">
          <span className="text-white-60 text-sm">Velocity:</span>
          <span className="text-white font-medium text-sm">
            {formatVelocity(object.velocity)}
          </span>
        </div>
      </div>

      {/* Potentially hazardous indicator at bottom if applicable */}
      {object.is_potentially_hazardous && (
        <div className="flex items-center gap-1 mt-3 pt-2 border-t border-orange-500-30">
          <ExclamationTriangleIcon className="w-4 h-4 text-orange-400" />
          <span className="text-orange-400 text-xs font-medium">
            Potentially Hazardous Object
          </span>
        </div>
      )}
    </div>
  );
}
