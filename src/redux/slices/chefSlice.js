import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const chefStorage = {
    get: (key, defaultValue) => {
        try {
            const item = sessionStorage.getItem(key);
            return item ? JSON.parse(item) : defaultValue;
        } catch {
            return defaultValue;
        }
    },
    set: (key, value) => {
        sessionStorage.setItem(key, JSON.stringify(value));
    },
    clear: () => {
        sessionStorage.removeItem("chefData");
        sessionStorage.removeItem("chefRecipes");
    },
};

const initialState = {
    chefData: chefStorage.get("chefData", {}),
    chefRecipes: chefStorage.get("chefRecipes", []),
};

// export const register = createAsyncThunk(
//     "auth/register",
//     async (data, thunkAPI) => {
//         try {
//             return await signUp(data);
//         } catch (error) {
//             return thunkAPI.rejectWithValue(handleError(error));
//         }
//     }
// );

const chefSlice = createSlice({
    name: "chef",
    initialState,
    reducers: {
        resetChefState: (state) => {
            state.chefData = {};
            state.chefRecipes = [];
            chefStorage.clear();
        },
    },
    extraReducers: (builder) => {
        builder
            // .addCase(register.fulfilled, (state, action) => {
            //     state.isLoggedIn = action.payload?.success;
            //     state.role = action.payload?.data?.role;
            //     state.data = action.payload?.data;
            //     authStorage.set("isLoggedIn", action.payload?.success);
            //     authStorage.set("role", action.payload?.data?.role);
            //     authStorage.set("data", action.payload?.data);
            // })
    },
});

export default chefSlice;
