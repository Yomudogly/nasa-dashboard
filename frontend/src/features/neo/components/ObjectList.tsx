import React, { useEffect, useRef } from 'react';
import type { NearEarthObject } from '../types';
import { ObjectListItem } from './ObjectListItem';
import { LoadingSpinner } from '../../../components/ui/LoadingSpinner';

interface ObjectListProps {
  objects: NearEarthObject[];
  isLoading: boolean;
  error: Error | null;
  highlightedId: string | null;
  selectedId?: string | null;
  onObjectHover: (objectId: string | null) => void;
  onObjectClick: (object: NearEarthObject) => void;
}

export const ObjectList: React.FC<ObjectListProps> = ({
  objects,
  isLoading,
  error,
  highlightedId,
  selectedId,
  onObjectHover,
  onObjectClick
}) => {
  const listRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

  // Scroll to selected item when selectedId changes
  useEffect(() => {
    if (selectedId && itemRefs.current[selectedId] && listRef.current) {
      const selectedElement = itemRefs.current[selectedId];
      const listContainer = listRef.current;
      
      // Add a small delay to ensure DOM is fully rendered
      setTimeout(() => {
        // Get the container's bounding rect for accurate positioning
        const containerRect = listContainer.getBoundingClientRect();
        const elementRect = selectedElement.getBoundingClientRect();
        
        // Calculate scroll position relative to container
        const currentScrollTop = listContainer.scrollTop;
        const elementOffsetFromContainer = elementRect.top - containerRect.top;
        const targetScrollTop = currentScrollTop + elementOffsetFromContainer;
        
        listContainer.scrollTo({
          top: targetScrollTop,
          behavior: 'smooth'
        });
      }, 10);
    }
  }, [selectedId]);

  const setItemRef = (id: string) => (element: HTMLDivElement | null) => {
    itemRefs.current[id] = element;
  };
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-red-400 text-center p-4">
        <p>Error loading objects: {error.message}</p>
      </div>
    );
  }

  if (objects.length === 0) {
    return (
      <div className="text-white-60 text-center p-4">
        <p>No near-Earth objects found for the selected date range.</p>
      </div>
    );
  }

  return (
    <div ref={listRef} className="space-y-2 max-h-full overflow-y-auto custom-scrollbar px-4">
      {objects.map((object) => (
        <div key={object.id} ref={setItemRef(object.id)}>
          <ObjectListItem
            object={object}
            isHighlighted={object.id === highlightedId}
            isSelected={object.id === selectedId}
            onHover={onObjectHover}
            onClick={onObjectClick}
          />
        </div>
      ))}
    </div>
  );
};
