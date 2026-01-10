import { useEffect } from "react";
import { useLocation } from "react-router-dom";

import Router from "./Router";

function App() {
    const location = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [location.pathname]);


    return <Router />;
}

export default App;
