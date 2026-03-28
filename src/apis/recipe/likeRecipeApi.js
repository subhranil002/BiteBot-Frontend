import axiosInstance from "../../configs/axiosConfig";

export default async function likeRecipeApi(id) {
  const res = await axiosInstance.get(`/recipes/like/${id}`);
  return res.data;
}
