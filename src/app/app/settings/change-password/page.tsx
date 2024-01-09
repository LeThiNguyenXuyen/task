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
        <div className="fade-in flex w-full flex-1 flex-col bg-white">
            <div className="flex-1 p-4  ">
                <Link href={NKRouter.app.settings.index()}>
                    <div>
                        <ChevronLeft strokeWidth={3} size={24} />
                    </div>
                </Link>
                <div className="mb-4 mt-16 text-lg font-bold">Đỗi Mật Khẩu</div>
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
                    }}
                >
                    <div className="flex flex-col gap-5">
                        <NKTextField
                            name="password"
                            label="Mật khẩu cũ"
                            type="password"
                            placeholder="Mật khẩu cũ"
                            theme={NKTextFieldTheme.AUTH}
                            className="text-white"
                        />
                        <NKTextField
                            name="newPassword"
                            label="Mật khẩu mới"
                            type="password"
                            placeholder="Mật khẩu mới"
                            theme={NKTextFieldTheme.AUTH}
                            className="text-white"
                        />
                        <NKTextField
                            name="confirmPassword"
                            type="password"
                            label="Xác nhận mật khẩu"
                            placeholder="Xác nhận mật khẩu"
                            theme={NKTextFieldTheme.AUTH}
                            className="text-white"
                        />
                        <button
                            type="submit"
                            className="rounded-full bg-blue-600 px-2.5 py-3  font-semibold text-white  shadow-sm  focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-200"
                        >
                            CẬP NHẬT
                        </button>
                    </div>
                </NKFormWrapper>
            </div>
        </div>
    );
};

export default Page;
