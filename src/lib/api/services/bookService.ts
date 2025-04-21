
import { httpClient } from '../httpClient';
import { ENDPOINTS } from '../config';

// Book Type
export interface Book {
  id: number;
  title: string;
  author: string;
  category: string;
  ratings: number;
  status: string;
  dateAdded: string;
}

export const bookService = {
  getAll: () => httpClient.get<Book[]>(ENDPOINTS.CONTENT.GET_ALL),
  getById: (id: string | number) => httpClient.get<Book>(ENDPOINTS.CONTENT.GET_BY_ID(String(id))),
  create: (data: Omit<Book, 'id' | 'dateAdded'>) =>
    httpClient.post<Book>(ENDPOINTS.CONTENT.CREATE, data),
  update: (id: number | string, data: Partial<Book>) =>
    httpClient.put<Book>(ENDPOINTS.CONTENT.UPDATE(String(id)), data),
  delete: (id: number | string) =>
    httpClient.delete(ENDPOINTS.CONTENT.DELETE(String(id))),
  toggleStatus: (id: number | string) =>
    httpClient.put<Book>(ENDPOINTS.CONTENT.TOGGLE_STATUS(String(id)), {}),
};