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

    useEffect(() => {
        if (userData._id === id) {
            setCurrUser(userData);
        } else {
            (async () => {
                const res = await getUserByIdApi(id);
                setCurrUser(res.data);
            })();
        }
    }, []);

    if (currUser?.role === "USER") {
        return <UserProfile profileData={currUser} />;
    } else if (currUser?.role === "CHEF") {
        return <ChefProfile profileData={currUser} />;
    }
}

export default Profile;
