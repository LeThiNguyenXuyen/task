'use client';

import * as React from 'react';

import Link from 'next/link';

import { ArrowLeft } from 'akar-icons';
import { MdHomeFilled } from 'react-icons/md';

import { NKRouter } from '@/core/NKRouter';

interface UserProfilePageProps {}

const UserProfilePage: React.FunctionComponent<UserProfilePageProps> = () => {
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
                <img className="h-full w-full object-cover" src="https://picsum.photos/200/300" />
            </div>
            <div className="relative h-full w-full bg-[#E6EEFA] shadow">
                <div className="absolute -top-10 left-0 flex h-10 w-full justify-center gap-11 rounded-t-[64px] bg-inherit px-4 pt-8">
                    <div className="flex w-full flex-col items-center justify-center text-black">
                        <p className="text-base font-bold">12</p>
                        <p className="text-sm font-medium">người theo dõi</p>
                    </div>
                    <div className="flex w-full flex-col items-center justify-center text-black">
                        <p className="text-base font-bold">12</p>
                        <p className="text-sm font-medium">người theo dõi</p>
                    </div>
                </div>
                <div className="absolute -top-[84px] left-1/2 h-24 w-24 -translate-x-1/2 overflow-hidden rounded-full border-4 border-white">
                    <img className="h-full w-full object-cover" src="https://picsum.photos/200/300" />
                </div>
                <div className="flex h-full w-full flex-col items-center px-4 pt-10 text-center">
                    <p className="mb-1 text-base font-bold text-black">@kaine.sv</p>
                    <p className="mb-3  text-sm text-gray-500">
                        My name is Prathyaksh. I like dancing in the rain and travelling all around the world.
                    </p>
                    <div className="flex gap-6">
                        <button className="shadow-2xls rounded-full bg-[#3C91D3] px-6 py-2 text-base text-white">Theo dõi</button>
                        <button className="rounded-full bg-white px-6 py-2 text-base text-black shadow-2xl">Nhắn tin</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserProfilePage;
