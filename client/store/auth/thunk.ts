import { createAsyncThunk } from '@reduxjs/toolkit';

import { UserLoginDto, UserRegisterDto, ForgotPasswordEmailDto, ForgotPasswordPhoneDto } from '../../api/auth/dto';
import { AuthAPI, authApi } from '../../api/auth';
import { ApiResponse } from '../api/interface';

class AuthThunk {
    constructor(private readonly apiCall: AuthAPI) {}

    loginUser = createAsyncThunk<null, UserLoginDto>('UserLoginDto', async (input) => {
        await this.apiCall.loginUser(input);
        return null;
    });

    logoutUser = createAsyncThunk<null, void>('LogoutUser', async () => {
        await this.apiCall.logoutUser();
        return null;
    });

    getSocketToken = createAsyncThunk<null, void>('getSocketToken', async () => {
        await this.apiCall.getSocketToken();
        return null;
    });

    registerUser = createAsyncThunk<null, UserRegisterDto>('UserRegisterDto', async (input) => {
        await this.apiCall.registerUser(input);
        return null;
    });

    forgotPasswordByEmail = createAsyncThunk<ApiResponse<void>, ForgotPasswordEmailDto>('ForgotPasswordEmailDto', async (input) => {
        const res = await this.apiCall.forgotPasswordByEmail(input);
        return res.data;
    });

    forgotPasswordByPhone = createAsyncThunk<ApiResponse<void>, ForgotPasswordPhoneDto>('ForgotPasswordPhoneDto', async (input) => {
        const res = await this.apiCall.forgotPasswordByPhone(input);
        return res.data;
    });
}
export const authThunk = new AuthThunk(authApi);
export default authThunk;
