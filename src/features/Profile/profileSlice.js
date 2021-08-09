import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { feedSlice } from "../feed/feedSlice";

const SERVER_URL = "https://sanvaad.herokuapp.com"

export const getProfileData = createAsyncThunk('profile/getProfileData', async () => {
    const { data } = await axios.get(SERVER_URL + "/users/profile")
    return data;
});

export const getUsersPosts = createAsyncThunk('profile/getUsersPosts', async () => {
    const { data } = await axios.get(SERVER_URL + "/posts")
    return data;
})

const initialState = {
    loading: false,
    profileLoading: false,
    message: null,
    profileData: {
        name: "",
        email: "",
        followers: [],
        posts: 0
    },
    userPosts: {
        name: "",
        posts: []
    }
}

export const profileSlice = createSlice({
    name: 'profile',
    initialState,
    reducers: {
        addCommentOnPost: (state, action) => {
            console.log('here');
            const { _id, text } = action.payload;
            state.userPosts.posts.forEach((post) => {
                if (post._id === _id) {
                    post.comments.push({ _id: Date.now(), text })
                }
            })
        },
        incrementCountOnUserPost: (state, action) => {
            const { _id, objKey } = action.payload;
            state.userPosts.posts.forEach((post) => {
                if (post._id === _id) {
                    post[objKey].push(Date.now())
                }
            })
        }
    },
    extraReducers: {
        [getProfileData.pending]: (state) => {
            state.profileLoading = true;
        },
        [getProfileData.fulfilled]: (state, action) => {
            const { name, email, posts, followers } = action.payload.response;
            state.profileData.name = name;
            state.profileData.email = email;
            state.profileData.followers = followers;
            state.profileData.posts = posts.length;
            state.profileLoading = false;
        },
        [getProfileData.rejected]: (state) => {
            state.message = action.payload.message;
            state.profileLoading = true;
        },
        [getUsersPosts.pending]: (state) => {
            state.loading = true;
        },
        [getUsersPosts.fulfilled]: (state, action) => {
            const { name, posts } = action.payload.response;
            state.userPosts.name = name
            state.userPosts.posts = posts;
            state.loading = false;
        },
        [getUsersPosts.rejected]: (state) => {
            state.message = action.payload.message;
            state.loading = true;
        },
    }
});
export const { addCommentOnPost, incrementCountOnUserPost } = profileSlice.actions;
export default profileSlice.reducer;