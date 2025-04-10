import {
  ArrowTrendingUpIcon,
  ClockIcon,
  FireIcon,
  UsersIcon,
} from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";

function DebateChallenge() {
  const router = useNavigate();
  return (
    <div className="bg-[#231246] border border-[#39246c] rounded-[16px] shadow-sm p-6">
      <h5 className="text-xl font-bold text-white">Debate Challenge</h5>
      <h5 className="text-sm font-bold text-[#bebace] mt-2">
        Argue for and against a given topic with persuasive language.
      </h5>
      <div className="mt-4 flex items-center w-full">
        <div className="space-y-4 mt-4 w-full">
          <div className="flex flex-wrap items-center  gap-2 sm:gap-4">
            <div className="relative rounded-full font-bold px-3 py-1 text-[12px] text-[#ef4444] ring-[#482c85] ring-1 bg-[#341139]">
              Advanced
            </div>
            <div className="relative rounded-full px-3 py-1 font-bold text-[12px] text-[#8660e7] ring-1 ring-[#3b2372] bg-[#26164c]">
              100 Points
            </div>
            <div className="relative flex items-center justify-center font-bold gap-1 rounded-full px-3 py-1 text-[12px] text-[#21b95b] ring-1 ring-[#4b2f8d] bg-[#1c243b]">
              <ClockIcon className="w-4 h-4 text-[#21b95b]" />1 days left
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-between w-full mt-2">
            <p className="text-[#d1cde1] text-[12px] flex items-center justify-center gap-2 font-[600]">
              <UsersIcon className="w-5 h-5 text-white" /> 412 Participants
            </p>
            <p className="text-[#d1cde1] text-[12px] font-[600] flex items-center justify-center gap-2">
              <ArrowTrendingUpIcon className="w-5 h-5 text-white " />
              Level 2
            </p>
          </div>

          <div className="w-full bg-[#4b2f8d] rounded-full h-1">
            <div
              className="bg-[#8861ea] h-1 rounded-tl-lg rounded-bl-lg"
              style={{ width: "90%" }}
            />
          </div>

          <button
            type="button"
            onClick={() => router("/challenges/debate-challenge")}
            className="text-[#f1eefd] flex items-center justify-center gap-2 font-[600] cursor-pointer w-full  bg-[#8861ea] hover:bg-[#8861ea] focus:ring-4 focus:ring-[#8861ea]  rounded-lg text-sm px-5 py-2.5 me-2 mb-2 focus:outline-none"
          >
            <FireIcon className="w-4 h-4 text-white" />
            Start Challenge
          </button>
        </div>
      </div>
    </div>
  );
}

export default DebateChallenge;
