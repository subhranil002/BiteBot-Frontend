import toast from "react-hot-toast";

import axiosInstance from "../../configs/axiosConfig";

export default async function registerApi(data) {
  const res = axiosInstance.post("/user/register", data);
  toast.promise(res, {
    loading: "Signing up...",
    success: (data) => {
      return data?.data?.message;
    },
    error: (err) => {
      return err?.response?.data?.message;
    },
  });

  return (await res).data;
}
