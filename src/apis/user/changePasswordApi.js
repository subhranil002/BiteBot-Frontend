import toast from "react-hot-toast";

import axiosInstance from "../../configs/axiosConfig";

export default async function changePasswordApi(data) {
  const res = axiosInstance.put("/user/change-password", data);
  toast.promise(res, {
    loading: "Updating password...",
    success: (data) => {
      return data?.data?.message;
    },
    error: (err) => {
      return err?.response?.data?.message;
    },
  });

  return (await res).data;
}
