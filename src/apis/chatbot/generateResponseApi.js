import axiosInstance from "../../configs/axiosConfig";

export default async function generateResponseApi(userInput) {
  const res = axiosInstance.post("/chatbot/chat", {
    userInput,
  });
  return (await res).data;
}
