
import { httpClient } from "../httpClient";

export type UserActivity = {
  id: number;
  userId: number;
  userName: string;
  action: string;
  timestamp: string;
  details: string;
  ipAddress: string;
};

export const userActivityService = {
  getAll: async (): Promise<UserActivity[]> =>
    httpClient.get<UserActivity[]>('/user-activities'),
};