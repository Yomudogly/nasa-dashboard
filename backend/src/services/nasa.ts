import axios from 'axios';
import { NASAAPIResponse, NearEarthObject, NASANearEarthObject } from '../types';

export class NASAService {
  private readonly baseURL = 'https://api.nasa.gov/neo/rest/v1';
  private readonly apiKey: string;

  constructor() {
    this.apiKey = process.env.NASA_API_KEY || 'DEMO_KEY';
    if (this.apiKey === 'DEMO_KEY') {
      console.warn('Warning: Using NASA DEMO_KEY. Consider setting NASA_API_KEY environment variable for production use.');
    }
  }

  async fetchNearEarthObjects(startDate: string, endDate: string): Promise<NASAAPIResponse> {
    try {
      const response = await axios.get(`${this.baseURL}/feed`, {
        params: {
          start_date: startDate,
          end_date: endDate,
          api_key: this.apiKey,
        },
        timeout: 10000, // 10 second timeout
      });

      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 429) {
          throw new Error('NASA API rate limit exceeded. Please try again later.');
        }
        if (error.response?.status === 403) {
          throw new Error('Invalid NASA API key or access denied.');
        }
        throw new Error(`NASA API error: ${error.response?.status} - ${error.response?.statusText}`);
      }
      throw new Error('Failed to fetch data from NASA API');
    }
  }

  transformNASAData(nasaResponse: NASAAPIResponse): NearEarthObject[] {
    const objects: NearEarthObject[] = [];

    // Iterate through all dates in the response
    Object.values(nasaResponse.near_earth_objects).forEach((dateObjects) => {
      dateObjects.forEach((nasaObject: NASANearEarthObject) => {
        // Get the closest approach data (usually the first one)
        const closeApproach = nasaObject.close_approach_data[0];
        
        if (!closeApproach) {
          return; // Skip if no close approach data
        }

        // Calculate average size in miles
        const minSizeMiles = nasaObject.estimated_diameter.miles.estimated_diameter_min;
        const maxSizeMiles = nasaObject.estimated_diameter.miles.estimated_diameter_max;
        const avgSizeMiles = (minSizeMiles + maxSizeMiles) / 2;

        // Get miss distance in miles
        const missDistanceMiles = parseFloat(closeApproach.miss_distance.miles);

        // Get velocity in miles per hour
        const velocityMph = parseFloat(closeApproach.relative_velocity.miles_per_hour);

        const transformedObject: NearEarthObject = {
          id: nasaObject.id,
          name: nasaObject.name,
          size: Math.round(avgSizeMiles * 100) / 100, // Round to 2 decimal places
          close_approach: Math.round(missDistanceMiles * 100) / 100, // Round to 2 decimal places
          velocity: Math.round(velocityMph * 100) / 100, // Round to 2 decimal places
          is_potentially_hazardous: nasaObject.is_potentially_hazardous_asteroid,
        };

        objects.push(transformedObject);
      });
    });

    return objects;
  }

  sortObjects(objects: NearEarthObject[], sortBy: string): NearEarthObject[] {
    const sortedObjects = [...objects];

    switch (sortBy) {
      case 'size':
        return sortedObjects.sort((a, b) => b.size - a.size); // Largest first
      case 'velocity':
        return sortedObjects.sort((a, b) => b.velocity - a.velocity); // Fastest first
      case 'closeness':
      default:
        return sortedObjects.sort((a, b) => a.close_approach - b.close_approach); // Closest first
    }
  }
}
