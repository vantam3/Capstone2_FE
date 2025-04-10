"use client";
import { ArrowTrendingUpIcon, FireIcon } from "@heroicons/react/24/outline";
import React from "react";

function TableLeaderBoard() {
  const dataLeaderBoard = [
    {
      avatar: "https://www.svgrepo.com/show/452030/avatar-default.svg",
      name: "Alex Johnson",
      description: "Frontend Developer",
      points: "12,222",
      streak: 10,
      trend: "+12%",
    },
    {
      avatar: "https://www.svgrepo.com/show/452030/avatar-default.svg",
      name: "Sarah Williams",
      description: "UX Designer",
      points: "11,845",
      streak: 15,
      trend: "+8%",
    },
    {
      avatar: "https://www.svgrepo.com/show/452030/avatar-default.svg",
      name: "Michael Chen",
      description: "Full Stack Developer",
      points: "10,593",
      streak: 7,
      trend: "+5%",
    },
    {
      avatar: "https://www.svgrepo.com/show/452030/avatar-default.svg",
      name: "Emily Rodriguez",
      description: "Data Scientist",
      points: "9,876",
      streak: 12,
      trend: "+15%",
    },
    {
      avatar: "https://www.svgrepo.com/show/452030/avatar-default.svg",
      name: "David Kim",
      description: "Mobile Developer",
      points: "9,245",
      streak: 8,
      trend: "-3%",
    },
    {
      avatar: "https://www.svgrepo.com/show/452030/avatar-default.svg",
      name: "Lisa Patel",
      description: "DevOps Engineer",
      points: "8,732",
      streak: 6,
      trend: "+9%",
    },
    {
      avatar: "https://www.svgrepo.com/show/452030/avatar-default.svg",
      name: "James Wilson",
      description: "Backend Developer",
      points: "7,654",
      streak: 9,
      trend: "+4%",
    },
    {
      avatar: "https://www.svgrepo.com/show/452030/avatar-default.svg",
      name: "Nina Garcia",
      description: "QA Engineer",
      points: "6,891",
      streak: 5,
      trend: "-2%",
    },
    {
      avatar: "https://www.svgrepo.com/show/452030/avatar-default.svg",
      name: "Robert Taylor",
      description: "Product Manager",
      points: "5,923",
      streak: 3,
      trend: "+7%",
    },
    {
      avatar: "https://www.svgrepo.com/show/452030/avatar-default.svg",
      name: "Sophie Martin",
      description: "System Architect",
      points: "5,478",
      streak: 4,
      trend: "+1%",
    },
  ];

  return (
    <div className="relative border border-[#4b2f8d] overflow-x-auto shadow-md rounded-[16px] bg-[#190b37]">
      <div className="p-4 flex items-center gap-2 ">
        <svg
          width="30px"
          height="30px"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M12.15 16.5V18.6"
            stroke="#7a57d4"
            strokeWidth={1.5}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M7.15002 22H17.15V21C17.15 19.9 16.25 19 15.15 19H9.15002C8.05002 19 7.15002 19.9 7.15002 21V22V22Z"
            stroke="#7a57d4"
            strokeWidth={1.5}
            strokeMiterlimit={10}
          />
          <path
            d="M6.15002 22H18.15"
            stroke="#7a57d4"
            strokeWidth={1.5}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M12 16C8.13 16 5 12.87 5 9V6C5 3.79 6.79 2 9 2H15C17.21 2 19 3.79 19 6V9C19 12.87 15.87 16 12 16Z"
            stroke="#7a57d4"
            strokeWidth={1.5}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M5.46998 11.65C4.71998 11.41 4.05998 10.97 3.53998 10.45C2.63998 9.44998 2.03998 8.24998 2.03998 6.84998C2.03998 5.44998 3.13998 4.34998 4.53998 4.34998H5.18998C4.98998 4.80998 4.88998 5.31998 4.88998 5.84998V8.84998C4.88998 9.84998 5.09998 10.79 5.46998 11.65Z"
            stroke="#7a57d4"
            strokeWidth={1.5}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M18.53 11.65C19.28 11.41 19.94 10.97 20.46 10.45C21.36 9.44998 21.96 8.24998 21.96 6.84998C21.96 5.44998 20.86 4.34998 19.46 4.34998H18.81C19.01 4.80998 19.11 5.31998 19.11 5.84998V8.84998C19.11 9.84998 18.9 10.79 18.53 11.65Z"
            stroke="#7a57d4"
            strokeWidth={1.5}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <p className="text-lg font-bold text-white"> Leaderboard Rankings</p>
      </div>
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 ">
        <thead className="text-xs text-white bg-[#341e64]">
          <tr>
            <th scope="col" className="px-6 py-3">
              Rank
            </th>
            <th scope="col" className="px-6 py-3">
              User
            </th>
            <th scope="col" className="px-6 py-3">
              Points
            </th>
            <th scope="col" className="px-6 py-3">
              Streak
            </th>
            <th scope="col" className="px-6 py-3">
              Trend
            </th>
            <th scope="col" className="px-6 py-3"></th>
          </tr>
        </thead>
        <tbody>
          {dataLeaderBoard.map((item, index) => (
            <tr className="bg-[#190b37]" key={item.name}>
              <td className="w-4 p-4 text-center text-white text-[16px] font-[600]">
                {index + 1}
              </td>
              <th
                scope="row"
                className="flex items-center px-6 py-4 text-white whitespace-nowrap"
              >
                <div className="w-10 h-10 rounded-full bg-[#331e60] text-center p-2">
                  AA
                </div>
                <div className="ps-3">
                  <div className="text-base font-semibold">{item.name}</div>
                  <div className="font-normal text-gray-500">
                    {item.description}
                  </div>
                </div>
              </th>
              <td className="px-6 py-4 text-white text-[16px] font-[600]">
                {item.points}
              </td>
              <td className="px-6 py-4 text-white text-[16px] font-[600] flex items-center gap-2">
                <FireIcon className="w-5 h-5 text-[#ce6120]" /> {item.streak}
              </td>
              <td className="px-6 py-4 text-white text-[16px] font-[600]">
                <div className="flex items-center gap-2">
                  <ArrowTrendingUpIcon
                    className={`w-5 h-5 ${
                      item.trend.startsWith("-")
                        ? "text-[#ce2920]"
                        : "text-[#23b85b]"
                    }`}
                  />
                  {item.trend}
                </div>
              </td>
              <td className="px-6 py-4">
                <a className="font-medium cursor-pointer text-white hover:underline">
                  View
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TableLeaderBoard;
