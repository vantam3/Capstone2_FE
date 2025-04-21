
import { httpClient } from "../httpClient";

export type UserGrowth = { month: string; users: number };
export type PracticeTime = { day: string; minutes: number };
export type ContentCategory = { name: string; value: number; color: string };
export type BookRating = { name: string; value: number; color: string };
export type UserEngagement = { name: string; value: number; color: string };
export type UserDemographic = { name: string; value: number; color: string };

export const reportsService = {
  getUserGrowth: (): Promise<UserGrowth[]> => httpClient.get<UserGrowth[]>("/reports/user-growth"),
  getPracticeTime: (): Promise<PracticeTime[]> => httpClient.get<PracticeTime[]>("/reports/practice-time"),
  getContentCategory: (): Promise<ContentCategory[]> => httpClient.get<ContentCategory[]>("/reports/content-category"),
  getBookRating: (): Promise<BookRating[]> => httpClient.get<BookRating[]>("/reports/book-rating"),
  getUserEngagement: (): Promise<UserEngagement[]> => httpClient.get<UserEngagement[]>("/reports/user-engagement"),
  getUserDemographic: (): Promise<UserDemographic[]> => httpClient.get<UserDemographic[]>("/reports/user-demographic"),
};