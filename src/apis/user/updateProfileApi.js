import toast from "react-hot-toast";

import axiosInstance from "../../configs/axiosConfig";

export default async function updateProfileApi(data) {
    const res = axiosInstance.put("/user/update", data);
    toast.promise(res, {
        loading: "Updating profile...",
        success: (data) => {
            return data?.data?.message;
        },
    });

    return (await res).data;
}
