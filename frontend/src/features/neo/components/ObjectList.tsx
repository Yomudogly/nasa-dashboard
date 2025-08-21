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
      
      // Calculate position to center the item
      const itemTop = selectedElement.offsetTop;
      const itemHeight = selectedElement.offsetHeight;
      const listHeight = listContainer.clientHeight;
      
      const scrollPosition = itemTop - listHeight  + (itemHeight / 2);
      
      listContainer.scrollTo({
        top: scrollPosition,
        behavior: 'smooth'
      });
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
