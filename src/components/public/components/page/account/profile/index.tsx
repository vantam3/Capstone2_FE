import Sidebar from "./components/side-bar";
import OverView from "./components/over-view";

function Profile() {
  return (
    <>
      <div className="mt-[4rem] sm:mt-[10rem] max-w-screen-lg mx-auto sm:p-2 p-6">
        <div className="text-white text-2xl">Account information</div>
        <div className="text-white text-sm">
          Manage your personal account and account settings
        </div>
      </div>
      <div className="w-full max-w-screen-lg mt-0 mx-auto  grid grid-cols-1 sm:grid-cols-[25%_75%] gap-2 sm:gap-4">
        <Sidebar />
        <OverView />
      </div>
    </>
  );
}

export default Profile;
