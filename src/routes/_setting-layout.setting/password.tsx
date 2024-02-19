import * as React from 'react';

import { useQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';
import { Button } from 'antd';
import Joi from 'joi';
import { toast } from 'react-toastify';

import { IV1ChangePasswordDto, IV1UpdateProfileDto, meApi } from '@/core/api/me.api';
import NKDateField from '@/core/components/form/NKDateField';
import NKFormWrapper from '@/core/components/form/NKFormWrapper';
import NKTextField from '@/core/components/form/NKTextField';
import NKTextareaField from '@/core/components/form/NKTextareaField';
import NKUploadImage from '@/core/components/form/NKUploadImage';

interface PageProps {}

interface IV1ChangePasswordExtraDto extends IV1ChangePasswordDto {
    confirmPassword: string;
}

const Page: React.FunctionComponent<PageProps> = () => {
    const meQuery = useQuery(['me'], async () => {
        const res = await meApi.v1Get();
        return res;
    });

    return (
        <div className="flex flex-col gap-6 text-black">
            <h1 className="text-2xl font-semibold text-black">Thay đổi mật khẩu</h1>
            <NKFormWrapper<IV1ChangePasswordExtraDto>
                isLoading={meQuery.isLoading}
                apiAction={async (value) => {
                    const dto: IV1ChangePasswordDto = {
                        password: value.password,
                        newPassword: value.newPassword,
                    };
                    return meApi.v1PutChangePassword(dto);
                }}
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
            >
                {({ isChange, isFetching }) => (
                    <div className="grid w-full grid-cols-4 gap-x-4 gap-y-2">
                        <div className="col-span-full">
                            <NKTextField name="password" label="Mật khẩu cũ" type="password" />
                        </div>
                        <div className="col-span-full">
                            <NKTextField name="newPassword" label="Mật khẩu mới" type="password" />
                        </div>
                        <div className="col-span-full">
                            <NKTextField name="confirmPassword" label="Nhập lại mật khẩu mới" type="password" />
                        </div>

                        <div className="col-span-full mt-6 flex  w-full justify-end">
                            <Button type="primary" className="bg-tango" htmlType="submit" disabled={!isChange} loading={isFetching}>
                                Lưu
                            </Button>
                        </div>
                    </div>
                )}
            </NKFormWrapper>
        </div>
    );
};

export const Route = createFileRoute('/_setting-layout/setting/password')({
    component: Page,
});
