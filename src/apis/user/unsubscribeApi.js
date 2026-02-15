import toast from "react-hot-toast";

import axiosInstance from "../../configs/axiosConfig";

export default async function unsubscribeApi(id) {
  const res = axiosInstance.get(`/user/unsubscribe/${id}`);
  toast.promise(res, {
    loading: "Unsubscribing...",
    success: (data) => {
      return data?.data?.message;
    },
    error: (err) => {
      return err?.response?.data?.message;
    },
  });

  return (await res).data;
}
