import * as React from 'react';

import { createFileRoute } from '@tanstack/react-router';
import Joi from 'joi';

import { NKConstant } from '@/core/NKConstant';
import { NKRouter } from '@/core/NKRouter';
import { meWalletApi } from '@/core/api/me-wallet.api';
import { NKFormType } from '@/core/components/form/NKForm';
import NKFormBuilder from '@/core/components/form/NKFormBuilder';
import { useNKRouter } from '@/core/routing/hooks/NKRouter';

interface PageProps {}

const Page: React.FunctionComponent<PageProps> = () => {
    const router = useNKRouter();

    return (
        <div className="flex flex-col gap-6 text-black">
            <h1 className="text-2xl font-semibold text-black">Rút tiền</h1>
            <NKFormBuilder
                apiAction={meWalletApi.v1Withdraw}
                schema={{
                    amount: Joi.number().min(0).required().messages(NKConstant.MESSAGE_FORMAT),
                }}
                defaultValues={{
                    amount: 0,
                }}
                onExtraSuccessAction={() => {
                    router.push(NKRouter.setting.wallet.index());
                }}
                fields={[
                    {
                        name: 'amount',
                        type: NKFormType.NUMBER,
                        label: 'Số tiền',
                        span: 4,
                        fieldProps: {
                            formatter: (value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ','),
                        },
                    },
                ]}
                title=""
                btnLabel="Rút tiền"
            />
        </div>
    );
};

export const Route = createFileRoute('/_setting-layout/setting/wallet/withdraw')({
    component: Page,
});
