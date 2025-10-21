import { useEffect } from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { Navigate, Outlet, useLocation } from "react-router-dom";

function ChefOnly() {
  const { isLoggedIn, role } = useSelector((state) => state.auth);
  const location = useLocation();

  useEffect(() => {
    if (isLoggedIn && role !== "CHEF") {
      toast.error("You don't have access to this page!");
    }
  }, []);

  if (!isLoggedIn) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (role !== "CHEF") {
    return (
      <Navigate
        to={location.state?.from?.pathname || location.state?.from || "/"}
        replace
      />
    );
  }

  return <Outlet />;
}

export default ChefOnly;
