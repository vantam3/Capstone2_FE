// src/components/public/components/page/challenges/components/types.ts

export interface ChallengeExerciseInfo {
  id: number; // API trả về số
  title: string;
  description: string;
  order: number;
  // speaking_text_content?: string; // Sẽ không có nếu không có API riêng cho exercise detail
}

export interface ChallengeInfo {
  id: number; // API trả về số
  title: string;
  description: string;
  is_featured?: boolean;
  difficulty: string; // 'easy', 'medium', 'hard' từ API
  reward_points: number;
  start_date?: string;
  end_date?: string;
  participant_count: number;
  level: string | number; // API có thể trả số hoặc tên
  days_left: string;
  exercises: ChallengeExerciseInfo[]; // Quan trọng: API trả về mảng này
  slug?: string; // Giữ lại nếu bạn muốn dùng, nhưng API dùng ID

  // Frontend-only hoặc từ UserProgress
  user_progress_status?: 'not_started' | 'in_progress' | 'completed';
  user_completion_percentage?: number;
}

export interface UserChallengeProgressData {
  id: number;
  challenge: ChallengeInfo; // API UserChallengeProgressSerializer trả về object ChallengeSerializer
  score: number;
  completion_percentage: number;
  status: 'not_started' | 'in_progress' | 'completed';
  last_attempted_date: string;
  completed_date?: string | null;
}

// Dùng cho Speakingtest.tsx nếu không có API riêng cho exercise detail
export interface ExerciseDetailForSpeakingTest extends ChallengeExerciseInfo {
  // Không có speaking_text_content ở đây nếu dùng cách 2
}