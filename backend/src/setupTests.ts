// Jest setup file to configure global test environment

// This file runs before each test file and sets up the Jest environment
// It ensures that Jest globals like describe, it, expect, etc. are available

// Mock console.warn to reduce noise in tests
const originalWarn = console.warn;
beforeEach(() => {
  console.warn = jest.fn();
});

afterEach(() => {
  console.warn = originalWarn;
});

// Global test timeout (30 seconds)
jest.setTimeout(30000);

// Mock environment variables for tests
process.env.NODE_ENV = 'test';
process.env.NASA_API_KEY = 'TEST_KEY';
process.env.REDIS_URL = 'redis://localhost:6379';
