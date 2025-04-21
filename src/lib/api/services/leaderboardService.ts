
import { httpClient } from "../httpClient";

export type LeaderboardEntry = {
  rank: number;
  userId: number;
  userName: string;
  score: number;
  change: "up" | "down" | "same";
};

export type Leaderboard = {
  id: number;
  title: string;
  description: string;
  type: string;
  refreshFrequency: string;
  lastUpdated: string;
  entries: LeaderboardEntry[];
};

export const leaderboardService = {
  getAll: (): Promise<Leaderboard[]> => {
    return httpClient.get<Leaderboard[]>('/leaderboards');
  },
  // Có thể mở rộng thêm: create, update, delete nếu API backend hỗ trợ
};