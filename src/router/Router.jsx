import { Route, Routes } from "react-router-dom";

function Router() {
    return (
        <Routes>
            <Route path="/" element={<>Home Page</>} />
            <Route path="*" element={<>Not Found</>} />
        </Routes>
    );
}

export default Router;
