// src/pages/ProfilePage.tsx
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { SimpleSidebar } from "@/components/public/components/page/account/profile/components/side-bar"; // Giả sử đường dẫn này đúng
import { UserInfo, UserProfileData } from "@/components/public/components/page/account/profile/components/user-info"; // Import UserInfo và UserProfileData
import { SimpleHistory } from "@/components/public/components/page/account/profile/components/histories"; // Giả sử đường dẫn này đúng

export default function ProfilePage() {
  const [activePage, setActivePage] = useState("profile");
  const [user, setUser] = useState<UserProfileData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const [history] = useState([
    {
      id: 1,
      date: "2025-05-01",
      title: "Luyện phát âm - Bài 1",
      score: 85,
      duration: "5 phút",
    },
    {
      id: 2,
      date: "2025-04-30",
      title: "Luyện phát âm - Bài 2",
      score: 92,
      duration: "7 phút",
    },
    // Thêm các mục lịch sử khác nếu cần
  ]);

  const navigate = useNavigate();

  useEffect(() => {
    const storedUserData = localStorage.getItem("user");
    if (storedUserData) {
      try {
        const parsedUser: UserProfileData = JSON.parse(storedUserData);
        setUser(parsedUser);
      } catch (error) {
        console.error("Lỗi khi parse dữ liệu người dùng từ localStorage:", error);
        setUser(null);
        localStorage.removeItem("user");
        localStorage.removeItem("token");
      }
    } else {
      setUser(null);
    }
    setIsLoading(false);
  }, []);

  const handleUserUpdated = (updatedUser: UserProfileData) => {
    setUser(updatedUser);
    // localStorage đã được cập nhật trong UserInfo, nhưng có thể làm lại ở đây để chắc chắn
    localStorage.setItem("user", JSON.stringify(updatedUser));
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setUser(null);
    navigate("/home");
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#170a38] text-white flex justify-center items-center">
        <p className="text-xl">Loading profile data...</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-[#170a38] text-white flex flex-col justify-center items-center p-4 text-center">
        <p className="text-xl mb-4">
          User information not available. Please sign in to view your profile.
        </p>
        <button
          onClick={() => navigate("/sign-in")}
          className="bg-[#9061F9] hover:bg-[#7a52cc] text-white font-semibold py-2 px-6 rounded-lg"
        >
          Go to Sign In
        </button>
      </div>
    );
  }

  // Dữ liệu cho SimpleSidebar, giả sử nó cần fullName và avatarUrl (dù rỗng)
  const userForSidebar = {
    id: user.id,
    username: user.username,
    fullName: (user.first_name && user.last_name)
                ? `${user.first_name} ${user.last_name}`
                : user.username,
    email: user.email || "",
    // phone: "", // Đã bỏ số điện thoại
    avatarUrl: "", // Backend không cung cấp, truyền chuỗi rỗng
  };

  return (
    <div className="min-h-screen bg-[#170a38] text-white pt-4 pb-8 px-4">
      <div className="mt-[4rem] sm:mt-[6rem] md:mt-[8rem] max-w-screen-lg mx-auto sm:p-2 p-6"> {/* Adjusted top margin */}
        <div className="flex items-center gap-4 mb-6">
          <button
            onClick={() => navigate(-1)} // Quay lại trang trước đó
            className="text-white flex items-center gap-2 text-xs hover:text-gray-300"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-4 h-4"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
                clipRule="evenodd"
              />
            </svg>
            <span>Back</span>
          </button>
        </div>
        <div className="text-white text-2xl font-semibold">Account Information</div>
        <div className="text-gray-300 text-sm">
          Manage your personal account and account settings.
        </div>
      </div>

      <div className="w-full max-w-screen-lg mt-4 mx-auto grid grid-cols-1 md:grid-cols-[250px_1fr] gap-6 sm:gap-8">
        <div className="flex-shrink-0">
          <SimpleSidebar
            user={userForSidebar}
            activePage={activePage}
            onPageChange={setActivePage}
            onLogout={handleLogout}
          />
        </div>

        <div className="flex-1">
          {activePage === "profile" && user && ( // Đảm bảo user không null trước khi render UserInfo
            <UserInfo
              user={user}
              onUserUpdated={handleUserUpdated}
            />
          )}
          {activePage === "history" && <SimpleHistory items={history} />}
        </div>
      </div>
    </div>
  );
}