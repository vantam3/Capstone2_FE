import { useState } from "react";
import { SimpleAvatarUpload } from "@/components/ui/avatar-upload";

interface User {
  id: number;
  username: string;
  fullName?: string;
  email?: string;
  phone?: string;
  avatarUrl?: string;
}

interface SimpleUserInfoProps {
  user: User;
  onUserUpdated: (updatedUser: User) => void;
}

export function SimpleUserInfo({ user, onUserUpdated }: SimpleUserInfoProps) {
  const [formData, setFormData] = useState({
    fullName: user.fullName || "",
    email: user.email || "",
    phone: user.phone || "",
    avatarUrl: user.avatarUrl || "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState<{
    text: string;
    type: "success" | "error";
  } | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAvatarChange = (dataUrl: string) => {
    setFormData((prev) => ({
      ...prev,
      avatarUrl: dataUrl,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage(null);

    try {
      setTimeout(() => {
        const updatedUser: User = {
          ...user,
          ...formData,
        };
        onUserUpdated(updatedUser);
        setMessage({
          text: "Your profile information has been successfully updated.",
          type: "success",
        });
        setIsSubmitting(false);
      }, 500);
    } catch (error) {
      setMessage({
        text: "Failed to update your profile. Please try again.",
        type: "error",
      });
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-[#666699] rounded-lg shadow-md p-6 w-full text-white">
      <div className="mb-6">
        <h2 className="text-xl font-bold mb-2">Profile Information</h2>
        <p className="text-sm text-gray-200">
          Update your personal information
        </p>
      </div>

      {message && (
        <div
          className={`p-4 mb-6 rounded ${
            message.type === "success"
              ? "bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100"
              : "bg-red-100 text-red-800 dark:bg-red-800 dark:text-red-100"
          }`}
        >
          {message.text}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="flex flex-col items-center mb-6">
          <SimpleAvatarUpload
            avatarUrl={formData.avatarUrl}
            name={formData.fullName}
            size="xl"
            onAvatarChange={handleAvatarChange}
          />
          <p className="text-sm text-gray-200 mt-2">
            Click the image to change your avatar
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4">
          <div className="space-y-2">
            <label
              htmlFor="fullName"
              className="block text-sm font-medium text-gray-200"
            >
              Full Name
            </label>
            <input
              id="fullName"
              name="fullName"
              value={formData.fullName}
              onChange={handleInputChange}
              placeholder="Enter your full name"
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#8888aa] focus:border-[#8888aa] dark:bg-gray-700 dark:text-white"
              style={{ backgroundColor: "#666699" }}
            />
          </div>

          <div className="space-y-2">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-200"
            >
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="email@example.com"
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#8888aa] focus:border-[#8888aa] dark:bg-gray-700 dark:text-white"
              style={{ backgroundColor: "#666699" }}
            />
          </div>

          <div className="space-y-2">
            <label
              htmlFor="phone"
              className="block text-sm font-medium text-gray-200"
            >
              Phone Number
            </label>
            <input
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              placeholder="Enter your phone number"
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#8888aa] focus:border-[#8888aa] dark:bg-gray-700 dark:text-white"
              style={{ backgroundColor: "#666699" }}
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-[#444466] hover:bg-[#555577] text-white font-medium py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#8888aa] disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? "Updating..." : "Updates Information"}
        </button>
      </form>
    </div>
  );
}
