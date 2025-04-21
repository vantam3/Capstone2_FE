import { ClockIcon } from "@heroicons/react/24/outline";
import { useState } from "react";

function AssignmentHistory() {
  const [tabHistory, setTabHistory] = useState("");
  return (
    <div className="mt-8">
      <h3 className="text-white text-xl">Assignment history</h3>
      <div
        onClick={() => setTabHistory("test_1")}
        className={`bg-[#1a0940] border ${
          tabHistory === "test_1" ? "border-[#7058b9]" : "border-[#2d1674]"
        }  p-4 rounded-[10px] cursor-pointer mt-4`}
      >
        <div className="flex items-center">
          <h3 className="text-white text-lg"> Test #1</h3>
          <h3 className="text-green-600 font-bold text-lg ml-auto"> 80%</h3>
        </div>
        <div className="flex items-center mt-4">
          <h3 className="text-gray-400 text-sm flex items-center gap-2">
            <ClockIcon className="w-6 h-6 " />
            14:54 13/04/2025
          </h3>
          <h3 className="text-gray-400 text-lg ml-auto"> Basic</h3>
        </div>
      </div>
      <div
        onClick={() => setTabHistory("test_2")}
        className={`bg-[#1a0940] border  ${
          tabHistory === "test_2" ? "border-[#7058b9]" : "border-[#2d1674]"
        }  p-4 rounded-[10px] cursor-pointer mt-4`}
      >
        <div className="flex items-center">
          <h3 className="text-white text-lg"> Test #2</h3>
          <h3 className="text-green-600 font-bold text-lg ml-auto"> 80%</h3>
        </div>
        <div className="flex items-center mt-4">
          <h3 className="text-gray-400 text-sm flex items-center gap-2">
            <ClockIcon className="w-6 h-6 " />
            14:54 13/04/2025
          </h3>
          <h3 className="text-gray-400 text-lg ml-auto"> Intermediate level</h3>
        </div>
      </div>
      <div
        onClick={() => setTabHistory("test_3")}
        className={`bg-[#1a0940] border  ${
          tabHistory === "test_3" ? "border-[#7058b9]" : "border-[#2d1674]"
        }  p-4 rounded-[10px] cursor-pointer mt-4`}
      >
        <div className="flex items-center">
          <h3 className="text-white text-lg"> Test #3</h3>
          <h3 className="text-green-600 font-bold text-lg ml-auto"> 80%</h3>
        </div>
        <div className="flex items-center mt-4">
          <h3 className="text-gray-400 text-sm flex items-center gap-2">
            <ClockIcon className="w-6 h-6 " />
            14:54 13/04/2025
          </h3>
          <h3 className="text-gray-400 text-lg ml-auto"> Basic</h3>
        </div>
      </div>
    </div>
  );
}

export default AssignmentHistory;
