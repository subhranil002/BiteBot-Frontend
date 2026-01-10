import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Routes, useLocation } from "react-router-dom";

import ChefOnly from "./components/auth/ChefOnly";
import RequireAuth from "./components/auth/RequireAuth";
import AdminDashboard from "./pages/AdminDashboard";
import Chat from "./pages/Chatbot/Chat";
import AddRecipe from "./pages/Chef/AddRecipe";
import ChefDashboard from "./pages/Chef/ChefDashboard";
import ContactUs from "./pages/ContactUs";
import ForgotPassword from "./pages/ForgetPassword";
import Home from "./pages/Home";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import Profile from "./pages/Profile";
import RecipeDetail from "./pages/Recipe/RecipeDetail";
import SearchResults from "./pages/SearchResult";
import SignUp from "./pages/Signup";
import Favorites from "./pages/User/Favourites";
import { getProfile } from "./redux/slices/authSlice";

function Router() {
  const dispatch = useDispatch();
  const location = useLocation();

  const paths = ["/", "/signup", "/login", "/search"];

  useEffect(() => {
    if (!paths.includes(location.pathname)) {
      (async () => {
        await dispatch(getProfile());
      })();
    }
  }, [location.pathname]);

  useEffect(() => {
    (async () => {
      await dispatch(getProfile());
    })();
  }, []);

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/forgotpassword" element={<ForgotPassword />} />
      <Route element={<RequireAuth />}>
        <Route path="/chat" element={<Chat />} />
        <Route path="/search" element={<SearchResults />} />
        <Route path="/profile/:id" element={<Profile />} />
        <Route path="/profile/:id/favourites" element={<Favorites />} />
        <Route path="/recipe/:id" element={<RecipeDetail />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/admindashboard" element={<AdminDashboard />} />
      </Route>
      <Route element={<ChefOnly />}>
        <Route path="/recipe/add" element={<AddRecipe />} />
        <Route path="/dashboard" element={<ChefDashboard />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default Router;
