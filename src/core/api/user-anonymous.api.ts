import { User } from '../models/user';
import http from './http';

export interface IV1CreateResetPasswordDto {
    email: string;
}

export interface IV1UpdateResetPasswordDto {
    password: string;
    token: string;
}

export const userAnonymousApi = {
    v1Get: async () => {
        const url = '/user-anonymous';
        const res = await http.get<User>(url);
        return res.data;
    },
    v1PostCreateResetPassword: async (dto: IV1CreateResetPasswordDto) => {
        const url = '/user-anonymous/reset-password';
        const res = await http.post<User>(url, dto);
        return res.data;
    },
    v1PutUpdateResetPassword: async (dto: IV1UpdateResetPasswordDto) => {
        const url = '/user-anonymous/reset-password';
        const res = await http.put<User>(url, dto);
        return res.data;
    },
};
