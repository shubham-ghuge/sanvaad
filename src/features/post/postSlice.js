import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios";

const SERVER_URL = "https://sanvaad.herokuapp.com"

export const getThePost = createAsyncThunk('post/getThePost', async (postId) => {
    const { data } = await axios.get(`${SERVER_URL}/posts/${postId}`);
    return data;
})
const initialState = {
    loading: false,
    text: "",
    likes: [],
    support: [],
    comments: [],
    fetchedPosts: [],
    message: null
}

export const postSlice = createSlice({
    name: "post",
    initialState,
    reducers: {
        getFromFetchedPosts: (state, action) => {
            const [{ text, support, likes, comments }] = state.fetchedPosts.filter(i => i._id === action.payload)
            state.text = text;
            state.support = support.length;
            state.likes = likes.length;
            state.comments = comments;
            state.loading = false;
        }
    },
    extraReducers: {
        [getThePost.pending]: (state) => {
            state.loading = true;
        },
        [getThePost.fulfilled]: (state, action) => {
            const { text, support, likes, comments } = action.payload.response;
            state.text = text;
            state.support = support;
            state.likes = likes;
            state.comments = comments;
            state.loading = false;
        },
        [getThePost.rejected]: (state) => {
            state.loading = false;
        },
    }
});
export const { getFromFetchedPosts } = postSlice.actions;
export default postSlice.reducer;