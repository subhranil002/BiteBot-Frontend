import axiosInstance from "../../configs/axiosConfig";

export default async function getRecommendedRecipesApi() {
  const res = await axiosInstance.get("/recipes/recommended");
  return res.data;
}
