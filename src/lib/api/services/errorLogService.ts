
import { httpClient } from '../httpClient';

export interface ErrorLog {
  id: number;
  type: string;
  message: string;
  service: string;
  status: 'Open' | 'Resolved' | 'In Progress' | 'Closed';
  timestamp: string;
  user: string;
}

export const errorLogService = {
  getAll: () => httpClient.get<ErrorLog[]>('/error-logs'),
  update: (id: number, data: Partial<ErrorLog>) =>
    httpClient.put<ErrorLog>(`/error-logs/${id}`, data),
};