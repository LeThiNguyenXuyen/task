'use client';

import React, { useEffect } from 'react';

import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { useMutation, useQuery } from '@tanstack/react-query';
import clsx from 'clsx';
import _get from 'lodash/get';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';

import { NKRouter } from '@/core/NKRouter';
import { IV1CreateWithUser, userMeChatApi } from '@/core/api/user-me-chat.api';
import { userApi } from '@/core/api/user.api';
import { FilterComparator } from '@/core/models/common';
import { RootState } from '@/core/store';
import { UserState } from '@/core/store/user';
import { isActiveTime } from '@/core/utils/data.helper';
import { HKMoment } from '@/core/utils/moment';

interface PageProps {}

const Page: React.FC<PageProps> = () => {
    const router = useRouter();
    const userState = useSelector<RootState, UserState>((state) => state.user);

    const createChatMutation = useMutation(
        async (dto: IV1CreateWithUser) => {
            const res = await userMeChatApi.v1PostCreateWithUser(dto);

            return res;
        },
        {
            onSuccess: (data) => {
                if (!data) return;
                router.push(NKRouter.app.chat.detail(data.id));
            },
        },
    );

    const searchMethods = useForm<{ search: string }>({ defaultValues: { search: '' } });

    const watchSearch = searchMethods.watch('search');

    const chatQuery = useQuery(
        ['user-system', 'user'],
        async () => {
            const res = await userMeChatApi.v1GetList({
                filters: [],
                orderBy: [],
                page: 0,
                pageSize: 10000,
            });

            return res.data;
        },
        {
            initialData: [],
        },
    );

    const userQuery = useQuery(
        ['user-system', 'user', userState.id, watchSearch],
        async () => {
            const res = await userApi.v1Get({
                filters: [`name||${FilterComparator.LIKE}||${watchSearch}`],
                orderBy: [],
                page: 0,
                pageSize: 10000,
            });

            return res.data.filter((user) => user.id !== userState.id);
        },
        {
            initialData: [],
        },
    );

    return (
        <div
            className="flex flex-1 flex-col  w-full gap-4 overflow-y-auto"
            style={{
                height: 'calc(100vh - 4.5rem)',
            }}
        >
            <div className="flex h-16 p-3 bg-gray-100 border-b border-gray-500 w-full">
                <input
                    placeholder="Tìm kiếm"
                    className="w-full h-full border-black border rounded-full px-4 py-1 text-black"
                    {...searchMethods.register('search')}
                />
            </div>

            {!Boolean(watchSearch) ? (
                <div className="p-4">
                    {chatQuery.data
                        .filter((chat) => chat.chatMessages.length)
                        ?.sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
                        .map((chat, index) => {
                            const isActive = chat.users.every((u) => isActiveTime(u.lastActive));
                            const otherUser = chat.users.filter((u) => u.id !== userState.id)[0];

                            return (
                                <Link
                                    href={NKRouter.app.chat.detail(chat.id)}
                                    key={`${chat.id}-chat`}
                                    className={clsx('flex-1 flex gap-4 items-center  w-full py-2', {
                                        'border-b': userQuery.data.length - 1 !== index,
                                    })}
                                >
                                    <div className="w-16 h-16 flex-shrink-0  relative">
                                        <img
                                            className="w-full h-full rounded-full overflow-hidden"
                                            src={chat.isGroup ? chat.banner : chat.users.filter((u) => u.id !== userState.id)[0]?.avatar}
                                            alt=""
                                        />
                                        {isActive && (
                                            <>
                                                <div className="absolute z-10 bottom-0.5 right-0.5 w-3 h-3 bg-green-500 rounded-full"></div>
                                            </>
                                        )}
                                    </div>
                                    <div className="flex flex-col justify-center  text-left">
                                        <div className="font-semibold text-lg line-clamp-1">{chat.isGroup ? chat.name : otherUser.name}</div>
                                        <div className="text-xs">{HKMoment.moment(chat?.lastActivity).fromNow()}</div>
                                    </div>
                                </Link>
                            );
                        })}
                </div>
            ) : (
                <div className="p-4">
                    {Boolean(userQuery.data.length) ? (
                        userQuery.data?.map((user, index) => {
                            return (
                                <button
                                    onClick={() => {
                                        createChatMutation.mutate({
                                            name: user.name,
                                            userId: user.id,
                                        });
                                    }}
                                    className={clsx('flex-1 flex gap-4 items-center  w-full py-2', {
                                        'border-b': userQuery.data.length - 1 !== index,
                                    })}
                                    key={`${user.id}-search`}
                                >
                                    <div className="w-16 h-16 rounded-full overflow-hidden flex-shrink-0">
                                        <img className="w-full h-full" src={user.avatar} alt="" />
                                    </div>
                                    <div className="flex flex-col justify-center  text-left">
                                        <div className="font-semibold text-lg"> {user.name}</div>
                                        <div className="text-xs">{HKMoment.moment(user.createdAt).format('DD/MM/YYYY')}</div>
                                    </div>
                                </button>
                            );
                        })
                    ) : (
                        <p className="text-black">Không tìm thấy người dùng</p>
                    )}
                </div>
            )}
        </div>
    );
};

export default Page;
