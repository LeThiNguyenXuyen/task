import http from './http';

const baseEndpoint = '/v1/user-me-follow';
export const userMeFollowApi = {
    createFollow: async (userId: string) => {
        const url = `${baseEndpoint}/user/${userId}`;
        const res = await http.post(url);
        return res.data;
    },
};
