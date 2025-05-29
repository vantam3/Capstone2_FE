import { useState, useEffect, FormEvent } from "react";
import axios from "axios";

export interface UserProfileData {
  id: number;
  username: string;
  email?: string;
  first_name?: string;
  last_name?: string;
}

interface UserInfoProps {
  user: UserProfileData;
  onUserUpdated: (updatedUser: UserProfileData) => void;
}

export function UserInfo({ user, onUserUpdated }: UserInfoProps) {
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    new_password: "",
    confirm_password: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState<{
    text: string;
    type: "success" | "error";
  } | null>(null);
  const [showPasswordFields, setShowPasswordFields] = useState(false);

  useEffect(() => {
    if (user) {
      setFormData((prev) => ({
        ...prev,
        first_name: user.first_name || "",
        last_name: user.last_name || "",
        email: user.email || "",
      }));
    }
  }, [user]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage(null);

    if (showPasswordFields && formData.new_password !== formData.confirm_password) {
      setMessage({ text: "Passwords do not match.", type: "error" });
      setIsSubmitting(false);
      return;
    }

    if (showPasswordFields && formData.new_password) {
      const passwordValidationRegex = /^(?=.{6,})(?!.*\s)(?!.*<script>)(?!.*(--|SELECT|DROP|DELETE)).*$/i;
      if (!passwordValidationRegex.test(formData.new_password)) {
        setMessage({ text: "Password must be at least 6 characters, not contain spaces or dangerous patterns.", type: "error" });
        setIsSubmitting(false);
        return;
      }
    }

    const token = sessionStorage.getItem("token");
    if (!token) {
      setMessage({ text: "Authentication token not found. Please log in.", type: "error" });
      setIsSubmitting(false);
      return;
    }

    const payload: any = {
      first_name: formData.first_name,
      last_name: formData.last_name,
      email: formData.email,
    };

    if (showPasswordFields && formData.new_password) {
      payload.new_password = formData.new_password;
      payload.confirm_password = formData.confirm_password;
    }

    try {
      const response = await axios.patch(
        `http://localhost:8000/api/profile/update/`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const updatedUserFromAPI: UserProfileData = response.data;
      sessionStorage.setItem("user", JSON.stringify(updatedUserFromAPI));
      onUserUpdated(updatedUserFromAPI);

      setMessage({
        text: "Your profile information has been successfully updated.",
        type: "success",
      });
    } catch (error: any) {
      const errorMsg =
        error.response?.data?.detail ||
        (error.response?.data && typeof error.response.data === "object"
          ? Object.values(error.response.data).flat().join(" ")
          : "Failed to update your profile. Please try again.");
      setMessage({ text: errorMsg, type: "error" });
    } finally {
      setIsSubmitting(false);
    }
  };

  const getUsernameInitial = (username?: string) => {
    return username ? username[0].toUpperCase() : "U";
  };

  return (
    <div className="bg-[#666699] rounded-lg shadow-md p-6 w-full text-white">
      <div className="mb-6">
        <h2 className="text-xl font-bold mb-2">Profile Information</h2>
        <p className="text-sm text-gray-200">
          Update your personal information for username: {user.username}
        </p>
      </div>

      {message && (
        <div
          className={`p-3 mb-4 rounded-md text-sm ${
            message.type === "success"
              ? "bg-green-200 text-green-800 dark:bg-green-700 dark:text-green-100"
              : "bg-red-200 text-red-800 dark:bg-red-700 dark:text-red-100"
          }`}
        >
          {message.text}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="flex flex-col items-center mb-6">
          <div className="w-24 h-24 rounded-full bg-gray-500 text-white flex items-center justify-center text-4xl font-semibold mb-2">
            {getUsernameInitial(user.username)}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-1">
            <label htmlFor="first_name" className="block text-sm font-medium text-gray-200">
              First Name
            </label>
            <input
              id="first_name"
              name="first_name"
              value={formData.first_name}
              onChange={handleInputChange}
              placeholder="Enter your first name"
              className="w-full px-3 py-2 border border-gray-400 dark:border-gray-500 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#8888aa] focus:border-[#8888aa] bg-[#555588] dark:bg-gray-700 text-white"
            />
          </div>

          <div className="space-y-1">
            <label htmlFor="last_name" className="block text-sm font-medium text-gray-200">
              Last Name
            </label>
            <input
              id="last_name"
              name="last_name"
              value={formData.last_name}
              onChange={handleInputChange}
              placeholder="Enter your last name"
              className="w-full px-3 py-2 border border-gray-400 dark:border-gray-500 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#8888aa] focus:border-[#8888aa] bg-[#555588] dark:bg-gray-700 text-white"
            />
          </div>
        </div>

        <div className="space-y-1">
          <label htmlFor="email" className="block text-sm font-medium text-gray-200">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleInputChange}
            placeholder="email@example.com"
            className="w-full px-3 py-2 border border-gray-400 dark:border-gray-500 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#8888aa] focus:border-[#8888aa] bg-[#555588] dark:bg-gray-700 text-white"
          />
        </div>

        <div className="pt-4">
          <button
            type="button"
            onClick={() => setShowPasswordFields((prev) => !prev)}
            className="text-sm text-blue-300 hover:underline"
          >
            {showPasswordFields ? "Cancel Password Change" : "Change Password"}
          </button>
        </div>

        {showPasswordFields && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-1">
              <label htmlFor="new_password" className="block text-sm font-medium text-gray-200">
                New Password
              </label>
              <input
                id="new_password"
                name="new_password"
                type="password"
                value={formData.new_password}
                onChange={handleInputChange}
                placeholder="New password"
                className="w-full px-3 py-2 border border-gray-400 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#8888aa] bg-[#555588] text-white"
              />
            </div>

            <div className="space-y-1">
              <label htmlFor="confirm_password" className="block text-sm font-medium text-gray-200">
                Confirm Password
              </label>
              <input
                id="confirm_password"
                name="confirm_password"
                type="password"
                value={formData.confirm_password}
                onChange={handleInputChange}
                placeholder="Repeat new password"
                className="w-full px-3 py-2 border border-gray-400 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#8888aa] bg-[#555588] text-white"
              />
            </div>
          </div>
        )}

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-[#444466] hover:bg-[#333355] text-white font-medium py-2.5 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#777799] disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {isSubmitting ? "Updating..." : "Update Information"}
        </button>
      </form>
    </div>
  );
}