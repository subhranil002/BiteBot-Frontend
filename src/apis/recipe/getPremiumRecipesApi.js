import axiosInstance from "../../configs/axiosConfig";

export default async function getPremiumRecipesApi() {
  const res = await axiosInstance.get("/recipes/premium");
  return res.data;
}
