import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"
import { API_URL } from "../../base";


export const loadPosts = createAsyncThunk("feed/loadPosts", async () => {
    const { data } = await axios.get(API_URL + "/feed");
    return data;
})
export const createPost = createAsyncThunk("feed/creatPost", async (userThoughts) => {
    const { data } = await axios.post(API_URL + "/posts", userThoughts);
    return data;
})
export const likePost = createAsyncThunk("feed/likePost", async (userActionPayload) => {
    const { postId, routeToTake, authorId } = userActionPayload;
    const { data } = await axios.post(`${API_URL}/posts/${postId}/${routeToTake}`, authorId);
    return data;
})

export const commentOnPost = createAsyncThunk("feed/commentOnPost", async (commentData) => {
    const { data } = await axios.post(API_URL + "/comments", commentData);
    return data;
})

const initialState = {
    loading: false,
    postLoading: false,
    message: null,
    posts: [],
    postMessage: null
}

export const feedSlice = createSlice({
    name: "feed",
    initialState,
    reducers: {
        addComment: (state, action) => {
            state.posts.push(action.payload);
        },
        setMessage: (state, action) => {
            state[action.payload] = null;
        },
        incrementStatCount: (state, action) => {
            const { postId, data } = action.payload;
            state.posts.find(i => i.posts.find(j => j._id === postId && j[data].push(postId)))
        },
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
            state.postLoading = true;
        },
        [createPost.fulfilled]: (state, action) => {
            state.postMessage = action.payload.message;
            state.postLoading = false;
        },
        [createPost.rejected]: (state) => {
            state.postLoading = false;
        },
        [commentOnPost.fulfilled]: (state, action) => {
            state.message = action.payload.message;
        },
        [commentOnPost.rejected]: (state) => {
            state.message = action.payload.message
        },
        [likePost.fulfilled]: (state, action) => {
            state.message = action.payload.message;
        },
        [likePost.rejected]: (state) => {
            state.message = action.payload.message;
        }
    }
});

export const { addComment, setMessage, incrementStatCount } = feedSlice.actions;
export default feedSlice.reducer;