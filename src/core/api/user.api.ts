import { EnumListItem, IPagingDto, IReportDto, ReportResponse, ResponseList } from '../models/common';
import { User } from '../models/user';
import http from './http';

export interface UserIV1Get extends IPagingDto {}

export const userApi = {
    v1Get: async (dto: UserIV1Get) => {
        const url = '/user';
        const res = await http.get<ResponseList<User>>(url, { params: { ...dto } });
        return res.data;
    },
    v1GetEnumGender: async () => {
        const url = '/user/enum-options/gender';
        const res = await http.get<EnumListItem[]>(url);
        return res.data;
    },
    v1GetEnumStatus: async () => {
        const url = '/user/enum-options/status';
        const res = await http.get<EnumListItem[]>(url);
        return res.data;
    },
    v1GetEnumVerificationStatus: async () => {
        const url = '/user/enum-options/verification-status';
        const res = await http.get<EnumListItem[]>(url);
        return res.data;
    },
    v1GetReport: async (dto: IReportDto) => {
        const url = '/user/report';
        const res = await http.get<ReportResponse[]>(url, { params: { ...dto } });
        return res.data;
    },
    v1Select: async (search: string, isShowDelete = false) => {
        const url = `/v1/user/select-options`;
        const res = await http.get<Array<User>>(url, {
            params: {
                search,
                isShowDelete,
            },
        });
        return res.data;
    },
    v1GetById: async (id: string) => {
        const url = `/v1/user/${id}`;
        const res = await http.get<User>(url);
        return res.data;
    },
};
