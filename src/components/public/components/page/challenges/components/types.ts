// src/components/public/components/page/challenges/components/types.ts

export interface ChallengeExerciseInfo {
  id: number;
  title: string;
  description: string;
  order: number;
  speaking_text_content: string | null; // Nội dung text đã được giải mã từ backend
}

export interface ChallengeInfo {
  id: number;
  title: string;
  description: string;
  is_featured: boolean;
  difficulty: 'easy' | 'medium' | 'hard' | string;
  reward_points: number;
  start_date: string; // Chuỗi ISO 8601 datetime
  end_date: string;   // Chuỗi ISO 8601 datetime
  participant_count: number;
  level: number;
  days_left: string;
  exercises: ChallengeExerciseInfo[];

  user_progress_status?: 'not_started' | 'in_progress' | 'completed';
  user_completion_percentage?: number;
}

export interface UserChallengeProgressData {
  // ... (giữ nguyên như trước nếu bạn có logic gộp tiến độ sau)
  id: number;
  challenge: ChallengeInfo;
  score: number;
  completion_percentage: number;
  status: 'not_started' | 'in_progress' | 'completed';
  last_attempted_date: string;
  completed_date?: string | null;
}