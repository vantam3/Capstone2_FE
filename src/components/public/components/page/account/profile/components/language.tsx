import { GlobeAltIcon } from "@heroicons/react/24/outline";

function Language() {
  return (
    <div className="w-full bg-[#170a38] border border-[#2d1c65] rounded-[16px] shadow-sm p-4">
      <p className="text-white text-2xl font-bold">Language being learned</p>
      <p className="text-white text-sm mt-1">
        Manage your languages and learning progress
      </p>
      <div className="flex items-center mt-4 gap-2">
        <div className="bg-[#231149] rounded-full p-2 flex items-center justify-center">
          <GlobeAltIcon className="w-6 h-6 text-[#855edd]" />
        </div>
        <div>
          <p className="text-[#d1cde1] text-sm font-bold">English</p>
          <p className="text-[#d1cde1] text-[15px] font-[600]">Advanced</p>
        </div>

        <div className="ml-auto">
          <div className="relative rounded-full px-3 py-1 font-bold text-[12px] text-white ring-[#2e1f5a] ring-1">
            90%
          </div>
        </div>
      </div>
      <div className="flex items-center mt-4 gap-2">
        <div className="bg-[#231149] rounded-full p-2 flex items-center justify-center">
          <GlobeAltIcon className="w-6 h-6 text-[#855edd]" />
        </div>
        <div>
          <p className="text-[#d1cde1] text-sm font-bold">French</p>
          <p className="text-[#d1cde1] text-[15px] font-[600]">Intermediate</p>
        </div>

        <div className="ml-auto">
          <div className="relative rounded-full px-3 py-1 font-bold text-[12px] text-white ring-[#2e1f5a] ring-1">
            90%
          </div>
        </div>
      </div>
      <div className="flex items-center mt-4 gap-2">
        <div className="bg-[#231149] rounded-full p-2 flex items-center justify-center">
          <GlobeAltIcon className="w-6 h-6 text-[#855edd]" />
        </div>
        <div>
          <p className="text-[#d1cde1] text-sm font-bold">Japanese</p>
          <p className="text-[#d1cde1] text-[15px] font-[600]">Beginner</p>
        </div>

        <div className="ml-auto">
          <div className="relative rounded-full px-3 py-1 font-bold text-[12px] text-white ring-[#2e1f5a] ring-1">
            90%
          </div>
        </div>
      </div>
      <div className="border-b-1 mt-4 border-[#402e6a]" />
      <button
        type="button"
        className="text-white flex items-center gap-2 cursor-pointer mt-4 bg-[#8a61eb] hover:bg-[#8a61eb] font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2"
      >
        <GlobeAltIcon className="w-6 h-6 text-white" />
        Add new languages
      </button>
    </div>
  );
}

export default Language;
