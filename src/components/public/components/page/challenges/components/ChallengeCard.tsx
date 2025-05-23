// src/components/public/components/page/challenges/components/ChallengeCard.tsx
import {
  ArrowTrendingUpIcon,
  ClockIcon,
  FireIcon,
  UsersIcon,
  CheckCircleIcon,
  StarIcon,
} from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";
import { ChallengeInfo } from "./types"; // Import từ types.ts

interface ChallengeCardProps {
  challenge: ChallengeInfo;
}

function ChallengeCard({ challenge }: ChallengeCardProps) {
  const router = useNavigate();

  const handleNavigateToDetail = () => {
    router(`/challenges/detail/${challenge.id}`);
  };

  const getDifficultyDisplay = (apiDifficulty: string) => {
    const lowerDifficulty = apiDifficulty?.toLowerCase(); // Thêm ? để tránh lỗi nếu undefined
    if (lowerDifficulty === 'easy') return { text: 'text-[#21b95b]', bg: 'bg-[#1c243b]', label: 'Easy' };
    if (lowerDifficulty === 'medium') return { text: 'text-[#f59e09]', bg: 'bg-[#351e35]', label: 'Intermediate' };
    if (lowerDifficulty === 'hard') return { text: 'text-[#ef4444]', bg: 'bg-[#341139]', label: 'Advanced' };
    return { text: 'text-gray-400', bg: 'bg-gray-700', label: apiDifficulty || 'N/A' };
  };

  const difficultyDisplay = getDifficultyDisplay(challenge.difficulty);
  const isCompleted = challenge.user_progress_status === 'completed';
  const isInProgress = challenge.user_progress_status === 'in_progress';

  return (
    <div
      className="bg-[#231246] border border-[#39246c] rounded-[16px] shadow-sm p-6 relative cursor-pointer hover:border-[#573aa0] transition-colors"
      onClick={handleNavigateToDetail}
    >
      {challenge.is_featured && (
        <div className="bg-[#8861ea] p-2 rounded-tr-[16px] rounded-bl-[16px] absolute right-0 top-0">
          <p className="text-xs font-bold text-white text-center">Featured</p>
        </div>
      )}

      <h5 className="text-xl font-bold text-white truncate pr-16">{challenge.title}</h5>
      <h5 className="text-sm font-bold text-[#bebace] mt-2 h-10 overflow-hidden text-ellipsis">
        {challenge.description}
      </h5>

      <div className="mt-4 flex items-center w-full">
        <div className="space-y-3 mt-4 w-full"> {/* Giảm space-y một chút */}
          <div className="flex flex-wrap items-center gap-2">
            <div className={`relative rounded-full font-bold px-3 py-1 text-[11px] ${difficultyDisplay.text} ring-1 ring-[#3b2372] ${difficultyDisplay.bg}`}>
              {difficultyDisplay.label}
            </div>
            <div className="relative rounded-full px-3 py-1 font-bold text-[11px] text-[#8660e7] ring-1 ring-[#3b2372] bg-[#26164c]">
              {challenge.reward_points} Points
            </div>
            {challenge.days_left && (
              <div
                className={`relative flex items-center justify-center font-bold gap-1 rounded-full px-3 py-1 text-[11px] ring-1 ${
                  isCompleted ? 'text-[#21b95b] ring-[#08361e] bg-[#1c243b]' : 
                  challenge.days_left.toLowerCase() === "ended" ? 'text-red-400 ring-red-700 bg-red-900/50' :
                  'text-[#d2cce8] ring-[#4b2f8d] bg-[#4b2f8d]'
                }`}
              >
                {isCompleted ? (
                  <CheckCircleIcon className="w-3 h-3 text-[#21b95b]" />
                ) : (
                  challenge.days_left.toLowerCase() !== "ended" && <ClockIcon className="w-3 h-3 text-white" />
                )}
                {isCompleted ? "Completed" : challenge.days_left}
              </div>
            )}
          </div>

          <div className="flex flex-wrap items-center justify-between w-full text-[12px] text-[#d1cde1] font-[600]">
            <p className="flex items-center gap-1">
              <UsersIcon className="w-4 h-4" /> {challenge.participant_count} Participants
            </p>
            {challenge.level && (
              <p className="flex items-center gap-1">
                <ArrowTrendingUpIcon className="w-4 h-4" />
                {typeof challenge.level === 'number' ? `Level ${challenge.level}` : challenge.level}
              </p>
            )}
          </div>

          {challenge.user_completion_percentage !== undefined && !isCompleted && challenge.user_completion_percentage > 0 && (
            <div className="w-full bg-[#4b2f8d] rounded-full h-1.5">
              <div
                className="bg-[#8861ea] h-1.5 rounded-full"
                style={{ width: `${challenge.user_completion_percentage}%` }}
              />
            </div>
          )}

          <button
            type="button"
            disabled={challenge.days_left?.toLowerCase() === "ended" && !isCompleted}
            className="text-[#f1eefd] flex items-center justify-center gap-2 font-[600] w-full bg-[#8861ea] hover:bg-[#7a57d4] focus:ring-4 focus:ring-[#8861ea]/50 rounded-lg text-sm px-5 py-2.5 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {isCompleted ? (
              <>
                <StarIcon className="w-4 h-4" /> View Results
              </>
            ) : isInProgress ? (
              <>
                <FireIcon className="w-4 h-4" /> Continue
              </>
            ) : challenge.days_left?.toLowerCase() === "ended" ? (
                "Challenge Ended"
            ) : (
              <>
                <FireIcon className="w-4 h-4" /> Start Challenge
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
export default ChallengeCard;