import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import feedReducer from "../features/feed/feedSlice";
import notificationReducer from "../features/notification/notificationSlice";

export default configureStore({
    reducer: {
        auth: authReducer,
        feed: feedReducer,
        notification: notificationReducer
    }
});