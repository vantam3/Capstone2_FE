
import { httpClient } from "../httpClient";

export interface FeedbackItem {
  id: number;
  user: string;
  email: string;
  type: string;
  subject: string;
  status: string;
  priority: string;
  dateSubmitted: string;
  // bổ sung thuộc tính nếu backend trả thêm
}

export const feedbackService = {
  getAll: (): Promise<FeedbackItem[]> => {
    return httpClient.get<FeedbackItem[]>("/feedback");
  },
  // Có thể bổ sung: create, update, v.v... nếu cần
};