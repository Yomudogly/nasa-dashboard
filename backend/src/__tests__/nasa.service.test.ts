import { NASAService } from '../services/nasa';
import { NASAAPIResponse, NearEarthObject } from '../types';

describe('NASAService', () => {
  let nasaService: NASAService;

  beforeEach(() => {
    nasaService = new NASAService();
  });

  describe('transformNASAData', () => {
    it('should transform NASA API response to simplified format', () => {
      const mockNASAResponse: NASAAPIResponse = {
        links: {
          self: 'test'
        },
        element_count: 1,
        near_earth_objects: {
          '2025-08-21': [
            {
              links: { self: 'test' },
              id: '3542519',
              neo_reference_id: '3542519',
              name: '(2010 PK9)',
              nasa_jpl_url: 'test',
              absolute_magnitude_h: 21.0,
              estimated_diameter: {
                kilometers: {
                  estimated_diameter_min: 0.024,
                  estimated_diameter_max: 0.055
                },
                meters: {
                  estimated_diameter_min: 24.2,
                  estimated_diameter_max: 54.7
                },
                miles: {
                  estimated_diameter_min: 0.015,
                  estimated_diameter_max: 0.034
                },
                feet: {
                  estimated_diameter_min: 79.5,
                  estimated_diameter_max: 179.4
                }
              },
              is_potentially_hazardous_asteroid: false,
              close_approach_data: [
                {
                  close_approach_date: '2025-08-21',
                  close_approach_date_full: '2025-Aug-21 12:00',
                  epoch_date_close_approach: 1755648000000,
                  relative_velocity: {
                    kilometers_per_second: '10.22',
                    kilometers_per_hour: '36792.5',
                    miles_per_hour: '22856.3'
                  },
                  miss_distance: {
                    astronomical: '0.0246',
                    lunar: '9.5644',
                    kilometers: '3680545.5',
                    miles: '2287123.4'
                  },
                  orbiting_body: 'Earth'
                }
              ],
              is_sentry_object: false
            }
          ]
        }
      };

      const result = nasaService.transformNASAData(mockNASAResponse);

      expect(result).toHaveLength(1);
      expect(result[0]).toEqual({
        id: '3542519',
        name: '(2010 PK9)',
        size: 0.02, // Average of 0.015 and 0.034, rounded to 2 decimal places
        close_approach: 2287123.4,
        velocity: 22856.3,
        is_potentially_hazardous: false
      });
    });
  });

  describe('sortObjects', () => {
    const mockObjects: NearEarthObject[] = [
      {
        id: '1',
        name: 'Object 1',
        size: 10,
        close_approach: 1000000,
        velocity: 50000,
        is_potentially_hazardous: false
      },
      {
        id: '2',
        name: 'Object 2',
        size: 20,
        close_approach: 500000,
        velocity: 30000,
        is_potentially_hazardous: true
      },
      {
        id: '3',
        name: 'Object 3',
        size: 5,
        close_approach: 2000000,
        velocity: 70000,
        is_potentially_hazardous: false
      }
    ];

    it('should sort by size (largest first)', () => {
      const result = nasaService.sortObjects(mockObjects, 'size');
      expect(result.map(obj => obj.size)).toEqual([20, 10, 5]);
    });

    it('should sort by velocity (fastest first)', () => {
      const result = nasaService.sortObjects(mockObjects, 'velocity');
      expect(result.map(obj => obj.velocity)).toEqual([70000, 50000, 30000]);
    });

    it('should sort by closeness (closest first)', () => {
      const result = nasaService.sortObjects(mockObjects, 'closeness');
      expect(result.map(obj => obj.close_approach)).toEqual([500000, 1000000, 2000000]);
    });

    it('should default to closeness sorting', () => {
      const result = nasaService.sortObjects(mockObjects, 'invalid');
      expect(result.map(obj => obj.close_approach)).toEqual([500000, 1000000, 2000000]);
    });
  });
});
