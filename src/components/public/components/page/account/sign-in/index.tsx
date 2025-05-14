import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";

const schema = yup.object({
  username: yup.string().required(),
  password: yup.string().required().min(6),
});

const SignIn = ({ setActiveTab }: any) => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const [errorMessage, setErrorMessage] = useState("");

  const onSubmit = async (data: any) => {
    try {
      const response = await axios.post("http://localhost:8000/login/", data);
      localStorage.setItem("token", response.data.token);
      login(response.data.user); // dùng context
      if (response.data.user.is_superuser) {
        navigate("/admin");
      } else {
        navigate("/");
      }
    } catch (err: any) {
      setErrorMessage(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="p-4">
      <div>
        <label>Username</label>
        <input
          {...register("username")}
          className="block w-full border p-2"
          placeholder="Username"
        />
        <p className="text-red-500 text-sm">{errors.username?.message}</p>
      </div>

      <div className="mt-4">
        <label>Password</label>
        <input
          {...register("password")}
          type="password"
          className="block w-full border p-2"
          placeholder="Password"
        />
        <p className="text-red-500 text-sm">{errors.password?.message}</p>
      </div>

      {errorMessage && (
        <p className="text-red-500 mt-2 text-sm">{errorMessage}</p>
      )}

      <button
        type="submit"
        className="bg-[#8861ea] text-white px-4 py-2 rounded mt-4"
      >
        Sign In
      </button>
    </form>
  );
};

export default SignIn;
