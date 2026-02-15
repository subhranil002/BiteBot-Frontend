import toast from "react-hot-toast";

import axiosInstance from "../../configs/axiosConfig";

export default async function getUserByIdApi(id) {
  const res = await axiosInstance.get(`/user/${id}`);

  if (!res.data.success) {
    toast.error(res?.response?.data?.message);
  }

  return res.data;
}
