// components/ConversationPage.tsx
import React from "react";
import { Badge } from "@/components/ui/badge";
import AIConversation from "@/components/public/components/page/conversations/components/AIConversation";

interface PronunciationErrorProps {
  text: string;
  errorDescription: string;
  suggestion: string;
}

const PronunciationError: React.FC<PronunciationErrorProps> = ({
  text,
  errorDescription,
  suggestion,
}) => {
  return (
    <div className="bg-[#13111C] rounded-lg p-4 mb-4 border border-red-500 border-opacity-30">
      <div className="flex items-center mb-2">
        <Badge
          variant="outline"
          className="bg-red-500 bg-opacity-10 text-red-400 border-red-500"
        >
          Pronunciation Error
        </Badge>
      </div>
      <h3 className="text-lg font-medium mb-1 text-white">{text}</h3>
      <p className="text-gray-400 mb-2">{errorDescription}</p>
      <div className="bg-[#1E1A2B] p-3 rounded-md border-l-2 border-[#A78BFA]">
        <span className="text-[#A78BFA] font-medium">Suggestion:</span>{" "}
        {suggestion}
      </div>
    </div>
  );
};

const ConversationPage: React.FC = () => {
  const pronunciationErrors: PronunciationErrorProps[] = [
    {
      text: "Th sound /θ/ (like in 'think', 'three')",
      errorDescription:
        "Vietnamese speakers often pronounce 't' instead of 'th' (/θ/).",
      suggestion:
        "Place the tongue between your teeth and blow lightly when pronouncing 'th'.",
    },
    {
      text: "Final consonants /t/, /d/, /k/, /p/ (like in 'cat', 'bad')",
      errorDescription: "Often skip or mispronounce final consonants.",
      suggestion:
        "Focus on clearly pronouncing the final consonants, especially when they are voiceless like /t/, /k/, /p/.",
    },
    {
      text: "Short and long vowels (ship vs sheep)",
      errorDescription:
        "Can't differentiate between /ɪ/ (short) and /i:/ (long).",
      suggestion:
        "Practice pairs like ship/sheep, bit/beat to distinguish the vowel length.",
    },
    {
      text: "The /r/ sound (like in 'red', 'very')",
      errorDescription: "Confused with /z/ or /l/ in Vietnamese.",
      suggestion:
        "Place the tip of your tongue near the roof of your mouth but don't touch it, letting air escape between your tongue and the roof of your mouth.",
    },
    {
      text: "Word and sentence stress",
      errorDescription: "Pronouncing all syllables with equal stress.",
      suggestion:
        "Focus on stressing the syllable with primary stress and pronounce other syllables lightly.",
    },
  ];

  return (
    <div className="container mx-auto px-4 py-8 mt-[8rem]">
      <div className="mb-10 text-center">
        <h1 className="text-4xl font-bold mb-3 bg-clip-text text-transparent bg-gradient-to-r from-[#A78BFA] to-[#5B21B6]">
          Chat with AI and Improve Your Pronunciation
        </h1>
        <p className="text-gray-300 max-w-2xl mx-auto">
          Practice English pronunciation and communication with the smart AI
          assistant. Get instant feedback and improve your skills.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <AIConversation />
        </div>

        <div className="lg:col-span-1">
          <div className="bg-gradient-to-r from-[#1E1A2B] to-[#251D35] rounded-xl p-6 border border-red-500 border-opacity-20">
            <h2 className="text-xl font-semibold mb-4 text-red-300">
              Common Pronunciation Errors
            </h2>
            <div className="space-y-4 max-h-96 overflow-y-auto pr-1 custom-scrollbar">
              {pronunciationErrors.map((err, idx) => (
                <PronunciationError key={idx} {...err} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConversationPage;