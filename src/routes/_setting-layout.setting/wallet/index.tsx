import * as React from 'react';

import { useQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';
import { Descriptions } from 'antd';

import { meWalletApi } from '@/core/api/me-wallet.api';
import { userWalletTransactionApi } from '@/core/api/user-wallet-transaction.api';
import { FieldType } from '@/core/components/field/NKFieldDisplay';
import TableBuilder from '@/core/components/table/NkTableBuilder';
import { FilterComparator } from '@/core/models/common';
import { formatMoneyVND } from '@/core/utils/string.helper';

interface PageProps {}

const Page: React.FunctionComponent<PageProps> = () => {
    const meWallet = useQuery({
        queryKey: ['me-wallet'],
        queryFn: meWalletApi.v1Get,
    });

    return (
        <div className="flex flex-col gap-10 text-black">
            <div className="flex flex-col gap-6">
                <h1 className="text-2xl font-semibold text-black">Ví của tôi</h1>
                <Descriptions bordered>
                    <Descriptions.Item span={3} label="Số dư khả dụng" className="font-semibold">
                        {formatMoneyVND(meWallet.data?.availableBalance || 0)}
                    </Descriptions.Item>
                </Descriptions>
            </div>
            <div className="flex flex-col ">
                <h1 className="text-2xl font-semibold text-black">Lịch sử giao dịch</h1>
                <TableBuilder
                    columns={[
                        {
                            name: 'amount',
                            title: 'Số Tiền',
                            type: FieldType.NUMBER,
                        },
                        {
                            name: 'status',
                            width: 120,
                            title: 'Trạng thái',
                            type: FieldType.BADGE_API,
                            apiAction: userWalletTransactionApi.v1GetEnumStatus,
                        },
                        {
                            name: 'type',
                            width: 120,
                            title: 'Loại',
                            type: FieldType.BADGE_API,
                            apiAction: userWalletTransactionApi.v1GetEnumType,
                        },

                        {
                            name: 'createdAt',
                            width: 200,
                            title: 'Thời gian tạo',
                            type: FieldType.TIME_FULL,
                        },
                    ]}
                    extraFilter={[`userWallet.id||${FilterComparator.EQUAL}||${meWallet.data?.id}`]}
                    apiAction={userWalletTransactionApi.v1Get}
                    sourceKey="transaction"
                    title=""
                />
            </div>
        </div>
    );
};

export const Route = createFileRoute('/_setting-layout/setting/wallet/')({
    component: Page,
});
