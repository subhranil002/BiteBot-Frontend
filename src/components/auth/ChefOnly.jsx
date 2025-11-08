import { useEffect } from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { Navigate, Outlet, useLocation } from "react-router-dom";

function ChefOnly() {
  const { isLoggedIn, role } = useSelector((state) => state.auth);
  const location = useLocation();

  const isChef = role === "CHEF";

  useEffect(() => {
    if (isLoggedIn && !isChef) {
      toast.error("You don't have access to this page!");
    }
  }, [isLoggedIn, isChef]);

  if (!isLoggedIn) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (!isChef) {
    const from = location.state?.from;
    const redirectTo =
      (typeof from === "string" ? from : from?.pathname) || "/";
    return <Navigate to={redirectTo} replace />;
  }

  return <Outlet />;
}

export default ChefOnly;
