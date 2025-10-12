import axiosInstance from "../configs/axiosConfig";

export default async function getProfileApi() {
    const res = axiosInstance.get("/user/me");
    return (await res).data;
}