import { ArrowLeftIcon } from "@heroicons/react/16/solid";
import { useState } from "react";
import Register from "./register";
import SignIn from "./sign-in";
import { useNavigate, useSearchParams } from "react-router-dom";

function Account() {
  const router = useNavigate();
  const tabs = [
    {
      name: "SignIn",
      code: "sign-in",
    },
    {
      name: "Register",
      code: "register",
    },
  ];

  const [searchParams] = useSearchParams();
  const valueTab = searchParams.get("tab");

  const [activeTab, setActiveTab] = useState(valueTab || tabs[0].code);

  return (
    <div className="mt-16 mx-auto lg:w-[80rem]">
      <div
        className="flex items-center p-2 gap-2 hover:bg-[#8861ea] w-[10rem] rounded-[8px] cursor-pointer"
        onClick={() => router("/home")}
      >
        <ArrowLeftIcon className="w-4 h-4 cursor-pointer text-white" />
        <p className="text-lg text-white ">Back to Home</p>
      </div>
      <div className="mt-4 p-4 grid sm:grid-cols-2 grid-cols-1 mx-auto gap-8">
        <div className="lg:w-lg w-full mx-auto bg-[#190b37] border border-[#291650] rounded-[16px] shadow-sm sm:p-8">
          <div className="mb-4 p-4 sm:p-4 ">
            <h5 className="font-[600] text-[30px] mb-2 text-white">
              {activeTab === "sign-in" ? "Sign In" : "Create Account"}
            </h5>
            <p className="text-sm text-white">
              {activeTab === "sign-in"
                ? "Enter your credentials to access your account"
                : "Fill out the form to create your account"}
            </p>
          </div>

          <div className="p-4 sm:p-0">
            <div className="sm:mt-8 mt-0 sm:mb-8 mb-0 bg-[#4b2f8d] max-w-screen-lg mx-auto rounded-[10px]">
              <div className="px-1 py-1">
                <nav className="flex">
                  {tabs.map((tab) => (
                    <button
                      key={tab.code}
                      onClick={() => {
                        setActiveTab(tab.code);
                        router(`?tab=${tab.code}`);
                      }}
                      className={`rounded-[10px] px-3 py-2 flex items-center justify-center gap-2 text-sm font-medium w-full text-center ${
                        activeTab === tab.code
                          ? "bg-[#010005] text-white cursor-pointer"
                          : "text-white cursor-pointer"
                      }`}
                    >
                      {tab.name}
                    </button>
                  ))}
                </nav>
              </div>
            </div>
          </div>
          {activeTab === "sign-in" ? (
            <SignIn setActiveTab={setActiveTab} />
          ) : (
            <Register setActiveTab={setActiveTab} />
          )}
        </div>
        <div className="mt-10 sm:mt-0">
          <h3 className="text-white text-4xl font-bold">
            Improve Your Speaking Skills with SpeakAl
          </h3>
          <p className="text-white text-lg mt-4">
            Practice speaking, get instant feedback, and track your progress
            with our advanced Al language coach.
          </p>
          <div className="mt-10">
            <div>
              <p className="text-white">Al-Powered Feedback</p>
              <p className="text-white">
                Get personalized feedback on your pronunciation, grammar, and
                fluency.
              </p>
            </div>
            <div className="mt-4">
              <p className="text-white">Daily Challenges</p>
              <p className="text-white">
                Improve consistently with our engaging speaking challenges.
              </p>
            </div>
            <div className="mt-4">
              <p className="text-white">Progress Tracking</p>
              <p className="text-white">
                See your improvement over time with detailed analytics..
              </p>
            </div>
          </div>
          <div className="mt-10 p-6 bg-[#190b37] border border-[#291650] rounded-[16px] shadow-sm">
            <figure className="max-w-screen-md">
              <blockquote>
                <p className="text-xl italic text-white">
                  "SpeakAl helped me improve my Korean pronunciation in just a
                  few weeks. The feedback is so detailed and helpful!"
                </p>
              </blockquote>
              <figcaption className="flex items-center mt-6 space-x-3 rtl:space-x-reverse">
                <img
                  className="w-6 h-6 rounded-full"
                  src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/bonnie-green.png"
                  alt="profile picture"
                />
                <div className="flex items-center divide-x-2 rtl:divide-x-reverse divide-gray-700">
                  <cite className="pe-3 font-medium text-white">
                    Bonnie Green
                  </cite>
                  <cite className="ps-3 text-sm text-gray-400">
                    CTO at Flowbite
                  </cite>
                </div>
              </figcaption>
            </figure>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Account;
