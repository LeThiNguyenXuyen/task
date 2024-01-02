'use client';

import * as React from 'react';

import Link from 'next/link';
import { useRouter } from 'next/navigation';

import joi from 'joi';
import { toast } from 'react-toastify';

import { NKRouter } from '@/core/NKRouter';
import { IV1AuthRegister, authApi } from '@/core/api/auth.api';
import NKFormWrapper from '@/core/components/form/NKFormWrapper';
import NKTextField, { NKTextFieldTheme } from '@/core/components/form/NKTextField';

interface RegisterExtendsForm extends IV1AuthRegister {
    confirmPassword: string;
}

interface RegisterPageProps {}

const RegisterPage: React.FunctionComponent<RegisterPageProps> = () => {
    const router = useRouter();

    return (
        <>
            <main className="fade-in flex min-h-screen flex-col items-center justify-center ">
                <div className="flex flex-1 items-center justify-center">
                    <NKFormWrapper<RegisterExtendsForm>
                        apiAction={(data) => {
                            return authApi.v1Register({
                                email: data.email,
                                name: data.name,
                                password: data.password,
                                username: data.username,
                            });
                        }}
                        defaultValues={{
                            email: '',
                            password: '',
                            username: '',
                            name: '',
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
                                .required(),
                            password: joi.string().required(),
                            confirmPassword: joi.string().required(),
                            name: joi.string().required(),
                            username: joi.string().trim().lowercase().required(),
                        }}
                        onExtraSuccessAction={(data) => {
                            toast.success('Đăng ký thành công');
                            router.push(NKRouter.auth.login());
                        }}
                    >
                        <div className="flex flex-col items-center justify-center">
                            <img className="h-20 w-20 " src="/assets/images/logo.png " alt="banner" />
                        </div>
                        <div className="mt-10 flex w-[300px] flex-col gap-5">
                            <NKTextField
                                name="username"
                                label="Username"
                                placeholder="Username"
                                isShow={false}
                                theme={NKTextFieldTheme.AUTH}
                                className="text-white"
                            />
                            <NKTextField
                                name="name"
                                isShow={false}
                                label="Name"
                                placeholder="Name"
                                theme={NKTextFieldTheme.AUTH}
                                className="text-white"
                            />
                            <NKTextField
                                name="email"
                                isShow={false}
                                label="Email"
                                placeholder="Email"
                                theme={NKTextFieldTheme.AUTH}
                                className="text-white"
                            />
                            <NKTextField
                                name="password"
                                type="password"
                                isShow={false}
                                label="Password"
                                placeholder="Password"
                                theme={NKTextFieldTheme.AUTH}
                                className="text-white"
                            />
                            <NKTextField
                                name="confirmPassword"
                                type="password"
                                label="Confirm Password"
                                isShow={false}
                                placeholder="Confirm Password"
                                theme={NKTextFieldTheme.AUTH}
                                className="text-white"
                            />
                            <div className="flex flex-col  gap-4">
                                <button className="rounded-xl bg-[#DEE1E6] px-2.5 py-3 text-sm font-semibold text-black  shadow-sm hover:bg-purple-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-200">
                                    Sign Up
                                </button>

                                <div className="flex justify-center gap-1  text-sm leading-6">
                                    <div>Already have an account?</div>
                                    <Link href={NKRouter.auth.login()} className="font-semibold text-purple-500 hover:text-purple-500">
                                        Sign in
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </NKFormWrapper>
                </div>
            </main>
        </>
    );
};

export default RegisterPage;
