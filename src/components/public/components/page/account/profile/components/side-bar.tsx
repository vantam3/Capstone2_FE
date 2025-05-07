interface SidebarProps {
  user: { avatarUrl: string; username: string };
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
  return (
    <div className="bg-[rgb(50,52,77/var(--tw-bg-opacity,1))] border border-[#2d1c65] rounded-[16px] p-4 shadow-sm">
      {/* User Info */}
      <div className="flex items-center space-x-4 mb-6">
        <img
          src={user.avatarUrl}
          alt="User Avatar"
          className="w-12 h-12 rounded-full"
        />
        <div className="text-white">
          <p className="font-medium">{user.username}</p>
        </div>
      </div>

      {/* Sidebar Menu */}
      <div className="space-y-2">
        <button
          onClick={() => onPageChange("profile")}
          className={`w-full text-left px-4 py-2 text-white flex items-center rounded-[8px] ${
            activePage === "profile" ? "bg-[#4c2e90]" : ""
          } hover:bg-[#4c2e90]`}
        >
          Profile Information
        </button>

        <button
          onClick={() => onPageChange("history")}
          className={`w-full text-left px-4 py-2 text-white flex items-center rounded-[8px] ${
            activePage === "history" ? "bg-[#4c2e90]" : ""
          } hover:bg-[#4c2e90]`}
        >
          Activity History
        </button>

        <button
          onClick={onLogout}
          className="w-full text-left px-4 py-2 text-white bg-red-600 hover:bg-red-700 rounded-[8px]"
        >
          Log out
        </button>
      </div>
    </div>
  );
}
