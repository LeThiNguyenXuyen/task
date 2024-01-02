'use client';

import * as React from 'react';

import Link from 'next/link';
import { useParams, useSearchParams } from 'next/navigation';

import joi from 'joi';
import { MdLockOutline, MdOutlineEmail } from 'react-icons/md';
import { toast } from 'react-toastify';
import Cookies from 'universal-cookie';

import { NKConfig } from '@/core/NKConfig';
import { NKConstant } from '@/core/NKConstant';
import { NKRouter } from '@/core/NKRouter';
import { authApi } from '@/core/api/auth.api';
import NKFormWrapper from '@/core/components/form/NKFormWrapper';
import NKTextField, { NKTextFieldTheme } from '@/core/components/form/NKTextField';
import { store } from '@/core/store';
import { userActions } from '@/core/store/user';

interface AuthLoginProps {}

const AuthLogin: React.FC<AuthLoginProps> = () => {
    const searchParam = useSearchParams();

    React.useEffect(() => {
        const token = searchParam.get('token');

        if (token) {
            toast.success('Đăng nhập thành công');
            const cookies = new Cookies();
            cookies.set(NKConstant.TOKEN_COOKIE_KEY, token, {
                path: '/',
            });
            store.dispatch(userActions.setToken(token));
        }
    }, [searchParam]);

    return (
        <>
            <main className="fade-in flex min-h-screen ">
                <div className="flex flex-1 items-center justify-center px-6">
                    <NKFormWrapper
                        apiAction={authApi.v1LoginEmail}
                        defaultValues={{
                            email: '',
                            password: '',
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
                            password: joi.string().trim().required(),
                        }}
                        onExtraSuccessAction={(data) => {
                            toast.success('Đăng nhập thành công');
                            const cookies = new Cookies();
                            cookies.set(NKConstant.TOKEN_COOKIE_KEY, data.token, {
                                path: '/',
                            });
                            localStorage.setItem('isAds', '1');
                            store.dispatch(userActions.setToken(data.token));
                        }}
                    >
                        <div className="w-full">
                            <div className="flex flex-col items-center justify-center">
                                <img className="h-32 w-32 " src="/assets/images/logo.png " alt="banner" />
                            </div>

                            <div className="flex w-full flex-col gap-5">
                                <NKTextField
                                    icon={
                                        <div className="text-xl">
                                            <MdOutlineEmail />
                                        </div>
                                    }
                                    name="email"
                                    label="Email"
                                    placeholder="name@email.com"
                                    theme={NKTextFieldTheme.AUTH}
                                    className="text-white"
                                />
                                <NKTextField
                                    icon={
                                        <div className="text-xl">
                                            <MdLockOutline />
                                        </div>
                                    }
                                    name="password"
                                    type="password"
                                    label="Mật Khẩu"
                                    placeholder="********"
                                    theme={NKTextFieldTheme.AUTH}
                                    className="text-white"
                                />
                                <div className="flex w-full justify-end">
                                    <Link href={NKRouter.auth.forgotPassword()} className="font-medium text-blue-600">
                                        Quên mật khẩu?
                                    </Link>
                                </div>
                                <div className="flex flex-col  gap-4">
                                    <button
                                        type="submit"
                                        className="rounded-full bg-blue-600 px-2.5 py-3  font-semibold text-white  shadow-sm hover:bg-blue-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-200"
                                    >
                                        ĐĂNG NHẬP
                                    </button>

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
                                    <div className="flex justify-center gap-1  leading-6">
                                        <div>Chưa có tài khoản?</div>
                                        <Link href={NKRouter.auth.register()} className="font-semibold text-blue-600 ">
                                            Đăng ký
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </NKFormWrapper>
                </div>
            </main>
        </>
    );
};

export default AuthLogin;
