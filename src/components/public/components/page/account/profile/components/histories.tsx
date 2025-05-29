import React from "react";

type HistoryItem = {
  id: number;
  title: string;
  challenge_title: string;
  score: number;
  attempted_time: string;
};

type Props = {
  items: HistoryItem[];
};

export function SimpleHistory({ items }: Props) {
  return (
    <div className="bg-[#170a38] text-white">
      <div className="mb-4">
        <h2 className="text-2xl font-bold">Exercise History</h2>
        <p className="text-sm text-gray-400">Your completed exercises</p>
      </div>
      <div className="space-y-4">
        {items.length === 0 ? (
          <p className="text-gray-400">No history available.</p>
        ) : (
          items.map((item) => (
            <div
              key={item.id}
              className="bg-[#1c0f3c] border border-[#321f66] rounded-lg p-4 shadow-md flex justify-between items-center"
            >
              <div>
                <h3 className="text-lg font-semibold mb-1">{item.title}</h3>
                <p className="text-sm text-gray-300 mb-1">
                  Challenge: <span className="text-white">{item.challenge_title}</span>
                </p>
                <p className="text-sm text-gray-300 mb-1">
                  Time: <span className="text-white">{item.attempted_time}</span>
                </p>
              </div>
              <div className="text-right">
                <p className="text-3xl font-bold text-yellow-400">{item.score} pts</p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
