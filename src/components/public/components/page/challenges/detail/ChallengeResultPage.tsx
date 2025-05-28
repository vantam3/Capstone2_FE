import { useParams, useNavigate } from "react-router-dom";

function ChallengeResultPage() {
  const { challengeId, score } = useParams();
  const navigate = useNavigate();

  return (
    <div className="mt-24 max-w-xl mx-auto p-6 text-white text-center">
      <h2 className="text-3xl font-bold mb-6">🎉 Exercise Completed!</h2>
      <p className="text-lg text-gray-300 mb-2">You earned:</p>
      <p className="text-5xl text-green-400 font-extrabold">{Math.round(Number(score))} Points</p>
      <button
        onClick={() => navigate(`/challenges/detail/${challengeId}`)}
        className="mt-8 px-6 py-3 bg-[#8861ea] rounded text-white"
      >
        Back to Challenge Overview
      </button>
    </div>
  );
}

export default ChallengeResultPage