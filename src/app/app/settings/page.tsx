'use client';

import * as React from 'react';

import Link from 'next/link';

import { useMutation, useQuery } from '@tanstack/react-query';
import { ArrowLeft, ChevronLeft, ChevronRight, Language, LockOn, Person, SignOut } from 'akar-icons';
import { AiFillStar } from 'react-icons/ai';
import { MdConnectWithoutContact } from 'react-icons/md';
import { useSelector } from 'react-redux';
import Cookies from 'universal-cookie';

import { NKConstant } from '@/core/NKConstant';
import { NKRouter } from '@/core/NKRouter';
import { userMeApi } from '@/core/api/user-me.api';
import { RootState, store } from '@/core/store';
import { UserState, userActions } from '@/core/store/user';

interface PageProps {}

const Page: React.FC<PageProps> = () => {
    const userState = useSelector<RootState, UserState>((state) => state.user);
    const userMeQuery = useQuery(['user-me', userState.id], () => {
        return userMeApi.v1Get();
    });

    const logoutMutation = useMutation(
        () => {
            return userMeApi.v1PostLogout();
        },
        {
            onSuccess: () => {
                const cookies = new Cookies();
                cookies.remove(NKConstant.TOKEN_COOKIE_KEY);
                store.dispatch(userActions.resetState());
                window.location.reload();
            },
        },
    );

    return (
        <div className="fade-in relative flex w-full flex-1 flex-col bg-white">
            {/* <div className="relative">
                <div
                    className="h-40"
                    style={{
                        backgroundImage: `url(${userMeQuery.data?.banner})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                    }}
                ></div>

                <div className="absolute -bottom-1/4 left-8">
                    <div className="flex flex-col gap-2">
                        <div className="relative">
                            <img src={userMeQuery.data?.avatar} alt={userMeQuery.data?.name} className="w-20 h-20 rounded-full" />
                            <div className="w-4 h-4 bg-green-500 rounded-full absolute bottom-1 right-3"></div>
                        </div>
                        <div className="text-sm font-semibold">{userMeQuery.data?.name}</div>
                    </div>
                </div>
            </div> */}
            <div className="mt-3 flex flex-col gap-2 px-4">
                <Link href={NKRouter.app.home()}>
                    <button className="absolute left-4 top-4 flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-gray-400 text-white">
                        <ArrowLeft strokeWidth={1} size={24} />
                    </button>
                </Link>
                <h1 className="text-center text-3xl font-semibold text-black">Setting</h1>
                <div className=" mt-3">
                    <Link href={NKRouter.app.settings.update()} className="flex justify-between gap-4 py-3 text-sm">
                        <div className="flex items-center justify-center gap-4">
                            <div>Update Profile</div>
                        </div>
                        <div className="h-5 w-5">
                            <Person strokeWidth={1} size={20} />
                        </div>
                    </Link>

                    <Link href={NKRouter.app.settings.changePassword()} className="flex  justify-between gap-4 py-3 text-sm">
                        <div className="flex items-center justify-center gap-4">
                            <div>Change Password</div>
                        </div>
                        <div className="h-5 w-5">
                            <LockOn strokeWidth={1} size={20} />
                        </div>
                    </Link>
                </div>
                {/* <div className="border border-gray-300 rounded-xl mt-3">
                    <Link href={NKRouter.app.premium.index()} className=" py-3 px-4  flex gap-4 text-sm justify-between">
                        <div className="flex items-center justify-center gap-4">
                            <div className="text-xl text-[#FF32FF]">
                                <AiFillStar />
                            </div>
                            <div>Well-Trans Premium</div>
                        </div>
                        <div>
                            <ChevronRight strokeWidth={1} size={24} />
                        </div>
                    </Link>
                </div> */}
                <div className="mt-4">
                    <h3 className="text-xs font-semibold text-gray-300">Information</h3>
                </div>
                <div className="">
                    <Link href={NKRouter.app.contactUs.index()} className=" flex justify-between gap-4 py-3 text-sm">
                        <div className="flex items-center justify-center gap-4">
                            <div>Contacts</div>
                        </div>
                        <div className="text-xl ">
                            <MdConnectWithoutContact />
                        </div>
                    </Link>
                </div>
                <button
                    onClick={() => {
                        logoutMutation.mutate();
                    }}
                    className="mt-4 flex items-center justify-center gap-2 rounded-md bg-indigo-600 py-2 text-sm text-white"
                >
                    <SignOut strokeWidth={2} size={20} />
                    <div>Logout</div>
                </button>
            </div>
        </div>
    );
};

export default Page;
