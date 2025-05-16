import { useState, useEffect } from "react";
import axios from "axios";
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
  userId: number;
  onUserUpdated: (updatedUser: User) => void;
}

export function SimpleUserInfo({ userId, onUserUpdated }: SimpleUserInfoProps) {
  const [formData, setFormData] = useState<User | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState<{
    text: string;
    type: "success" | "error";
  } | null>(null);

  useEffect(() => {
    axios.get(`http://127.0.0.1:8000/users/${userId}/`)
      .then((res) => setFormData(res.data))
      .catch(() =>
        setMessage({ text: "Failed to load user info", type: "error" })
      );
  }, [userId]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (!formData) return;
    setFormData(prev => ({ ...prev!, [name]: value }));
  };

  const handleAvatarChange = (dataUrl: string) => {
    if (!formData) return;
    setFormData(prev => ({ ...prev!, avatarUrl: dataUrl }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData) return;

    setIsSubmitting(true);
    setMessage(null);

    try {
      const res = await axios.put(
        `http://127.0.0.1:8000/api/users/update/${userId}/`,
        formData
      );
      onUserUpdated(res.data);
      setMessage({
        text: "Profile updated successfully!",
        type: "success",
      });
    } catch (err) {
      setMessage({
        text: "Failed to update your profile.",
        type: "error",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!formData) return <p className="text-white">Loading...</p>;

  return (
    <div className="bg-[#666699] rounded-lg shadow-md p-6 w-full text-white">
      <div className="mb-6">
        <h2 className="text-xl font-bold mb-2">Profile Information</h2>
        <p className="text-sm text-gray-200">Update your personal information</p>
      </div>

      {message && (
        <div className={`p-4 mb-6 rounded ${message.type === "success" ? "bg-green-800 text-green-100" : "bg-red-800 text-red-100"}`}>
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
          <p className="text-sm text-gray-200 mt-2">Click to change avatar</p>
        </div>

        <div className="grid grid-cols-1 gap-4">
          <div className="space-y-2">
            <label htmlFor="fullName" className="block text-sm font-medium text-gray-200">Full Name</label>
            <input
              id="fullName"
              name="fullName"
              value={formData.fullName || ""}
              onChange={handleInputChange}
              placeholder="Your full name"
              className="w-full px-3 py-2 border rounded-md dark:bg-gray-700 dark:text-white"
              style={{ backgroundColor: "#666699" }}
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="email" className="block text-sm font-medium text-gray-200">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              value={formData.email || ""}
              onChange={handleInputChange}
              placeholder="email@example.com"
              className="w-full px-3 py-2 border rounded-md dark:bg-gray-700 dark:text-white"
              style={{ backgroundColor: "#666699" }}
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="phone" className="block text-sm font-medium text-gray-200">Phone Number</label>
            <input
              id="phone"
              name="phone"
              value={formData.phone || ""}
              onChange={handleInputChange}
              placeholder="Phone number"
              className="w-full px-3 py-2 border rounded-md dark:bg-gray-700 dark:text-white"
              style={{ backgroundColor: "#666699" }}
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-[#444466] hover:bg-[#555577] text-white font-medium py-2 px-4 rounded-md"
        >
          {isSubmitting ? "Updating..." : "Update Information"}
        </button>
      </form>
    </div>
  );
}
