import * as React from 'react';

import { createFileRoute } from '@tanstack/react-router';
import Joi from 'joi';

import { IV1UpdateProfileDto, meApi } from '@/core/api/me.api';
import NKFormWrapper from '@/core/components/form/NKFormWrapper';

interface PageProps {}

const Page: React.FunctionComponent<PageProps> = () => {
    return (
        <div className="text-black">
            <h1 className="text-2xl font-semibold text-black">Hồ sơ</h1>
            <NKFormWrapper<IV1UpdateProfileDto>
                apiAction={meApi.v1Put}
                schema={{
                    address: Joi.string(),
                    avatar: Joi.string(),
                    bio: Joi.string(),
                    dob: Joi.string(),
                    name: Joi.string(),
                    nickname: Joi.string(),
                    phone: Joi.string(),
                }}
                defaultValues={{
                    address: '',
                    avatar: '',
                    bio: '',
                    dob: '',
                    name: '',
                    nickname: '',
                    phone: '',
                }}
            >
                <div className="grid w-full grid-cols-3 gap-4"></div>
            </NKFormWrapper>
        </div>
    );
};

export const Route = createFileRoute('/_setting-layout/setting/')({
    component: Page,
});
