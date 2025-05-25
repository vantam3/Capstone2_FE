// TableLeaderBoard.tsx
"use client";
import { ArrowTrendingUpIcon, FireIcon } from "@heroicons/react/24/outline";
import React, { useEffect, useState } from "react";
import axios from "axios";

interface LeaderBoardUser {
  user_id: number;
  username: string;
  total_points: number;
  longest_streak: number;
  trend: string;
}

function TableLeaderBoard() {
  const [leaderboardData, setLeaderboardData] = useState<LeaderBoardUser[]>([]);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const res = await axios.get("http://localhost:8000/api/leaderboard/");
        setLeaderboardData(res.data.leaderboard);
      } catch (error) {
        console.error("Failed to fetch leaderboard", error);
      }
    };

    fetchLeaderboard();
  }, []);

  return (
    <div className="relative border border-[#4b2f8d] overflow-x-auto shadow-md rounded-[16px] bg-[#190b37]">
      <div className="p-4 flex items-center gap-2">
        <svg
          width="30px"
          height="30px"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M12.15 16.5V18.6" stroke="#7a57d4" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
          <path d="M7.15 22H17.15V21C17.15 19.9 16.25 19 15.15 19H9.15C8.05 19 7.15 19.9 7.15 21V22Z" stroke="#7a57d4" strokeWidth={1.5} strokeMiterlimit={10} />
          <path d="M6.15 22H18.15" stroke="#7a57d4" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
          <path d="M12 16C8.13 16 5 12.87 5 9V6C5 3.79 6.79 2 9 2H15C17.21 2 19 3.79 19 6V9C19 12.87 15.87 16 12 16Z" stroke="#7a57d4" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        <p className="text-lg font-bold text-white"> Leaderboard Rankings</p>
      </div>
      <table className="w-full text-sm text-left rtl:text-right text-gray-500">
        <thead className="text-xs text-white bg-[#341e64]">
          <tr>
            <th scope="col" className="px-6 py-3">Rank</th>
            <th scope="col" className="px-6 py-3">User</th>
            <th scope="col" className="px-6 py-3">Points</th>
            <th scope="col" className="px-6 py-3">Streak</th>
            <th scope="col" className="px-6 py-3">Trend</th>
          </tr>
        </thead>
        <tbody>
          {leaderboardData.map((user, index) => (
            <tr className="bg-[#190b37]" key={user.user_id}>
              <td className="w-4 p-4 text-center text-white text-[16px] font-[600]">
                {index + 1}
              </td>
              <th
                scope="row"
                className="flex items-center px-6 py-4 text-white whitespace-nowrap"
              >
                <div className="w-10 h-10 rounded-full bg-[#331e60] text-center p-2">
                  {user.username.slice(0, 2).toUpperCase()}
                </div>
                <div className="ps-3">
                  <div className="text-base font-semibold">{user.username}</div>
                  <div className="font-normal text-gray-500">Learner</div>
                </div>
              </th>
              <td className="px-6 py-4 text-white text-[16px] font-[600]">
                {user.total_points.toLocaleString()}
              </td>
              <td className="px-6 py-4 text-white text-[16px] font-[600] flex items-center gap-2">
                <FireIcon className="w-5 h-5 text-[#ce6120]" /> {user.longest_streak}
              </td>
              <td className="px-6 py-4 text-white text-[16px] font-[600]">
                <div className="flex items-center gap-2">
                  <ArrowTrendingUpIcon
                    className={`w-5 h-5 ${user.trend.startsWith("-") ? "text-[#ce2920]" : "text-[#23b85b]"}`}
                  />
                  {user.trend}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TableLeaderBoard;