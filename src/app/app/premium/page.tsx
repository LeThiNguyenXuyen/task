'use client';

import * as React from 'react';

import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { useMutation, useQuery } from '@tanstack/react-query';
import { ChevronLeft } from 'akar-icons';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import Cookies from 'universal-cookie';

import { NKConstant } from '@/core/NKConstant';
import { NKRouter } from '@/core/NKRouter';
import { userMeSubscriptionApi } from '@/core/api/user-me-subscription.api';
import { userMeApi } from '@/core/api/user-me.api';
import { RootState, store } from '@/core/store';
import { UserState, userActions } from '@/core/store/user';

interface PageProps {}

const Page: React.FC<PageProps> = () => {
    const router = useRouter();

    const userSubscription = useQuery(
        ['subscription', 'me'],
        () => {
            return userMeSubscriptionApi.v1Get();
        },
        {
            onSuccess: (data: any) => {
                if (data.id) {
                    toast.success('You are already a premium member!');
                    router.push(NKRouter.app.settings.index());
                }
            },
        },
    );

    const registerMutation = useMutation(
        () => {
            return userMeSubscriptionApi.v1PostRegister({
                redirectUrl: window.location.href,
                subscriptionId: 'b95c13b4-b680-4813-a01e-7a747213720c',
            });
        },
        {
            onSuccess: (data: any) => {
                window.location.href = data.checkoutUrl;
            },
        },
    );

    return (
        <div className="flex flex-1 bg-white w-full flex-col fade-in">
            <div className={`bg-[url('/assets/images/premium-bg.png')] bg-cover py-8 px-4 relative`}>
                <Link href={NKRouter.app.settings.index()} className="absolute text-white  top-4 left-4 w-6 h-6 rounded-lg">
                    <div>
                        <ChevronLeft strokeWidth={2} size={24} />
                    </div>
                </Link>
                <div className="flex flex-col items-center text-center text-white">
                    <img src="/assets/images/premium.png" className="w-32 h-32" />
                    <div className="font-semibold text-xl">Well-Trans Premium</div>
                    <div className="text-sm ">Go beyond the limit, get exclusive features and support us by subscribing to Well-Trans Premium.</div>
                </div>
            </div>
            <div className="bg-[#382153] px-4 py-8 flex-1">
                <img src="/assets/images/premium-content.png" className="w-full" />
                <div className="text-sm px-4 mt-4 text-gray-300">
                    By subscribing to Well-Trans Premium you agree to the Well-Trans Terms of Service and Privacy Policy.
                </div>
            </div>
            <button
                className="bg-[#382153] fixed bottom-0 z-50"
                onClick={() => {
                    registerMutation.mutate();
                }}
            >
                <img src="/assets/images/premium-btn.png" className="w-full" />
            </button>
        </div>
    );
};

export default Page;
