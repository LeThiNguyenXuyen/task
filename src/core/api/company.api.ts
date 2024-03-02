import { EnumListItem, IPagingDto, ResponseList } from '../models/common';
import { Company } from '../models/company';
import { UserWallet } from '../models/userWallet';
import http from './http';

const baseEndpoint = '/company';

export interface CompanyIV1Get extends IPagingDto {}

export interface CreateIV1Company
    extends Pick<Company, 'name' | 'logo' | 'description' | 'imageUrls' | 'note' | 'licenseImageBack' | 'licenseImageFront' | 'address'> {
    owner: {
        id: string;
    };
}

export interface UpdateIV1Company
    extends Pick<Company, 'name' | 'logo' | 'description' | 'imageUrls' | 'note' | 'licenseImageBack' | 'licenseImageFront' | 'address' | 'status'> {}

export interface RejectedIV1Company {
    note: string;
}

export interface ApproveIV1Company {
    id: string;
}

export const companyApi = {
    v1Get: async (dto: CompanyIV1Get) => {
        const url = `${baseEndpoint}`;

        const res = await http.get<ResponseList<Company>>(url, {
            params: { ...dto },
        });

        return res.data;
    },
    v1GetAll: async () => {
        const url = `${baseEndpoint}/all`;

        const res = await http.get<ResponseList<Company>>(url);

        return res.data;
    },

    v1GetById: async (id: string) => {
        const url = `${baseEndpoint}/${id}`;

        const res = await http.get<Company>(url);

        return res.data;
    },

    v1Post: async (dto: CreateIV1Company) => {
        const url = `${baseEndpoint}`;
        const res = await http.post<Company>(url, dto);
        return res.data;
    },
    v1Put: async (id: string, dto: UpdateIV1Company) => {
        const url = `${baseEndpoint}/${id}`;
        const res = await http.put<Company>(url, dto);
        return res.data;
    },

    v1Delete: async (id: string) => {
        const url = `${baseEndpoint}/${id}`;
        const res = await http.delete(url);
        return res.data;
    },
    v1GetEnumStatus: async () => {
        const url = `${baseEndpoint}/enum-options/status`;
        const res = await http.get<EnumListItem[]>(url);
        return res.data;
    },
    v1Approve: async (dto: ApproveIV1Company) => {
        const url = `${baseEndpoint}/approve`;
        const res = await http.post<Company>(url, dto);
        return res.data;
    },

    v1Reject: async (id: string, dto: RejectedIV1Company) => {
        const url = `${baseEndpoint}/reject`;
        const res = await http.post<Company>(url, {
            id,
            ...dto,
        });
        return res.data;
    },
};
