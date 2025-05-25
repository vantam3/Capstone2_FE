import React from "react";
import ChooseAI from "../choose-ai";
import Review from "../review";
import Transform from "../tranform";
import {
  BookmarkIcon,
  ChartBarIcon,
  ChartPieIcon,
  LanguageIcon,
} from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";

function HomePage() {
  return (
    <>
      <div className="relative isolate px-6">
        <div className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80">
          <div
            style={{
              clipPath:
                "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
            }}
            className="relative left-[calc(50%-11rem)] aspect-1155/678 w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-linear-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
          />
        </div>
        <div className="mx-auto max-w-4xl py-32 sm:py-48 lg:py-56">
          <div className="hidden sm:mb-8 sm:flex sm:justify-center">
            <div className="relative rounded-full px-3 py-1 text-[12px] text-[#9061F9] ring-1">
              Al-powered language learning.
            </div>
          </div>
          <div className="text-center">
            <h1 className="text-5xl font-semibold tracking-tight text-balance text-white sm:text-7xl">
              Master Languages with Intelligent Feedback
            </h1>
            <p className="mt-8 text-lg font-medium text-pretty text-white sm:text-xl/8">
              Improve your pronunciation and speaking skills with personalized
              Al feedback. Practice anytime, anywhere, and track your progress.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Link
                to="/sign-in?tab=register"
                className="rounded-[10px] bg-[#9061F9] px-3.5 py-2.5 text-sm font-semibold text-white shadow-xs hover:bg-[#9061F9] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#9061F9]"
              >
                Get Started Now
              </Link>
              <Link to="/about" className="text-sm/6 font-semibold text-white">
                Learn more <span aria-hidden="true">→</span>
              </Link>
            </div>
            <div className="grid grid-cols-2 sm:flex sm:items-center sm:justify-center gap-4 mx-auto mt-8 text-center">
              <div className="flex items-center gap-2 justify-center">
                <BookmarkIcon className="w-5 h-5 text-[#8861ea]" />
                <p className="text-white">AI Insights</p>
              </div>
              <div className="flex items-center gap-2 justify-center">
                <LanguageIcon className="w-5 h-5 text-[#8861ea]" />
                <p className="text-white">Languages</p>
              </div>
              <div className="flex items-center gap-2 justify-center">
                <ChartBarIcon className="w-5 h-5 text-[#8861ea]" />
                <p className="text-white">Progress Tracking</p>
              </div>
              <div className="flex items-center gap-2 justify-center">
                <ChartPieIcon className="w-5 h-5 text-[#8861ea]" />
                <p className="text-white">Daily Challenges</p>
              </div>
            </div>
          </div>
        </div>
        <div className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]">
          <div
            style={{
              clipPath:
                "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
            }}
            className="relative left-[calc(50%+3rem)] aspect-1155/678 w-[36.125rem] -translate-x-1/2 bg-linear-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
          />
        </div>
      </div>
      <ChooseAI />
      <Review />
      <Transform />
    </>
  );
}

export default HomePage;
