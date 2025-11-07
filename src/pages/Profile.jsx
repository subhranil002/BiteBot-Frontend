import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import getUserByIdApi from "../apis/user/getUserByIdApi";
import ChefProfile from "./Chef/ChefProfile";
import UserProfile from "./User/UserProfile";

function Profile() {
  const { id } = useParams();
  const { userData } = useSelector((state) => state.auth);
  const [currUser, setCurrUser] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    if (userData._id.toString() === id) {
      setCurrUser(userData);
      setLoading(false);
    } else {
      (async () => {
        const res = await getUserByIdApi(id);
        setCurrUser(res.data);
        setLoading(false);
      })();
    }
  }, [id]);

  if (loading) return "Loading...";

  if (currUser?.role === "USER") {
    return <UserProfile profileData={currUser} />;
  } else if (currUser?.role === "CHEF") {
    return <ChefProfile profileData={currUser} />;
  }
}

export default Profile;
