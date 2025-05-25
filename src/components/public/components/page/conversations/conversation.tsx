import React, { useState } from "react";
import AIConversation from "@/components/public/components/page/conversations/components/AIConversation";

interface WordState {
  word: string;
  correct: boolean;
}

const WordFeedback: React.FC<{ wordGroups: WordState[][] }> = ({ wordGroups }) => (
  <div className="bg-[#1E1A2B] p-4 rounded-lg border border-gray-700">
    <h2 className="text-lg text-white font-semibold mb-2">📝 Your Pronunciation</h2>
    <div className="space-y-2">
      {wordGroups.map((group, groupIdx) => (
        <p key={groupIdx} className="flex flex-wrap gap-1">
          {group.map((w, idx) => (
            <span
              key={idx}
              className={`px-2 py-1 rounded text-sm font-medium ${
                w.correct ? "bg-green-600 text-white" : "bg-red-600 text-white"
              }`}
            >
              {w.word}
            </span>
          ))}
        </p>
      ))}
    </div>
  </div>
);

const ConversationPage: React.FC = () => {
  const [wordGroups, setWordGroups] = useState<WordState[][]>([]);

  const handleWordStatesUpdate = (newStates: WordState[] | null) => {
    if (newStates && newStates.length > 0) {
      setWordGroups((prev) => [...prev, newStates]);
    }
  };

  const handleRestart = () => {
    setWordGroups([]);
  };

  return (
    <div className="container mx-auto px-4 py-8 mt-[8rem]">
      <div className="mb-10 text-center">
        <h1 className="text-4xl font-bold mb-3 bg-clip-text text-transparent bg-gradient-to-r from-[#A78BFA] to-[#5B21B6]">
          Chat with AI and Improve Your Pronunciation
        </h1>
        <p className="text-gray-300 max-w-2xl mx-auto">
          Practice English pronunciation and get real-time feedback on every word you say.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <AIConversation onWordStatesUpdate={handleWordStatesUpdate} onRestart={handleRestart} />
        </div>

        <div className="lg:col-span-1">
          {wordGroups.length > 0 ? (
            <WordFeedback wordGroups={wordGroups} />
          ) : (
            <div className="text-gray-400 italic">
              Your pronunciation highlights will appear here.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ConversationPage;
