
import { httpClient } from '../httpClient';

// Material type
export interface Material {
  id: number;
  title: string;
  type: string;
  category: string;
  level: string;
  dateAdded: string;
  usageCount: number;
  content?: string; // Added content property as optional
}

export const materialService = {
  getAll: () => httpClient.get<Material[]>('/materials'),
  delete: (id: number | string) => httpClient.delete(`/materials/${id}`),
  update: (id: number | string, data: Partial<Material>) => {
    // Create a copy of data without the content property if needed for API
    const { content, ...apiData } = data;
    // If we're running with mock data, return a mock Promise
    if (process.env.NODE_ENV === 'development' && !process.env.REACT_APP_API_URL) {
      return Promise.resolve({ data: { ...apiData, id } });
    }
    return httpClient.put(`/materials/${id}`, apiData);
  },
};