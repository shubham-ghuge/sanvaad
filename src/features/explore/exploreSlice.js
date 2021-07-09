import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"

export const getUsers = createAsyncThunk('explore/getUsers', async () => {
    const { data } = await axios.get("https://sanvaad.herokuapp.com/users");
    return data;
});

export const followUser = createAsyncThunk('explore/followUser', async (user) => {
    const { data } = await axios.post("https://sanvaad.herokuapp.com/users/followers", user);
    return data;
})

const initialState = {
    loading: false,
    message: null,
    users: []
}

export const exploreSlice = createSlice({
    name: "explore",
    initialState,
    reducers: {
        searchUser: (state, action) => {
            state.users = state.users.filter(i => i.name.toLowerCase().includes(action.payload.toLowerCase()));
        },
        setUsers: (state, action) => {
            state.users = state.users.map(i => {
                if (i._id === action.payload) {
                    i.following = true;
                    return i
                } else return i
            });
        },
        setMessage: (state, action) => {
            state.message = action.payload
        }
    },
    extraReducers: {
        [getUsers.pending]: (state) => {
            state.loading = true;
        },
        [getUsers.fulfilled]: (state, action) => {
            state.users = action.payload.response;
            state.message = action.payload.message;
            state.loading = false;
        },
        [getUsers.rejected]: (state, action) => {
            state.message = action.payload.message;
            state.loading = false;
        },
        [followUser.fulfilled]: (state, action) => {
            state.message = action.payload.message;
        },
        [followUser.rejected]: (state, action) => {
            state.message = action.payload.message;
        },
    }
});

export const { searchUser, setMessage, setUsers } = exploreSlice.actions;
export default exploreSlice.reducer;