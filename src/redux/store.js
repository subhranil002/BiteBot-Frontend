import { configureStore } from "@reduxjs/toolkit";

import authSlice from "./slices/authSlice";
import chefSlice from "./slices/chefSlice";
import recipeSlice from "./slices/recipeSlice";

const store = configureStore({
    reducer: {
        auth: authSlice.reducer,
        chef: chefSlice.reducer,
        recipe: recipeSlice.reducer,
    },
    devTools: import.meta.env.VITE_NODE_ENV === "development",
});

export default store;
