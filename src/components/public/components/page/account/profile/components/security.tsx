import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";

function Security() {
  const schemaRequest = yup.object({
    currentPassword: yup
      .string()
      .required("Current password is required")
      .min(6, "Password must be at least 6 characters"),
    newPassword: yup
      .string()
      .required("New password is required")
      .min(6, "Password must be at least 6 characters"),
    confirmPassword: yup
      .string()
      .required("Confirm password is required")
      .min(6, "Password must be at least 6 characters"),
  });

  const defaultValues = {
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
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

  const onSubmitForm = () => {};

  return (
    <div className="w-full bg-[#170a38] border border-[#2d1c65] rounded-[16px] shadow-sm p-4">
      <p className="text-white text-2xl font-bold">Change password</p>
      <p className="text-white text-sm mt-1">
        Update your password to protect your account
      </p>
      <form onSubmit={handleSubmit(onSubmitForm)} className="mt-8">
        <div className="mb-6">
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Current password
          </label>
          <input
            {...register("currentPassword")}
            type="password"
            className="bg-[#010005] border placeholder:text-white border-[#4b2f8d] text-white focus:border-[#4b2f8d] focus:ring-[#4b2f8d] text-sm rounded-lg block w-full p-2.5"
            placeholder="********"
          />
          <p className="text-red-600 text-xs mt-1">
            {errors.currentPassword?.message}
          </p>
        </div>
        <div className="mb-6">
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            New password
          </label>
          <input
            {...register("newPassword")}
            type="password"
            className="bg-[#010005] border placeholder:text-white border-[#4b2f8d] text-white focus:border-[#4b2f8d] focus:ring-[#4b2f8d] text-sm rounded-lg block w-full p-2.5"
            placeholder="********"
          />
          <p className="text-red-600 text-xs mt-1">
            {errors.newPassword?.message}
          </p>
        </div>
        <div className="mb-6">
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Confirm new password
          </label>
          <input
            {...register("confirmPassword")}
            type="password"
            className="bg-[#010005] border placeholder:text-white border-[#4b2f8d] text-white focus:border-[#4b2f8d] focus:ring-[#4b2f8d] text-sm rounded-lg block w-full p-2.5"
            placeholder="********"
          />
          <p className="text-red-600 text-xs mt-1">
            {errors.confirmPassword?.message}
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

export default Security;
