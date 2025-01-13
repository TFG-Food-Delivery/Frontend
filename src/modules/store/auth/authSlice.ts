import { createSlice } from "@reduxjs/toolkit";
import { RolesList } from "./enum";

export enum authStatus {
    checking = "checking",
    notAuthenticated = "not-authenticated",
    authenticated = "authenticated",
    registering = "registering",
}

export type AuthState = {
    status: authStatus;
    email: string;
    displayName: string;
    photoURL: string;
    role: RolesList;
    errorMessage: string;
};

export const authSlice = createSlice({
    name: "auth",
    initialState: {
        status: authStatus.notAuthenticated,
        uid: null,
        email: null,
        displayName: null,
        photoURL: null,
        role: null,
        errorMessage: null,
    },
    reducers: {
        login: (state, { payload }) => {
            state.status = authStatus.authenticated;
            state.uid = payload.uid;
            state.email = payload.email;
            state.displayName = payload.displayName;
            state.photoURL = payload.photoURL;
            state.role = payload.role;
            state.errorMessage = null;
        },
        logout: (state, { payload }) => {
            state.status = authStatus.notAuthenticated;
            state.uid = null;
            state.email = null;
            state.displayName = null;
            state.photoURL = null;
            state.role = null;
            state.errorMessage = payload?.errorMessage;
        },
        registering: (state, { payload }) => {
            state.status = authStatus.registering;
            state.uid = payload.uid;
            state.email = payload.email;
            state.displayName = payload.displayName;
            state.photoURL = payload.photoURL;
            state.role = payload.role;
            state.errorMessage = null;
        },

        updateProfilePhoto: (state, { payload }) => {
            state.photoURL = payload.photoURL;
        },
        checkingCredentials: (state) => {
            state.status = authStatus.checking;
        },
        clearError: (state) => {
            state.errorMessage = null;
        },
    },
});

// Action creators are generated for each case reducer function
export const { login, logout, registering, checkingCredentials, updateProfilePhoto, clearError } = authSlice.actions;
