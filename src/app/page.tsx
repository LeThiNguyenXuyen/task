'use client';

import React, { use, useEffect } from 'react';

import { useRouter } from 'next/navigation';

import { Bell, Gear, PaperAirplane } from 'akar-icons';
import { toast } from 'react-toastify';

import { NKConstant } from '@/core/NKConstant';
import AuthWrapper from '@/core/components/wrapper/AuthWrapper';

interface HomePageProps {}

const HomePage: React.FunctionComponent<HomePageProps> = () => {
    const router = useRouter();

    useEffect(() => {
        router.push(NKConstant.AUTH_SUCCESS_FALLBACK_ROUTE);
    }, []);
    return (
        <AuthWrapper>
            <div className="h-screen flex-col flex">
                <div className="flex-1 flex flex-col justify-center items-center">
                    <div className="flex justify-center flex-col items-center">
                        <img className="w-20 h-20 " src="/assets/images/logo.png " alt="banner" />
                    </div>
                </div>
            </div>
        </AuthWrapper>
    );
};

export default HomePage;
