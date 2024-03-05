import { createSlice } from "@reduxjs/toolkit";
import { authApi } from "./authApi";

const authSlice = createSlice({
    name: "authSlice",
    initialState: {},
    reducers: {
        logout: (state, { payload }) => {
            state.user = null
        }
    }
    ,
    extraReducers: builder => builder
        .addMatcher(authApi.endpoints.login.matchFulfilled, (state, { payload }) => {
            state.user = payload
        })


})

export const { logout } = authSlice.actions
export default authSlice.reducer