import { ArrowLeftIcon } from "@heroicons/react/16/solid";
import ChallengeStats from "./components/challenge-stats";
import WeeklyAchievement from "./components/weekly-achievement";
import {
  ArrowTrendingUpIcon,
  CalendarIcon,
  ClockIcon,
} from "@heroicons/react/24/outline";
import ConvertstationStaterts from "./components/daily-challenges/convertstation-staterts";
import BusinesPresentation from "./components/daily-challenges/busines-presentation";
import PublicSpeech from "./components/monthly-challenges/public-speech";
import DebateChallenge from "./components/monthly-challenges/debate-challenge";
import TravelDialogue from "./components/weekly-challenges/travel-dialogue";
import Storytelling from "./components/weekly-challenges/storytelling";
import { useNavigate } from "react-router-dom";

function Challenges() {
  const router = useNavigate();
  return (
    <>
      <div className="mt-[4rem] sm:mt-[10rem] max-w-screen-2xl mx-auto sm:p-2 p-6">
        <div className="flex items-center gap-4 ">
          <ArrowLeftIcon
            className="w-4 h-4 cursor-pointer text-white"
            onClick={() => router("/home")}
          />
          <p className="text-xs text-white ">Back</p>
          <p className="text-2xl font-[600] text-white">Language Challenges</p>
        </div>
        <p className="text-sm text-white mt-2">
          Take on time-limited speaking challenges to test your skills, earn
          points, and compete with other learners.
        </p>
      </div>
      <div className="max-w-screen-2xl mx-auto mt-0 sm:mt-4 grid grid-cols-1 sm:grid-cols-[30%_70%] gap-4 p-6">
        <ChallengeStats />
        <WeeklyAchievement />
      </div>

      <div className="max-w-screen-2xl mx-auto mt-4">
        <div className="flex items-center space-x-2 ml-4">
          <ClockIcon className="w-6 h-6 text-[#7452c9]" />
          <h3 className="font-bold text-xl text-white">Daily Challenges</h3>
        </div>
        <div className=" grid sm:grid-cols-2 grid-cols-1 gap-6 p-6">
          <ConvertstationStaterts />
          <BusinesPresentation />
        </div>
      </div>

      <div className="max-w-screen-2xl mx-auto mt-4">
        <div className="flex items-center space-x-2 ml-4">
          <CalendarIcon className="w-6 h-6 text-[#7452c9]" />
          <h3 className="font-bold text-xl text-white">Weekly Challenges</h3>
        </div>
        <div className=" grid sm:grid-cols-2 grid-cols-1 gap-6 p-6">
          <TravelDialogue />
          <Storytelling />
        </div>
      </div>
      <div className="max-w-screen-2xl mx-auto mt-4">
        <div className="flex items-center space-x-2 ml-4">
          <ArrowTrendingUpIcon className="w-6 h-6 text-[#7452c9]" />
          <h3 className="font-bold text-xl text-white">Monthly Challenges</h3>
        </div>
        <div className=" grid sm:grid-cols-2 grid-cols-1 gap-6 p-6">
          <PublicSpeech />
          <DebateChallenge />
        </div>
      </div>
    </>
  );
}

export default Challenges;
