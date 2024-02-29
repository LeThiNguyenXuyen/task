import * as React from 'react';

import { useQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';
import { Button } from 'antd';
import Joi from 'joi';
import { toast } from 'react-toastify';

import { IV1UpdateProfileDto, meApi } from '@/core/api/me.api';
import NKDateField from '@/core/components/form/NKDateField';
import NKFormWrapper from '@/core/components/form/NKFormWrapper';
import NKTextField from '@/core/components/form/NKTextField';
import NKTextareaField from '@/core/components/form/NKTextareaField';
import NKUploadImage from '@/core/components/form/NKUploadImage';
import TableBuilder from '@/core/components/table/TableBuilder';

interface PageProps {}

const Page: React.FunctionComponent<PageProps> = () => {
    const meQuery = useQuery(['me'], async () => {
        const res = await meApi.v1Get();
        return res;
    });

    return (
        <div className="flex flex-col gap-6 text-black">
            <h1 className="text-2xl font-semibold text-black">Quản Lý Công Ty</h1>
            {/* <TableBuilder
                queryApi={}
            /> */}
        </div>
    );
};

export const Route = createFileRoute('/_landlord-layout/landlord/')({
    component: Page,
});
