'use client';

import * as React from 'react';

import Link from 'next/link';

import { useMutation, useQuery } from '@tanstack/react-query';
import { ArrowLeft, ChevronLeft, Image } from 'akar-icons';
import joi from 'joi';
import moment from 'moment';
import { BsImage } from 'react-icons/bs';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';

import { NKRouter } from '@/core/NKRouter';
import { uploadFileApi } from '@/core/api/upload-file.api';
import { IV1UpdateProfileDto, userMeApi } from '@/core/api/user-me.api';
import NKDateField from '@/core/components/form/NKDateField';
import NKFormWrapper from '@/core/components/form/NKFormWrapper';
import NKTextField, { NKTextFieldTheme } from '@/core/components/form/NKTextField';
import NKTextareaField from '@/core/components/form/NKTextareaField';
import { RootState } from '@/core/store';
import { UserState } from '@/core/store/user';

interface PageProps {}

const Page: React.FC<PageProps> = () => {
    const userState = useSelector<RootState, UserState>((state) => state.user);
    const userMeQuery = useQuery(
        ['user-me', userState.id],
        () => {
            return userMeApi.v1Get();
        },
        {
            enabled: !!userState.id,
        },
    );

    const uploadImageMutation = useMutation((file: File) => {
        return uploadFileApi.v1UploadFile(file);
    });

    return (
        <div className="fade-in flex w-full flex-1 flex-col rounded-t-xl ">
            {Boolean(userMeQuery.data?.id) && (
                <div
                    style={{
                        backgroundImage: `url('${userMeQuery.data?.banner}')`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                    }}
                >
                    <div className="relative">
                        <Link href={NKRouter.app.settings.index()} className="absolute left-4  top-4 h-6 w-6 rounded-lg  text-white">
                            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-black">
                                <ArrowLeft strokeWidth={2} size={24} />
                            </div>
                        </Link>
                        <button
                            onClick={() => {
                                // create a new input element
                                const input = document.createElement('input');
                                // set its type to file
                                input.type = 'file';
                                // set how many files it can accept
                                input.accept = 'image/*';
                                // set onchange event to call callback when user has selected file

                                input.onchange = async (e: any) => {
                                    const file = e.target.files[0];
                                    if (file) {
                                        const fileLocation = await uploadImageMutation.mutateAsync(file);

                                        await userMeApi.v1Put({
                                            address: userMeQuery.data?.address ?? '',
                                            name: userMeQuery.data?.name ?? '',
                                            phone: userMeQuery.data?.phone ?? '',
                                            avatar: userMeQuery.data?.avatar ?? '',
                                            banner: fileLocation,
                                            dob: moment(userMeQuery.data?.dob).format('YYYY-MM-DD'),
                                            facebookUrl: '',
                                            major: '',
                                            studentId: '',
                                            bio: userMeQuery.data?.bio ?? '',
                                            nickname: userMeQuery.data?.nickname ?? '',
                                        });
                                        userMeQuery.refetch();
                                    }
                                };
                                // click the input element to show file browser dialog
                                input.click();
                            }}
                            className="absolute right-4 top-4 h-10 w-10 rounded-lg  text-white"
                        >
                            <div className="flex h-full w-full items-center justify-center rounded-full bg-white text-black">
                                <Image strokeWidth={2} size={24} />
                            </div>
                        </button>
                        <div className="h-56"></div>

                        <div className="absolute -bottom-1/4 left-1/2 -translate-x-1/2 rounded-full border-[5px] border-white">
                            <div
                                className="relative"
                                onClick={() => {
                                    // create a new input element
                                    const input = document.createElement('input');
                                    // set its type to file
                                    input.type = 'file';
                                    // set how many files it can accept
                                    input.accept = 'image/*';
                                    // set onchange event to call callback when user has selected file

                                    input.onchange = async (e: any) => {
                                        const file = e.target.files[0];
                                        if (file) {
                                            const fileLocation = await uploadImageMutation.mutateAsync(file);

                                            await userMeApi.v1Put({
                                                address: userMeQuery.data?.address ?? '',
                                                name: userMeQuery.data?.name ?? '',
                                                phone: userMeQuery.data?.phone ?? '',
                                                avatar: fileLocation,
                                                banner: userMeQuery.data?.banner ?? '',
                                                dob: moment(userMeQuery.data?.dob).format('YYYY-MM-DD'),
                                                facebookUrl: '',
                                                major: '',
                                                studentId: '',
                                                bio: userMeQuery.data?.bio ?? '',
                                                nickname: userMeQuery.data?.nickname ?? '',
                                            });
                                            userMeQuery.refetch();
                                        }
                                    };
                                    // click the input element to show file browser dialog
                                    input.click();
                                }}
                            >
                                <img src={userMeQuery.data?.avatar} alt={userMeQuery.data?.name} className="h-20 w-20 rounded-full" />
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col gap-2 rounded-t-[50px] bg-white px-4 pt-10">
                        <NKFormWrapper<IV1UpdateProfileDto>
                            apiAction={userMeApi.v1Put}
                            defaultValues={{
                                address: userMeQuery.data?.address ?? '',
                                name: userMeQuery.data?.name ?? '',
                                phone: userMeQuery.data?.phone ?? '',
                                avatar: userMeQuery.data?.avatar ?? '',
                                banner: userMeQuery.data?.banner ?? '',
                                facebookUrl: '',
                                major: '',
                                studentId: '',
                                dob: moment(userMeQuery.data?.dob).format('YYYY-MM-DD'),
                                bio: userMeQuery.data?.bio ?? '',
                                nickname: userMeQuery.data?.nickname ?? '',
                            }}
                            schema={{
                                address: joi.string().required(),
                                name: joi.string().required(),
                                phone: joi.string().required(),
                                avatar: joi.string().required(),
                                banner: joi.string().required(),
                                facebookUrl: joi.any().optional(),
                                major: joi.any().optional(),
                                studentId: joi.any().optional(),
                                dob: joi.date().required(),
                                bio: joi.string().optional(),
                                nickname: joi.string().allow('').optional(),
                            }}
                            onExtraSuccessAction={(data) => {
                                toast.success('Cập nhật thông tin thành công');
                            }}
                        >
                            <div className="flex flex-col gap-5">
                                <NKTextField name="name" label="Họ và tên" placeholder="Name" theme={NKTextFieldTheme.AUTH} className="text-white" />
                                <NKTextField
                                    name="nickname"
                                    label="Nickname"
                                    placeholder={userMeQuery.data?.name ?? 'Nickname'}
                                    theme={NKTextFieldTheme.AUTH}
                                    className="text-white"
                                />
                                <NKTextField
                                    name="phone"
                                    type="text"
                                    label="Số điện thoại"
                                    placeholder="Số điện thoại"
                                    theme={NKTextFieldTheme.AUTH}
                                    className="text-white"
                                />
                                <NKTextField
                                    name="address"
                                    label="Địa chỉ"
                                    placeholder="Địa chỉ"
                                    theme={NKTextFieldTheme.AUTH}
                                    className="text-white"
                                />
                                <div className="sm:col-span-2">
                                    <NKDateField label="Ngày sinh" name="dob" theme={'AUTH'} />
                                </div>
                                <NKTextareaField
                                    name="bio"
                                    label="Bio"
                                    placeholder="Giới thiệu"
                                    // theme={NKTextFieldTheme.AUTH}
                                    className="text-white"
                                />

                                <div className=" w-full">
                                    <button
                                        type="submit"
                                        className="w-full rounded-full bg-blue-600 px-2.5 py-3  font-semibold text-white  shadow-sm  focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-200"
                                    >
                                        CẬP NHẬT
                                    </button>
                                </div>
                            </div>
                        </NKFormWrapper>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Page;
