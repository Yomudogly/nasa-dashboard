import { useState } from 'react';
import { SpaceBackground } from '../components/layout/SpaceBackground';
import { DatePicker } from '../components/ui/DatePicker';
import { SortSelector } from '../components/ui/SortSelector';
import { ObjectList } from '../features/neo/components/ObjectList';
import { ObjectVisualization } from '../features/neo/components/ObjectVisualization';
import { useNearEarthObjects } from '../features/neo/hooks/useNearEarthObjects';
import { formatDate } from '../lib/utils';
import { ChartBarIcon, ExclamationTriangleIcon, EyeIcon, ScaleIcon } from '@heroicons/react/24/outline';
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

        {/* Statistics Panel */}
        <div className="p-6 border-b border-white-10">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-nebula-purple/20 border border-nebula-purple/30">
                <ChartBarIcon className="h-5 w-5 text-nebula-purple" />
              </div>
              <div>
                <h3 className="text-white font-semibold text-sm uppercase tracking-wide mb-1">
                  Objects Detected
                </h3>
                <p className="text-2xl font-bold text-nebula-purple transition-all duration-300">
                  {isLoading ? (
                    <span className="animate-pulse">...</span>
                  ) : error ? (
                    <span className="text-red-400">--</span>
                  ) : (
                    <span className="animate-in fade-in duration-500">
                      {objects.length}
                    </span>
                  )}
                </p>
              </div>
            </div>
            <div className="text-right">
              <h4 className="text-white-60 text-xs uppercase tracking-wide mb-1">
                Date
              </h4>
              <p className="text-white-80 text-sm font-medium">
                {formatDate(new Date(selectedDate))}
              </p>
            </div>
          </div>
          
          {!isLoading && !error && objects.length > 0 && (
            <div className="mt-4 grid grid-cols-3 gap-3 animate-in fade-in duration-700 delay-150">
              <div className="text-center p-3 rounded-lg bg-orange-400/10 border border-orange-400/20 hover:bg-orange-400/20 transition-all duration-300 group">
                <div className="flex items-center justify-center mb-2">
                  <ExclamationTriangleIcon className="h-4 w-4 text-orange-400 group-hover:scale-110 transition-transform duration-200" />
                </div>
                <p className="text-white-60 text-xs uppercase tracking-wide mb-1">
                  Potentially Hazardous
                </p>
                <p className="text-orange-400 font-bold text-lg transition-all duration-300">
                  {objects.filter(obj => obj.is_potentially_hazardous).length}
                </p>
              </div>
              <div className="text-center p-3 rounded-lg bg-cyan-400/10 border border-cyan-400/20 hover:bg-cyan-400/20 transition-all duration-300 group">
                <div className="flex items-center justify-center mb-2">
                  <EyeIcon className="h-4 w-4 text-cyan-400 group-hover:scale-110 transition-transform duration-200" />
                </div>
                <p className="text-white-60 text-xs uppercase tracking-wide mb-1">
                  Close Approach
                </p>
                <p className="text-cyan-400 font-bold text-lg transition-all duration-300">
                  {objects.filter(obj => obj.close_approach < 1000000).length}
                </p>
              </div>
              <div className="text-center p-3 rounded-lg bg-purple-400/10 border border-purple-400/20 hover:bg-purple-400/20 transition-all duration-300 group">
                <div className="flex items-center justify-center mb-2">
                  <ScaleIcon className="h-4 w-4 text-purple-400 group-hover:scale-110 transition-transform duration-200" />
                </div>
                <p className="text-white-60 text-xs uppercase tracking-wide mb-1">
                  Large Objects
                </p>
                <p className="text-purple-400 font-bold text-lg transition-all duration-300">
                  {objects.filter(obj => obj.size > 1).length}
                </p>
              </div>
            </div>
          )}
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
