import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: null,
    token: null,
    events: [],
    messageWith: null, //this is an id of whoever you're messaging with.
    messages: []
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
        },
        setMessages: (state, action) => {
            state.messages = action.payload.messages
        }
    },
});

export const { setLogin, setLogout, setEvents, setMessageWith, setMessages } = authSlice.actions;

export default authSlice.reducer;