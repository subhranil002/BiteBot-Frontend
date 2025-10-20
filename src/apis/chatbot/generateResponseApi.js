import axiosInstance from "../../configs/axiosConfig";

export default async function generateResponseApi(chatHistory) {
  const res = axiosInstance.post("/chatbot/chat", { chatHistory });
  return (await res).data;
}
