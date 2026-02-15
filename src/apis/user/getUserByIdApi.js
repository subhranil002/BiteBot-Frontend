import toast from "react-hot-toast";

import axiosInstance from "../../configs/axiosConfig";

export default async function getUserByIdApi(id) {
  const res = axiosInstance.get(`/user/${id}`);
  toast.promise(res, {
    loading: "Loading profile...",
    success: (data) => {
      return data?.data?.message;
    },
    error: (err) => {
      return err?.response?.data?.message;
    },
  });

  return (await res).data;
}
