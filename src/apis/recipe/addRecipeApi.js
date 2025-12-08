import toast from "react-hot-toast";

import axiosInstance from "../../configs/axiosConfig";

export default async function addRecipeApi(data) {
  const res = axiosInstance.post("/recipes/", data);
  toast.promise(res, {
    loading: "Adding recipe...",
    success: (data) => {
      return data?.data?.message;
    },
  });

  return (await res).data;
}
