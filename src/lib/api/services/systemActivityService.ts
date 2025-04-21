
import { httpClient } from "../httpClient";

export type SystemActivity = {
  id: number;
  type: string;
  component: string;
  timestamp: string;
  details: string;
  severity: 'High' | 'Medium' | 'Low' | string;
};

export const systemActivityService = {
  getAll: async (): Promise<SystemActivity[]> =>
    httpClient.get<SystemActivity[]>('/system-activities'),
};