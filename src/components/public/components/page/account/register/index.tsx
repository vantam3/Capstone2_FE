import { yupResolver } from "@hookform/resolvers/yup";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import axios from "axios";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { CheckCircleIcon } from "@heroicons/react/24/outline";

function Register({ setActiveTab }: any) {
  const RegisterSchema = yup.object({
    username: yup.string().required("Username is required"),
    email: yup
      .string()
      .required("Email is required")
      .email("Please enter correct email format")
      .max(64, "Maximum 64 characters allowed"),
    password: yup
      .string()
      .required("Password is required")
      .min(6, "Password must be at least 6 characters")
      .max(64, "Maximum 64 characters allowed"),
    confirm_password: yup
      .string()
      .oneOf([yup.ref("password")], "Passwords must match")
      .required("Confirm Password is required"),
  });

  const defaultValues = {
    username: "",
    email: "",
    password: "",
    confirm_password: "",
  };

  const methods = useForm({
    resolver: yupResolver(RegisterSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = methods;

  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successOpen, setSuccessOpen] = useState(false);

  useEffect(() => {
    if (successOpen) {
      const timer = setTimeout(() => {
        setSuccessOpen(false);
        setActiveTab("sign-in");
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [successOpen]);

  const onSubmitForm = async (data: any) => {
    setIsLoading(true);
    setErrorMessage("");

    try {
      const response = await axios.post("http://localhost:8000/register/", {
        username: data.username,
        email: data.email,
        password: data.password,
        confirm_password: data.confirm_password,
      });

      setSuccessOpen(true); // mở dialog thành công

    } catch (error: any) {
      const errorMsg =
        error.response?.data?.error || "Registration failed. Please try again.";
      setErrorMessage(errorMsg);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmitForm)} className="sm:p-0 p-4">
        {/* Username */}
        <div className="mb-5">
          <label className="block mb-2 text-sm font-medium text-white">
            Username
          </label>
          <input
            {...register("username")}
            type="text"
            className="bg-[#010005] border placeholder:text-white border-[#4b2f8d] text-white text-sm rounded-lg block w-full p-2.5"
            placeholder="Choose a username"
          />
          <p className="text-red-600 mt-2 text-xs">{errors.username?.message}</p>
        </div>

        {/* Email */}
        <div className="mb-5">
          <label className="block mb-2 text-sm font-medium text-white">
            Email
          </label>
          <input
            {...register("email")}
            type="text"
            className="bg-[#010005] border placeholder:text-white border-[#4b2f8d] text-white text-sm rounded-lg block w-full p-2.5"
            placeholder="Enter your email address"
          />
          <p className="text-red-600 mt-2 text-xs">{errors.email?.message}</p>
        </div>

        {/* Password */}
        <div className="mb-5">
          <label className="block mb-2 text-sm font-medium text-white">
            Password
          </label>
          <input
            {...register("password")}
            type="password"
            className="bg-[#010005] border placeholder:text-white border-[#4b2f8d] text-white text-sm rounded-lg block w-full p-2.5"
            placeholder="Create a password"
          />
          <p className="text-red-600 mt-2 text-xs">{errors.password?.message}</p>
        </div>

        {/* Confirm Password */}
        <div className="mb-5">
          <label className="block mb-2 text-sm font-medium text-white">
            Confirm Password
          </label>
          <input
            {...register("confirm_password")}
            type="password"
            className="bg-[#010005] border placeholder:text-white border-[#4b2f8d] text-white text-sm rounded-lg block w-full p-2.5"
            placeholder="Confirm your password"
          />
          <p className="text-red-600 mt-2 text-xs">{errors.confirm_password?.message}</p>
        </div>

        {/* Error */}
        {errorMessage && (
          <div className="mb-4 text-red-600 text-sm">{errorMessage}</div>
        )}

        {/* Submit Button */}
        <button
          disabled={isLoading}
          type="submit"
          className="text-white mt-4 disabled:bg-gray-300 disabled:cursor-not-allowed cursor-pointer w-full bg-[#8861ea] hover:bg-[#6f4ed3] font-medium rounded-lg text-sm px-5 py-2.5 text-center"
        >
          Create account
          {isLoading && (
            <svg
              aria-hidden="true"
              role="status"
              className="inline w-4 h-4 ml-2 animate-spin"
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M100 50.5908..." fill="#E5E7EB" />
              <path d="M93.9676 39.0409..." fill="currentColor" />
            </svg>
          )}
        </button>

        {/* Sign In Redirect */}
        <div className="flex items-center justify-center px-2 py-4 text-sm text-white">
          Already have an account?
          <span
            className="text-[#8861ea] cursor-pointer hover:underline ml-1"
            onClick={() => setActiveTab("sign-in")}
          >
            Sign in
          </span>
        </div>

        <div className="text-center mx-auto text-xs w-[22rem] bg-[#291652] rounded-[8px] py-1 text-white">
          By signing in, you agree to our Terms and Privacy Policy
        </div>
      </form>

      {/* Success Dialog */}
      <Dialog open={successOpen} onClose={() => {}} className="relative z-50">
        <DialogBackdrop className="fixed inset-0 bg-black/50" />
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <DialogPanel className="w-full max-w-sm rounded-xl bg-white p-6 text-center shadow-xl">
            <div className="flex justify-center mb-4">
              <CheckCircleIcon className="h-10 w-10 text-green-500" />
            </div>
            <DialogTitle className="text-lg font-semibold text-gray-800">
              Registration Successful!
            </DialogTitle>
            <p className="mt-2 text-sm text-gray-600">
              Redirecting to sign-in page...
            </p>
          </DialogPanel>
        </div>
      </Dialog>
    </>
  );
}

export default Register;
