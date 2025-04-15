import { useState, useEffect } from "react";
import axios from "axios"; // Đảm bảo bạn đã cài axios (npm install axios)

function ChooseTopic({
  setActiveTab,
  selectedLevel,
  selectedTopic,
  setSelectedLevel,
  setSelectedTopic,
}) {
  const [levels, setLevels] = useState([]);
  const [topics, setTopics] = useState([]);

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/levels/") // API trả về danh sách các level
      .then((response) => {
        setLevels(response.data);
      })
      .catch((error) => {
        console.error("Error fetching levels:", error);
      });

    axios
      .get("http://127.0.0.1:8000/genres/") // API trả về danh sách các topic
      .then((response) => {
        setTopics(response.data);
      })
      .catch((error) => {
        console.error("Error fetching topics:", error);
      });
  }, []);

  return (
    <div>
      <div className="mt-8">
        <h3>Level:</h3>
        <div className="grid sm:grid-cols-3 grid-cols-1 gap-4 mt-4">
          {levels.map((level) => (
            <div
              key={level.id}
              onClick={() => {
                setSelectedLevel(level.id); // Lưu ID của level
              }}
              className={`w-full text-center cursor-pointer p-4 ${
                selectedLevel === level.id
                  ? `bg-green-600 border-white ring-green-600 ring-4`
                  : "bg-[#230e58] border-[#3b1d96]"
              } border rounded-[10px] shadow-sm`}
            >
              <h5 className="mb-2 text-3xl font-bold text-white">{level.name[0]}</h5>
              <h5 className="mb-2 text-xl font-bold text-white">{level.name}</h5>
              <p
                className={`text-sm ${
                  selectedLevel === level.id ? "text-white" : "text-gray-400"
                }`}
              >
                {level.name === "Beginner"
                  ? "Suitable for beginners"
                  : level.name === "Intermediate"
                  ? "For people with basic knowledge"
                  : "Challenges for advanced learners"}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-8">
        <h3>Topic:</h3>
        <div className="grid sm:grid-cols-2 grid-cols-1 gap-6 mt-4">
          {topics.map((item) => (
            <div
              key={item.id}
              onClick={() => {
                setSelectedTopic(item.id); // Lưu ID của topic
              }}
              className={`w-full cursor-pointer p-6 ${
                item.id === selectedTopic
                  ? "bg-[#230e58] border-[#5f3dc4]"
                  : "bg-[#1a0940] border-[#2d1674]"
              } border rounded-[10px] shadow-sm`}
            >
              <h5 className="text-xl font-bold text-white">{item.name}</h5>
              <p className="text-[16px] mt-2 text-gray-400">
                {item.name === "Conversation"
                  ? "Learn common phrases and expressions used in daily conversations."
                  : item.name === "Travel"
                  ? "Essential vocabulary and phrases for traveling abroad."
                  : item.name === "Interview"
                  ? "Essential language for job interviews."
                  : "Other topics."}
              </p>
            </div>
          ))}
        </div>
      </div>

      <p
        onClick={() => {
          if (selectedTopic) {
            setActiveTab("tab_2"); // Chuyển sang tab tiếp theo
          }
        }}
        className={`text-center mt-8 text-lg font-bold ${
          selectedTopic === ""
            ? "text-gray-400 cursor-not-allowed"
            : "text-white cursor-pointer"
        }`}
      >
        Start the lesson
      </p>
    </div>
  );
}

export default ChooseTopic;
