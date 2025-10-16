import { Route, Routes } from "react-router-dom";

import Chat from "../pages/Chatbot/Chat";
import AddRecipe from "../pages/Chef/AddRecipe";
import ChefDashboard from "../pages/Chef/ChefDashboard";
import Home from "../pages/Home";
import Login from "../pages/Login";
import NotFound from "../pages/NotFound";
import Profile from "../pages/Profile";
import RecipeDetail from "../pages/Recipe/RecipeDetail";
import SearchResults from "../pages/SearchResult";
import SignUp from "../pages/Signup";

function Router() {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/chat" element={<Chat />} />
            <Route path="/search" element={<SearchResults />} />
            <Route path="/profile/:id" element={<Profile />} />
            <Route path="/recipe/:id" element={<RecipeDetail />} />
            <Route path="/recipe/add" element={<AddRecipe />} />
            <Route path="/dashboard" element={<ChefDashboard />} />
            <Route path="*" element={<NotFound />} />
        </Routes>
    );
}

export default Router;
