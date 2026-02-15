import toast from "react-hot-toast";

import axiosInstance from "../../configs/axiosConfig";

export default async function favouriteToggleApi(id) {
  const res = axiosInstance.get(`/recipes/like/${id}`);
  toast.promise(res, {
    loading: "Updating favourite status...",
    success: (data) => {
      return data?.data?.message;
    },
    error: (err) => {
      return err?.response?.data?.message;
    },
  });

  return (await res).data;
}
