import toast from "react-hot-toast";

import axiosInstance from "../../configs/axiosConfig";

export default async function loginApi(data) {
  const res = axiosInstance.post("/user/login", data);
  toast.promise(res, {
    loading: "Logging in...",
    success: (data) => {
      return data?.data?.message;
    },
    error: (err) => {
      return err?.response?.data?.message;
    },
  });

  return (await res).data;
}
