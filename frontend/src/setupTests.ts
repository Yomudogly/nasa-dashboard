import '@testing-library/jest-dom';

// Mock import.meta.env for Vite environment variables
Object.defineProperty(global, 'import', {
  value: {
    meta: {
      env: {
        VITE_API_URL: 'http://localhost:3001',
      },
    },
  },
});

// Mock the API module
jest.mock('./lib/api', () => ({
  fetchNearEarthObjects: jest.fn().mockResolvedValue([]),
}));
