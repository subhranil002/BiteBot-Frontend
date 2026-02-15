import toast from "react-hot-toast";

import axiosInstance from "../../configs/axiosConfig";

export default async function getRecipeByIdApi(id) {
  const res = axiosInstance.get(`/recipes/${id}`);

  toast.promise(res, {
    loading: "Loading recipe...",
    success: (data) => {
      return data?.data?.message;
    },
    error: (err) => {
      return err?.response?.data?.message;
    },
  });

  return (await res).data;
}
