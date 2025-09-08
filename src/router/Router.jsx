import { Route, Routes } from "react-router-dom";

import Home from "../pages/Home";
import Login from "../pages/Login";
import SignUp from "../pages/Signup";

function Router() {
    return (
        <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/Signup" element={<SignUp />} />
            <Route path="/" element={<Home />} />
            <Route path="*" element={<>Not Found</>} />
        </Routes>
    );
}

export default Router;
