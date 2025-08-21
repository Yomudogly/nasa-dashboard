import axios from 'axios';
import type { NearEarthObject, NEOQueryParams } from '../features/neo/types';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

const apiClient = axios.create({
  baseURL: `${API_BASE_URL}/api/v1`,
  timeout: 10000,
});

export const neoApi = {
  async getNearEarthObjects(params: NEOQueryParams): Promise<NearEarthObject[]> {
    const response = await apiClient.get<NearEarthObject[]>('/objects', {
      params,
    });
    return response.data;
  },

  async getHealth(): Promise<{ status: string; timestamp: string; uptime: number; redis: string }> {
    const response = await apiClient.get('/health');
    return response.data;
  },
};

export default apiClient;
