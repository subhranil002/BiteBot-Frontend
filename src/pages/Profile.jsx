// Finalized

import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import getUserByIdApi from "../apis/user/getUserByIdApi";
import Loading from "../components/Loading";
import ChefProfile from "./Chef/ChefProfile";
import UserProfile from "./User/UserProfile";

export default function Profile() {
  const { id } = useParams(); // user id from route
  const { userData } = useSelector((state) => state.auth);

  const [currUser, setCurrUser] = useState();
  const [loading, setLoading] = useState(true);

  // Fetch profile data when id changes or user updates
  useEffect(() => {
    setLoading(true);

    // If viewing own profile, use data from Redux store
    if (userData._id.toString() === id) {
      setCurrUser(userData);
      setLoading(false);
    } else {
      // Otherwise fetch user data by id
      (async () => {
        const res = await getUserByIdApi(id);
        setCurrUser(res.data);
        setLoading(false);
      })();
    }
  }, [id, userData.updatedAt]);

  // Show loading spinner while fetching
  if (loading) return <Loading />;

  // Render profile based on role
  if (currUser?.role === "USER") {
    return <UserProfile profileData={currUser} />;
  } else if (currUser?.role === "CHEF") {
    return <ChefProfile profileData={currUser} />;
  }
}
