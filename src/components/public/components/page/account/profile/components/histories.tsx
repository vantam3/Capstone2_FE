import { useState } from "react";

// ✅ Define HistoryItem interface for reuse
interface HistoryItem {
  id: number;
  date: string;
  title: string;
  score: number;
  duration: string;
}

interface SimpleHistoryProps {
  items: HistoryItem[];
}

export function SimpleHistory({ items }: SimpleHistoryProps) {
  return (
    <div
      style={{ backgroundColor: "#666699" }}
      className="rounded-lg shadow-md p-6 w-full"
    >
      <div className="mb-6">
        <h2 className="text-xl font-bold text-white mb-2">Activity History</h2>
        <p className="text-sm text-gray-200">
          Review your previous practice sessions
        </p>
      </div>

      {items.length === 0 ? (
        <p className="text-white text-center py-8">
          You haven't completed any practice sessions yet
        </p>
      ) : (
        <div className="space-y-4">
          {items.map((item) => (
            <div
              key={item.id}
              className="bg-white/20 rounded-lg p-4 flex justify-between items-center"
            >
              <div>
                <h4 className="font-medium text-white">{item.title}</h4>
                <p className="text-sm text-gray-200">Date: {item.date}</p>
                <p className="text-sm text-gray-200">
                  Duration: {item.duration}
                </p>
              </div>
              <div className="text-right">
                <div className="text-lg font-bold text-yellow-200">
                  {item.score}%
                </div>
                <button className="text-sm text-white hover:underline">
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
