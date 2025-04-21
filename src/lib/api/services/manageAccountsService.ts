
import { httpClient } from "../httpClient";
import { ENDPOINTS } from "../config";

export interface ManagedUser {
  id: number;
  name: string;
  email: string;
  role: "Student" | "Manager" | "Admin";
  status: "Active" | "Inactive" | "Suspended";
  lastLogin: string;
}

export const manageAccountsService = {
  getAll: (): Promise<ManagedUser[]> => {
    return httpClient.get<ManagedUser[]>(ENDPOINTS.USERS.GET_ALL);
  },
  
  create: (user: Omit<ManagedUser, 'id' | 'lastLogin'>): Promise<ManagedUser> => {
    return httpClient.post<ManagedUser>(ENDPOINTS.USERS.CREATE, user);
  },
  
  update: (id: number, user: Partial<ManagedUser>): Promise<ManagedUser> => {
    return httpClient.put<ManagedUser>(ENDPOINTS.USERS.UPDATE(id), user);
  },
  
  delete: (id: number): Promise<void> => {
    return httpClient.delete<void>(ENDPOINTS.USERS.DELETE(id));
  },
  
  suspend: (id: number): Promise<ManagedUser> => {
    return httpClient.put<ManagedUser>(ENDPOINTS.USERS.SUSPEND(id), {});
  },
  
  resetPassword: (id: number): Promise<void> => {
    return httpClient.post<void>(ENDPOINTS.USERS.RESET_PASSWORD(id), {});
  }
};