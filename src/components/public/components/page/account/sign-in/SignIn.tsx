import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const schema = yup.object({
  username: yup.string().required("Username is required"),
  password: yup
    .string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters")
});

const passwordResetSchema = yup.object({
  newPassword: yup
    .string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters")
    .max(64, "Maximum 64 characters allowed")
    .matches(/^\S*$/, "Password must not contain spaces")
    .test("no-dangerous", "Password contains potentially dangerous input", value => {
      if (!value) return false;
      const blacklist = ["<script>", "SELECT", "INSERT", "DELETE", "UPDATE", "--", "||", "&&"];
      return !blacklist.some(pattern => value.toUpperCase().includes(pattern));
    })
});

const SignIn = ({ setActiveTab }: any) => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema), mode: "onBlur" });

  const resetForm = useForm({ resolver: yupResolver(passwordResetSchema), mode: "onBlur" });
  const {
    register: resetRegister,
    handleSubmit: handleResetSubmit,
    formState: { errors: resetErrors },
  } = resetForm;

  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [confirmationCode, setConfirmationCode] = useState("");
  const [step, setStep] = useState(1);
  const [resetMessage, setResetMessage] = useState("");
  const [showResetSuccess, setShowResetSuccess] = useState(false);

  const onSubmit = async (data: any) => {
    setErrorMessage("");
    setSuccessMessage("");
    try {
      const response = await axios.post("http://localhost:8000/login/", data);
      sessionStorage.setItem("token", response.data.token);
      sessionStorage.setItem("user", JSON.stringify(response.data.user));

      setSuccessMessage("Login successful! Redirecting...");

      setTimeout(() => {
        if (response.data.user.is_superuser) {
          navigate("/admin");
        } else {
          navigate("/");
        }
      }, 1000);
    } catch (err: any) {
      setSuccessMessage("");
      setErrorMessage(err.response?.data?.message || "Login failed. Please check your credentials.");
    }
  };

  const handleForgotPassword = async () => {
    try {
      const res = await axios.post("http://localhost:8000/forgot-password/", { email });
      setResetMessage(res.data.message);
      setStep(2);
    } catch (err: any) {
      setResetMessage(err.response?.data?.error || "Failed to send confirmation code.");
    }
  };

  const onSubmitReset = async (data: any) => {
    try {
      const res = await axios.post("http://localhost:8000/reset-password/", {
        email,
        confirmation_code: confirmationCode,
        new_password: data.newPassword,
      });
      setResetMessage(res.data.message);
      setShowResetSuccess(true);
      setTimeout(() => {
        setStep(1);
        setShowForgotPassword(false);
        setShowResetSuccess(false);
      }, 2500);
    } catch (err: any) {
      setResetMessage(err.response?.data?.error || "Password reset failed.");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="p-4">
      <div>
        <label htmlFor="username" className="block text-sm font-medium text-gray-700">Username</label>
        <input
          id="username"
          {...register("username")}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-[#8861ea] focus:border-[#8861ea] sm:text-sm text-slate-900"
          placeholder="Enter your username"
        />
        <p className="text-red-500 text-xs mt-1">{errors.username?.message}</p>
      </div>

      <div className="mt-4">
        <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
        <input
          id="password"
          {...register("password")}
          type="password"
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-[#8861ea] focus:border-[#8861ea] sm:text-sm text-slate-900"
          placeholder="Enter your password"
        />
        <p className="text-red-500 text-xs mt-1">{errors.password?.message}</p>
      </div>

      {errorMessage && <p className="text-red-500 mt-3 text-sm bg-red-100 p-2 rounded-md">{errorMessage}</p>}
      {successMessage && <p className="text-green-500 mt-3 text-sm bg-green-100 p-2 rounded-md">{successMessage}</p>}

      <button
        type="submit"
        className="w-full bg-[#8861ea] text-white px-4 py-2 rounded-md mt-6 hover:bg-[#714fcf] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#8861ea]"
      >
        Sign In
      </button>

      <div className="text-center mt-4">
        <button type="button" className="text-sm text-blue-400 hover:underline" onClick={() => setShowForgotPassword(!showForgotPassword)}>
          Forgot your password?
        </button>
      </div>

      {showForgotPassword && (
        <div className="mt-6 bg-purple-50 border border-purple-300 p-4 rounded text-slate-800">
          {step === 1 && (
            <>
              <p className="text-sm mb-2">Enter your registered email to receive a confirmation code:</p>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded mb-2"
                placeholder="you@example.com"
              />
              <button
                type="button"
                onClick={handleForgotPassword}
                className="w-full bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
              >
                Send Confirmation Code
              </button>
            </>
          )}
          {step === 2 && (
            <form onSubmit={handleResetSubmit(onSubmitReset)}>
              <p className="text-sm mb-2">Enter the confirmation code sent to your email and set a new password:</p>
              <input
                type="text"
                value={confirmationCode}
                onChange={(e) => setConfirmationCode(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded mb-2"
                placeholder="Confirmation Code"
              />
              <input
                type="password"
                {...resetRegister("newPassword")}
                className="w-full p-2 border border-gray-300 rounded mb-2"
                placeholder="New Password"
              />
              <p className="text-red-500 text-xs mb-2">{resetErrors.newPassword?.message}</p>
              <button
                type="submit"
                className="w-full bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
              >
                Reset Password
              </button>
            </form>
          )}
          {resetMessage && <p className="text-sm mt-2 text-purple-600">{resetMessage}</p>}
          {showResetSuccess && <p className="text-sm mt-2 text-green-600">Password reset successful. Redirecting to sign in...</p>}
        </div>
      )}
    </form>
  );
};

export default SignIn;
