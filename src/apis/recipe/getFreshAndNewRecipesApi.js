import axiosInstance from "../../configs/axiosConfig";

export default async function getFreshAndNewRecipes() {
  const res = await axiosInstance.get("/recipes/fresh");
  return res.data;
}
