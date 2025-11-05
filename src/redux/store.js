import { configureStore } from "@reduxjs/toolkit";

import authSlice from "./slices/authSlice";
import recipeSlice from "./slices/recipeSlice";

const store = configureStore({
    reducer: {
        auth: authSlice.reducer,
        recipe: recipeSlice.reducer,
    },
    devTools: import.meta.env.VITE_NODE_ENV === "development",
});

export default store;
