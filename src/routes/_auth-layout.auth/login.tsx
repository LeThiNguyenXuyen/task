import * as React from 'react';

import { createFileRoute } from '@tanstack/react-router';
import joi from 'joi';
import { toast } from 'react-toastify';
import Cookies from 'universal-cookie';

import { NKConstant } from '@/core/NKConstant';
import { authApi } from '@/core/api/auth.api';
import { NKFormType } from '@/core/components/form/NKForm';
import NKFormBuilder from '@/core/components/form/NKFormBuilder';
import { useNKSearch } from '@/core/routing/hooks/NKRouter';
import { store } from '@/core/store';
import { userActions } from '@/core/store/user';

interface AuthLoginProps {}

const Page: React.FC<AuthLoginProps> = () => {
    const searchParam = useNKSearch();

    React.useEffect(() => {
        const token = searchParam['token'];

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
        <div className="fade-in w-full max-w-md rounded-2xl bg-white p-10">
            <h1 className="mb-2 text-xl font-semibold text-black">Đăng nhập</h1>
            <NKFormBuilder
                className="p-0"
                apiAction={authApi.v1LoginEmail}
                title=""
                btnLabel="Đăng nhập"
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
                        .required()
                        .messages(NKConstant.MESSAGE_FORMAT),
                    password: joi.string().trim().required().messages(NKConstant.MESSAGE_FORMAT),
                }}
                onExtraSuccessAction={(data: any) => {
                    toast.success('Đăng nhập thành công');
                    const cookies = new Cookies();
                    cookies.set(NKConstant.TOKEN_COOKIE_KEY, data.token, {
                        path: '/',
                    });
                    localStorage.setItem('isAds', '1');
                    store.dispatch(userActions.setToken(data.token));
                }}
                fields={[
                    {
                        name: 'email',
                        label: 'Email',
                        type: NKFormType.TEXT,
                    },
                    {
                        name: 'password',
                        label: 'Mật Khẩu',
                        type: NKFormType.PASSWORD,
                    },
                ]}
            />
            {/* <NKFormWrapper
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
                        .required()
                        .messages(NKConstant.MESSAGE_FORMAT),
                    password: joi.string().trim().required().messages(NKConstant.MESSAGE_FORMAT),
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
                <div className="mx-auto flex w-full max-w-[400px] flex-col gap-5">
                    <NKTextField
                        icon={
                            <div className="text-xl">
                                <MdOutlineEmail />
                            </div>
                        }
                        name="email"
                        label="Email"
                        placeholder="name@email.com"
                        theme={'AUTH'}
                        className="text-white"
                        autoComplete="off"
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
                        theme={'AUTH'}
                        className="text-white"
                        autoComplete="off"
                    />
                    <Button htmlType="submit" className="font-medium">
                        Đăng nhập
                    </Button>
                    <div className="flex flex-col  gap-4">
                        <div className="flex w-full justify-end">
                            <NKLink href={NKRouter.auth.forgotPassword()} className="font-medium text-tango">
                                Quên mật khẩu?
                            </NKLink>
                        </div>
                        <div className="relative flex h-5">
                            <div className="inset-0 flex flex-1 items-center" aria-hidden="true">
                                <div className="w-full border-t border-gray-300" />
                            </div>
                            <div className="flex justify-center">
                                <span className="z-20 px-2 text-sm text-gray-500">HOẶC ĐĂNG NHẬP BẰNG</span>
                            </div>
                            <div className="inset-0 flex flex-1 items-center" aria-hidden="true">
                                <div className="w-full border-t border-gray-300" />
                            </div>
                        </div>
                        <div className="flex flex-col justify-center gap-4">
                            <NKLink href={NKConfig.LOGIN_GOOGLE_URL}>
                                <Button className="flex w-full justify-center gap-2">
                                    <img
                                        className="h-6 w-6"
                                        src="https://cdn-icons-png.flaticon.com/512/281/281764.png"
                                        loading="lazy"
                                        alt="google logo"
                                    />
                                    <span className="font-medium text-black">Đăng nhập với Google</span>
                                </Button>
                            </NKLink>
                        </div>
                        <div className="flex justify-center gap-1  leading-6">
                            <div className="text-gray-500">Chưa có tài khoản?</div>
                            <NKLink href={NKRouter.auth.register()} className="font-semibold text-tango ">
                                Đăng ký
                            </NKLink>
                        </div>
                    </div>
                </div>
            </NKFormWrapper> */}
        </div>
    );
};

export const Route = createFileRoute('/_auth-layout/auth/login')({
    component: Page,
});
