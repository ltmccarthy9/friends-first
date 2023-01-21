import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: null,
    token: null,
    events: [],
};

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setLogin: (state, action) => {
            state.user = action.payload.user;
            state.token = action.payload.token;
        },
        setLogout: (state) => {
            state.user = null;
            state.token = null;
        },
        setEvents: (state, action) => {
            state.events = action.payload.events;
        },
    },
});

export const { setLogin, setLogout, setEvents } = authSlice.actions;

export default authSlice.reducer;