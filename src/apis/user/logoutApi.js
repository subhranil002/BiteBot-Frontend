import toast from "react-hot-toast";

import axiosInstance from "../../configs/axiosConfig";

export default async function logoutApi() {
    const res = axiosInstance.get("/user/logout");
    toast.promise(res, {
        loading: "Logging out...",
        success: (data) => {
            return data?.data?.message;
        },
    });

    return (await res).data;
}
