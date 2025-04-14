import { useState } from "react";

function ChooseTopic({ setActiveTab }) {
  const [selectTopic, setSelectTopic] = useState("");
  const [selectLevel, setSelectLevel] = useState("basic");
  const dataTopic = [
    {
      title: "Everyday Conversation",
      content:
        "Learn common phrases and expressions used in daily conversations.",
      code: "Conversation",
    },
    {
      title: "Travel",
      content: "Essential vocabulary and phrases for traveling abroad.",
      code: "Travel",
    },
    {
      title: "Business",
      content: "Professional language for workplace and business settings.",
      code: "Business",
    },
    {
      title: "Academic",
      content: "Language skills for academic environments and discussions.",
      code: "Academic",
    },
  ];

  return (
    <div>
      <div className="mt-8">
        <h3>Level:</h3>
        <div className="grid sm:grid-cols-3 grid-cols-1 gap-4 mt-4">
          <div
            onClick={() => setSelectLevel("basic")}
            className={`w-full text-center cursor-pointer p-4 ${
              selectLevel === "basic"
                ? "bg-green-600 border-white ring-green-600 ring-4"
                : "bg-[#230e58] border-[#3b1d96]"
            } border rounded-[10px] shadow-sm`}
          >
            <h5 className="mb-2 text-3xl font-bold text-white">🔰</h5>
            <h5 className="mb-2 text-xl font-bold text-white">Basic</h5>
            <p
              className={`text-sm ${
                selectLevel === "basic" ? "text-white" : "text-gray-400"
              } `}
            >
              Suitable for beginners
            </p>
          </div>
          <div
            onClick={() => setSelectLevel("intermediate_level")}
            className={`w-full text-center cursor-pointer p-4 ${
              selectLevel === "intermediate_level"
                ? "bg-yellow-600 border-white ring-yellow-600 ring-4"
                : "bg-[#230e58] border-[#3b1d96]"
            } border rounded-[10px] shadow-sm`}
          >
            <h5 className="mb-2 text-3xl font-bold text-white">🏆</h5>
            <h5 className="mb-2 text-xl font-bold text-white">
              Intermediate level
            </h5>
            <p
              className={`text-sm ${
                selectLevel === "intermediate_level"
                  ? "text-white"
                  : "text-gray-400"
              } `}
            >
              For people with basic knowledge
            </p>
          </div>
          <div
            onClick={() => setSelectLevel("advanced")}
            className={`w-full text-center cursor-pointer p-4 ${
              selectLevel === "advanced"
                ? "bg-red-600 border-white ring-red-600 ring-4"
                : "bg-[#230e58] border-[#3b1d96]"
            } border rounded-[10px] shadow-sm`}
          >
            <h5 className="mb-2 text-3xl font-bold text-white">🌟</h5>
            <h5 className="mb-2 text-xl font-bold text-white">Advanced</h5>
            <p
              className={`text-sm ${
                selectLevel === "advanced" ? "text-white" : "text-gray-400"
              } `}
            >
              Challenges for advanced learners
            </p>
          </div>
        </div>
      </div>
      <div className="mt-8">
        <h3>Topic:</h3>
        <div className="grid sm:grid-cols-2 grid-cols-1 gap-6 mt-4">
          {dataTopic.map((item) => (
            <div
              onClick={() => setSelectTopic(item.code)}
              key={item.title}
              className={`w-full cursor-pointer p-6 ${
                item.code === selectTopic
                  ? "bg-[#230e58] border-[#5f3dc4]"
                  : "bg-[#1a0940] border-[#2d1674]"
              } border  rounded-[10px] shadow-sm `}
            >
              <h5 className="text-xl font-bold text-white">{item.title}</h5>
              <p className="text-[16px] mt-2 text-gray-400">{item.content}</p>
            </div>
          ))}
        </div>
      </div>
      <p
        onClick={() => {
          if (selectTopic) {
            setActiveTab("tab_2");
          }
        }}
        className={`text-center mt-8 text-lg font-bold ${
          selectTopic === ""
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
