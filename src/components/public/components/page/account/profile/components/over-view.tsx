import React from "react";
import Infomation from "./infomation";
import Security from "./security";
import Language from "./language";
import Notification from "./notification";
import { useSearchParams } from "react-router-dom";

function OverView() {
  const [searchParams] = useSearchParams();
  const pathParams = searchParams.get("path");

  return (
    <>
      <div className="w-full bg-[#170a38] border border-[#2d1c65] rounded-[16px] mt-4 shadow-sm p-4">
        <div className="flex items-center">
          <div>
            <p className="text-white text-2xl font-bold">User overview</p>
            <p className="text-white sm:text-sm mt-1">
              Overview of your activities and progress
            </p>
          </div>
          <div className="ml-auto">
            <div className="bg-[#372267] rounded-full p-4 w-10 h-10 flex items-center justify-center">
              AD
            </div>
            <p className="text-white mt-1">aaaa</p>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="w-full bg-[#210f41] border border-[#210f41] rounded-[16px] mt-4 shadow-sm p-4">
            <p className="text-white text-xl text-center font-bold">Level</p>
            <p className="text-white text-3xl text-center mt-1 font-bold">
              intermediate
            </p>
            <div className="w-full bg-[#8a61eb] rounded-full h-2.5 mt-2">
              <div
                className="bg-[#8a61eb] h-2.5 rounded-full"
                style={{ width: "100%" }}
              />
            </div>
            <p className="text-white text-sm text-center mt-2">
              100% to the next level
            </p>
          </div>
          <div className="w-full bg-[#210f41] border border-[#210f41] rounded-[16px] mt-4 shadow-sm p-4">
            <p className="text-white text-xl text-center font-bold">Point</p>
            <p className="text-white text-3xl text-center mt-1 font-bold">
              250
            </p>
            <p className="text-[#1eac6f] text-sm text-center mt-2">
              +120 in the last 30 days
            </p>
          </div>
          <div className="w-full bg-[#210f41] border border-[#210f41] rounded-[16px] mt-4 shadow-sm p-4">
            <p className="text-white text-xl text-center font-bold">
              Practice time
            </p>
            <p className="text-white text-3xl text-center mt-1 font-bold">
              120 minutes
            </p>
            <p className="text-[#1eac6f] text-sm text-center mt-2">
              ~2 hours practice
            </p>
          </div>
        </div>
      </div>

      <div />
      <div className="mt-4 sm:mt-0">
        {pathParams === "personal-information" ? (
          <Infomation />
        ) : pathParams === "security" ? (
          <Security />
        ) : pathParams === "language" ? (
          <Language />
        ) : (
          <Notification />
        )}
      </div>
    </>
  );
}

export default OverView;
