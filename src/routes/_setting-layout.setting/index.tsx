import * as React from 'react';

import { useQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';
import Joi from 'joi';
import { toast } from 'react-toastify';

import { NKConstant } from '@/core/NKConstant';
import { meApi } from '@/core/api/me.api';
import { NKFormType } from '@/core/components/form/NKForm';
import NKFormBuilder from '@/core/components/form/NKFormBuilder';

interface PageProps {}

const Page: React.FunctionComponent<PageProps> = () => {
    const meQuery = useQuery({
        queryKey: ['me'],
        queryFn: meApi.v1Get,
    });

    if (meQuery.isLoading) return <div>Loading...</div>;

    return (
        <div className="flex flex-col gap-6 text-black">
            <h1 className="text-2xl font-semibold text-black">Hồ sơ</h1>
            <NKFormBuilder
                className="p-0"
                title=""
                apiAction={meApi.v1Put}
                schema={{
                    address: Joi.string().optional().empty().messages(NKConstant.MESSAGE_FORMAT),
                    avatar: Joi.string().messages(NKConstant.MESSAGE_FORMAT),
                    bio: Joi.string().optional().messages(NKConstant.MESSAGE_FORMAT),
                    dob: Joi.any().messages(NKConstant.MESSAGE_FORMAT),
                    name: Joi.string().messages(NKConstant.MESSAGE_FORMAT),
                    nickname: Joi.string().optional().empty().messages(NKConstant.MESSAGE_FORMAT),
                    phone: Joi.string().optional().empty().messages(NKConstant.MESSAGE_FORMAT),
                    cardIdFront: Joi.string().optional().empty().messages(NKConstant.MESSAGE_FORMAT),
                    cardIdBack: Joi.string().optional().empty().messages(NKConstant.MESSAGE_FORMAT),
                }}
                defaultValues={{
                    address: meQuery.data?.address || '',
                    avatar: meQuery.data?.avatar || '',
                    bio: meQuery.data?.bio || '',
                    dob: meQuery.data?.dob || '',
                    name: meQuery.data?.name || '',
                    nickname: meQuery.data?.nickname || '',
                    phone: meQuery.data?.phone || '',
                    cardIdFront: meQuery.data?.cardIdFront || 'N/A',
                    cardIdBack: meQuery.data?.cardIdBack || 'N/A',
                }}
                onExtraSuccessAction={(data) => {
                    toast.success('Cập nhật thành công');
                    meQuery.refetch();
                }}
                fields={[
                    {
                        name: 'avatar',
                        type: NKFormType.UPLOAD_IMAGE,
                        label: 'Ảnh đại diện',
                        span: 4,
                    },
                    {
                        name: 'bio',
                        type: NKFormType.TEXTAREA,
                        label: 'Thông tin về bạn',
                        span: 4,
                    },
                    {
                        name: 'name',
                        type: NKFormType.TEXT,
                        label: 'Họ và tên',
                        span: 2,
                    },
                    {
                        name: 'nickname',
                        type: NKFormType.TEXT,
                        label: 'Tên hiển thị',
                        span: 2,
                    },
                    {
                        name: 'address',
                        type: NKFormType.TEXT,
                        label: 'Địa chỉ',
                        span: 4,
                    },
                    {
                        name: 'phone',
                        type: NKFormType.TEXT,
                        label: 'Số điện thoại',
                        span: 2,
                    },
                    {
                        name: 'dob',
                        type: NKFormType.DATE,
                        label: 'Ngày sinh',
                        span: 2,
                    },
                ]}
                btnLabel="Lưu"
            />
        </div>
    );
};

export const Route = createFileRoute('/_setting-layout/setting/')({
    component: Page,
});
