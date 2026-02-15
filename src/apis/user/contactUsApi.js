import toast from "react-hot-toast";

import axiosInstance from "../../configs/axiosConfig";

export default async function contactUsApi(data) {
  const res = axiosInstance.post("/user/contact", data);
  toast.promise(res, {
    loading: "Sending message...",
    success: (data) => {
      return data?.data?.message;
    },
    error: (err) => {
      return err?.response?.data?.message;
    },
  });

  return (await res).data;
}
