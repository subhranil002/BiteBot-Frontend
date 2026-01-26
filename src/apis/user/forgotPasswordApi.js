import toast from "react-hot-toast";

import axiosInstance from "../../configs/axiosConfig";

export default async function forgotPasswordApi(data) {
  const res = axiosInstance.post("/user/forget-password", data);
  toast.promise(res, {
    loading: "Sending password reset email...",
    success: (data) => {
      return data?.data?.message;
    },
    error: (err) => {
      return err?.response?.data?.message;
    },
  });

  return (await res).data;
}
