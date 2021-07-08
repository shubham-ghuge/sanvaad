import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"

const SERVER_URL = "https://sanvaad.herokuapp.com"

export const loadPosts = createAsyncThunk("feed/loadPosts", async () => {
    const { data } = await axios.get(SERVER_URL + "/feed");
    return data;
})
export const createPost = createAsyncThunk("feed/creatPost", async (userThoughts) => {
    const { data } = await axios.post(SERVER_URL + "/posts", userThoughts);
    return data;
})

export const commentOnPost = createAsyncThunk("feed/commentOnPost", async (commentData) => {
    console.log(commentData);
    const { data } = await axios.post(SERVER_URL + "/comments", commentData);
    return data;
})

const initialState = {
    loading: false,
    message: null,
    posts: []
}

export const feedSlice = createSlice({
    name: "feed",
    initialState,
    reducers: {
        addComment: (state, action) => {
            state.posts.push(action.payload);
        },
        setMessage: (state, action) => {
            state.message = action.payload;
        },
        incrementCommentCount: (state, action) => {
            const { postId } = action.payload;
            state.posts.find(i => i.posts.find(j => j._id === postId && j.comments.push(postId)))
        }
    },
    extraReducers: {
        [loadPosts.pending]: (state) => {
            state.loading = true;
        },
        [loadPosts.fulfilled]: (state, action) => {
            state.posts = action.payload.response;
            state.loading = false;
        },
        [loadPosts.rejected]: (state) => {
            state.loading = false;
        },
        [createPost.pending]: (state) => {
            state.loading = true;
        },
        [createPost.fulfilled]: (state, action) => {
            state.message = action.payload.message;
            state.loading = false;
        },
        [createPost.rejected]: (state) => {
            state.loading = false;
        },
        [commentOnPost.pending]: (state) => {
            state.loading = true;
        },
        [commentOnPost.fulfilled]: (state, action) => {
            state.message = action.payload.message;
            console.log(action.payload.response);
            state.loading = false;
        },
        [commentOnPost.rejected]: (state) => {
            state.loading = false;
        },
    }
});

export const { addComment, setMessage, incrementCommentCount } = feedSlice.actions;
export default feedSlice.reducer;