import { CheckCircleIcon, XCircleIcon } from "@heroicons/react/24/outline";
const GENRE_MAP = {
  1: "Introductions",
  2: "Job Interview",
  3: "Travel",
  4: "Friendship",
  5: "Daily Life",
  9: "Miscellaneous",
  10: "Updated Topic"
};

const LEVEL_MAP = {
  1: "Beginner",
  2: "Intermediate",
  3: "Advanced"
};

function CurrentResult({ score, user_text, original_text, topicName, levelName, examTime }) {
  return (
    <div className="mt-8">
      <h3 className="text-white text-xl mt-4 font-bold">Speaking Result</h3>
      <div className="mt-4">
        <p>Topic: {GENRE_MAP[topicName] || topicName}</p>
        <p>Level: {LEVEL_MAP[levelName] || levelName}</p>
        <p>Exam time: {examTime}</p>
      </div>

      <div className="bg-gradient-to-r from-purple-600 to-indigo-700 p-6 rounded-xl shadow-lg text-white mt-4">
          <h3 className="text-lg font-semibold mb-2">🎯 Your Score</h3>
          <div className="text-4xl font-extrabold text-green-300">{score}%</div>
          <p className="text-sm text-gray-100 mt-1">based on your spoken response</p>

          <div className="w-full bg-purple-900 rounded-full h-2 mt-4">
            <div
              className="bg-green-400 h-2 rounded-full"
              style={{ width: `${score}%` }}
            ></div>
          </div>
      </div>


      <div className="mt-6">
  <h4 className="text-lg text-white font-semibold">📝 Original Text</h4>
  <p className="text-sm text-gray-200 whitespace-pre-wrap mt-2 bg-[#1e1140] p-3 rounded-lg">
    {original_text}
  </p>

  <div className="mt-6">
  <h4 className="text-lg text-white font-semibold mt-6">🎤 Your Spoken Text:</h4>
  <p className="text-sm bg-[#300c3f] p-4 rounded-lg text-white whitespace-pre-wrap break-words max-w-[700px]">
  {Array.isArray(user_text) ? (
    user_text.map((item, index) => {
      if (item.status === "correct") {
        return <span key={index} className="text-green-400 mr-1">{item.word}</span>;
      } else if (item.status === "wrong") {
        return (
          <span key={index} className="text-red-400 mr-1" title={`Expected: ${item.expected}`}>
            {item.word}
          </span>
        );
      } else if (item.status === "missing") {
        return <span key={index} className="text-yellow-400 line-through mr-1">{item.word}</span>;
      } else {
        return <span key={index} className="mr-1">{item.word}</span>;
      }
    })
  ) : (
    <span className="text-red-300">{user_text}</span>
  )}
</p>

</div>

</div>


<div className="mt-6 flex justify-center">
  <button
    className="bg-[#090909] hover:bg-[#1a1a1a] text-white border border-white px-6 py-2 rounded-lg text-sm font-medium"
    onClick={() => window.location.reload()} // hoặc gọi setActiveTab("tab_1")
  >
    🔁 Practice Again
  </button>
</div>

    </div>
  );
}

export default CurrentResult;
