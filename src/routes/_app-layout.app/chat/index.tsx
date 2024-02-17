import React, { useEffect } from 'react';

import { useMutation, useQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';
import clsx from 'clsx';
import _get from 'lodash/get';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';

import { NKRouter } from '@/core/NKRouter';
import { IV1CreateWithUser, userMeChatApi } from '@/core/api/user-me-chat.api';
import { userApi } from '@/core/api/user.api';
import { FilterComparator } from '@/core/models/common';
import NKLink from '@/core/routing/components/NKLink';
import { useNKRouter } from '@/core/routing/hooks/NKRouter';
import { RootState } from '@/core/store';
import { UserState } from '@/core/store/user';
import { isActiveTime } from '@/core/utils/data.helper';
import { HKMoment } from '@/core/utils/moment';

interface PageProps {}

const Page: React.FC<PageProps> = () => {
    const router = useNKRouter();
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
            className="flex w-full flex-1  flex-col gap-4 overflow-y-auto"
            style={{
                height: 'calc(100vh - 4.5rem)',
            }}
        >
            <div>
                <div className="flex h-16 w-full border-b border-gray-300  p-3">
                    <input
                        placeholder="Tìm kiếm"
                        className="right-0 h-full  w-full border border-gray-300 bg-white px-4 py-1 text-black shadow-lg duration-300 hover:border-blue-500 focus:border-blue-500 focus:outline-none"
                        {...searchMethods.register('search')}
                    />
                </div>
            </div>

            {!Boolean(watchSearch) ? (
                <div className="px-4 py-2">
                    {chatQuery.data
                        .filter((chat) => chat.chatMessages.length)
                        ?.sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
                        .map((chat, index) => {
                            const isActive = chat.users.every((u) => isActiveTime(u.lastActive));
                            const otherUser = chat.users.filter((u) => u.id !== userState.id)[0];

                            return (
                                <NKLink
                                    href={NKRouter.app.chat.detail(chat.id)}
                                    key={`${chat.id}-chat`}
                                    className={clsx('flex w-full flex-1 items-center  gap-4 py-2', {
                                        'border-b': userQuery.data.length - 1 !== index,
                                    })}
                                >
                                    <div className="relative h-12 w-12  flex-shrink-0">
                                        <img
                                            className="h-full w-full overflow-hidden rounded-full"
                                            src={chat.isGroup ? chat.banner : chat.users.filter((u) => u.id !== userState.id)[0]?.avatar}
                                            alt=""
                                        />
                                        {isActive && (
                                            <>
                                                <div className="absolute bottom-0.5 right-0.5 z-10 h-3 w-3 rounded-full bg-green-500"></div>
                                            </>
                                        )}
                                    </div>
                                    <div className="flex flex-col justify-center  text-left">
                                        <div className="line-clamp-1 text-lg font-semibold">{chat.isGroup ? chat.name : otherUser.name}</div>
                                        <div className="text-xs">{HKMoment.moment(chat?.lastActivity).fromNow()}</div>
                                    </div>
                                </NKLink>
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
                                    className={clsx('flex w-full flex-1 items-center  gap-4 py-2', {
                                        'border-b': userQuery.data.length - 1 !== index,
                                    })}
                                    key={`${user.id}-search`}
                                >
                                    <div className="h-16 w-16 flex-shrink-0 overflow-hidden rounded-full">
                                        <img className="h-full w-full" src={user.avatar} alt="" />
                                    </div>
                                    <div className="flex flex-col justify-center  text-left">
                                        <div className="text-lg font-semibold"> {user.name}</div>
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
export const Route = createFileRoute('/_app-layout/app/chat/')({
    component: Page,
});
