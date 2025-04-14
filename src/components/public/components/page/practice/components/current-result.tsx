import { CheckCircleIcon, XCircleIcon } from "@heroicons/react/24/outline";

function CurrentResult() {
  const data = [
    {
      title: "Question 1",
      content: "What is your name?",
      your_answer: {
        title: "Your answer",
        content: "My name is John.",
      },
      correct_answer: null,
      result: "correct",
    },
    {
      title: "Question 2",
      content: "Where are you from?",
      your_answer: {
        title: "Your answer",
        content: "I'm from Canada.",
      },
      correct_answer: {
        title: "Correct answer",
        content: "I'm from Vietnam.",
      },
      result: "wrong",
    },
    {
      title: "Question 3",
      content: "What do you do?",
      your_answer: {
        title: "Your answer",
        content: "I am a teacher.",
      },
      correct_answer: {
        title: "Correct answer",
        content: "I am a software engineer.",
      },
      result: "wrong",
    },
    {
      title: "Question 4",
      content: "Do you like music?",
      your_answer: {
        title: "Your answer",
        content: "Yes, I love jazz.",
      },
      correct_answer: null,
      result: "correct",
    },
    {
      title: "Question 5",
      content: "What is your favorite color?",
      your_answer: {
        title: "Your answer",
        content: "My favorite color is blue.",
      },
      correct_answer: {
        title: "Correct answer",
        content: "My favorite color is green.",
      },
      result: "wrong",
    },
  ];

  return (
    <div className="mt-8">
      <h3 className="text-white text-xl mt-4 font-bold">Errors to improve:</h3>
      <div className="mt-4">
        <p>Topic:</p>
        <p>Level: Basic</p>
        <p>Exam day: 17:00 13/04/2025</p>
      </div>
      <div className="mt-4 bg-[#230e58] rounded-[10px] p-6">
        <p className="text-white text-xl font-semibold">Your score</p>
        <div className="flex items-center">
          <p className="text-red-600 text-3xl font-bold">0%</p>
          <div className="ml-auto">
            <p className="text-gray-400 text-lg">
              Number of correct sentences: 0
            </p>
            <p className="text-gray-400 text-lg">
              Total number of sentences: 8
            </p>
          </div>
        </div>
        <div className="w-full bg-[#4b2f8d] rounded-full h-2.5 mt-2">
          <div
            className="bg-[4b2f8d] h-2.5 rounded-full"
            style={{ width: "45%" }}
          />
        </div>
      </div>

      <h3 className="text-lg text-white">Your answer</h3>
      {data.map((item) => (
        <div
          className={`w-full p-4 mt-4 bg-[#1a0940] border border-[#2d1674] rounded-[10px] shadow-sm`}
          key={item.title}
        >
          <h5 className="mb-2 text-[14px]  text-gray-400">{item.title}:</h5>
          <p className="mb-2 text-[16px] text-white">{item.content}</p>
          <h5 className="mb-2 text-[16px] text-gray-400 flex items-center gap-2">
            <XCircleIcon className="w-6 h-6 text-red-600" />
            {item.your_answer.title}
          </h5>
          <p
            className={`ml-4 text-sm ${
              item.result === "correct" ? "text-green-400" : "text-red-400"
            }`}
          >
            {item.your_answer.content}
          </p>
          {item.correct_answer && (
            <>
              <h5 className="mb-2 text-[16px] font-bold text-white">
                {item.correct_answer.title}
              </h5>
              <p className="text-sm text-green-400">
                {item.correct_answer.content}
              </p>
            </>
          )}
          <h5
            className={`text-[16px] flex items-center gap-2 mt-4 ${
              item.result === "correct" ? "text-green-400" : "text-red-400"
            }`}
          >
            {item.result === "correct" ? (
              <XCircleIcon className="w-6 h-6" />
            ) : (
              <CheckCircleIcon className="w-6 h-6" />
            )}
            {item.result}
          </h5>
        </div>
      ))}
      <div className="mt-4">
        <button
          type="button"
          className="text-white bg-[#090909] border border-gray-50 hover:bg-[#09080d] font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2"
        >
          Quay lại
        </button>
      </div>
    </div>
  );
}

export default CurrentResult;
