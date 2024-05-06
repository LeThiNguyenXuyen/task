import * as React from 'react';

import { createFileRoute } from '@tanstack/react-router';
import joi from 'joi';
import { toast } from 'react-toastify';

import { NKConstant } from '@/core/NKConstant';
import { NKRouter } from '@/core/NKRouter';
import { IV1AuthRegister, authApi } from '@/core/api/auth.api';
import { NKFormType } from '@/core/components/form/NKForm';
import NKFormBuilder from '@/core/components/form/NKFormBuilder';
import { useNKRouter } from '@/core/routing/hooks/NKRouter';

interface RegisterExtendsForm extends Omit<IV1AuthRegister, 'name'> {
    confirmPassword: string;
    firstName: string;
    lastName: string;
}

interface RegisterPageProps {}

const Page: React.FunctionComponent<RegisterPageProps> = () => {
    const router = useNKRouter();

    return (
        <div className="fade-in w-full max-w-md rounded-2xl bg-white p-10">
            <h1 className="mb-2 text-xl font-semibold text-black">Đăng ký</h1>
            <NKFormBuilder
                className="p-0"
                apiAction={(data) => {
                    return authApi.v1Register({
                        email: data.email,
                        name: data.firstName + ' ' + data.lastName,
                        password: data.password,
                        username: data.email,
                    });
                }}
                title=""
                btnLabel="Đăng ký"
                defaultValues={{
                    email: '',
                    password: '',
                    firstName: '',
                    lastName: '',
                    username: '',
                    confirmPassword: '',
                }}
                schema={{
                    email: joi
                        .string()
                        .trim()
                        .lowercase()
                        .email({
                            tlds: {
                                allow: false,
                            },
                        })
                        .required()
                        .messages(NKConstant.MESSAGE_FORMAT),
                    password: joi.string().required().messages(NKConstant.MESSAGE_FORMAT),
                    confirmPassword: joi.string().required().messages(NKConstant.MESSAGE_FORMAT),
                    firstName: joi.string().required().messages(NKConstant.MESSAGE_FORMAT),
                    lastName: joi.string().required().messages(NKConstant.MESSAGE_FORMAT),
                    username: joi.allow('').messages(NKConstant.MESSAGE_FORMAT),
                }}
                onExtraSuccessAction={(data) => {
                    toast.success('Đăng ký thành công');
                    router.push(NKRouter.auth.login());
                }}
                fields={[
                    {
                        name: 'email',
                        type: NKFormType.TEXT,
                        label: 'Email',
                    },
                    {
                        name: 'firstName',
                        type: NKFormType.TEXT,
                        label: 'Họ',
                    },
                    {
                        name: 'lastName',
                        type: NKFormType.TEXT,
                        label: 'Tên',
                    },
                    {
                        name: 'password',
                        type: NKFormType.PASSWORD,
                        label: 'Mật khẩu',
                    },
                    {
                        name: 'confirmPassword',
                        type: NKFormType.PASSWORD,
                        label: 'Nhập lại mật khẩu',
                    },
                ]}
            />
        </div>
    );
};

export const Route = createFileRoute('/_auth-layout/auth/register/')({
    component: Page,
});
