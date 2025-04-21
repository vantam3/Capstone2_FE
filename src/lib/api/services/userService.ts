
import { httpClient } from '../httpClient';
import { ENDPOINTS } from '../config';

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'Admin' | 'User' | 'Student' | 'Manager';
  status: 'Active' | 'Inactive' | 'Suspended';
  lastLogin: string;
  activity: 'High' | 'Medium' | 'Low';
}

export const userService = {
  getAll: () => httpClient.get<User[]>(ENDPOINTS.USERS.GET_ALL),
  
  getById: (id: string) => httpClient.get<User>(ENDPOINTS.USERS.GET_BY_ID(id)),
  
  create: (data: Omit<User, 'id'>) => 
    httpClient.post<User>(ENDPOINTS.USERS.CREATE, data),
    
  update: (id: string, data: Partial<User>) => 
    httpClient.put<User>(ENDPOINTS.USERS.UPDATE(id), data),
    
  delete: (id: string) => httpClient.delete(ENDPOINTS.USERS.DELETE(id)),
};