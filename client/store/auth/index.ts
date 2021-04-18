import { createSlice } from '@reduxjs/toolkit';
import Cookies from 'universal-cookie';

import { AuthState } from './interface';
import { authThunk } from './thunk';
import { userThunk } from './userThunk';

const initialState: AuthState = {
    email: '',
    username: '',
    name: '',
    elo: 0,
    id: '',
    phoneNumber: '',
    avatarUrl: '',
    createDate: Date(),
    isLogin: false,
};

const reducer = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        resetState: () => ({ ...initialState }),
        updateLogin: (state) => ({ ...state, isLogin: true }),
    },
    extraReducers: (builder) => {
        builder.addCase(userThunk.getCurrentUser.fulfilled, (state, { payload }) => {
            const newState = { ...state };
            newState.name = payload.name;
            newState.username = payload.username;
            newState.phoneNumber = payload.phoneNumber;
            newState.email = payload.email;
            newState.elo = payload.elo;
            newState.id = payload.id;
            newState.avatarUrl = payload.avatarUrl;
            newState.isLogin = true;
            return newState;
        });
        builder.addCase(authThunk.loginUser.fulfilled, (state) => ({ ...state, isLogin: true }));
        builder.addCase(authThunk.registerUser.fulfilled, (state) => ({ ...state, isLogin: true }));
        builder.addCase(authThunk.logoutUser.fulfilled, () => ({ ...initialState }));

        builder.addCase(userThunk.getCurrentUser.rejected, (state) => {
            const cookies = new Cookies();
            // cookies.remove('re-token');
            // cookies.remove('auth-token');

            return {
                ...state,
                isLogin: false,
            };
        });
    },
});
export const authActions = {
    ...reducer.actions,
};
export const authReducer = reducer.reducer;
