import { Navigate, Route, Routes } from "react-router-dom";
import Login from "../pages/Login";
import SignUp from "../pages/Signup";

function Router() {
    return (
        <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/Signup" element={<SignUp />} />
            <Route path="/" element={<>Home Page</>} />
            <Route path="*" element={<>Not Found</>} />
        </Routes>
    );
}

export default Router;
