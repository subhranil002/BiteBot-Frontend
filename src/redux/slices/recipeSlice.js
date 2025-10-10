import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
    trendingNow: [],
    freshAndNew: [],
    recommended: [],
    quickAndEasy: [],
    premium: [],
    allRecipes: [],
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

const recipeSlice = createSlice({
    name: "recipe",
    initialState,
    reducers: {},
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

export default recipeSlice;
