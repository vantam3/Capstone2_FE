import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { ChallengeInfo } from "../components/types";
import { ArrowLeftIcon, ClockIcon, UsersIcon } from "@heroicons/react/24/outline";

function ChallengeMainPage() {
  const { challengeId } = useParams();
  const navigate = useNavigate();
  const [challenge, setChallenge] = useState<ChallengeInfo | null>(null);
  const [leaderboard, setLeaderboard] = useState<{ user_id: number; username: string; score: number }[]>([]);

  useEffect(() => {
    const fetchChallenge = async () => {
      const token = sessionStorage.getItem("token");
      const headers = token ? { Authorization: `Bearer ${token}` } : {};
      const res = await axios.get(`http://localhost:8000/api/challenges/${challengeId}/`, { headers });
      setChallenge(res.data);
    };
    const fetchLeaderboard = async () => {
      try {
        const res = await axios.get(`http://localhost:8000/api/challenges/${challengeId}/leaderboard/`);
        setLeaderboard(res.data.leaderboard);
      } catch (err) {
        console.error("Failed to fetch leaderboard:", err);
      }
    };
    fetchChallenge();
    fetchLeaderboard();
  }, [challengeId]);

  if (!challenge) return <div>Loading...</div>;

  return (
    <div className="mt-24 max-w-6xl mx-auto p-6 text-white">
      <button onClick={() => navigate("/challenges")} className="flex items-center gap-2 text-sm mb-6">
        <ArrowLeftIcon className="w-4 h-4" /> Back to Challenges
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-[65%_35%] gap-6">
        <div>
          <h1 className="text-2xl font-bold mb-2">{challenge.title}</h1>
          <p className="text-gray-300 mb-4">{challenge.description}</p>

          <div className="flex flex-wrap gap-3 text-sm mb-6">
            <span className="bg-[#4b2f8d] px-3 py-1 rounded-full text-white">{challenge.reward_points} Points</span>
            <span className="bg-[#4b2f8d] px-3 py-1 rounded-full text-white"><ClockIcon className="w-4 h-4 inline" /> {challenge.days_left}</span>
            <span className="bg-[#4b2f8d] px-3 py-1 rounded-full text-white"><UsersIcon className="w-4 h-4 inline" /> {challenge.participant_count} Participants</span>
          </div>

          <div className="space-y-4">
            {challenge.exercises.map((exercise) => (
              <div key={exercise.id} className="bg-[#1a0940] border border-[#301c5f] p-4 rounded-lg">
                <h3 className="font-semibold text-lg">{exercise.title}</h3>
                <p className="text-sm text-gray-400 mt-1">{exercise.description}</p>
                <button
                  onClick={() => {
                  const token = sessionStorage.getItem("token");
                  if (!token) {
                    alert("You must be signed in to start this exercise.");
                    return;
                }
                navigate(`/challenges/${challenge.id}/practice/${exercise.id}`);
          }}

                  className="mt-3 px-4 py-2 bg-[#8861ea] rounded text-sm"
                >
                  Start Exercise
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <div className="w-full p-4 sm:p-6 bg-[#190b37] border border-[#4b2f8d] rounded-[16px] shadow-lg">
            <div className="flex items-center gap-2 mb-5">
              <h3 className="text-xl font-bold text-white">Leaderboard</h3>
            </div>
            <div className="space-y-3.5">
              {leaderboard.map((item, index) => (
                <div className="flex items-center" key={index}>
                  <div className="bg-[#331e60] w-9 h-9 flex items-center justify-center rounded-full text-sm font-bold text-[#8861ea]">
                    {item.username.slice(0, 2).toUpperCase()}
                  </div>
                  <div className="ml-3 flex-grow">
                    <p className="text-sm text-white font-semibold truncate">{item.username}</p>
                  </div>
                  <p className="text-sm text-[#8660e8] font-bold ml-2 whitespace-nowrap">{item.score} pts</p>
                </div>
              ))}
              <button
                type="button"
                onClick={() => navigate("/leader-board")}
                className="text-white mt-4 cursor-pointer w-full border border-[#4b2f8d] bg-[#010005] hover:bg-[#1a0e2f] font-medium rounded-lg text-sm px-5 py-2.5 transition-colors"
              >
                View Full Leaderboard
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChallengeMainPage;