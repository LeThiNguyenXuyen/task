import * as React from 'react';

import { CheckCircleFilled, DeleteColumnOutlined, DeleteOutlined, EditOutlined, EyeFilled, PlusOutlined } from '@ant-design/icons';
import { TrashIcon } from '@heroicons/react/20/solid';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';
import { Button } from 'antd';
import Joi from 'joi';
import _get from 'lodash/get';
import { toast } from 'react-toastify';

import { NKConstant } from '@/core/NKConstant';
import { NKRouter } from '@/core/NKRouter';
import { UpdateIV1Company, companyApi } from '@/core/api/company.api';
import { meApi } from '@/core/api/me.api';
import CTAButton from '@/core/components/cta/CTABtn';
import DrawerBuilder from '@/core/components/drawer/DrawerBuilder';
import FieldBuilder from '@/core/components/field/FieldBuilder';
import { FieldType } from '@/core/components/field/FieldDisplay';
import NKForm, { NKFormType } from '@/core/components/form/NKForm';
import NKFormWrapper from '@/core/components/form/NKFormWrapper';
import TableBuilder from '@/core/components/table/TableBuilder';
import { FilterComparator } from '@/core/models/common';
import { Company } from '@/core/models/company';
import { NKLink } from '@/core/routing/components/NKLink';

interface PageProps {}

const Page: React.FunctionComponent<PageProps> = () => {
    const queryClient = useQueryClient();
    const meQuery = useQuery(['me'], async () => {
        const res = await meApi.v1Get();
        return res;
    });

    if (meQuery.isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="flex flex-col gap-6 text-black">
            <TableBuilder
                queryApi={companyApi.v1Get}
                extraFilter={[`status||${FilterComparator.NOT_EQUAL}||CANCELLED`, `owner.id||${FilterComparator.EQUAL}||${meQuery.data?.id}`]}
                title="Danh sách nhà nghỉ"
                sourceKey="companies"
                columns={[
                    {
                        title: 'Logo',
                        key: 'logo',
                        type: FieldType.THUMBNAIL,
                    },
                    {
                        title: 'Tên nhà nghỉ',
                        key: 'name',
                        type: FieldType.TEXT,
                    },

                    {
                        width: 150,
                        title: 'Trạng thái',
                        key: 'status',
                        type: FieldType.BADGE_API,
                        apiAction: companyApi.v1GetEnumStatus,
                    },
                    {
                        title: 'Cập nhật cuối',
                        key: 'updatedAt',
                        type: FieldType.TIME_FULL,
                    },
                ]}
                actionColumns={(record: Company) => {
                    return (
                        <div className="flex items-center gap-2">
                            <DrawerBuilder
                                btnLabel=""
                                btnProps={{
                                    icon: <EyeFilled />,
                                    size: 'small',
                                    type: 'primary',
                                    className: 'bg-tango',
                                }}
                                width="50%"
                                drawerTitle="Chi tiết nhà nghỉ"
                            >
                                {record.status === 'REJECTED' && (
                                    <div className="mb-2 rounded-lg bg-red-600 p-2 text-white">{_get(record, 'note', '')}</div>
                                )}
                                {record.status === 'APPROVED' && (
                                    <div className="mb-2 inline-flex  rounded-lg bg-tango-500 p-2 font-semibold text-white ">
                                        <NKLink href={'https://dashboard-renthub.vercel.app'} className="">
                                            Đến trang quản lý phòng
                                        </NKLink>
                                    </div>
                                )}
                                <FieldBuilder
                                    containerClassName="p-4"
                                    fields={[
                                        {
                                            title: 'Logo',
                                            key: 'logo',
                                            type: FieldType.THUMBNAIL,
                                            span: 2,
                                        },
                                        {
                                            title: 'Tên',
                                            key: 'name',
                                            type: FieldType.TEXT,
                                            span: 2,
                                        },
                                        {
                                            title: 'Trạng Thái',
                                            key: 'status',
                                            type: FieldType.BADGE_API,
                                            apiAction: companyApi.v1GetEnumStatus,
                                            span: 4,
                                        },

                                        {
                                            title: 'Giấy phép kinh doanh mặt trước',
                                            key: 'licenseImageFront',
                                            type: FieldType.THUMBNAIL,
                                            span: 2,
                                        },
                                        {
                                            title: 'Giấy phép kinh doanh mặt sau',
                                            key: 'licenseImageBack',
                                            type: FieldType.THUMBNAIL,
                                            span: 2,
                                        },
                                        {
                                            title: 'Hình Ảnh Thực Tế',
                                            key: 'imageUrls',
                                            type: FieldType.MULTIPLE_IMAGES,
                                            span: 4,
                                        },
                                        {
                                            title: 'Mô Tả',
                                            key: 'description',
                                            type: FieldType.MULTILINE_TEXT,
                                            span: 4,
                                        },

                                        {
                                            title: 'Địa Chỉ',
                                            key: 'address',
                                            type: FieldType.LOCATION_CARD,
                                            span: 4,
                                        },
                                        {
                                            title: 'Ngày khởi tạo',
                                            key: 'createdAt',
                                            type: FieldType.TIME_FULL,
                                            span: 2,
                                        },
                                        {
                                            title: 'Ngày cập nhật',
                                            key: 'updatedAt',
                                            type: FieldType.TIME_FULL,
                                            span: 2,
                                        },
                                    ]}
                                    record={record}
                                    title=""
                                />
                            </DrawerBuilder>

                            {(record.status === 'PENDING' || record.status === 'REJECTED') && (
                                <>
                                    <DrawerBuilder
                                        btnLabel=""
                                        btnProps={{
                                            icon: <EditOutlined />,
                                            size: 'small',
                                            type: 'primary',
                                            className: 'bg-tango',
                                        }}
                                        drawerTitle="Chỉnh sửa nhà nghỉ"
                                        width="50%"
                                    >
                                        {(close) => {
                                            return (
                                                <>
                                                    {record.status === 'REJECTED' && (
                                                        <div className="mb-2 rounded-lg bg-red-600 p-2 text-white">{_get(record, 'note', '')}</div>
                                                    )}
                                                    <NKFormWrapper<UpdateIV1Company>
                                                        apiAction={(data) => companyApi.v1Put(record.id, data)}
                                                        defaultValues={{
                                                            address: record.address,
                                                            description: record.description,
                                                            imageUrls: record.imageUrls,
                                                            licenseImageBack: record.licenseImageBack,
                                                            licenseImageFront: record.licenseImageFront,
                                                            logo: record.logo,
                                                            name: record.name,
                                                            note: record.note,
                                                            status: 'PENDING',
                                                        }}
                                                        onExtraSuccessAction={async () => {
                                                            close();
                                                            toast.success('Cập nhật nhà nghỉ thành công');
                                                            await queryClient.invalidateQueries({
                                                                queryKey: ['companies'],
                                                            });
                                                        }}
                                                        schema={{
                                                            address: Joi.string().required().messages(NKConstant.MESSAGE_FORMAT),
                                                            description: Joi.string().required().messages(NKConstant.MESSAGE_FORMAT),
                                                            imageUrls: Joi.array()
                                                                .items(Joi.string())
                                                                .min(3)
                                                                .required()
                                                                .messages(NKConstant.MESSAGE_FORMAT),
                                                            licenseImageBack: Joi.string().required().messages(NKConstant.MESSAGE_FORMAT),
                                                            licenseImageFront: Joi.string().required().messages(NKConstant.MESSAGE_FORMAT),
                                                            logo: Joi.string().required().messages(NKConstant.MESSAGE_FORMAT),
                                                            name: Joi.string().required().messages(NKConstant.MESSAGE_FORMAT),
                                                            note: Joi.string().allow('').messages(NKConstant.MESSAGE_FORMAT),
                                                            status: Joi.string().required().messages(NKConstant.MESSAGE_FORMAT),
                                                        }}
                                                    >
                                                        <div className="flex flex-col gap-4">
                                                            <div className="flex items-center gap-4">
                                                                <NKForm label="Tên nhà nghỉ" name="name" type={NKFormType.TEXT} />
                                                                <NKForm label="Logo" name="logo" type={NKFormType.UPLOAD_IMAGE} />
                                                            </div>
                                                            <NKForm label="Địa chỉ" name="address" type={NKFormType.LOCATION_NAME} />

                                                            <div className="flex items-center gap-4">
                                                                <NKForm
                                                                    label="Ảnh giấy phép kinh doanh trước"
                                                                    name="licenseImageFront"
                                                                    type={NKFormType.UPLOAD_IMAGE}
                                                                />
                                                                <NKForm
                                                                    label="Ảnh giấy phép kinh doanh sau"
                                                                    name="licenseImageBack"
                                                                    type={NKFormType.UPLOAD_IMAGE}
                                                                />
                                                            </div>
                                                            <NKForm label="Ảnh Thực tế" name="imageUrls" type={NKFormType.MULTI_UPLOAD_IMAGE} />
                                                            <NKForm
                                                                label="Mô tả"
                                                                name="description"
                                                                fieldProps={{
                                                                    placeholder: 'Mô tả công ty',
                                                                }}
                                                                type={NKFormType.TEXTAREA}
                                                            />
                                                        </div>
                                                        <div className="mt-5 flex items-center gap-2">
                                                            <Button
                                                                type="primary"
                                                                htmlType="submit"
                                                                icon={<CheckCircleFilled />}
                                                                className="bg-tango-500"
                                                            >
                                                                Cập nhật
                                                            </Button>

                                                            <CTAButton
                                                                ctaApi={() => {
                                                                    return companyApi.v1Put(record.id, {
                                                                        address: record.address,
                                                                        description: record.description,
                                                                        imageUrls: record.imageUrls,
                                                                        licenseImageBack: record.licenseImageBack,
                                                                        licenseImageFront: record.licenseImageFront,
                                                                        logo: record.logo,
                                                                        name: record.name,
                                                                        note: record.note,
                                                                        status: 'CANCELLED',
                                                                    });
                                                                }}
                                                                extraOnSuccess={async () => {
                                                                    close();
                                                                    toast.success('Hủy xét duyệt nhà nghỉ thành công');
                                                                    await queryClient.invalidateQueries({
                                                                        queryKey: ['companies'],
                                                                    });
                                                                }}
                                                                extraOnError={() => {
                                                                    close();
                                                                    toast.error('Hủy xét duyệt nhà nghỉ thất bại');
                                                                }}
                                                                confirmProps={{
                                                                    title: 'Xác nhận hủy xét duyệt',

                                                                    okButtonProps: {
                                                                        danger: true,
                                                                    },

                                                                    okText: 'Xác nhận',
                                                                    cancelText: 'Hủy',
                                                                }}
                                                                isConfirm
                                                                confirmMessage=""
                                                            >
                                                                <Button type="primary" danger icon={<DeleteOutlined />} className="bg-tango-500">
                                                                    Bỏ Xét Duyệt
                                                                </Button>
                                                            </CTAButton>
                                                        </div>
                                                    </NKFormWrapper>
                                                </>
                                            );
                                        }}
                                    </DrawerBuilder>
                                </>
                            )}
                            {/* {record.status !== 'APPROVED' && (
                                <CTAButton
                                    ctaApi={() => {
                                        return companyApi.v1Delete(record.id);
                                    }}
                                    extraOnSuccess={async () => {
                                        toast.success('Xóa nhà nghỉ thành công');
                                        await queryClient.invalidateQueries({
                                            queryKey: ['companies'],
                                        });
                                    }}
                                    confirmProps={{
                                        title: 'Xác nhận xóa nhà nghỉ',
                                        okButtonProps: {
                                            danger: true,
                                        },
                                        okText: 'Xác nhận',
                                        cancelText: 'Hủy',
                                    }}
                                    isConfirm
                                >
                                    <Button icon={<DeleteOutlined />} type="primary" danger size="small" />
                                </CTAButton>
                            )} */}
                        </div>
                    );
                }}
                extraButtons={[
                    <div key="1">
                        <DrawerBuilder
                            btnLabel={<span>Tạo nhà nghỉ</span>}
                            btnProps={{
                                className: 'bg-tango',
                                type: 'primary',
                                icon: <PlusOutlined rev="" />,
                            }}
                            drawerTitle="Tạo nhà nghỉ"
                            width="50%"
                        >
                            {(close) => {
                                return (
                                    <NKFormWrapper
                                        apiAction={companyApi.v1Post}
                                        defaultValues={{
                                            address: '',
                                            description: '',
                                            imageUrls: [],
                                            licenseImageBack: '',
                                            licenseImageFront: '',
                                            logo: '',
                                            name: '',
                                            note: '',
                                            owner: {
                                                id: meQuery.data?.id || '',
                                            },
                                        }}
                                        onExtraSuccessAction={async () => {
                                            close();
                                            toast.success('Tạo nhà nghỉ thành công, vui lòng chờ xét duyệt');
                                            await queryClient.invalidateQueries({
                                                queryKey: ['companies'],
                                            });
                                        }}
                                        schema={{
                                            address: Joi.string().required().messages(NKConstant.MESSAGE_FORMAT),
                                            description: Joi.string().required().messages(NKConstant.MESSAGE_FORMAT),
                                            imageUrls: Joi.array().items(Joi.string()).min(3).required().messages(NKConstant.MESSAGE_FORMAT),
                                            licenseImageBack: Joi.string().required().messages(NKConstant.MESSAGE_FORMAT),
                                            licenseImageFront: Joi.string().required().messages(NKConstant.MESSAGE_FORMAT),
                                            logo: Joi.string().required().messages(NKConstant.MESSAGE_FORMAT),
                                            name: Joi.string().required().messages(NKConstant.MESSAGE_FORMAT),
                                            note: Joi.string().allow('').messages(NKConstant.MESSAGE_FORMAT),
                                            owner: Joi.any(),
                                        }}
                                    >
                                        <div className="flex flex-col gap-4">
                                            <div className="flex items-center gap-4">
                                                <NKForm label="Tên nhà nghỉ" name="name" type={NKFormType.TEXT} />
                                                <NKForm label="Logo" name="logo" type={NKFormType.UPLOAD_IMAGE} />
                                            </div>
                                            <NKForm label="Địa chỉ" name="address" type={NKFormType.LOCATION_NAME} />

                                            <div className="flex items-center gap-4">
                                                <NKForm
                                                    label="Ảnh giấy phép kinh doanh trước"
                                                    name="licenseImageFront"
                                                    type={NKFormType.UPLOAD_IMAGE}
                                                />
                                                <NKForm label="Ảnh giấy phép kinh doanh sau" name="licenseImageBack" type={NKFormType.UPLOAD_IMAGE} />
                                            </div>
                                            <NKForm label="Ảnh Thực tế" name="imageUrls" type={NKFormType.MULTI_UPLOAD_IMAGE} />
                                            <NKForm
                                                label="Mô tả"
                                                name="description"
                                                fieldProps={{
                                                    placeholder: 'Mô tả công ty',
                                                }}
                                                type={NKFormType.TEXTAREA}
                                            />
                                        </div>
                                        <div className="mt-5">
                                            <Button type="primary" htmlType="submit" icon={<CheckCircleFilled />} className="bg-tango-500">
                                                Nộp Xét Duyệt
                                            </Button>
                                        </div>
                                    </NKFormWrapper>
                                );
                            }}
                        </DrawerBuilder>
                    </div>,
                ]}
            />
        </div>
    );
};

export const Route = createFileRoute('/_landlord-layout/landlord/')({
    component: Page,
});
