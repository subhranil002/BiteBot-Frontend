import { Route, Routes } from "react-router-dom";

import Chat from "../pages/Chatbot/Chat";
import AddRecipe from "../pages/Chef/AddRecipe";
import ChefDashboard from "../pages/Chef/ChefDashboard";
import ChefProfile from "../pages/Chef/ChefProfile";
import Home from "../pages/Home";
import Login from "../pages/Login";
import NotFound from "../pages/NotFound";
import RecipeDetail from "../pages/Recipe/RecipeDetail";
import SignUp from "../pages/Signup";
import UserProfile from "../pages/User/UserProfile";
import SearchResults from "../pages/SearchResult";

function Router() {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/chat" element={<Chat />} />
            <Route path="/search" element={<SearchResults />} />
            <Route path="/user-profile" element={<UserProfile />} />
            <Route path="/chef-profile" element={<ChefProfile />} />
            <Route path="/recipe/:id" element={<RecipeDetail />} />
            <Route path="/recipe/add" element={<AddRecipe />} />
            <Route path="/dashboard" element={<ChefDashboard />} />
            <Route path="*" element={<NotFound />} />
        </Routes>
    );
}

export default Router;
