import { useState, useEffect } from "react";
import { MicrophoneIcon } from "@heroicons/react/24/outline";
import axios from "axios";

function TakeTest({ selectedLevel, selectedTopic }) {
  const [question, setQuestion] = useState(null);
  const [progress, setProgress] = useState(10); // Giả sử bạn có 1 câu hỏi
  const [isRecording, setIsRecording] = useState(false); // Để theo dõi trạng thái ghi âm
  const [error, setError] = useState(""); // Lưu thông báo lỗi nếu có

  // Gọi API để lấy câu hỏi từ server dựa trên selectedLevel và selectedTopic
  useEffect(() => {
    if (selectedLevel && selectedTopic) {
      axios
        .get(
          `http://127.0.0.1:8000/speaking-texts/filter/?genre=${selectedTopic}&level=${selectedLevel}`
        )
        .then((response) => {
          // Kiểm tra dữ liệu trả về
          const content = response.data[0]?.content;
          if (!content) {
            setError("No content found");
            return;
          }

          setQuestion({
            title: response.data[0].title,
            content: content, // Trực tiếp lấy văn bản thuần
          });
          setProgress(100); // Tiến độ hoàn thành 100% vì chỉ có 1 câu hỏi
        })
        .catch((error) => {
          console.error("Error fetching questions:", error);
          setError("An error occurred while fetching the questions.");
        });
    }
  }, [selectedLevel, selectedTopic]);

  const toggleRecording = () => {
    setIsRecording(!isRecording);
  };

  return (
    <div className="mt-8">
      <h3>Practice Pronunciation</h3>
      <h3 className="text-gray-400 mt-2">Topic: {selectedTopic}</h3>
      <h3 className="text-gray-400 mt-2">Level: {selectedLevel}</h3>
      <div className="flex items-center mt-2">
        <h3 className="text-gray-400">Progress</h3>
        <h3 className="text-gray-400 ml-auto">1/1 question</h3>
      </div>
      <div className="w-full bg-[#4b2f8d] rounded-full h-2">
        <div
          className="bg-[#8861ea] h-2 rounded-full"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Hiển thị lỗi nếu có */}
      {error ? (
        <div className="text-red-500 mt-4">
          <p>{error}</p>
        </div>
      ) : (
        <div className="w-full mt-8 p-4 bg-[#1a0940] border border-[#2d1674] rounded-[10px] shadow-sm sm:p-6">
          <h5 className="mb-2 text-sm text-gray-400">Question:</h5>
          <p className="mb-5 text-white text-lg font-semibold">
            {question ? question.title : "Loading..."}
          </p>
          <div className="w-full mt-8 p-4 bg-[#230e58] border border-[#2d1674] rounded-[10px] shadow-sm sm:p-6">
            <h5 className="mb-2 text-lg text-white font-semibold">
              Practice pronunciation with the following sentence:
            </h5>
            <p className="mb-5 text-white text-lg font-semibold bg-[#2d1674] border border-[#2d1674] rounded-[10px] sm:p-2">
              {question ? question.content : "Loading..."}
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
              className="focus:outline-none gap-2 items-center flex m-auto text-white bg-[#5f3dc4] hover:bg-[#5f3dc4] font-medium rounded-lg text-sm px-5 py-2.5"
              onClick={toggleRecording}
            >
              <MicrophoneIcon className="w-4 h-4" />
              {isRecording ? "Stop Recording" : "Start Recording"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default TakeTest;
