import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import axios from "axios";

function SignIn({ setActiveTab }: any) {
  const SchemaLogin = yup.object({
    username: yup
      .string()
      .required("Username is required")
      .max(64, "Maximum 64 characters allowed"),
    password: yup
      .string()
      .required("Password is required")
      .min(6, "Password must be at least 6 characters")
      .max(64, "Maximum 64 characters allowed"),
  });
  const defaultValues = { username: "", password: "" };

  const methods = useForm({
    resolver: yupResolver(SchemaLogin),
    defaultValues,
  });

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = methods;

  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string>("");

  const onSubmitForm = async (data: any) => {
    setIsLoading(true);
    setErrorMessage(""); // Reset error message on new submission

    try {
      // Send login request to API
      const response = await axios.post("http://localhost:8000/login/", {
        username: data.username,
        password: data.password,
      });

      // Save token to localStorage
      localStorage.setItem("token", response.data.token);
      
      // Save user info if needed
      localStorage.setItem("user", JSON.stringify(response.data.user));

      // Redirect user to dashboard
      alert("Login successful!");
      window.location.href = "/dashboard";
    } catch (error: any) {
      const errorMsg = error.response?.data?.message || "Login failed. Please try again.";
      setErrorMessage(errorMsg);
    } finally {
      setIsLoading(false);
    }
  };

  const handleForgotPassword = () => {
    // Implement forgot password functionality here
    // For example, redirect to forgot password page or show a modal
    alert("Forgot password functionality will be implemented soon.");
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmitForm)} className="sm:p-0 p-4">
        <div className="mb-5">
          <label className="block mb-2 text-sm font-medium text-white">
            Username
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
              <svg
                className="w-4 h-4 text-gray-500 dark:text-gray-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 20 16"
              >
                <path d="m10.036 8.278 9.258-7.79A1.979 1.979 0 0 0 18 0H2A1.987 1.987 0 0 0 .641.541l9.395 7.737Z" />
                <path d="M11.241 9.817c-.36.275-.801.425-1.255.427-.428 0-.845-.138-1.187-.395L0 2.6V14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2.5l-8.759 7.317Z" />
              </svg>
            </div>
            <input
              {...register("username")}
              type="text"
              name="username"
              className="bg-[#010005] border placeholder:text-white border-[#4b2f8d] text-white focus:border-[#4b2f8d] focus:ring-[#4b2f8d] text-sm rounded-lg block w-full ps-10 p-2.5"
              placeholder="Enter your username"
            />
          </div>
          <p className="text-xs text-red-600 mt-2">
            {errors.username?.message}
          </p>
        </div>

        <div className="mb-5">
          <label className="block mb-2 text-sm font-medium text-white">
            Password
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
              <svg
                className="w-4 h-4 text-gray-500 dark:text-gray-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 20 16"
              >
                <path d="m10.036 8.278 9.258-7.79A1.979 1.979 0 0 0 18 0H2A1.987 1.987 0 0 0 .641.541l9.395 7.737Z" />
                <path d="M11.241 9.817c-.36.275-.801.425-1.255.427-.428 0-.845-.138-1.187-.395L0 2.6V14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2.5l-8.759 7.317Z" />
              </svg>
            </div>
            <input
              {...register("password")}
              type="password"
              name="password"
              className="bg-[#010005] border placeholder:text-white border-[#4b2f8d] text-white focus:border-[#4b2f8d] focus:ring-[#4b2f8d] text-sm rounded-lg block w-full ps-10 p-2.5"
              placeholder="Enter your password"
            />
          </div>
          <p className="text-xs text-red-600 mt-2">
            {errors.password?.message}
          </p>
        </div>

        <div 
          className="text-right text-sm text-[#8861ea] cursor-pointer hover:underline"
          onClick={handleForgotPassword}
        >
          Forgot password?
        </div>

        {errorMessage && (
          <div className="mb-4 mt-2 text-red-600 text-sm">{errorMessage}</div>
        )}

        <button
          disabled={isLoading}
          type="submit"
          className="text-white mt-4 disabled:bg-gray-300 disabled:cursor-not-allowed cursor-pointer w-full bg-[#8861ea] hover:bg-[#8861ea] focus:ring-4 focus:outline-none focus:ring-[#8861ea] font-medium rounded-lg text-sm px-5 py-2.5 text-center"
        >
          Sign In
          {isLoading && (
            <svg
              aria-hidden="true"
              role="status"
              className="inline w-4 h-4 me-3 text-white animate-spin ml-2"
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="#E5E7EB"
              />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentColor"
              />
            </svg>
          )}
        </button>

        <div className="flex items-center text-center justify-center px-2 py-4">
          <div className="text-center text-sm text-white">
            Don't have an account?
          </div>
          <div
            className="text-center text-sm text-[#8861ea] cursor-pointer hover:underline ml-1"
            onClick={() => setActiveTab("register")}
          >
            Create one now
          </div>
        </div>
        <div className="text-center mx-auto text-xs w-[22rem] bg-[#291652] rounded-[8px] py-1 text-white">
          By signing in, you agree to our Terms and Privacy Policy
        </div>
      </form>
    </>
  );
}

export default SignIn;