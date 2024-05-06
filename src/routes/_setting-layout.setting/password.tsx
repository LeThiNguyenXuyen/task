import * as React from 'react';

import { useQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';
import Joi from 'joi';
import { toast } from 'react-toastify';

import { IV1ChangePasswordDto, meApi } from '@/core/api/me.api';
import { NKFormType } from '@/core/components/form/NKForm';
import NKFormBuilder from '@/core/components/form/NKFormBuilder';

interface PageProps {}

interface IV1ChangePasswordExtraDto extends IV1ChangePasswordDto {
    confirmPassword: string;
}

const Page: React.FunctionComponent<PageProps> = () => {
    const meQuery = useQuery({
        queryKey: ['me'],
        queryFn: meApi.v1Get,
    });

    return (
        <div className="flex flex-col gap-6 text-black">
            <h1 className="text-2xl font-semibold text-black">Thay đổi mật khẩu</h1>
            <NKFormBuilder
                className="p-0"
                apiAction={meApi.v1PutChangePassword}
                schema={{
                    password: Joi.string().required(),
                    newPassword: Joi.string().required(),
                    confirmPassword: Joi.string().required().valid(Joi.ref('newPassword')),
                }}
                defaultValues={{
                    password: '',
                    newPassword: '',
                    confirmPassword: '',
                }}
                onExtraSuccessAction={(data) => {
                    toast.success('Cập nhật thành công');
                    meQuery.refetch();
                }}
                fields={[
                    {
                        name: 'password',
                        type: NKFormType.PASSWORD,
                        label: 'Mật khẩu cũ',
                        span: 4,
                    },
                    {
                        name: 'newPassword',
                        type: NKFormType.PASSWORD,
                        label: 'Mật khẩu mới',
                        span: 4,
                    },
                    {
                        name: 'confirmPassword',
                        type: NKFormType.PASSWORD,
                        label: 'Nhập lại mật khẩu mới',
                        span: 4,
                    },
                ]}
                title=""
                btnLabel="Lưu"
            />
        </div>
    );
};

export const Route = createFileRoute('/_setting-layout/setting/password')({
    component: Page,
});
