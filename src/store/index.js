import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import feedReducer from "../features/feed/feedSlice";
import notificationReducer from "../features/notification/notificationSlice";
import exploreReducer from "../features/explore/exploreSlice";
import profileReducer from "../features/Profile/profileSlice";
import postReducer from "../features/post/postSlice";

export default configureStore({
    reducer: {
        auth: authReducer,
        feed: feedReducer,
        notification: notificationReducer,
        explore: exploreReducer,
        profile: profileReducer,
        post: postReducer
    }
});