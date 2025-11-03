// Import the toast notification library from 'react-hot-toast'
import toast from "react-hot-toast";

// Import the pre-configured Axios instance for API requests
import axiosInstance from "../../configs/axiosConfig";

// Define an asynchronous function to fetch a recipe by its ID
export default async function getRecipeByIdApi(id) {
  // Send a GET request to the backend API using the recipe ID
  const res = axiosInstance.get(`/recipes/${id}`);

  // Display toast notifications for the API call states (loading and success)
  toast.promise(res, {
    loading: "Loading recipe...", // Message shown while waiting for response
    success: (data) => {
      // Message shown when the request is successful
      // Uses message returned from the server response
      return data?.data?.message;
    },
  });

  // Wait for the request to complete and return the recipe data
  return (await res).data;
}
