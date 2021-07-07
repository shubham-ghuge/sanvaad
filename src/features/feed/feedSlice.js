import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"

const SERVER_URL = "https://sanvaad.herokuapp.com"

export const loadPosts = createAsyncThunk("feed/loadPosts", async () => {
    const { data } = await axios.get(SERVER_URL + "/feed")
    return data;
})
export const createPost = createAsyncThunk("feed/creatPost", async (userThoughts) => {
    const { data } = await axios.post(SERVER_URL + "/posts", userThoughts)
    return data;
})
const initialState = {
    loading: false,
    posts: []
}

export const feedSlice = createSlice({
    name: "feed",
    initialState,
    reducers: {
        addComment: (state, action) => {
            state.posts.push(action.payload);
        }
    },
    extraReducers: {
        [loadPosts.pending]: (state) => {
            state.loading = true;
        },
        [createPost.pending]: (state) => {
            state.loading = true;
        },
        [loadPosts.fulfilled]: (state, action) => {
            state.posts = action.payload.response;
            state.loading = false;
        },
        [loadPosts.rejected]: (state) => {
            state.loading = false;
        },
        [createPost.fulfilled]: (state, action) => {
            console.log(action.payload);
            state.loading = false;
        },
        [createPost.rejected]: (state) => {
            state.loading = false;
        },
    }
});

export const { addComment } = feedSlice.actions;
export default feedSlice.reducer;