import * as React from 'react';

import { useMutation } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';
import { Button } from 'antd';
import Joi from 'joi';

import { NKConfig } from '@/core/NKConfig';
import { NKRouter } from '@/core/NKRouter';
import { MeWalletIV1Deposit, MeWalletIV1Withdraw, meWalletApi } from '@/core/api/me-wallet.api';
import { UserWalletTransactionIV1Checkout, userWalletTransactionApi } from '@/core/api/user-wallet-transaction.api';
import NKFormWrapper from '@/core/components/form/NKFormWrapper';
import NKNumberField from '@/core/components/form/NKNumberField';
import { useNKRouter } from '@/core/routing/hooks/NKRouter';

interface PageProps {}

const Page: React.FunctionComponent<PageProps> = () => {
    const checkoutMutation = useMutation(
        async (dto: UserWalletTransactionIV1Checkout) => {
            const res = await userWalletTransactionApi.v1Checkout(dto);
            return res;
        },
        {
            onSuccess: (data) => {
                window.location.href = data.checkoutUrl;
            },
        },
    );

    const router = useNKRouter();

    return (
        <div className="flex flex-col gap-6 text-black">
            <h1 className="text-2xl font-semibold text-black">Rút tiền</h1>
            <NKFormWrapper<MeWalletIV1Withdraw>
                apiAction={meWalletApi.v1Withdraw}
                schema={{
                    amount: Joi.number().min(0).required(),
                }}
                defaultValues={{
                    amount: 0,
                }}
                onExtraSuccessAction={() => {
                    router.push(NKRouter.setting.wallet.index());
                }}
            >
                {({ isFetching }) => (
                    <div className="grid w-full grid-cols-4 gap-x-4 gap-y-2">
                        <div className="col-span-full">
                            <NKNumberField
                                labelClassName="text-lg font-medium"
                                size="large"
                                name="amount"
                                className="w-full self-center p-2 text-3xl font-medium"
                                label="Số tiền"
                                formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                            />
                        </div>

                        <div className="col-span-full mt-6 flex  w-full justify-end">
                            <Button size="large" type="primary" className="bg-tango" htmlType="submit" loading={isFetching}>
                                Rút tiền
                            </Button>
                        </div>
                    </div>
                )}
            </NKFormWrapper>
        </div>
    );
};

export const Route = createFileRoute('/_setting-layout/setting/wallet/withdraw')({
    component: Page,
});
