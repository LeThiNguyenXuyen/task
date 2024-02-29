import * as React from 'react';

import { useQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';
import { Descriptions } from 'antd';
import _get from 'lodash/get';

import { meWalletApi } from '@/core/api/me-wallet.api';
import { meApi } from '@/core/api/me.api';
import { userWalletTransactionApi } from '@/core/api/user-wallet-transaction.api';
import FieldBadgeApi from '@/core/components/field/FieldBadgeApi';
import FieldTime from '@/core/components/field/FieldTime';
import TableBuilder from '@/core/components/table/TableBuilder';
import { FilterComparator } from '@/core/models/common';
import { UserWalletTransaction } from '@/core/models/userWalletTransaction';
import { formatMoneyVND } from '@/core/utils/string.helper';

interface PageProps {}

const Page: React.FunctionComponent<PageProps> = () => {
    const meWallet = useQuery(['me-wallet'], async () => {
        const res = await meWalletApi.v1Get();
        return res;
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
                            key: 'amount',
                            title: 'Amount',
                            render: (props: UserWalletTransaction) => {
                                const data = _get(props, 'amount', '');
                                return <span>{formatMoneyVND(data)}</span>;
                            },
                        },
                        {
                            key: 'status',
                            width: 120,
                            title: 'Trạng thái',
                            render: (props: UserWalletTransaction) => {
                                const data = _get(props, 'status', '');
                                return <FieldBadgeApi value={data} apiAction={userWalletTransactionApi.v1GetEnumStatus} />;
                            },
                        },
                        {
                            key: 'type',
                            width: 120,
                            title: 'Loại',
                            render: (props: UserWalletTransaction) => {
                                const data = _get(props, 'type', '');
                                return <FieldBadgeApi value={data} apiAction={userWalletTransactionApi.v1GetEnumType} />;
                            },
                        },

                        {
                            key: 'createdAt',
                            width: 200,
                            title: 'Thời gian tạo',
                            render: (props: UserWalletTransaction) => {
                                const data = _get(props, 'createdAt', '');
                                return <FieldTime value={data} format="DD/MM/YYYY HH:mm" />;
                            },
                        },
                    ]}
                    extraFilter={[`userWallet.id||${FilterComparator.EQUAL}||${meWallet.data?.id}`]}
                    queryApi={userWalletTransactionApi.v1Get}
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
