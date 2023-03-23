import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: null,
    token: null,
    messageWith: null, //this is an id of whoever you're messaging with.
    friends: 0,
    page: 'events',
    upcoming: true,
    past: false,
    refetch: false,
    username: null,
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
        setMessageWith: (state, action) => {
            state.messageWith = action.payload.messageWith
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
        setUsername: (state, action) => {
            state.username = action.payload.username;
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
    setRefetch,
    setUsername } = authSlice.actions;

export default authSlice.reducer;