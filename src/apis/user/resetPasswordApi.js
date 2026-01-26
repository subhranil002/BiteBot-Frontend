import toast from "react-hot-toast";

import axiosInstance from "../../configs/axiosConfig";

export default async function resetPasswordApi(data) {
  const res = axiosInstance.post("/user/reset-password", data);
  toast.promise(res, {
    loading: "Resetting password...",
    success: (data) => {
      return data?.data?.message;
    },
    error: (err) => {
      return err?.response?.data?.message;
    },
  });

  return (await res).data;
}
