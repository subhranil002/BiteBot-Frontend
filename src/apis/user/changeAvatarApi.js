import toast from "react-hot-toast";

import axiosInstance from "../../configs/axiosConfig";

export default async function changeAvatarApi(avatar) {
  const res = axiosInstance.post("user/change-avatar", avatar);
  toast.promise(res, {
    loading: "Uploading avatar...",
    success: (data) => {
      return data?.data?.message;
    },
    error: (err) => {
      return err?.response?.data?.message;
    },
  });

  return (await res).data;
}
