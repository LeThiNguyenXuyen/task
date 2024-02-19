import { UserWallet } from '../models/userWallet';
import http from './http';

const baseEndpoint = '/me-wallet';

export interface MeWalletIV1Deposit {
    amount: number;
}

export interface MeWalletIV1Withdraw {
    amount: number;
}

export const meWalletApi = {
    v1Get: async () => {
        const url = `${baseEndpoint}`;

        const res = await http.get<UserWallet>(url);

        return res.data;
    },
    v1Deposit: async (dto: MeWalletIV1Deposit) => {
        const url = `${baseEndpoint}/deposit`;
        const res = await http.post<UserWallet>(url, dto);
        return res.data;
    },
    v1Withdraw: async (dto: MeWalletIV1Withdraw) => {
        const url = `${baseEndpoint}/withdraw`;
        const res = await http.post<UserWallet>(url, dto);
        return res.data;
    },
};
