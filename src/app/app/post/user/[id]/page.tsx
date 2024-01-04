'use client';

import * as React from 'react';

import Link from 'next/link';

import { AiOutlineArrowLeft } from 'react-icons/ai';
import { HiOutlineLocationMarker } from 'react-icons/hi';
import { useSelector } from 'react-redux';

import { NKRouter } from '@/core/NKRouter';
import { userPostApi } from '@/core/api/user-post.api';
import PostCard from '@/core/components/post/PostCard';
import ScrollInfinityBuilder from '@/core/components/scroll/ScrollInfinityBuilder';
import { RootState } from '@/core/store';
import { UserState } from '@/core/store/user';

interface UserProfilePageProps {}

const UserProfilePage: React.FunctionComponent<UserProfilePageProps> = () => {
    return (
        <div className="fade-in flex w-[600px] flex-shrink-0 flex-col bg-white pb-10">
            {/* <div className="flex h-[52px] w-full items-center justify-start gap-9 px-4 text-black">
                <Link href={NKRouter.app.post.index()} className="text-xl">
                    <AiOutlineArrowLeft />
                </Link>
                <div className="flex flex-col">
                    <p className="text-lg font-bold">{name}</p>
                    <p className="text-xs font-medium">9 posts</p>
                </div>
            </div>
            <div className="relative z-10 h-[200px] w-full">
                <img className="h-full w-full object-cover object-bottom" src="https://images3.alphacoders.com/880/880765.png" />
                <figure className="absolute -bottom-16 left-3 h-36 w-36 overflow-hidden rounded-full border-4 border-[#17202A] bg-white">
                    <img
                        className="h-full w-full object-cover"
                        src={`https://ui-avatars.com/api/?name=${name}&background=0D8ABC&color=fff&size=32`}
                    />
                </figure>
            </div>
            <div className="relative z-0 flex w-full flex-col bg-white px-[14px] pb-3 pt-16">
                <Link
                    href={NKRouter.app.post.profile()}
                    className="absolute right-4 top-2.5 rounded-full border border-black px-5 py-2.5 text-base font-bold"
                >
                    Chỉnh sửa
                </Link>
                <p className="text-xl font-bold text-[#0F1419]">{name}</p>
                <p className="text-base font-medium text-black">@{name.toLocaleLowerCase().split(' ').join('-')}</p>
                <p className="mt-1.5 text-base font-medium text-[#0F1419]">Nhà sáng tạo nội dung</p>
                <div className="mt-1.5 flex items-center text-base font-medium text-black">
                    <div className="text-lg">
                        <HiOutlineLocationMarker />
                    </div>
                    <p>Việt Nam</p>
                </div>
            </div>
            <ScrollInfinityBuilder
                className="my-2 flex !w-full flex-col gap-4"
                queryApi={userPostApi.v1Get}
                sourceKey="userPostApi.v1Get"
                render={(item, index) => <PostCard data={item} key={item.id} className="shadow" />}
            /> */}
        </div>
    );
};

export default UserProfilePage;
