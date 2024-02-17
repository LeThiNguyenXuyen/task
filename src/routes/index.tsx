import React from 'react';

import { joiResolver } from '@hookform/resolvers/joi';
import { useMutation } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';
import { Button } from 'antd';
import joi from 'joi';
import { useForm } from 'react-hook-form';
import Cookies from 'universal-cookie';

import { NKConstant } from '@/core/NKConstant';
import { NKRouter } from '@/core/NKRouter';
import { IV1AuthLoginEmail, authApi } from '@/core/api/auth.api';
import NKFormWrapper from '@/core/components/form/NKFormWrapper';
import NKTextField from '@/core/components/form/NKTextField';
import UnAuthWrapper from '@/core/components/wrapper/UnAuthWrapper';
import NKLink from '@/core/routing/components/NKLink';
import { store } from '@/core/store';
import { userActions } from '@/core/store/user';

const defaultValues: IV1AuthLoginEmail = {
    email: '',
    password: '',
};

const Page: React.FunctionComponent = () => {
    return (
        <UnAuthWrapper>
            <div className="flex  min-h-screen">
                <div className="flex w-[450px] items-center justify-center">
                    <NKFormWrapper<IV1AuthLoginEmail>
                        apiAction={authApi.v1Login}
                        defaultValues={defaultValues}
                        schema={{ email: joi.string().email({ tlds: false }).required(), password: joi.string().required() }}
                    >
                        <div className="flex flex-col items-center gap-2">
                            <div>
                                <img src="/assets/images/logo.png" className="h-16 w-16" />
                            </div>
                            <div className="mb-4 flex-1 text-left text-xl font-semibold text-black">Login Your Account</div>
                        </div>
                        <div className="flex w-full flex-col gap-4">
                            {/* <NKTextField name="username" label="Username" /> */}

                            <NKTextField name="email" label="Email" />
                            <NKTextField name="password" label="Password" type="password" />
                            <div className="flex justify-end">
                                <NKLink params href={NKRouter.auth.forgotPassword()} className="text-sm">
                                    Forgot Password?
                                </NKLink>
                            </div>
                            <Button htmlType="submit" type="primary">
                                Sign In
                            </Button>
                        </div>
                    </NKFormWrapper>
                </div>
                <div className="flex flex-1 items-center justify-center bg-[url('https://images.unsplash.com/photo-1421790735934-58176b8292a7?q=80&w=3748&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')] bg-cover"></div>
            </div>
        </UnAuthWrapper>
    );
};

export const Route = createFileRoute('/')({
    component: Page,
});
