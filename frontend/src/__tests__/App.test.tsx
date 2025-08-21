import { describe, it, expect } from '@jest/globals';
import { render, screen } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import App from '../App';

// Create a test client
const createTestQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
      mutations: {
        retry: false,
      },
    },
  });

const renderWithQueryClient = (component: React.ReactElement) => {
  const testQueryClient = createTestQueryClient();
  return render(
    <QueryClientProvider client={testQueryClient}>
      {component}
    </QueryClientProvider>
  );
};

describe('App', () => {
  it('renders the NASA Dashboard title', () => {
    renderWithQueryClient(<App />);
    expect(screen.getByText('NASA Dashboard')).toBeTruthy();
  });

  it('renders the date picker', () => {
    renderWithQueryClient(<App />);
    expect(screen.getByLabelText('Select Date')).toBeTruthy();
  });

  it('renders the sort selector', () => {
    renderWithQueryClient(<App />);
    expect(screen.getByText('Sort By')).toBeTruthy();
  });
});
