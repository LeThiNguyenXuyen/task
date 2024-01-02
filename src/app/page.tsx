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
            <div className="flex h-screen flex-col">
                <div className="flex flex-1 flex-col items-center justify-center">
                    <div className="flex flex-col items-center justify-center">
                        <img className="h-20 w-20 " src="/assets/images/logo.png " alt="banner" />
                    </div>
                </div>
            </div>
        </AuthWrapper>
    );
};

export default HomePage;
