function Notification() {
  return (
    <div className="w-full bg-[#170a38] border border-[#2d1c65] rounded-[16px] shadow-sm p-4">
      <p className="text-white text-2xl font-bold">Notification settings</p>
      <p className="text-white text-sm mt-1">
        Manage how you receive notifications
      </p>
      <p className="text-white text-sm font-bold mt-4 mb-4">
        Email Notifications
      </p>
      <div className="flex items-center mt-4 gap-2">
        <div>
          <p className="text-white text-sm font-bold">Exercise reminder</p>
          <p className="text-gray-400 text-[15px] font-[600]">
            Send daily reminders to practice
          </p>
        </div>
        <div className="ml-auto">
          <label className="inline-flex items-center mb-5 cursor-pointer">
            <input type="checkbox" className="sr-only peer" />
            <div className="relative w-11 h-6 bg-[#4c2e90] peer-focus:outline-none peer-focus:ring-4 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:w-5 after:h-5 after:transition-all peer-checked:bg-[#8761ef]" />
          </label>
        </div>
      </div>
      <div className="flex items-center mt-4 gap-2">
        <div>
          <p className="text-white text-sm font-bold">New challenge</p>
          <p className="text-gray-400 text-[15px] font-[600]">
            Notify when new challenges are available
          </p>
        </div>
        <div className="ml-auto">
          <label className="inline-flex items-center mb-5 cursor-pointer">
            <input type="checkbox" className="sr-only peer" />
            <div className="relative w-11 h-6 bg-[#4c2e90] peer-focus:outline-none peer-focus:ring-4 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:w-5 after:h-5 after:transition-all peer-checked:bg-[#8761ef]" />
          </label>
        </div>
      </div>
      <div className="flex items-center mt-4 gap-2">
        <div>
          <p className="text-white text-sm font-bold">Feature update</p>
          <p className="text-gray-400 text-[15px] font-[600]">
            Get notified about new features
          </p>
        </div>
        <div className="ml-auto">
          <label className="inline-flex items-center mb-5 cursor-pointer">
            <input type="checkbox" className="sr-only peer" />
            <div className="relative w-11 h-6 bg-[#4c2e90] peer-focus:outline-none peer-focus:ring-4 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:w-5 after:h-5 after:transition-all peer-checked:bg-[#8761ef]" />
          </label>
        </div>
      </div>
      <div className="border-b-1 mt-4 border-[#402e6a]" />

      <p className="text-white text-sm font-bold mt-4 mb-4">
        Application notifications
      </p>
      <div className="flex items-center mt-4 gap-2">
        <div>
          <p className="text-white text-sm font-bold">Push notifications</p>
          <p className="text-gray-400 text-[15px] font-[600]">
            Enable/disable push notifications on browser
          </p>
        </div>
        <div className="ml-auto">
          <label className="inline-flex items-center mb-5 cursor-pointer">
            <input type="checkbox" className="sr-only peer" />
            <div className="relative w-11 h-6 bg-[#4c2e90] peer-focus:outline-none peer-focus:ring-4 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:w-5 after:h-5 after:transition-all peer-checked:bg-[#8761ef]" />
          </label>
        </div>
      </div>
      <div className="flex items-center mt-4 gap-2">
        <div>
          <p className="text-white text-sm font-bold">Sound notifications</p>
          <p className="text-gray-400 text-[15px] font-[600]">
            Turn notification sounds on/off
          </p>
        </div>
        <div className="ml-auto">
          <label className="inline-flex items-center mb-5 cursor-pointer">
            <input type="checkbox" className="sr-only peer" />
            <div className="relative w-11 h-6 bg-[#4c2e90] peer-focus:outline-none peer-focus:ring-4 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:w-5 after:h-5 after:transition-all peer-checked:bg-[#8761ef]" />
          </label>
        </div>
      </div>
      <div className="text-right">
        <button
          type="button"
          className="text-white cursor-pointer mt-4 bg-[#8a61eb] hover:bg-[#8a61eb] font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2"
        >
          Save changes
        </button>
      </div>
    </div>
  );
}

export default Notification;
