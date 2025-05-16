import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { SimpleSidebar } from "@/components/public/components/page/account/profile/components/side-bar";
import { SimpleUserInfo } from "@/components/public/components/page/account/profile/components/user-info";
import { SimpleHistory } from "@/components/public/components/page/account/profile/components/histories";

// ✅ Interface User được định nghĩa tại chỗ
interface User {
  id: number;
  username: string;
  fullName: string;
  email: string;
  phone: string;
  avatarUrl: string;
}

export default function SimpleProfilePage() {
  const [activePage, setActivePage] = useState("profile");

  const [user, setUser] = useState<User>({
    id: 1,
    username: "nguyen.minh",
    fullName: "Nguyễn Thị Minh",
    email: "nguyenthiminh@gmail.com",
    phone: "0987654321",
    avatarUrl: "https://i.pravatar.cc/300?img=32",
  });

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
    {
      id: 3,
      date: "2025-04-29",
      title: "Luyện phát âm - Bài 3",
      score: 78,
      duration: "4 phút",
    },
  ]);

  const navigate = useNavigate(); // Create navigate function

  const handleLogout = () => {
    // Xóa thông tin người dùng khỏi localStorage (nếu có)
    localStorage.removeItem("user"); // Tùy thuộc vào cách bạn lưu trữ thông tin người dùng

    // Điều hướng về trang home sau khi đăng xuất
    navigate("/home");
  };

  return (
    <div className="min-h-screen bg-[#170a38] text-white pt-4 pb-8 px-4">
      {/* Nút quay lại nằm trước Account Information */}
      <div className="mt-[4rem] sm:mt-[10rem] max-w-screen-lg mx-auto sm:p-2 p-6">
        <div className="flex items-center gap-4 mb-6">
          <button
            onClick={() => navigate("/home")} // Use navigate to go to the homepage
            className="text-white flex items-center gap-2 text-xs"
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
        <div className="text-white text-2xl">Account Information</div>
        <div className="text-white text-sm">
          Manage your personal account and account settings
        </div>
      </div>

      {/* Grid layout: Sidebar và Nội dung */}
      <div className="w-full max-w-screen-lg mt-0 mx-auto grid grid-cols-1 sm:grid-cols-[25%_75%] gap-2 sm:gap-4">
        <div className="md:w-64 flex-shrink-0">
          <SimpleSidebar
            user={user}
            activePage={activePage}
            onPageChange={setActivePage}
            onLogout={handleLogout} // Pass handleLogout here
          />
        </div>

        {/* Nội dung trang con */}
        <div className="flex-1">
          {activePage === "profile" && (
            <SimpleUserInfo
              user={user}
              onUserUpdated={(updatedUser: User) => setUser(updatedUser)}
            />
          )}

          {activePage === "history" && <SimpleHistory items={history} />}
        </div>
      </div>
    </div>
  );
}
