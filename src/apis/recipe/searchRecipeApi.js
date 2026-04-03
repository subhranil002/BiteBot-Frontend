import axiosInstance from "../../configs/axiosConfig";

export default async function searchRecipeApi(params) {
  const res = await axiosInstance.get("/recipes/search", {
    params: params,
  });
  return res.data;
}
