'use client';

import * as React from 'react';

import Link from 'next/link';

import { useMutation, useQuery } from '@tanstack/react-query';
import { ChevronLeft, ChevronRight, LockOn, Person, SignOut } from 'akar-icons';
import joi from 'joi';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import Cookies from 'universal-cookie';

import { NKConstant } from '@/core/NKConstant';
import { NKRouter } from '@/core/NKRouter';
import { IV1ChangePasswordDto, userMeApi } from '@/core/api/user-me.api';
import NKFormWrapper from '@/core/components/form/NKFormWrapper';
import NKTextField, { NKTextFieldTheme } from '@/core/components/form/NKTextField';
import { RootState, store } from '@/core/store';
import { UserState, userActions } from '@/core/store/user';

interface PageProps {}

interface ChangePasswordForm extends IV1ChangePasswordDto {
    confirmPassword: string;
}

const Page: React.FC<PageProps> = () => {
    return (
        <div className="flex flex-1 bg-white w-full flex-col fade-in">
            <div className="flex-1 p-4  ">
                <Link href={NKRouter.app.settings.index()}>
                    <div>
                        <ChevronLeft strokeWidth={2} size={24} />
                    </div>
                </Link>
                <div className="text-lg mb-4 font-bold mt-16">Change Password</div>
                <NKFormWrapper<ChangePasswordForm>
                    apiAction={(data) => {
                        return userMeApi.v1PutChangePassword({
                            newPassword: data.newPassword,
                            password: data.password,
                        });
                    }}
                    defaultValues={{
                        newPassword: '',
                        confirmPassword: '',
                        password: '',
                    }}
                    schema={{
                        newPassword: joi.string().required(),
                        confirmPassword: joi.string().required().valid(joi.ref('newPassword')),
                        password: joi.string().required(),
                    }}
                    onExtraSuccessAction={(data) => {
                        toast.success('Cập nhật thông tin thành công');
                        window.location.reload();
                    }}
                >
                    <div className="flex flex-col gap-3">
                        <NKTextField
                            name="password"
                            label="Password"
                            type="password"
                            placeholder="Password"
                            theme={NKTextFieldTheme.AUTH}
                            className="text-white"
                        />
                        <NKTextField
                            name="newPassword"
                            label="New Password"
                            type="password"
                            placeholder="New Password"
                            theme={NKTextFieldTheme.AUTH}
                            className="text-white"
                        />
                        <NKTextField
                            name="confirmPassword"
                            type="password"
                            label="Confirm Password"
                            placeholder="Confirm Password"
                            theme={NKTextFieldTheme.AUTH}
                            className="text-white"
                        />
                        <div className="flex items-center justify-center w-full">
                            <button className="rounded-xl w-full text-black bg-[#DEE1E6] px-2.5 py-3 text-sm font-semibold  shadow-sm hover:bg-yellow-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-yellow-200">
                                Update Password
                            </button>
                        </div>
                    </div>
                </NKFormWrapper>
            </div>
        </div>
    );
};

export default Page;
