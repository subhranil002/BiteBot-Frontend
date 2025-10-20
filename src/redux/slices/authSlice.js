import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

import changeAvatarApi from "../../apis/user/changeAvatarApi";
import getProfileApi from "../../apis/user/getProfileApi";
import loginApi from "../../apis/user/loginApi";
import logoutApi from "../../apis/user/logoutApi";
import registerApi from "../../apis/user/registerApi";
import updateProfileApi from "../../apis/user/updateProfileApi";

const authStorage = {
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
        sessionStorage.removeItem("isLoggedIn");
        sessionStorage.removeItem("role");
        sessionStorage.removeItem("userData");
    },
};

const initialState = {
    isLoggedIn: authStorage.get("isLoggedIn", false),
    role: authStorage.get("role", "GUEST"),
    userData: authStorage.get("userData", {}),
};

const resetAuthState = (state) => {
    state.isLoggedIn = false;
    state.role = "GUEST";
    state.userData = {};
    authStorage.clear();
};

export const handleError = (error) => {
    if (typeof error === "object" && error !== null && "response" in error) {
        toast.error(error?.response?.data?.message || "An error occurred");

        if (error.response?.status === 455) {
            return { clearState: true };
        }
    } else {
        toast.error("An unexpected error occurred");
        console.error(error);
    }
};

export const registerUser = createAsyncThunk(
    "auth/registerUser",
    async (data, thunkAPI) => {
        try {
            await registerApi(data);
            if (data?.avatar?.length) {
                const avatar = new FormData();
                avatar.append("avatar", data.avatar[0]);
                await changeAvatarApi(avatar);
            }
            return await getProfileApi();
        } catch (error) {
            return thunkAPI.rejectWithValue(handleError(error));
        }
    }
);

export const login = createAsyncThunk("auth/login", async (data, thunkAPI) => {
    try {
        return await loginApi(data);
    } catch (error) {
        return thunkAPI.rejectWithValue(handleError(error));
    }
});

export const logout = createAsyncThunk("auth/logout", async (_, thunkAPI) => {
    try {
        return await logoutApi();
    } catch (error) {
        return thunkAPI.rejectWithValue(handleError(error));
    }
});

export const getProfile = createAsyncThunk("auth/getProfile", async () => {
    try {
        return await getProfileApi();
    } catch (error) {
        console.log(error);
    }
});

export const updateProfile = createAsyncThunk(
    "auth/updateProfile",
    async (data, thunkAPI) => {
        try {
            if (data?.avatar) {
                const avatar = new FormData();
                avatar.append("avatar", data.avatar);
                await changeAvatarApi(avatar);
            }
            return await updateProfileApi(data);
        } catch (error) {
            return thunkAPI.rejectWithValue(handleError(error));
        }
    }
);

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(registerUser.fulfilled, (state, action) => {
                state.isLoggedIn = action.payload?.success;
                state.role = action.payload?.data?.role;
                state.userData = action.payload?.data;
                authStorage.set("isLoggedIn", action.payload?.success);
                authStorage.set("role", action.payload?.data?.role);
                authStorage.set("userData", action.payload?.data);
            })
            .addCase(login.fulfilled, (state, action) => {
                state.isLoggedIn = action.payload?.success;
                state.role = action.payload?.data?.role;
                state.userData = action.payload?.data;
                authStorage.set("isLoggedIn", action.payload?.success);
                authStorage.set("role", action.payload?.data?.role);
                authStorage.set("userData", action.payload?.data);
            })
            .addCase(logout.fulfilled, (state) => {
                state.isLoggedIn = false;
                state.role = "GUEST";
                state.userData = {};
                authStorage.clear();
            })
            .addCase(getProfile.fulfilled, (state, action) => {
                state.isLoggedIn = action.payload?.success;
                state.role = action.payload?.data?.role;
                state.userData = action.payload?.data;
                authStorage.set("isLoggedIn", action.payload?.success);
                authStorage.set("role", action.payload?.data?.role);
                authStorage.set("userData", action.payload?.data);
            })
            .addCase(updateProfile.fulfilled, (state, action) => {
                state.isLoggedIn = action.payload?.success;
                state.role = action.payload?.data?.role;
                state.userData = action.payload?.data;
                authStorage.set("isLoggedIn", action.payload?.success);
                authStorage.set("role", action.payload?.data?.role);
                authStorage.set("userData", action.payload?.data);
            })
            .addMatcher(
                (action) => action.payload?.clearState,
                (state) => {
                    resetAuthState(state);
                }
            );
    },
});

export default authSlice;
