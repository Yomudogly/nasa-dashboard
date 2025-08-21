import { useState } from 'react';
import { SpaceBackground } from '../components/layout/SpaceBackground';
import { DatePicker } from '../components/ui/DatePicker';
import { SortSelector } from '../components/ui/SortSelector';
import { ObjectList } from '../features/neo/components/ObjectList';
import { ObjectVisualization } from '../features/neo/components/ObjectVisualization';
import { useNearEarthObjects } from '../features/neo/hooks/useNearEarthObjects';
import { formatDate } from '../lib/utils';
import type { NearEarthObject, SortOption } from '../features/neo/types';

export function DashboardPage() {
  const [selectedDate, setSelectedDate] = useState(() => formatDate(new Date()));
  const [sortOption, setSortOption] = useState<SortOption>('closeness');
  const [highlightedObjectId, setHighlightedObjectId] = useState<string | null>(null);
  const [selectedObject, setSelectedObject] = useState<NearEarthObject | null>(null);

  const { data: objects = [], isLoading, error } = useNearEarthObjects(selectedDate, sortOption);

  const handleObjectHover = (objectId: string | null) => {
    setHighlightedObjectId(objectId);
  };

  const handleObjectClick = (object: NearEarthObject) => {
    setSelectedObject(object);
  };

  return (
    <div className="relative h-screen w-screen overflow-hidden bg-space-900">
      {/* Background */}
      <SpaceBackground />

      {/* Main Visualization - Full Screen */}
      <div className="relative z-10 h-full">
        <ObjectVisualization
          objects={objects}
          highlightedId={highlightedObjectId}
          selectedId={selectedObject?.id}
          onObjectHover={handleObjectHover}
          onObjectClick={handleObjectClick}
          className="h-full"
        />
      </div>

      {/* Floating Left Panel - Controls and Object List */}
      <div className="absolute top-6 left-6 w-96 h-[calc(100vh-3rem)] glassmorphism-dark rounded-lg border border-white-20 z-20 flex flex-col">
        {/* Header */}
        <div className="p-6 border-b border-white-10">
          <h1 className="text-2xl font-bold text-white mb-2 text-shadow">
            NASA Dashboard
          </h1>
          <p className="text-white-60 text-sm">
            Explore near-Earth objects in real-time
          </p>
        </div>

        {/* Controls */}
        <div className="p-6 space-y-4 border-b border-white-10">
          <div>
            <label className="block text-white-80 text-sm font-medium mb-2">
              Select Date
            </label>
            <DatePicker
              value={selectedDate}
              onChange={setSelectedDate}
            />
          </div>

          <div>
            <label className="block text-white-80 text-sm font-medium mb-2">
              Sort By
            </label>
            <SortSelector
              value={sortOption}
              onChange={setSortOption}
            />
          </div>
        </div>

        {/* Object List */}
        <div className="flex-1 p-2 overflow-hidden">
          <ObjectList
            objects={objects}
            isLoading={isLoading}
            error={error}
            highlightedId={highlightedObjectId}
            selectedId={selectedObject?.id || null}
            onObjectHover={handleObjectHover}
            onObjectClick={handleObjectClick}
          />
        </div>
        
      </div>
    </div>
  );
}
