import "./index.css";
import "leaflet/dist/leaflet.css";

import { Analytics } from "@vercel/analytics/react";
import { createRoot } from "react-dom/client";
import { Toaster } from "react-hot-toast";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";

import App from "./App";
import store from "./redux/store";

createRoot(document.getElementById("root")).render(
    <Provider store={store}>
        <BrowserRouter>
            <App />
            <Toaster />
            <Analytics />
        </BrowserRouter>
    </Provider>
);
