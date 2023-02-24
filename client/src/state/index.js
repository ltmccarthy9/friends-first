import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: null,
    token: null,
    events: [],
    messageWith: null, //this is an id of whoever you're messaging with.
    messages: [],
    friends: 0,
    page: 'events',
    upcoming: true,
    past: false,
    refetch: false,
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
        },
        setFriends: (state, action) => {
            state.friends = action.payload.friends
        },
        setPage: (state, action) => {
            state.page = action.payload.page
        },
        setUpcoming: (state, action) => {
            state.upcoming = action.payload.upcoming
        },
        setPast: (state, action) => {
            state.past = action.payload.past
        },
        setRefetch: (state, action) => {
            state.refetch = action.payload.refetch
        },
    },
});

export const { setLogin,
    setLogout,
    setEvents,
    setMessageWith,
    setMessages,
    setFriends,
    setPage,
    setUpcoming,
    setPast,
    setRefetch } = authSlice.actions;

export default authSlice.reducer;