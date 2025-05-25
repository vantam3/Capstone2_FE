// index.tsx
"use client";
import {
  ArrowLeftIcon,
  ArrowTrendingUpIcon,
  FireIcon,
} from "@heroicons/react/24/outline";
import React, { useEffect, useState } from "react";
import YourRanking from "./components/your-ranking";
import TableLeaderBoard from "./components/table";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Leaderboard() {
  const router = useNavigate();
  const [topThree, setTopThree] = useState<any[]>([]);

  useEffect(() => {
    const fetchTopThree = async () => {
      try {
        const res = await axios.get("http://localhost:8000/api/leaderboard/");
        setTopThree(res.data.leaderboard.slice(0, 3));
      } catch (err) {
        console.error("Failed to fetch top leaderboard", err);
      }
    };
    fetchTopThree();
  }, []);

  const colors = [
    "bg-[#473033] border-[#77552d]",
    "bg-[#322b4d] border-[#514d68]",
    "bg-[#391a30] border-[#5d2927]",
  ];

  return (
    <div>
      <div className="mt-[5rem] sm:mt-[10rem] max-w-screen-2xl mx-auto sm:p-2 p-6">
        <div className="flex items-center gap-4">
          <div
            className="flex items-center gap-2 hover:bg-[#8861ea] rounded-[8px] cursor-pointer p-2"
            onClick={() => router("/home")}
          >
            <ArrowLeftIcon className="w-4 h-4 cursor-pointer text-white" />
            <p className="text-xs text-white ">Back</p>
          </div>
          <p className="text-2xl font-[600] text-white">Global Leaderboard</p>
        </div>
        <p className="text-sm text-white mt-2 ml-2">
          Compare your progress with other learners and see who's leading in
          speaking practice and challenges.
        </p>
        <YourRanking />

        <div className="grid sm:grid-cols-3 grid-cols-1 gap-6 mt-4">
          {[0, 1, 2].map((index) => {
            const user = topThree[index];
            const style = colors[index];
            return (
              <div
                key={index}
                className={`mt-4 w-full p-4 ${style} rounded-[16px] shadow-sm sm:p-6`}
              >
                <p className="text-white text-lg">#{index + 1}</p>
                <div className="flex items-center mt-4 space-x-4">
                  <div className="bg-[#553c5d] w-[70px] h-[70px] flex items-center justify-center rounded-full">
                    <p className="text-base text-[#8861ea] sm:text-[14px] font-bold">
                      {user?.username?.slice(0, 2).toUpperCase() || "--"}
                    </p>
                  </div>

                  <div className="ml-2">
                    <p className="text-base text-white sm:text-[20px] font-bold">
                      {user?.username || "---"}
                    </p>
                    <div className="flex items-center space-x-2">
                      <ArrowTrendingUpIcon className="w-6 h-6 text-green-600" />
                      <p className="text-sm text-white">
                        {user?.trend || "0%"} this week
                      </p>
                    </div>
                  </div>
                </div>
                <div className="flex items-center mt-4">
                  <p className="text-base text-white sm:text-[14px] font-bold">
                    Points
                  </p>
                  <p className="text-base text-[#815cda] sm:text-[16px] font-bold ml-auto">
                    {user?.total_points?.toLocaleString() || "0"}
                  </p>
                </div>
                <div className="flex items-center mt-4">
                  <p className="text-base text-white sm:text-[14px] font-bold">
                    Streak
                  </p>
                  <p className="text-base text-white sm:text-[16px] flex items-center gap-2 font-bold ml-auto">
                    <FireIcon className="w-4 h-4 text-[#ce6120]" />
                    {user?.longest_streak || 0} days
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-6">
          <TableLeaderBoard />
        </div>
      </div>
    </div>
  );
}

export default Leaderboard;
