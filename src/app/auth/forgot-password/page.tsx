'use client';

import * as React from 'react';

import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { useMutation } from '@tanstack/react-query';
import joi from 'joi';
import { AiOutlineMail } from 'react-icons/ai';
import { toast } from 'react-toastify';

import { NKRouter } from '@/core/NKRouter';
import { IV1CreateResetPasswordDto, IV1UpdateResetPasswordDto, userAnonymousApi } from '@/core/api/user-anonymous.api';
import NKFormWrapper from '@/core/components/form/NKFormWrapper';
import NKTextField, { NKTextFieldTheme } from '@/core/components/form/NKTextField';
import { useCountDown } from '@/core/hooks/useCountDown';

interface PageProps {}

interface ForgotPasswordUpdateProps {
    setIsShow: (isShow: boolean) => void;
    email: string;
}

interface ForgotPasswordUpdateForm extends IV1UpdateResetPasswordDto {
    confirmPassword: string;
}

const Page: React.FC<PageProps> = () => {
    const [isShowSubmit, setIsShowSubmit] = React.useState(false);
    const [email, setEmail] = React.useState('');

    const router = useRouter();

    const resendEmailMutation = useMutation(
        () => {
            return userAnonymousApi.v1PostCreateResetPassword({
                email,
            });
        },
        {
            onSuccess: () => {
                toast.success('Gửi lại email thành công');
            },
        },
    );

    const countDownMethods = useCountDown({
        total: 60,
    });

    return (
        <div className="flex justify-center items-center flex-col h-[calc(100vh-4.5rem)]">
            <>
                <div className="text-title font-bold text-black text-lg text-center">FORGOT PASSWORD</div>
                <div className="w-[300px]">
                    {isShowSubmit ? (
                        <div className="max-w-2xl flex mx-auto mt-8 gap-4 flex-col fade-in">
                            <NKFormWrapper<ForgotPasswordUpdateForm>
                                key="forgot-password-update"
                                apiAction={(data) => {
                                    return userAnonymousApi.v1PutUpdateResetPassword({
                                        password: data.password,
                                        token: data.token,
                                    });
                                }}
                                defaultValues={{
                                    confirmPassword: '',
                                    password: '',
                                    token: '',
                                }}
                                schema={{
                                    confirmPassword: joi.string().required(),
                                    password: joi.string().required(),
                                    token: joi.string().required(),
                                }}
                                onExtraSuccessAction={(data) => {
                                    router.push(NKRouter.auth.login());
                                }}
                            >
                                <div className="flex flex-col gap-3">
                                    <NKTextField
                                        name="token"
                                        label="Code"
                                        isShow={false}
                                        autoComplete="off"
                                        placeholder="Enter code"
                                        theme={NKTextFieldTheme.AUTH}
                                        className="text-black"
                                    />
                                    <NKTextField
                                        name="password"
                                        label="New Password"
                                        isShow={false}
                                        type="password"
                                        placeholder="Enter new password"
                                        theme={NKTextFieldTheme.AUTH}
                                        className="text-black"
                                    />
                                    <NKTextField
                                        name="confirmPassword"
                                        label="Confirm Password"
                                        isShow={false}
                                        type="password"
                                        placeholder="Enter confirm password"
                                        theme={NKTextFieldTheme.AUTH}
                                        className="text-black"
                                    />

                                    <button
                                        type="submit"
                                        className="rounded-xl text-black bg-[#DEE1E6] px-2.5 py-3 text-sm font-semibold  shadow-sm hover:bg-yellow-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-yellow-200"
                                    >
                                        Update Password
                                    </button>
                                    <button
                                        type="submit"
                                        className="rounded-xl text-black bg-[#DEE1E6] px-2.5 py-3 text-sm font-semibold  shadow-sm hover:bg-yellow-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-yellow-200"
                                        onClick={() => {
                                            if (countDownMethods.isFinished) {
                                                resendEmailMutation.mutate();
                                                countDownMethods.reset();
                                            }
                                        }}
                                    >
                                        Resend {countDownMethods.isFinished ? '' : `${countDownMethods.time}s`}
                                    </button>
                                </div>
                            </NKFormWrapper>
                            <div className="text-center flex items-center justify-center gap-1">
                                <button
                                    onClick={() => {
                                        setIsShowSubmit(false);
                                    }}
                                >
                                    <div className="font-semibold text-yellow-500 hover:text-yellow-500">Change Email</div>
                                </button>
                            </div>
                        </div>
                    ) : (
                        <div className="max-w-2xl flex mx-auto mt-8 gap-4 flex-col">
                            <NKFormWrapper<IV1CreateResetPasswordDto>
                                key="forgot-password"
                                apiAction={async (dto) => {
                                    const res = await userAnonymousApi.v1PostCreateResetPassword(dto);
                                    return {
                                        ...res,
                                        email: dto.email,
                                    };
                                }}
                                defaultValues={{
                                    email: '',
                                }}
                                schema={{
                                    email: joi
                                        .string()
                                        .email({
                                            tlds: {
                                                allow: false,
                                            },
                                        })
                                        .required(),
                                }}
                                onExtraSuccessAction={(data) => {
                                    setIsShowSubmit(true);
                                    setEmail(data.email);
                                }}
                            >
                                <div className="flex flex-col gap-3">
                                    <NKTextField
                                        name="email"
                                        label="Email"
                                        isShow={false}
                                        placeholder="Nhập email"
                                        theme={NKTextFieldTheme.AUTH}
                                        className="text-black"
                                    />

                                    <button
                                        type="submit"
                                        className="rounded-xl text-black bg-[#DEE1E6] px-2.5 py-3 text-sm font-semibold  shadow-sm hover:bg-yellow-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-yellow-200"
                                    >
                                        Send to Email
                                    </button>
                                </div>
                            </NKFormWrapper>
                            <div className="text-center flex items-center justify-center gap-1">
                                <div>Go Back? </div>
                                <Link href={NKRouter.auth.login()}>
                                    <div className="font-semibold text-yellow-500 hover:text-yellow-500">Log In</div>
                                </Link>
                            </div>
                        </div>
                    )}
                </div>
            </>
        </div>
    );
};

export default Page;
