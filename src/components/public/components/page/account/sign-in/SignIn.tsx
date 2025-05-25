import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";

// No longer importing useAuth
// import { useAuth } from "@/context/AuthContext";

const schema = yup.object({
  username: yup.string().required("Username is required"),
  password: yup.string().required("Password is required").min(6, "Password must be at least 6 characters"),
});

const SignIn = ({ setActiveTab }: any) => {
  // const { login } = useAuth(); // Removed AuthContext
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState(""); // Added for success notification

  const onSubmit = async (data: any) => {
    setErrorMessage(""); // Clear previous messages
    setSuccessMessage(""); // Clear previous messages
    try {
      const response = await axios.post("http://localhost:8000/login/", data); //
      localStorage.setItem("token", response.data.token); //
      localStorage.setItem("user", JSON.stringify(response.data.user)); // Store user data in localStorage

      // login(response.data.user); // Removed AuthContext usage
      setSuccessMessage("Login successful! Redirecting...");

      // Adding a small delay for the user to see the success message
      setTimeout(() => {
        if (response.data.user.is_superuser) { //
          navigate("/admin"); //
        } else {
          navigate("/"); //
        }
      }, 1000); // 1 second delay

    } catch (err: any) {
      setSuccessMessage(""); // Clear success message on error
      setErrorMessage(err.response?.data?.message || "Login failed. Please check your credentials."); //
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="p-4">
      <div>
        <label
          htmlFor="username"
          className="block text-sm font-medium text-gray-700"
        >
          Username
        </label>
        <input
          id="username"
          {...register("username")}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-[#8861ea] focus:border-[#8861ea] sm:text-sm"
          placeholder="Enter your username"
        />
        <p className="text-red-500 text-xs mt-1">{errors.username?.message}</p>
      </div>

      <div className="mt-4">
        <label
          htmlFor="password"
          className="block text-sm font-medium text-gray-700"
        >
          Password
        </label>
        <input
          id="password"
          {...register("password")}
          type="password"
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-[#8861ea] focus:border-[#8861ea] sm:text-sm"
          placeholder="Enter your password"
        />
        <p className="text-red-500 text-xs mt-1">{errors.password?.message}</p>
      </div>

      {errorMessage && (
        <p className="text-red-500 mt-3 text-sm bg-red-100 p-2 rounded-md">
          {errorMessage}
        </p>
      )}

      {successMessage && (
        <p className="text-green-500 mt-3 text-sm bg-green-100 p-2 rounded-md">
          {successMessage}
        </p>
      )}

      <button
        type="submit"
        className="w-full bg-[#8861ea] text-white px-4 py-2 rounded-md mt-6 hover:bg-[#714fcf] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#8861ea]"
      >
        Sign In
      </button>
    </form>
  );
};

export default SignIn;