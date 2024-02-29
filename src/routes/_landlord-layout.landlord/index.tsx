import * as React from 'react';

import { PlusOutlined } from '@ant-design/icons';
import { PlusCircleIcon } from '@heroicons/react/20/solid';
import { useQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';
import { Button } from 'antd';
import Joi from 'joi';
import { toast } from 'react-toastify';

import { companyApi } from '@/core/api/company.api';
import { IV1UpdateProfileDto, meApi } from '@/core/api/me.api';
import DrawerBuilder from '@/core/components/drawer/DrawerBuilder';
import NKDateField from '@/core/components/form/NKDateField';
import NKForm, { NKFormType } from '@/core/components/form/NKForm';
import NKFormWrapper from '@/core/components/form/NKFormWrapper';
import NKTextField from '@/core/components/form/NKTextField';
import NKTextareaField from '@/core/components/form/NKTextareaField';
import NKUploadImage from '@/core/components/form/NKUploadImage';
import ModalBuilder from '@/core/components/modal/ModalBuilder';
import TableBuilder from '@/core/components/table/TableBuilder';

interface PageProps {}

const Page: React.FunctionComponent<PageProps> = () => {
    const meQuery = useQuery(['me'], async () => {
        const res = await meApi.v1Get();
        return res;
    });

    return (
        <div className="flex flex-col gap-6 text-black">
            <TableBuilder
                queryApi={companyApi.v1Get}
                title="Danh sách công ty"
                sourceKey="companies"
                columns={[]}
                extraButtons={[
                    <div>
                        <DrawerBuilder
                            btnLabel={<span>Tạo công ty</span>}
                            btnProps={{
                                className: 'bg-tango',
                                type: 'primary',
                                icon: <PlusOutlined rev="" />,
                            }}
                            drawerTitle="Tạo công ty"
                            width="50%"
                        >
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
                                        id: '',
                                    },
                                }}
                                schema={{
                                    address: Joi.string().required(),
                                    description: Joi.string().required(),
                                    imageUrls: Joi.array().items(Joi.string()).required(),
                                    licenseImageBack: Joi.string().required(),
                                    licenseImageFront: Joi.string().required(),
                                    logo: Joi.string().required(),
                                    name: Joi.string().required(),
                                    note: Joi.string().required(),
                                    owner: Joi.object({
                                        id: Joi.string().required(),
                                    }).required(),
                                }}
                            >
                                <div className="flex flex-col gap-4">
                                    <NKForm label="Tên công ty" name="name" type={NKFormType.TEXT} />
                                    <NKForm label="Địa chỉ" name="address" type={NKFormType.LOCATION} />
                                    <NKForm label="Mô tả" name="description" type={NKFormType.TEXTAREA} />
                                    <NKForm label="Logo" name="logo" type={NKFormType.UPLOAD_IMAGE} />
                                    <NKForm label="Ảnh" name="imageUrls" type={NKFormType.MULTI_UPLOAD_IMAGE} />
                                    <NKForm label="Ảnh mặt trước" name="licenseImageFront" type={NKFormType.UPLOAD_IMAGE} />
                                    <NKForm label="Ảnh mặt sau" name="licenseImageBack" type={NKFormType.UPLOAD_IMAGE} />
                                </div>
                            </NKFormWrapper>
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
