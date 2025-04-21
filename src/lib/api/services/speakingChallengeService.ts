
import { httpClient } from "../httpClient";

export type SpeakingChallenge = {
  id: number;
  title: string;
  level: string;
  category: string;
  instructions: string;
  status: 'Active' | 'Draft';
  dateAdded: string;
};

export const speakingChallengeService = {
  getAll: (): Promise<SpeakingChallenge[]> =>
    httpClient.get<SpeakingChallenge[]>("/speaking-challenges"),
  
  create: (challenge: Omit<SpeakingChallenge, 'id' | 'dateAdded'>): Promise<SpeakingChallenge> =>
    httpClient.post<SpeakingChallenge>("/speaking-challenges", challenge),
  
  update: (id: number, challenge: Partial<Omit<SpeakingChallenge, 'id' | 'dateAdded'>>): Promise<SpeakingChallenge> =>
    httpClient.put<SpeakingChallenge>(`/speaking-challenges/${id}`, challenge),
  
  delete: (id: number): Promise<void> =>
    httpClient.delete<void>(`/speaking-challenges/${id}`),
  
  toggleStatus: (id: number): Promise<SpeakingChallenge> =>
    httpClient.put<SpeakingChallenge>(`/speaking-challenges/${id}/toggle-status`, {}),
};