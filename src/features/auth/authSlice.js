import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { API_URL } from "../../base";

export const registerUser = createAsyncThunk('auth/registerUser', async (userDetails) => {
    const { data } = await axios.post(`${API_URL}/users/register`, userDetails);
    return data;
})

export const loginUser = createAsyncThunk('auth/loginUser', async (userDetails) => {
    const { data } = await axios.post(`${API_URL}/users/login`, userDetails);
    return data;
})

const initialState = {
    loading: false,
    message: null,
    loggedInStatus: false,
    success: false,
    userName: ""
}

export const AuthSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setMessage: (state, action) => {
            state.message = action.payload;
        },
        setToken: (state, action) => {
            state.loggedInStatus = true;
            state.userName = action.payload.userName;
            axios.defaults.headers.common["Authorization"] = action.payload.token;
        },
        logout: (state) => {
            localStorage.removeItem("login");
            axios.defaults.headers.common["Authorization"] = null;
            state.loggedInStatus = false;
        }
    },
    extraReducers: {
        [registerUser.pending]: (state) => {
            state.loading = true
        },
        [registerUser.fulfilled]: (state, action) => {
            state.message = action.payload.message;
            state.success = action.payload.success;
            state.loading = false
        },
        [registerUser.rejected]: (state, action) => {
            state.message = action.payload.message;
            state.loading = false
        },
        [loginUser.pending]: (state) => {
            state.loading = true;
        },
        [loginUser.fulfilled]: (state, action) => {
            const { message, success, token, userName } = action.payload;
            if (success) {
                localStorage.setItem("login", JSON.stringify({ token, isUserLoggedIn: true, userName }));
            }
            axios.defaults.headers.common["Authorization"] = token;
            state.userName = userName;
            state.loggedInStatus = success;
            state.message = message;
            state.loading = false;
        },
        [loginUser.rejected]: (state, action) => {
            state.message = action.payload.message;
            state.loading = false
        },
    }
});

export const { setMessage, setToken, logout } = AuthSlice.actions;
export default AuthSlice.reducer;