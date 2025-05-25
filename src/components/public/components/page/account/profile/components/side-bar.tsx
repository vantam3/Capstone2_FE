// src/components/SimpleSidebar.tsx

// Giả sử UserProfileData được định nghĩa ở một file dùng chung và được import
// Hoặc bạn có thể định nghĩa lại ở đây nếu nó chỉ dùng cho các component này:
export interface UserProfileData {
  id: number;
  username: string;
  email?: string;
  first_name?: string;
  last_name?: string;
}

interface SidebarProps {
  user: UserProfileData; // <-- Cập nhật kiểu dữ liệu cho user
  activePage: string;
  onPageChange: (page: string) => void;
  onLogout: () => void;
}

export function SimpleSidebar({
  user,
  activePage,
  onPageChange,
  onLogout,
}: SidebarProps) {
  const getUsernameInitial = (username?: string): string => {
    return username ? username[0].toUpperCase() : "U";
  };

  const getDisplayName = (currentUser: UserProfileData): string => {
    if (currentUser.first_name && currentUser.last_name) {
      return `${currentUser.first_name} ${currentUser.last_name}`;
    }
    return currentUser.username || "User";
  };

  return (
    <div className="bg-[rgb(50,52,77/var(--tw-bg-opacity,1))] border border-[#2d1c65] rounded-[16px] p-4 shadow-sm">
      {/* User Info */}
      <div className="flex items-center space-x-4 mb-6">
        {/* Avatar hiển thị chữ cái đầu */}
        <div className="w-12 h-12 rounded-full bg-gray-500 text-white flex items-center justify-center text-xl font-semibold">
          {getUsernameInitial(user.username)}
        </div>
        <div className="text-white">
          {/* Hiển thị tên đầy đủ */}
          <p className="font-medium">{getDisplayName(user)}</p>
          {/* Bạn có thể thêm username ở dòng dưới nếu muốn, ví dụ:
          <p className="text-sm text-gray-400">@{user.username}</p> 
          */}
        </div>
      </div>

      {/* Sidebar Menu */}
      <div className="space-y-2">
        <button
          onClick={() => onPageChange("profile")}
          className={`w-full text-left px-4 py-2.5 text-sm font-medium text-white flex items-center rounded-[8px] transition-colors duration-150 ${ // Tăng padding và thêm transition
            activePage === "profile"
              ? "bg-[#4c2e90]"
              : "hover:bg-[#43287d]" // Thêm hover state cho nút không active
          }`}
        >
          Profile Information
        </button>

        <button
          onClick={() => onPageChange("history")}
          className={`w-full text-left px-4 py-2.5 text-sm font-medium text-white flex items-center rounded-[8px] transition-colors duration-150 ${
            activePage === "history"
              ? "bg-[#4c2e90]"
              : "hover:bg-[#43287d]"
          }`}
        >
          Activity History
        </button>

        {/* Nút Logout đã gọi onLogout từ props */}
        <button
          onClick={onLogout}
          className="w-full text-left px-4 py-2.5 text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded-[8px] transition-colors duration-150"
        >
          Log out
        </button>
      </div>
    </div>
  );
}