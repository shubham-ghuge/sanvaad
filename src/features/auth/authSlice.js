import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const SERVER_URL = "https://sanvaad.herokuapp.com/users"

export const registerUser = createAsyncThunk('auth/registerUser', async (userDetails) => {
    const { data } = await axios.post(`${SERVER_URL}/register`, userDetails);
    return data;
})

export const loginUser = createAsyncThunk('auth/loginUser', async (userDetails) => {
    const { data } = await axios.post(`${SERVER_URL}/login`, userDetails);
    return data;
})

const initialState = {
    loading: false,
    message: null,
    token: null,
    loggedInStatus: false,
    success: false,
}

export const AuthSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setMessage: (state, action) => {
            state.message = action.payload;
        },
        setToken: (state) => {
            const { isUserLoggedIn, token } = JSON.parse(localStorage.getItem("login")) || {};
            if (isUserLoggedIn) {
                state.loggedInStatus = true;
                state.token = token;
            }
        },
        logout: (state) => {
            localStorage.removeItem("login");
            axios.defaults.headers.common["Authorization"] = null;
            state.token = null;
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