import { configureStore } from "@reduxjs/toolkit";

const store = configureStore({
    reducer: {},
    devTools: import.meta.env.VITE_NODE_ENV === "development",
});

export default store;
