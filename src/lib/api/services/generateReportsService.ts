

import { httpClient } from "../httpClient";

// Các type có thể khai báo chi tiết hơn nếu biết cấu trúc dữ liệu backend trả về
export type UserActivityData = {
  name: string;
  logins: number;
  lessonCompleted: number;
  quizTaken: number;
};
export type ContentEngagementData = {
  name: string;
  views: number;
  completions: number;
  ratings: number;
};
export type UserGrowthData = {
  name: string;
  users: number;
};
export type PerformanceData = {
  name: string;
  score: number;
};

export const generateReportsService = {
  getUserActivity: async (): Promise<UserActivityData[]> => {
    return httpClient.get<UserActivityData[]>('/reports/user-activity');
  },
  getContentEngagement: async (): Promise<ContentEngagementData[]> => {
    return httpClient.get<ContentEngagementData[]>('/reports/content-engagement');
  },
  getUserGrowth: async (): Promise<UserGrowthData[]> => {
    return httpClient.get<UserGrowthData[]>('/reports/user-growth');
  },
  getPerformance: async (): Promise<PerformanceData[]> => {
    return httpClient.get<PerformanceData[]>('/reports/performance');
  }
};
