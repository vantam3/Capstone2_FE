import { MicrophoneIcon } from "@heroicons/react/24/outline";

function TakeTest() {
  return (
    <div className="mt-8">
      <h3>Practice Pronunciation</h3>
      <h3 className="text-gray-400 mt-2">Topic:</h3>
      <h3 className="text-gray-400 mt-2">Level: Basic</h3>
      <div className="flex items-center mt-2">
        <h3 className="text-gray-400">Progress</h3>
        <h3 className="text-gray-400 ml-auto">1/8 question</h3>
      </div>
      <div className="w-full bg-[#4b2f8d] rounded-full h-2">
        <div
          className="bg-[#8861ea] h-2 rounded-full"
          style={{ width: "10%" }}
        />
      </div>
      <div className="w-full mt-8 p-4 bg-[#1a0940] border border-[#2d1674] rounded-[10px] shadow-sm sm:p-6">
        <h5 className="mb-2 text-sm text-gray-400">Question 1:</h5>
        <p className="mb-5 text-white text-lg font-semibold">
          How much wood would a woodchuck chuck if a woodchuck could chuck wood?
        </p>
        <div className="w-full mt-8 p-4 bg-[#230e58] border border-[#2d1674] rounded-[10px] shadow-sm sm:p-6">
          <h5 className="mb-2 text-lg text-white font-semibold">
            Practice pronunciation with the following sentence:
          </h5>
          <p className="mb-5 text-white text-lg font-semibold bg-[#2d1674] border border-[#2d1674] rounded-[10px] sm:p-2">
            "How much wood would a woodchuck chuck if a woodchuck could chuck
            wood?"
          </p>
          <p className="text-gray-300 text-sm mt-4">
            1. Tap "Start Recording" to record your voice
          </p>
          <p className="text-gray-300 text-sm">
            2. Read the above sentence loudly and clearly.
          </p>
          <p className="text-gray-300 text-sm">
            3. Press "Stop Recording" when you're done reading
          </p>
          <button
            type="button"
            className="focus:outline-none gap-2 items-center flex m-auto text-white bg-[#5f3dc4] hover:bg-[#5f3dc4] font-medium rounded-lg text-sm px-5 py-2.5 "
          >
            <MicrophoneIcon className="w-4 h-4" />
            Start recording
          </button>
        </div>
      </div>
    </div>
  );
}

export default TakeTest;
