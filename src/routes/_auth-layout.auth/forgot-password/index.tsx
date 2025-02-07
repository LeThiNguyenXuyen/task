import * as React from 'react';

import { useMutation } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';
import { Button } from 'antd';
import joi from 'joi';
import { toast } from 'react-toastify';

import { NKConstant } from '@/core/NKConstant';
import { NKRouter } from '@/core/NKRouter';
import { IV1UpdateResetPasswordDto, userAnonymousApi } from '@/core/api/user-anonymous.api';
import { NKFormType } from '@/core/components/form/NKForm';
import NKFormBuilder from '@/core/components/form/NKFormBuilder';
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

    const resendEmailMutation = useMutation({
        mutationFn: async () => {
            await userAnonymousApi.v1PostCreateResetPassword({
                email,
            });
        },
        onError: (error) => {
            toast.error(error.message);
        },
        onSuccess: () => {
            toast.success('Resend email success');
        },
    });

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
                            <NKFormBuilder
                                className="p-0"
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
                                title=""
                                fields={[
                                    {
                                        name: 'token',
                                        type: NKFormType.TEXT,
                                        label: 'Code',
                                        span: 4,
                                        fieldProps: {
                                            placeholder: 'Enter code',
                                        },
                                    },
                                    {
                                        name: 'password',
                                        type: NKFormType.PASSWORD,
                                        label: 'New Password',
                                        span: 4,
                                        fieldProps: {
                                            placeholder: 'Enter new password',
                                        },
                                    },
                                    {
                                        name: 'confirmPassword',
                                        type: NKFormType.PASSWORD,
                                        label: 'Confirm Password',
                                        span: 4,
                                        fieldProps: {
                                            placeholder: 'Enter confirm password',
                                        },
                                    },
                                ]}
                                btnLabel="Update Password"
                            />
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
                            <NKFormBuilder
                                className="p-0"
                                apiAction={(data) => {
                                    const res = userAnonymousApi.v1PostCreateResetPassword({
                                        email: data.email,
                                    });

                                    return {
                                        ...res,
                                        email: data.email,
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
                                title=""
                                fields={[
                                    {
                                        name: 'email',
                                        type: NKFormType.TEXT,
                                        label: 'Email',
                                        span: 4,
                                        fieldProps: {
                                            placeholder: 'Enter email',
                                        },
                                    },
                                ]}
                                btnLabel="Send to Email"
                            />
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
