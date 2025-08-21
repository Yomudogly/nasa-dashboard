export interface NearEarthObject {
  id: string;
  name: string;
  size: number;
  close_approach: number;
  velocity: number;
  is_potentially_hazardous: boolean;
}

export type SortOption = 'size' | 'closeness' | 'velocity';

export interface NEOQueryParams {
  start: string;
  end: string;
  sort?: SortOption;
}

export interface VisualizationObject extends NearEarthObject {
  x: number;
  y: number;
  isHighlighted?: boolean;
  isSelected?: boolean;
}
