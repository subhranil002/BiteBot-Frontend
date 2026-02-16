import { useRef } from "react";
import { useForm } from "react-hook-form";
import { AiOutlineClose } from "react-icons/ai";
import { FaLock, FaSave, FaKey } from "react-icons/fa";
import { useDispatch } from "react-redux";
// import { changePassword } from "../../redux/slices/authSlice";

export default function ChangePasswordDialog() {
  const dlgRef = useRef(null);
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { isSubmitting, errors, isDirty },
  } = useForm({
    mode: "onChange",
    defaultValues: {
      oldPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  const newPassword = watch("newPassword");

  const onSubmit = async (data) => {
    try {
      // await dispatch(changePassword(data));
      console.log("Password Data:", data);
      dlgRef.current?.close();
      reset();
    } catch (err) {
      console.error("Password change failed:", err);
    }
  };

  const inputClasses = (error) => `
    input input-bordered w-full bg-gray-50 focus:bg-white 
    border-gray-200 focus:border-orange-400 focus:ring-4 
    focus:ring-orange-100/50 rounded-xl transition-all
    ${error ? "border-red-500 focus:border-red-500 focus:ring-red-100" : ""}
  `;

  return (
    <dialog
      id="change-password"
      ref={dlgRef}
      className="modal backdrop-blur-sm"
    >
      <div className="modal-box w-full max-w-md bg-white shadow-2xl border border-orange-100 rounded-3xl p-0 overflow-hidden">
        
        {/* Header */}
        <div className="bg-linear-to-r from-orange-50 to-amber-50 px-6 py-4 border-b border-orange-100 flex items-center justify-between">
          <h3 className="font-bold text-xl text-gray-800 flex items-center gap-2">
            <FaLock className="text-orange-500" />
            Security
          </h3>
          <button
            type="button"
            className="btn btn-sm btn-circle btn-ghost text-gray-500 hover:bg-orange-100 hover:text-orange-600"
            onClick={() => {
              reset();
              dlgRef.current?.close();
            }}
          >
            <AiOutlineClose className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 sm:p-8">
          <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
            
            <p className="text-sm text-gray-500 mb-2">
              Ensure your account is using a long, random password to stay secure.
            </p>

            {/* Old Password */}
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text font-bold text-gray-700">Current Password</span>
              </label>
              <div className="relative">
                <input
                  type="password"
                  className={inputClasses(errors.oldPassword)}
                  placeholder="••••••••"
                  {...register("oldPassword", { required: "Current password is required" })}
                />
              </div>
              {errors.oldPassword && (
                <span className="text-red-500 text-xs mt-1">{errors.oldPassword.message}</span>
              )}
            </div>

            <div className="divider opacity-50"></div>

            {/* New Password */}
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text font-bold text-gray-700">New Password</span>
              </label>
              <input
                type="password"
                className={inputClasses(errors.newPassword)}
                placeholder="••••••••"
                {...register("newPassword", {
                  required: "New password is required",
                  minLength: { value: 8, message: "Must be at least 8 characters" },
                })}
              />
              {errors.newPassword && (
                <span className="text-red-500 text-xs mt-1">{errors.newPassword.message}</span>
              )}
            </div>

            {/* Confirm Password */}
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text font-bold text-gray-700">Confirm New Password</span>
              </label>
              <input
                type="password"
                className={inputClasses(errors.confirmPassword)}
                placeholder="••••••••"
                {...register("confirmPassword", {
                  required: "Please confirm your password",
                  validate: (value) => value === newPassword || "Passwords do not match",
                })}
              />
              {errors.confirmPassword && (
                <span className="text-red-500 text-xs mt-1">{errors.confirmPassword.message}</span>
              )}
            </div>

            {/* Footer Actions */}
            <div className="flex items-center justify-end gap-3 pt-6 border-t border-orange-50 mt-4">
              <button
                type="button"
                className="btn btn-ghost hover:bg-gray-100 rounded-xl"
                onClick={() => {
                  reset();
                  dlgRef.current?.close();
                }}
              >
                Cancel
              </button>

              <button
                type="submit"
                disabled={!isDirty || isSubmitting}
                className={`btn border-none text-white shadow-lg transition-all rounded-xl gap-2 px-8
                  ${!isDirty || isSubmitting
                    ? "bg-gray-300 cursor-not-allowed text-gray-500 shadow-none"
                    : "bg-linear-to-r from-orange-500 to-red-500 hover:shadow-orange-200 hover:-translate-y-0.5"
                  }`}
              >
                {isSubmitting ? (
                  <span className="loading loading-spinner loading-sm"></span>
                ) : (
                  <FaKey className="text-sm" />
                )}
                Update Password
              </button>
            </div>
          </form>
        </div>
      </div>
    </dialog>
  );
}