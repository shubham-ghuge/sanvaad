import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"

export const getNotifications = createAsyncThunk("notification/getNotifications", async () => {
    const { data } = await axios.get("https://sanvaad.herokuapp.com/notifications");
    return data;
})
const initialState = {
    loading: false,
    notifications: []
}

export const notificationSlice = createSlice({
    name: 'notification',
    initialState,
    reducers: {},
    extraReducers: {
        [getNotifications.pending]: (state) => {
            state.loading = true;
        },
        [getNotifications.fulfilled]: (state, action) => {
            state.notifications = action.payload.response.text;
            state.loading = false;
        },
        [getNotifications.rejected]: (state) => {
            state.loading = false;
        }
    }
})

export default notificationSlice.reducer;