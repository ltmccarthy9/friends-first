import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: null,
    token: null,
    events: [],
    messageWith: null, //this is an id of whoever you're messaging with.
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
        setMessageWith: (state, action) => {
            state.messageWith = action.payload.messageWith
        }
    },
});

export const { setLogin, setLogout, setEvents, setMessageWith } = authSlice.actions;

export default authSlice.reducer;