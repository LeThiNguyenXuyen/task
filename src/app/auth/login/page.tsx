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
                <div className="flex flex-1 items-center justify-center">
                    <NKFormWrapper
                        apiAction={authApi.V1LoginUsername}
                        defaultValues={{
                            username: '',
                            password: '',
                        }}
                        schema={{
                            username: joi.string().trim().lowercase().required(),
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
                        <div className="">
                            <div className="flex flex-col items-center justify-center">
                                <img className="h-32 w-32 " src="/assets/images/logo.png " alt="banner" />
                            </div>

                            <div className="flex w-[300px] flex-col gap-5">
                                <NKTextField
                                    icon={
                                        <div className="text-xl">
                                            <MdOutlineEmail />
                                        </div>
                                    }
                                    name="username"
                                    label="Username"
                                    placeholder="Username"
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
                                    label="Password"
                                    placeholder="Password"
                                    theme={NKTextFieldTheme.AUTH}
                                    className="text-white"
                                />
                                <div className="flex w-full justify-end">
                                    <Link href={NKRouter.auth.forgotPassword()} className="text-xs font-medium text-gray-500">
                                        Forget the password?
                                    </Link>
                                </div>
                                <div className="flex flex-col  gap-4">
                                    <button className="rounded-xl bg-[#DEE1E6] px-2.5 py-3 text-sm font-semibold text-black  shadow-sm hover:bg-purple-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-200">
                                        LOG IN
                                    </button>
                                    <Link
                                        href={NKConfig.LOGIN_GOOGLE_URL}
                                        className=" mt-8 flex items-center  justify-center gap-4 rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm text-slate-700 transition duration-150 hover:border-slate-400 hover:text-slate-900 hover:shadow"
                                    >
                                        <img
                                            className="h-6 w-6"
                                            src="https://cdn-icons-png.flaticon.com/512/281/281764.png"
                                            loading="lazy"
                                            alt="google logo"
                                        />
                                        <span>Continue with Google</span>
                                    </Link>
                                    <Link
                                        href={NKConfig.LOGIN_FACEBOOK_URL}
                                        className="flex items-center  justify-center gap-4 rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm text-slate-700 transition duration-150 hover:border-slate-400 hover:text-slate-900 hover:shadow"
                                    >
                                        <img
                                            className="h-6 w-6"
                                            src="https://cdn-icons-png.flaticon.com/512/5968/5968764.png "
                                            loading="lazy"
                                            alt="google logo"
                                        />
                                        <span>Continue with Facebook</span>
                                    </Link>
                                    <div className="flex justify-center gap-1  text-sm leading-6">
                                        <div>Don&apos;t have an account?</div>
                                        <Link href={NKRouter.auth.register()} className="font-semibold text-purple-500 hover:text-purple-500">
                                            Sign up
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
