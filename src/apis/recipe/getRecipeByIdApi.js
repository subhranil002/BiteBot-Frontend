import toast from "react-hot-toast";

import axiosInstance from "../../configs/axiosConfig";

export default async function getRecipeByIdApi(id) {
  const res = await axiosInstance.get(`/recipes/${id}`);

  if (!res.data.success) {
    toast.error(res?.response?.data?.message);
  }

  return res.data;
}
