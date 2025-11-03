import { configureStore } from "@reduxjs/toolkit";

import authSlice from "./slices/authSlice";

const store = configureStore({
    reducer: {
        auth: authSlice.reducer,
    },
    devTools: import.meta.env.VITE_NODE_ENV === "development",
});

export default store;
