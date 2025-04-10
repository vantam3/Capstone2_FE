import { yupResolver } from "@hookform/resolvers/yup";
import React, { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";

function Infomation() {
  const schemaRequest = yup.object({
    firstName: yup.string().required("First name is required"),
    lastName: yup.string().required("Last name is required"),
    email: yup
      .string()
      .required("Last name is required")
      .email("Please enter correct email format"),
    userName: yup.string().required("User name is required"),
  });

  const defaultValues = {
    firstName: "",
    lastName: "",
    email: "",
    userName: "",
  };

  const methods = useForm({
    resolver: yupResolver(schemaRequest),
    defaultValues,
  });

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = methods;

  const fileInputRef = useRef(null);
  const [image, setImage] = useState(null);

  const handleClick = () => {
    fileInputRef.current.value = "";
    fileInputRef.current.click();
  };

  const handleUploadfile = (e) => {
    if (e.target.files.length > 0) {
      const file = e.target.files[0];
      const imageUrl = URL.createObjectURL(file);
      setImage(imageUrl);
    }
  };

  const onSubmitForm = () => {};

  return (
    <div className="w-full bg-[#170a38] border border-[#2d1c65] rounded-[16px] shadow-sm p-4">
      <p className="text-white text-2xl font-bold">Personal information</p>
      <p className="text-white text-sm mt-1">Update your profile information</p>
      <form onSubmit={handleSubmit(onSubmitForm)} className="mt-8">
        <div className="grid gap-6 mb-6 md:grid-cols-2">
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Fist name
            </label>
            <input
              {...register("firstName")}
              type="text"
              className="bg-[#010005] border placeholder:text-white border-[#4b2f8d] text-white focus:border-[#4b2f8d] focus:ring-[#4b2f8d] text-sm rounded-lg block w-full p-2.5"
              placeholder="John"
            />
            <p className="text-red-600 text-xs mt-1">
              {errors.firstName?.message}
            </p>
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Last name
            </label>
            <input
              {...register("lastName")}
              type="text"
              className="bg-[#010005] border placeholder:text-white border-[#4b2f8d] text-white focus:border-[#4b2f8d] focus:ring-[#4b2f8d] text-sm rounded-lg block w-full p-2.5"
              placeholder="Doe"
            />
            <p className="text-red-600 text-xs mt-1">
              {errors.lastName?.message}
            </p>
          </div>
        </div>
        <div className="mb-6">
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Email address
          </label>
          <input
            {...register("email")}
            type="text"
            className="bg-[#010005] border placeholder:text-white border-[#4b2f8d] text-white focus:border-[#4b2f8d] focus:ring-[#4b2f8d] text-sm rounded-lg block w-full p-2.5"
            placeholder="john.doe@company.com"
          />
          <p className="text-white mt-1 text-xs">
            This email will be used for contact and account verification.
          </p>
          <p className="text-red-600 text-xs mt-1">{errors.email?.message}</p>
        </div>
        <div className="mb-6">
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            User name
          </label>
          <input
            {...register("userName")}
            type="text"
            className="bg-[#010005] border placeholder:text-white border-[#4b2f8d] text-white focus:border-[#4b2f8d] focus:ring-[#4b2f8d] text-sm rounded-lg block w-full p-2.5"
            placeholder=""
          />
          <p className="mt-1 text-white text-xs">
            This username will be displayed publicly on your profile and
            leaderboards.
          </p>
          <p className="text-red-600 text-xs mt-1">
            {errors.userName?.message}
          </p>
        </div>
        <div className="mb-6">
          <label className="block mb-2 text-sm font-medium text-white">
            Avatar
          </label>
          <div className="flex items-center gap-4">
            <div
              className="bg-[#372267] rounded-full w-10 h-10 flex items-center justify-center cursor-pointer"
              onClick={handleClick}
            >
              {image && (
                <img
                  src={image}
                  alt="Uploaded"
                  className="rounded-full w-full h-full shadow-lg"
                />
              )}
            </div>
            <input
              type="file"
              ref={fileInputRef}
              className="hidden"
              onChange={(e) => handleUploadfile(e)}
            />
            <input
              type="text"
              className="bg-[#010005] border placeholder:text-white border-[#4b2f8d] text-white focus:border-[#4b2f8d] focus:ring-[#4b2f8d] text-sm rounded-lg block w-full p-2.5"
              placeholder="Avatar URL"
            />
          </div>
          <p className="text-white text-xs mt-1">
            Enter an image URL or upload an image to update your profile picture
          </p>
        </div>
        <div className="text-right">
          <button
            type="submit"
            className="text-white cursor-pointer bg-[#8a61eb] hover:bg-[#8a61eb] font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
          >
            Save changes
          </button>
        </div>
      </form>
    </div>
  );
}

export default Infomation;
