import axiosInstance from "../../configs/axiosConfig";

export default async function getQuickAndEasyRecipesApi() {
  const res = await axiosInstance.get("/recipes/quick");
  return res.data;
}
