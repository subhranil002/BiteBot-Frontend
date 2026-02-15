import toast from "react-hot-toast";

import axiosInstance from "../../configs/axiosConfig";

export default async function getFavouritesApi() {
  const res = axiosInstance.get("/user/favourites");
  toast.promise(res, {
    loading: "Loading favourites...",
    success: (data) => {
      return data?.data?.message;
    },
    error: (err) => {
      return err?.response?.data?.message;
    },
  });

  return (await res).data;
}
