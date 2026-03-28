import axiosInstance from "../../configs/axiosConfig";

export default async function unlikeRecipeApi(id) {
  const res = await axiosInstance.get(`/recipes/unlike/${id}`);
  return res.data;
}
