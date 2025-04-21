
import { httpClient } from '../httpClient';
import { ENDPOINTS } from '../config';

export interface Content {
  id: string;
  title: string;
  category: string;
  level: string;
  type: string;
  status: 'Published' | 'Draft';
  dateAdded: string;
  description?: string;
  content?: string;
}

export const contentService = {
  getAll: () => httpClient.get<Content[]>(ENDPOINTS.CONTENT.GET_ALL),
  
  getById: (id: string) => httpClient.get<Content>(ENDPOINTS.CONTENT.GET_BY_ID(id)),
  
  create: (data: Omit<Content, 'id' | 'dateAdded'>) => 
    httpClient.post<Content>(ENDPOINTS.CONTENT.CREATE, data),
    
  update: (id: string, data: Partial<Content>) => 
    httpClient.put<Content>(ENDPOINTS.CONTENT.UPDATE(id), data),
    
  delete: (id: string) => httpClient.delete(ENDPOINTS.CONTENT.DELETE(id)),

  toggleStatus: (id: string) => 
    httpClient.put<Content>(ENDPOINTS.CONTENT.TOGGLE_STATUS(id), {}),
};