import * as React from 'react';

import { useMutation } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';
import { Button } from 'antd';
import joi from 'joi';
import { toast } from 'react-toastify';

import { NKConstant } from '@/core/NKConstant';
import { NKRouter } from '@/core/NKRouter';
import { IV1CreateResetPasswordDto, IV1UpdateResetPasswordDto, userAnonymousApi } from '@/core/api/user-anonymous.api';
import NKFormWrapper from '@/core/components/form/NKFormWrapper';
import NKTextField from '@/core/components/form/NKTextField';
import { useCountDown } from '@/core/hooks/useCountDown';
import { NKLink } from '@/core/routing/components/NKLink';
import { useNKRouter } from '@/core/routing/hooks/NKRouter';

interface PageProps {}

interface ForgotPasswordUpdateForm extends IV1UpdateResetPasswordDto {
    confirmPassword: string;
}

const Page: React.FC<PageProps> = () => {
    const [isShowSubmit, setIsShowSubmit] = React.useState(false);
    const [email, setEmail] = React.useState('');

    const router = useNKRouter();

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
        <div className="fade-in w-full max-w-md rounded-2xl bg-white p-6">
            <h1 className="mb-2 text-xl font-semibold text-black">Forgot Password</h1>
            <>
                <div className="w-full">
                    {isShowSubmit ? (
                        <div className="fade-in mx-auto flex max-w-2xl flex-col gap-4">
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
                                    confirmPassword: joi.string().required().messages(NKConstant.MESSAGE_FORMAT),
                                    password: joi.string().required().messages(NKConstant.MESSAGE_FORMAT),
                                    token: joi.string().required().messages(NKConstant.MESSAGE_FORMAT),
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
                                        theme={'AUTH'}
                                        className="text-black"
                                    />
                                    <NKTextField
                                        name="password"
                                        label="New Password"
                                        isShow={false}
                                        type="password"
                                        placeholder="Enter new password"
                                        theme={'AUTH'}
                                        className="text-black"
                                    />
                                    <NKTextField
                                        name="confirmPassword"
                                        label="Confirm Password"
                                        isShow={false}
                                        type="password"
                                        placeholder="Enter confirm password"
                                        theme={'AUTH'}
                                        className="text-black"
                                    />

                                    <Button htmlType="submit">Update Password</Button>
                                    <Button
                                        htmlType="button"
                                        type="text"
                                        onClick={() => {
                                            if (countDownMethods.isFinished) {
                                                resendEmailMutation.mutate();
                                                countDownMethods.reset();
                                            }
                                        }}
                                    >
                                        Resend {countDownMethods.isFinished ? '' : `${countDownMethods.time}s`}
                                    </Button>
                                </div>
                            </NKFormWrapper>
                            <div className="flex items-center justify-center gap-1 text-center">
                                <Button
                                    onClick={() => {
                                        setIsShowSubmit(false);
                                    }}
                                >
                                    Change Email
                                </Button>
                            </div>
                        </div>
                    ) : (
                        <div className="mx-auto flex max-w-2xl flex-col gap-4">
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
                                        theme={'AUTH'}
                                        className="text-black"
                                    />

                                    <Button htmlType="submit">Send to Email</Button>
                                </div>
                            </NKFormWrapper>
                            <div className="flex items-center justify-center gap-1 text-center">
                                <div>Go Back? </div>
                                <NKLink href={NKRouter.auth.login()}>
                                    <span className="font-semibold text-tango">Log In</span>
                                </NKLink>
                            </div>
                        </div>
                    )}
                </div>
            </>
        </div>
    );
};

export const Route = createFileRoute('/_auth-layout/auth/forgot-password/')({
    component: Page,
});
