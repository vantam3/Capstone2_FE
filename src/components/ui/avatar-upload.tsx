import { useState, useRef } from "react";

interface AvatarUploadProps {
  avatarUrl?: string;
  name?: string;
  size?: "sm" | "md" | "lg" | "xl";
  onAvatarChange?: (dataUrl: string) => void;
}

export function SimpleAvatarUpload({
  avatarUrl,
  name = "",
  size = "md",
  onAvatarChange,
}: AvatarUploadProps) {
  const [previewUrl, setPreviewUrl] = useState<string | undefined>(avatarUrl);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Size classes
  const sizeMap = {
    sm: { avatar: "h-10 w-10", text: "text-xs" },
    md: { avatar: "h-16 w-16", text: "text-sm" },
    lg: { avatar: "h-24 w-24", text: "text-base" },
    xl: { avatar: "h-32 w-32", text: "text-lg" },
  };

  // Sử dụng hàm từ simple-utils thay vì tự định nghĩa
  const getInitials = (name: string): string => {
    if (!name) return "?";

    // Lấy chữ cái đầu tiên của mỗi từ, tối đa 2 chữ
    const initials = name
      .trim()
      .split(/\s+/)
      .filter((word) => word.length > 0)
      .map((word) => word[0])
      .join("")
      .toUpperCase()
      .substring(0, 2);

    return initials || "?";
  };

  // Handle file selection
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      // Kiểm tra file hình ảnh
      if (!file.type.startsWith("image/")) {
        alert("Vui lòng chọn một file hình ảnh");
        return;
      }

      // Kiểm tra kích thước file
      if (file.size > 2 * 1024 * 1024) {
        alert("Kích thước file không được vượt quá 2MB");
        return;
      }

      const reader = new FileReader();
      reader.onload = (event) => {
        try {
          const dataUrl = event.target?.result as string;
          if (dataUrl) {
            setPreviewUrl(dataUrl);

            if (onAvatarChange) {
              onAvatarChange(dataUrl);
            }
          }
        } catch (err) {
          console.error("Lỗi khi đọc file:", err);
          alert("Không thể tải ảnh lên. Vui lòng thử lại với ảnh khác.");
        }
      };

      reader.onerror = () => {
        alert("Có lỗi khi đọc file. Vui lòng thử lại.");
      };

      reader.readAsDataURL(file);
    } catch (err) {
      console.error("Lỗi xử lý file:", err);
      alert("Không thể xử lý file. Vui lòng thử lại.");
    }
  };

  // Open file dialog
  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="flex flex-col items-center">
      <div
        className={`${sizeMap[size].avatar} rounded-full border-2 border-purple-500 overflow-hidden relative cursor-pointer bg-gray-800`}
        onClick={handleButtonClick}
      >
        {previewUrl ? (
          <img
            src={previewUrl}
            alt={name}
            className="w-full h-full object-cover"
          />
        ) : (
          <div
            className={`w-full h-full flex items-center justify-center bg-purple-800 ${sizeMap[size].text} text-white font-semibold`}
          >
            {getInitials(name)}
          </div>
        )}
      </div>

      <button
        onClick={handleButtonClick}
        className="mt-4 px-3 py-1.5 text-sm rounded bg-purple-600 hover:bg-purple-700 text-white flex items-center justify-center"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="mr-2"
        >
          <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"></path>
          <circle cx="12" cy="13" r="4"></circle>
        </svg>
        Thay đổi ảnh
      </button>

      <input
        type="file"
        ref={fileInputRef}
        className="hidden"
        accept="image/*"
        onChange={handleFileChange}
      />
    </div>
  );
}
