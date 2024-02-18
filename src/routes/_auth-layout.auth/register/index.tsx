import * as React from 'react';

import { createFileRoute } from '@tanstack/react-router';
import { Button } from 'antd';
import joi from 'joi';
import { FaUser } from 'react-icons/fa';
import { MdLockOutline, MdOutlineEmail } from 'react-icons/md';
import { toast } from 'react-toastify';

import { NKConfig } from '@/core/NKConfig';
import { NKRouter } from '@/core/NKRouter';
import { IV1AuthRegister, authApi } from '@/core/api/auth.api';
import NKFormWrapper from '@/core/components/form/NKFormWrapper';
import NKTextField from '@/core/components/form/NKTextField';
import NKLink from '@/core/routing/components/NKLink';
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
        <main className="fade-in flex min-h-screen w-full bg-black">
            <div className="flex flex-1 justify-center px-6 pt-12">
                <NKFormWrapper<RegisterExtendsForm>
                    apiAction={(data) => {
                        return authApi.v1Register({
                            email: data.email,
                            name: data.firstName + ' ' + data.lastName,
                            password: data.password,
                            username: data.email,
                        });
                    }}
                    defaultValues={{
                        email: '',
                        password: '',
                        username: '',
                        firstName: '',
                        lastName: '',
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
                        firstName: joi.string().required(),
                        lastName: joi.string().required(),
                        username: joi.allow(''),
                    }}
                    onExtraSuccessAction={(data) => {
                        toast.success('Đăng ký thành công');
                        router.push(NKRouter.auth.login());
                    }}
                >
                    <div className="mb-5 flex flex-col items-center justify-center">
                        <img className="h-16" src="/assets/images/logo.png " alt="banner" />
                    </div>
                    <div className="mx-auto mt-10 flex w-full max-w-[400px] flex-col gap-5 rounded-lg bg-white p-5">
                        <div className="flex gap-5">
                            <NKTextField
                                icon={
                                    <div className="text-xl">
                                        <FaUser />
                                    </div>
                                }
                                name="firstName"
                                label="Họ"
                                placeholder="Nguyễn Văn"
                                theme={'AUTH'}
                                className="text-white"
                                autoComplete="off"
                            />
                            <NKTextField name="lastName" autoComplete="off" label="Tên" placeholder="Tài" theme={'AUTH'} className="text-white" />
                        </div>
                        <NKTextField
                            name="email"
                            icon={
                                <div className="text-xl">
                                    <MdOutlineEmail />
                                </div>
                            }
                            label="Email"
                            placeholder="Email"
                            theme={'AUTH'}
                            className="text-white"
                            autoComplete="off"
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
                            theme={'AUTH'}
                            className="text-white"
                            autoComplete="off"
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
                            theme={'AUTH'}
                            className="text-white"
                        />
                        <div className="flex flex-col  gap-4">
                            <Button>ĐĂNG KÝ</Button>
                            <div className="flex flex-col  gap-4">
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
                                        <Button className="w-full items-center justify-start gap-4 bg-black pl-16 shadow-2xl">
                                            <img
                                                className="h-6 w-6"
                                                src="https://cdn-icons-png.flaticon.com/512/281/281764.png"
                                                loading="lazy"
                                                alt="google logo"
                                            />
                                            <div className="text-white">Đăng nhập với Google</div>
                                        </Button>
                                    </NKLink>
                                    <NKLink href={NKConfig.LOGIN_FACEBOOK_URL}>
                                        <Button className="w-full items-center justify-start gap-4 bg-white pl-16 shadow-2xl">
                                            <img
                                                className="h-6 w-6"
                                                src="https://cdn-icons-png.flaticon.com/512/5968/5968764.png "
                                                loading="lazy"
                                                alt="google logo"
                                            />
                                            <div className="text-black">Đăng nhập với Facebook</div>
                                        </Button>
                                    </NKLink>
                                </div>
                            </div>
                            <div className="flex justify-center gap-1  leading-6">
                                <div className="text-gray-500">Tôi đã có tài khoản?</div>
                                <NKLink href={NKRouter.auth.login()} className="font-semibold text-[#47ea4e] ">
                                    Đăng nhập
                                </NKLink>
                            </div>
                        </div>
                    </div>
                </NKFormWrapper>
            </div>
        </main>
    );
};

export const Route = createFileRoute('/_auth-layout/auth/register/')({
    component: Page,
});
