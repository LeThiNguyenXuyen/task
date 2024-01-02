'use client';

import * as React from 'react';

import Link from 'next/link';
import { useRouter } from 'next/navigation';

import joi from 'joi';
import { FaUser } from 'react-icons/fa';
import { MdLockOutline, MdOutlineEmail } from 'react-icons/md';
import { toast } from 'react-toastify';

import { NKConfig } from '@/core/NKConfig';
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
            <main className="fade-in flex min-h-screen  ">
                <div className="flex flex-1 items-center justify-center px-6">
                    <NKFormWrapper<RegisterExtendsForm>
                        apiAction={(data) => {
                            return authApi.v1Register({
                                email: data.email,
                                name: data.name,
                                password: data.password,
                                username: data.email,
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
                            username: joi.allow(''),
                        }}
                        onExtraSuccessAction={(data) => {
                            toast.success('Đăng ký thành công');
                            router.push(NKRouter.auth.login());
                        }}
                    >
                        <div className="flex flex-col items-center justify-center">
                            <img className="h-20 w-20 " src="/assets/images/logo.png " alt="banner" />
                        </div>
                        <div className="mt-10 flex w-full flex-col gap-5">
                            <NKTextField
                                name="name"
                                icon={
                                    <div className="text-xl">
                                        <FaUser />
                                    </div>
                                }
                                label="Họ và tên"
                                placeholder="Tên"
                                theme={NKTextFieldTheme.AUTH}
                                className="text-white"
                            />
                            <NKTextField
                                name="email"
                                icon={
                                    <div className="text-xl">
                                        <MdOutlineEmail />
                                    </div>
                                }
                                label="Email"
                                placeholder="Email"
                                theme={NKTextFieldTheme.AUTH}
                                className="text-white"
                            />
                            <NKTextField
                                name="password"
                                type="password"
                                label="Mật khẩu"
                                placeholder="********"
                                icon={
                                    <div className="text-xl">
                                        <MdLockOutline />
                                    </div>
                                }
                                theme={NKTextFieldTheme.AUTH}
                                className="text-white"
                            />
                            <NKTextField
                                name="confirmPassword"
                                type="password"
                                label="Xác nhận mật khẩu"
                                icon={
                                    <div className="text-xl">
                                        <MdLockOutline />
                                    </div>
                                }
                                placeholder="********"
                                theme={NKTextFieldTheme.AUTH}
                                className="text-white"
                            />
                            <div className="flex flex-col  gap-4">
                                <button className="rounded-full bg-blue-600 px-2.5 py-3  font-semibold text-white  shadow-sm hover:bg-blue-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-200">
                                    ĐĂNG KÝ
                                </button>
                                <div className="flex flex-col  gap-4">
                                    <div className="text-center font-semibold text-[#323F4B]">HOẶC</div>
                                    <div className="flex items-center justify-center gap-4">
                                        <Link
                                            href={NKConfig.LOGIN_GOOGLE_URL}
                                            className="  flex h-[55]  items-center justify-center gap-4 rounded-full  border bg-white p-2 text-sm text-slate-700 transition duration-150   hover:shadow"
                                        >
                                            <img
                                                className="h-8 w-8"
                                                src="https://cdn-icons-png.flaticon.com/512/281/281764.png"
                                                loading="lazy"
                                                alt="google logo"
                                            />
                                        </Link>
                                        <Link
                                            href={NKConfig.LOGIN_FACEBOOK_URL}
                                            className="flex items-center  justify-center gap-4 rounded-full border  bg-white  p-2 text-sm text-slate-700 transition duration-150   hover:shadow"
                                        >
                                            <img
                                                className="h-8 w-8"
                                                src="https://cdn-icons-png.flaticon.com/512/5968/5968764.png "
                                                loading="lazy"
                                                alt="google logo"
                                            />
                                        </Link>
                                    </div>
                                </div>
                                <div className="flex justify-center gap-1  leading-6">
                                    <div>Tôi đã có tài khoản?</div>
                                    <Link href={NKRouter.auth.login()} className="font-semibold text-blue-600 ">
                                        Đăng nhập
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
