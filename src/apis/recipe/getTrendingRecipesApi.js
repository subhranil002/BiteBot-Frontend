import axiosInstance from "../../configs/axiosConfig";

export default async function getTrendingRecipesApi() {
  const res = await axiosInstance.get("/recipes/trending");
  return res.data;
}
