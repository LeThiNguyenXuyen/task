import * as React from 'react';

import { useMutation } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';
import Joi from 'joi';

import { NKConstant } from '@/core/NKConstant';
import { NKRouter } from '@/core/NKRouter';
import { meWalletApi } from '@/core/api/me-wallet.api';
import { UserWalletTransactionIV1Checkout, userWalletTransactionApi } from '@/core/api/user-wallet-transaction.api';
import { NKFormType } from '@/core/components/form/NKForm';
import NKFormBuilder from '@/core/components/form/NKFormBuilder';

interface PageProps {}

const Page: React.FunctionComponent<PageProps> = () => {
    const checkoutMutation = useMutation({
        mutationFn: userWalletTransactionApi.v1Checkout,
        onSuccess: (data) => {
            window.location.href = data.checkoutUrl;
        },
    });

    return (
        <div className="flex flex-col gap-6 text-black">
            <h1 className="text-2xl font-semibold text-black">Nạp tiền</h1>
            <NKFormBuilder
                apiAction={meWalletApi.v1Deposit}
                schema={{
                    amount: Joi.number().min(10000).required().messages(NKConstant.MESSAGE_FORMAT),
                }}
                defaultValues={{
                    amount: 10000,
                }}
                onExtraSuccessAction={(data) => {
                    const dto: UserWalletTransactionIV1Checkout = {
                        redirectUrl: `${window.location.origin}${NKRouter.setting.wallet.index()}`,
                        notifyUrl: 'https://renthub.monoinfinity.net/api/user-wallet-transaction/verify-vnpay',
                        userTransactionId: data.id,
                    };

                    checkoutMutation.mutate(dto);
                }}
                fields={[
                    {
                        name: 'amount',
                        type: NKFormType.NUMBER,
                        label: 'Số tiền',
                        span: 4,
                    },
                ]}
                title=""
                btnLabel="Nạp tiền"
            />
        </div>
    );
};

export const Route = createFileRoute('/_setting-layout/setting/wallet/deposit')({
    component: Page,
});
