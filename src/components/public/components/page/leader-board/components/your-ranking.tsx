"use client";
import { StarIcon, UserIcon } from "@heroicons/react/24/outline";
import React, { useEffect, useState } from "react";
import axios from "axios";

function YourRanking() {
  const [yourRank, setYourRank] = useState<number | null>(null);
  const [totalUsers, setTotalUsers] = useState<number>(0);
  const [pointsToNextTier, setPointsToNextTier] = useState<number>(0);

  useEffect(() => {
    const fetchYourRanking = async () => {
      try {
        const res = await axios.get("http://localhost:8000/api/leaderboard/");
        const leaderboard = res.data.leaderboard;

        const userJson = sessionStorage.getItem("user");
        const currentUser = userJson ? JSON.parse(userJson).username : null;
        if (!currentUser) return;

        const yourEntry = leaderboard.find((entry: any) => entry.username === currentUser);
        const yourIndex = leaderboard.findIndex((entry: any) => entry.username === currentUser);

        if (yourEntry && yourIndex !== -1) {
          setYourRank(yourIndex + 1);
          setTotalUsers(leaderboard.length);
          if (yourIndex > 0) {
            const nextHigher = leaderboard[yourIndex - 1];
            setPointsToNextTier(nextHigher.total_points - yourEntry.total_points);
          }
        }
      } catch (err) {
        console.error("Failed to fetch your ranking:", err);
      }
    };

    fetchYourRanking();
  }, []);

  return (
    <div className="mt-6">
      <div className="bg-[#0b041c] border border-[#291a4e] rounded-[16px] shadow-sm p-6">
        <div className="mt-4 flex items-center">
          <div className="bg-[#372267] rounded-full p-4 w-20 h-20 flex items-center justify-center">
            <svg
              width="40px"
              height="40px"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M12.15 16.5V18.6" stroke="#7a57d4" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
              <path d="M7.15 22H17.15V21C17.15 19.9 16.25 19 15.15 19H9.15C8.05 19 7.15 19.9 7.15 21V22Z" stroke="#7a57d4" strokeWidth={1.5} strokeMiterlimit={10} />
              <path d="M6.15 22H18.15" stroke="#7a57d4" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
              <path d="M12 16C8.13 16 5 12.87 5 9V6C5 3.79 6.79 2 9 2H15C17.21 2 19 3.79 19 6V9C19 12.87 15.87 16 12 16Z" stroke="#7a57d4" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <div className="ml-4 w-full">
            <p className="text-[#d1cde1] text-lg font-bold">Your Ranking</p>
            <div className="flex items-center justify-between">
              {yourRank !== null ? (
                <p className="text-[#d1cde1] text-[15px] font-[600]">
                  You're currently ranked #{yourRank} out of {totalUsers} learners. Keep practicing to climb the ranks!
                </p>
              ) : (
                <p className="text-[#d1cde1] text-[15px] font-[600]">Fetching your ranking...</p>
              )}
            </div>
            {yourRank !== null && pointsToNextTier > 0 && (
              <p className="text-[#d1cde1] text-xs">
                {pointsToNextTier} more points to reach the next tier
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default YourRanking;