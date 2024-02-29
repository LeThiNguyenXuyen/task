import { ResponseList } from '../models/common';
import { Company } from '../models/company';
import { UserWallet } from '../models/userWallet';
import http from './http';

const baseEndpoint = '/me-wallet';

export interface MeWalletIV1Deposit {
    amount: number;
}

export interface MeWalletIV1Withdraw {
    amount: number;
}

export interface CreateIV1Company
    extends Pick<Company, 'name' | 'logo' | 'description' | 'imageUrls' | 'note' | 'licenseImageBack' | 'licenseImageFront' | 'address'> {
    owner: {
        id: string;
    };
}

export interface UpdateIV1Company
    extends Pick<Company, 'name' | 'logo' | 'description' | 'imageUrls' | 'note' | 'licenseImageBack' | 'licenseImageFront' | 'address'> {}

export const companyApi = {
    v1Get: async () => {
        const url = `${baseEndpoint}`;

        const res = await http.get<ResponseList<Company>>(url);

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
};
