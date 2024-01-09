'use client';

import * as React from 'react';

import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';

import { useMutation, useQuery } from '@tanstack/react-query';
import { ArrowLeft } from 'akar-icons';
import _get from 'lodash/get';
import _kebabCase from 'lodash/kebabCase';
import { MdHomeFilled } from 'react-icons/md';

import { NKRouter } from '@/core/NKRouter';
import { userFollowApi } from '@/core/api/user-follow.api';
import { IV1CreateWithUser, userMeChatApi } from '@/core/api/user-me-chat.api';
import { userMeFollowApi } from '@/core/api/user-me-follow.api';
import { userPostApi } from '@/core/api/user-post.api';
import { userApi } from '@/core/api/user.api';
import PostCard from '@/core/components/post/PostCard';
import ScrollInfinityBuilder from '@/core/components/scroll/ScrollInfinityBuilder';
import { FilterComparator } from '@/core/models/common';

interface UserProfilePageProps {}

const UserProfilePage: React.FunctionComponent<UserProfilePageProps> = () => {
    const params = useParams();

    const id = _get(params, 'id') as string;
    const router = useRouter();

    const userQuery = useQuery(['user', id], async () => {
        const res = await userApi.v1GetById(id);
        return res;
    });

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

    const createFollowMutation = useMutation(
        async () => {
            const res = await userMeFollowApi.createFollow(id);
            return res;
        },
        {
            onSuccess: () => {
                userFollowBy.refetch();
                userFollowTo.refetch();
                isFollowQuery.refetch();
            },
        },
    );

    const userFollowBy = useQuery(['userFollowBy', id], async () => {
        const res = await userFollowApi.countFollowBy(id);
        return res;
    });

    const userFollowTo = useQuery(['userFollowTo', id], async () => {
        const res = await userFollowApi.countFollowTo(id);
        return res;
    });

    const isFollowQuery = useQuery(['isFollow', id], async () => {
        const res = await userMeFollowApi.isFollow(id);
        return res;
    });

    return (
        <div className="fade-in relative flex h-full w-full flex-shrink-0 flex-col items-start justify-start bg-white">
            <Link className="absolute left-4 top-4 z-10" href={NKRouter.app.post.index()}>
                <button className="flex h-10 w-10 items-center justify-center rounded-full bg-white">
                    <ArrowLeft className="h-8 w-8 text-black" />
                </button>
            </Link>
            <Link className="absolute right-4 top-4 z-10" href={NKRouter.app.post.index()}>
                <button className="flex h-10 w-10 items-center justify-center rounded-full bg-white">
                    <MdHomeFilled className="h-8 w-8 text-black" />
                </button>
            </Link>
            <div className="h-56 w-full flex-shrink-0">
                <img className="h-full w-full object-cover" src={userQuery.data?.avatar} />
            </div>
            <div className="relative h-full w-full bg-[#E6EEFA] shadow">
                <div className="absolute -top-10 left-0 flex h-10 w-full justify-center gap-11 rounded-t-[64px] bg-inherit px-4 pt-8">
                    <div className="flex w-full flex-col items-center justify-center text-black">
                        <p className="text-base font-bold">{userFollowBy.data}</p>
                        <p className="text-sm font-medium">người theo dõi</p>
                    </div>
                    <div className="flex w-full flex-col items-center justify-center text-black">
                        <p className="text-base font-bold">{userFollowTo.data}</p>
                        <p className="text-sm font-medium">theo dõi</p>
                    </div>
                </div>
                <div className="absolute -top-[84px] left-1/2 h-24 w-24 -translate-x-1/2 overflow-hidden rounded-full border-4 border-white bg-blue-400">
                    <img className="h-full w-full object-cover" src={userQuery.data?.avatar} />
                </div>
                <div className="flex h-full w-full flex-col items-center px-4 pt-10">
                    <p className="mb-1 text-center text-base font-bold  text-black">@{_kebabCase(userQuery.data?.name).replaceAll('-', '_')}</p>
                    <p className="mb-3  text-center text-sm  text-gray-500">
                        My name is Prathyaksh. I like dancing in the rain and travelling all around the world.
                    </p>
                    <div className="flex gap-6">
                        <button
                            className="shadow-2xls rounded-full bg-[#3C91D3] px-6 py-2 text-base text-white"
                            onClick={() => createFollowMutation.mutate()}
                        >
                            {isFollowQuery.data ? 'Đang theo dõi' : 'Theo dõi'}
                        </button>
                        <button
                            className="rounded-full bg-white px-6 py-2 text-base text-black shadow-2xl"
                            onClick={() =>
                                createChatMutation.mutate({
                                    name: userQuery.data?.id || '',
                                    userId: userQuery.data?.id || '',
                                })
                            }
                        >
                            Nhắn tin
                        </button>
                    </div>
                    <div className="w-full">
                        <ScrollInfinityBuilder
                            className="my-2 mb-8 flex !w-full flex-col gap-2"
                            queryApi={userPostApi.v1Get}
                            filters={[`user.id||${FilterComparator.EQUAL}||${id}`]}
                            sourceKey="userPostApi.v1Get"
                            render={(item, index) => <PostCard data={item} key={item.id} className="shadow" />}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserProfilePage;
