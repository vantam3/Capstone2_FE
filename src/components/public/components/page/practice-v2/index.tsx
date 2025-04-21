import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import React from "react";
import HistoryPractice from "../practice/components/current-result";

function PracticeV2() {
  return (
    <>
      <div className="mt-[5rem] sm:mt-[10rem] max-w-screen-2xl mx-auto sm:p-2 p-6">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 hover:bg-[#8861ea] rounded-[8px] cursor-pointer p-2">
            <ArrowLeftIcon className="w-4 h-4 cursor-pointer text-white" />
            <p className="text-xs text-white">Quay lại</p>
          </div>
          <p className="text-2xl font-[600] text-white">Chi tiết bài làm </p>
        </div>
        <div className="w-full mt-4 p-4 bg-[#311b59] border border-[#291650] rounded-[16px] shadow-sm sm:p-8">
          <div className="flex items-center">
            <h5 className="text-lg font-bold text-white">
              Giao tiếp hàng ngày
            </h5>
            <p className="text-base text-gray-400 sm:text-lg ml-auto">sơ cấp</p>
          </div>
          <div className="grid grid-cols-3 gap-4 mt-4">
            <p className="text-gray-400">Ngày: 11/4/2025</p>
            <p className="text-gray-400">Thời gian: 4:30</p>
            <p className="text-green-500">Điểm: 85%</p>
          </div>
        </div>
        <HistoryPractice />
      </div>
    </>
  );
}

export default PracticeV2;
