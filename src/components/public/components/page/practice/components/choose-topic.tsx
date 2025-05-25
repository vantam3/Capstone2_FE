import { useState, useEffect } from "react";
import axios from "axios";

function ChooseTopic({
  setActiveTab,
  selectedLevel,
  selectedTopic,
  setSelectedLevel,
  setSelectedTopic,
}) {
  const [levels, setLevels] = useState([]);
  const [topics, setTopics] = useState([]);
  const [textOptions, setTextOptions] = useState([]);
  const [selectedTextId, setSelectedTextId] = useState(null);

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/levels/")
      .then((response) => setLevels(response.data))
      .catch((error) => console.error("Error fetching levels:", error));

    axios
      .get("http://127.0.0.1:8000/genres/")
      .then((response) => setTopics(response.data))
      .catch((error) => console.error("Error fetching topics:", error));
  }, []);

  useEffect(() => {
    if (selectedLevel && selectedTopic) {
      axios
        .get(`http://127.0.0.1:8000/speaking-texts/filter/?genre=${selectedTopic}&level=${selectedLevel}`)
        .then((res) => {
          setTextOptions(res.data || []);
          setSelectedTextId(null);
        })
        .catch((err) => console.error("Failed to fetch speaking texts", err));
    }
  }, [selectedLevel, selectedTopic]);

  return (
    <div>
      <div className="mt-8">
        <h3>Level:</h3>
        <div className="grid sm:grid-cols-3 grid-cols-1 gap-4 mt-4">
          {levels.map((level) => (
            <div
              key={level.id}
              onClick={() => setSelectedLevel(level.id)}
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
              onClick={() => setSelectedTopic(item.id)}
              className={`w-full cursor-pointer p-6 ${
                item.id === selectedTopic
                  ? "bg-[#230e58] border-[#5f3dc4]"
                  : "bg-[#1a0940] border-[#2d1674]"
              } border rounded-[10px] shadow-sm`}
            >
              <h5 className="text-xl font-bold text-white">{item.name}</h5>
              <p className="text-[16px] mt-2 text-gray-400">
                {item.name === "Daily Life"
                  ? "Practice speaking about daily routines, habits, and common personal activities."
                  : item.name === "Technology"
                  ? "Discuss gadgets, social media, and the impact of technology on our lives."
                  : item.name === "Travel"
                  ? "Learn vocabulary and expressions for trips, destinations, and travel experiences."
                  : item.name === "Education"
                  ? "Explore school life, study habits, and the role of education in society."
                  : item.name === "Family"
                  ? "Talk about family relationships, roles, and shared experiences."
                  : "Other topics."}
              </p>

            </div>
          ))}
        </div>
      </div>

      {textOptions.length > 0 && (
        <div className="mt-8">
          <h3 className="text-white mb-2">Choose a sample text:</h3>
          <div className="grid grid-cols-1 gap-4">
            {textOptions.map((text) => (
              <div
                key={text.id}
                onClick={() => setSelectedTextId(text.id)}
                className={`cursor-pointer p-4 rounded-lg border ${
                  selectedTextId === text.id
                    ? "bg-green-600 border-white ring-2 ring-green-400"
                    : "bg-[#1a0940] border-[#2d1674]"
                }`}
              >
                <h4 className="text-white font-bold">{text.title}</h4>
                <p className="text-gray-300 mt-2 whitespace-pre-line line-clamp-3">{text.content}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      <p
        onClick={() => {
          if (selectedTextId) {
            localStorage.setItem("selectedTextId", selectedTextId);
            setActiveTab("tab_2");
          }
        }}
        className={`text-center mt-8 text-lg font-bold ${
          selectedTextId ? "text-white cursor-pointer" : "text-gray-400 cursor-not-allowed"
        }`}
      >
        Start the lesson
      </p>
    </div>
  );
}

export default ChooseTopic;
