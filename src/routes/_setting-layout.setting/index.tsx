import * as React from 'react';

import { useQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';
import { Button } from 'antd';
import Joi from 'joi';
import { toast } from 'react-toastify';

import { NKConstant } from '@/core/NKConstant';
import { IV1UpdateProfileDto, meApi } from '@/core/api/me.api';
import NKDateField from '@/core/components/form/NKDateField';
import NKFormWrapper from '@/core/components/form/NKFormWrapper';
import NKLocationField from '@/core/components/form/NKLocationField';
import NKTextField from '@/core/components/form/NKTextField';
import NKTextareaField from '@/core/components/form/NKTextareaField';
import NKUploadImage from '@/core/components/form/NKUploadImage';

interface PageProps {}

const Page: React.FunctionComponent<PageProps> = () => {
    const meQuery = useQuery(['me'], async () => {
        const res = await meApi.v1Get();
        return res;
    });

    return (
        <div className="flex flex-col gap-6 text-black">
            <h1 className="text-2xl font-semibold text-black">Hồ sơ</h1>
            <NKFormWrapper<IV1UpdateProfileDto>
                isLoading={meQuery.isLoading}
                apiAction={meApi.v1Put}
                schema={{
                    address: Joi.string().optional().empty().messages(NKConstant.MESSAGE_FORMAT),
                    avatar: Joi.string().messages(NKConstant.MESSAGE_FORMAT),
                    bio: Joi.string().optional().messages(NKConstant.MESSAGE_FORMAT),
                    dob: Joi.any().messages(NKConstant.MESSAGE_FORMAT),
                    name: Joi.string().messages(NKConstant.MESSAGE_FORMAT),
                    nickname: Joi.string().optional().empty().messages(NKConstant.MESSAGE_FORMAT),
                    phone: Joi.string().optional().empty().messages(NKConstant.MESSAGE_FORMAT),
                }}
                defaultValues={{
                    address: meQuery.data?.address || '',
                    avatar: meQuery.data?.avatar || '',
                    bio: meQuery.data?.bio || '',
                    dob: meQuery.data?.dob || '',
                    name: meQuery.data?.name || '',
                    nickname: meQuery.data?.nickname || '',
                    phone: meQuery.data?.phone || '',
                }}
                onExtraSuccessAction={(data) => {
                    toast.success('Cập nhật thành công');
                    meQuery.refetch();
                }}
            >
                {({ isChange, isFetching }) => (
                    <div className="grid w-full grid-cols-4 gap-x-4 gap-y-2">
                        <>
                            <div className="col-span-full">
                                <NKUploadImage name="avatar" label="Ảnh đại diện" listType="picture-circle" />
                            </div>
                        </>
                        <>
                            <div className="col-span-4">
                                <NKTextareaField name="bio" label="Thông tin về bạn" />
                            </div>
                        </>
                        <>
                            <div className="col-span-2">
                                <NKTextField name="name" label="Họ và tên" />
                            </div>
                            <div className="col-span-2">
                                <NKTextField name="nickname" label="Tên hiển thị" />
                            </div>
                        </>

                        <>
                            <div className="col-span-4">
                                <NKLocationField name="address" label="Địa chỉ" />
                            </div>
                        </>
                        <>
                            <div className="col-span-2">
                                <NKTextField name="phone" label="Số điện thoại" />
                            </div>
                            <div className="col-span-2">
                                <NKDateField name="dob" label="Ngày sinh" />
                            </div>
                        </>
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

export const Route = createFileRoute('/_setting-layout/setting/')({
    component: Page,
});
