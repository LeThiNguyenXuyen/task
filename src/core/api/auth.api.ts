import { User } from '../models/user';
import http from './http';

export interface IV1AuthRegister extends Pick<User, 'email' | 'password' | 'name' | 'username'> {}
export interface IV1AuthLoginEmail extends Pick<User, 'email' | 'password'> {}
export interface IV1AuthLoginUsername extends Pick<User, 'username' | 'password'> {}

const baseEndpoint = '/auth';

export const authApi = {
    v1LoginEmail: async (dto: IV1AuthLoginEmail) => {
        const url = `${baseEndpoint}/login`;
        const res = await http.post<{ token: string }>(url, dto);
        return res.data;
    },
    V1LoginUsername: async (dto: IV1AuthLoginUsername) => {
        const url = `${baseEndpoint}/login-username`;
        const res = await http.post<{ token: string }>(url, dto);
        return res.data;
    },
    v1Register: async (dto: IV1AuthRegister) => {
        const url = `${baseEndpoint}/register`;
        const res = await http.post<{ token: string }>(url, dto);
        return res.data;
    },
};
