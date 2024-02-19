import { EnumListItem, IPagingDto, ResponseList } from '../models/common';
import { UserWalletTransaction } from '../models/userWalletTransaction';
import http from './http';

export interface UserWalletTransactionIV1Get extends IPagingDto {}

export interface UserWalletTransactionIV1Checkout {
    userTransactionId: string;
    redirectUrl: string;
    notifyUrl: string;
}

const baseEndpoint = '/user-wallet-transaction';

export const userWalletTransactionApi = {
    v1Get: async (dto: UserWalletTransactionIV1Get) => {
        const url = `${baseEndpoint}`;
        const res = await http.get<ResponseList<UserWalletTransaction>>(url, { params: { ...dto } });
        return res.data;
    },
    v1GetByWallet: async (walletId: string, dto: UserWalletTransactionIV1Get) => {
        const url = `${baseEndpoint}/wallet/${walletId}`;
        const res = await http.get<ResponseList<UserWalletTransaction>>(url, { params: { ...dto } });
        return res.data;
    },

    v1GetEnumType: async () => {
        const url = `${baseEndpoint}/enum-options/type`;
        const res = await http.get<EnumListItem[]>(url);
        return res.data;
    },

    v1GetEnumStatus: async () => {
        const url = `${baseEndpoint}/enum-options/status`;
        const res = await http.get<EnumListItem[]>(url);
        return res.data;
    },

    v1Checkout: async (dto: UserWalletTransactionIV1Checkout) => {
        const url = `${baseEndpoint}/check-out`;
        const res = await http.post<UserWalletTransaction>(url, dto);
        return res.data;
    },
};
