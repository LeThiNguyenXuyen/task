import { User } from '../models/user';
import http from './http';

export interface IV1ChangePasswordDto {
    password: string;
    newPassword: string;
}

export interface IV1UpdateProfileDto {
    name: string;
    phone: string;
    address: string;
    studentId: string;
    major: string;
    facebookUrl: string;
    banner: string;
    avatar: string;
    dob: string;
    bio: string;
    nickname: string;
}

export interface IV1UpdateMessageTokenDto {
    messageToken: string;
}

const baseEndpoint = '/user-me';

export const userMeApi = {
    v1Get: async () => {
        const url = `${baseEndpoint}`;
        const res = await http.get<User>(url);
        return res.data;
    },
    v1Put: async (dto: IV1UpdateProfileDto) => {
        const url = `${baseEndpoint}`;
        const res = await http.put<User>(url, dto);
        return res.data;
    },
    v1PutMessageToken: async (dto: IV1UpdateMessageTokenDto) => {
        const url = `${baseEndpoint}/message-token`;
        const res = await http.put<User>(url, dto);
        return res.data;
    },
    v1PutChangePassword: async (dto: IV1ChangePasswordDto) => {
        const url = `${baseEndpoint}/change-password`;
        const res = await http.put<User>(url, dto);
        return res.data;
    },

    v1PostLogout: async () => {
        const url = `${baseEndpoint}/logout`;
        const res = await http.post(url);
        return res.data;
    },
};
