import toast from "react-hot-toast";

import axiosInstance from "../../configs/axiosConfig";

export default async function subscribeApi(id) {
  const res = axiosInstance.get(`/user/subscribe/${id}`);
  toast.promise(res, {
    loading: "Subscribing...",
    success: (data) => {
      return data?.data?.message;
    },
    error: (err) => {
      return err?.response?.data?.message;
    },
  });

  return (await res).data;
}
