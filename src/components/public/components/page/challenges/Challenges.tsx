// src/components/public/components/page/challenges/Challenges.tsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ArrowLeftIcon } from "@heroicons/react/16/solid";
// Các icon khác như ClockIcon, CalendarIcon, ArrowTrendingUpIcon có thể bỏ nếu không phân loại nữa
// Hoặc giữ lại nếu bạn muốn thêm tiêu đề chung cho "All Challenges"
import { SparklesIcon } from "@heroicons/react/24/outline"; // Ví dụ một icon chung

import ChallengeStats from "./components/challenge-stats"; // Giữ lại
import WeeklyAchievement from "./components/weekly-achievement"; // Giữ lại
import ChallengeCard from "./components/ChallengeCard"; // Component để hiển thị từng challenge
import { ChallengeInfo } from "./components/types"; // Import type

function Challenges() {
  const navigate = useNavigate();
  const [challenges, setChallenges] = useState<ChallengeInfo[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchChallenges = async () => {
      setIsLoading(true);
      setError(null);
      try {
        // TODO: Lấy token từ localStorage hoặc context nếu API yêu cầu xác thực
        const token = localStorage.getItem("token");
        const headers = token ? { Authorization: `Bearer ${token}` } : {};
        
        const response = await axios.get<ChallengeInfo[]>("http://localhost:8000/api/challenges/", { headers });
        
        // Ở bước sau, bạn có thể tích hợp API lấy tiến độ người dùng tại đây
        // và gộp thông tin vào từng challenge item trong response.data
        setChallenges(response.data);

      } catch (err) {
        console.error("Failed to fetch challenges:", err);
        setError("Could not load challenges. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchChallenges();
  }, []);

  return (
    <>
      {/* Phần Header của trang */}
      <div className="mt-[4rem] sm:mt-[10rem] max-w-screen-2xl mx-auto sm:p-2 p-6">
        <div className="flex items-center gap-4 ">
          <button onClick={() => navigate("/home")} className="flex items-center gap-2 text-white hover:text-gray-300">
            <ArrowLeftIcon className="w-4 h-4 cursor-pointer" />
            <p className="text-xs">Back</p>
          </button>
        </div>
        <p className="text-2xl font-[600] text-white mt-3">Language Challenges</p>
        <p className="text-sm text-gray-300 mt-2">
          Take on time-limited speaking challenges to test your skills, earn
          points, and compete with other learners.
        </p>
      </div>

      {/* Phần Stats và Achievements (giữ nguyên) */}
      <div className="max-w-screen-2xl mx-auto mt-0 sm:mt-4 grid grid-cols-1 md:grid-cols-[30%_70%] gap-4 p-6">
        <ChallengeStats />
        <WeeklyAchievement />
      </div>

      {/* Phần danh sách tất cả Challenges */}
      <div className="max-w-screen-2xl mx-auto mt-4 p-6">
        <div className="flex items-center space-x-2 mb-6">
          <SparklesIcon className="w-6 h-6 text-[#7452c9]" />
          <h3 className="font-bold text-xl text-white">All Available Challenges</h3>
        </div>

        {isLoading && (
          <div className="text-center text-white py-10">Loading challenges...</div>
        )}
        {error && (
          <div className="text-center text-red-400 py-10 bg-red-900/20 rounded-md p-4">
            <p>Sorry, something went wrong while loading challenges:</p>
            <p className="mt-2 text-sm">{error}</p>
          </div>
        )}
        {!isLoading && !error && challenges.length === 0 && (
          <div className="text-center text-gray-400 py-10">
            No challenges available at the moment. Please check back later!
          </div>
        )}

        {!isLoading && !error && challenges.length > 0 && (
          <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {challenges.map((challenge) => (
              // ChallengeCard sẽ xử lý việc điều hướng khi được click
              <ChallengeCard key={challenge.id} challenge={challenge} />
            ))}
          </div>
        )}
      </div>
    </>
  );
}

export default Challenges;