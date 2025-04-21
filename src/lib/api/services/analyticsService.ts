
export type UserActivityData = {
  name: string;
  active: number;
  new: number;
};
export type PracticeSession = {
  name: string;
  sessions: number;
};
export type ContentUsage = {
  name: string;
  value: number;
  color: string;
};
export type TopUser = {
  id: number;
  name: string;
  email: string;
  practiceTime: string;
  sessions: number;
  avgScore: number;
};
export type CommonError = {
  id: number;
  errorType: string;
  count: number;
  percentage: number;
  examples: string;
};

export type AnalyticsData = {
  userActivityData: UserActivityData[];
  practiceSessionsData: PracticeSession[];
  contentUsageData: ContentUsage[];
  topPerformingUsers: TopUser[];
  commonErrorsData: CommonError[];
};

export async function fetchAnalyticsData(): Promise<AnalyticsData> {
  // Để minh họa, trả về giống dữ liệu tĩnh ban đầu (giả lập từ backend)
  return {
    userActivityData: [
      { name: 'Jan', active: 400, new: 240 },
      { name: 'Feb', active: 300, new: 138 },
      { name: 'Mar', active: 200, new: 980 },
      { name: 'Apr', active: 278, new: 390 },
      { name: 'May', active: 189, new: 480 },
      { name: 'Jun', active: 239, new: 380 },
      { name: 'Jul', active: 349, new: 430 }
    ],
    practiceSessionsData: [
      { name: 'Mon', sessions: 120 },
      { name: 'Tue', sessions: 140 },
      { name: 'Wed', sessions: 170 },
      { name: 'Thu', sessions: 90 },
      { name: 'Fri', sessions: 180 },
      { name: 'Sat', sessions: 210 },
      { name: 'Sun', sessions: 160 }
    ],
    contentUsageData: [
      { name: 'Business', value: 400, color: '#8884d8' },
      { name: 'Conversation', value: 300, color: '#83a6ed' },
      { name: 'Exam Prep', value: 300, color: '#8dd1e1' },
      { name: 'Grammar', value: 200, color: '#82ca9d' },
      { name: 'Vocabulary', value: 100, color: '#ffc658' }
    ],
    topPerformingUsers: [
      { id: 1, name: 'John Doe', email: 'john@example.com', practiceTime: '45h 20m', sessions: 124, avgScore: 92 },
      { id: 2, name: 'Jane Smith', email: 'jane@example.com', practiceTime: '38h 15m', sessions: 106, avgScore: 89 },
      { id: 3, name: 'Robert Johnson', email: 'robert@example.com', practiceTime: '32h 40m', sessions: 98, avgScore: 87 },
      { id: 4, name: 'Emily Wilson', email: 'emily@example.com', practiceTime: '30h 10m', sessions: 94, avgScore: 85 },
      { id: 5, name: 'Michael Brown', email: 'michael@example.com', practiceTime: '28h 55m', sessions: 87, avgScore: 84 }
    ],
    commonErrorsData: [
      { id: 1, errorType: 'Consonant Sounds', count: 1245, percentage: 32, examples: 'th, r, l sounds' },
      { id: 2, errorType: 'Vowel Sounds', count: 987, percentage: 25, examples: 'a, e, i sounds' },
      { id: 3, errorType: 'Word Stress', count: 756, percentage: 19, examples: 'emphasis on wrong syllables' },
      { id: 4, errorType: 'Intonation', count: 542, percentage: 14, examples: 'rising/falling tones' },
      { id: 5, errorType: 'Connected Speech', count: 398, percentage: 10, examples: 'linking words together' }
    ]
  };
}