'use client';

import React, { useEffect } from 'react';

import Link from 'next/link';
import { useParams, usePathname, useSearchParams } from 'next/navigation';

import { useQuery } from '@tanstack/react-query';
import { Bell, Gear, Home, PaperAirplane, ShoppingBag } from 'akar-icons';
import clsx from 'clsx';
import { useSelector } from 'react-redux';

import { NKRouter } from '@/core/NKRouter';
import { userMeNotificationApi } from '@/core/api/user-me-notification';
import { userMeApi } from '@/core/api/user-me.api';
import AuthWrapper from '@/core/components/wrapper/AuthWrapper';
import { askForPermissionToReceiveNotifications } from '@/core/services/push-notification';
import { RootState } from '@/core/store';
import { UserState } from '@/core/store/user';

interface LayoutProps {
    children: React.ReactNode;
}

const Layout: React.FunctionComponent<LayoutProps> = ({ children }) => {
    const userState = useSelector<RootState, UserState>((state) => state.user);

    const pathName = usePathname();
    useEffect(() => {
        if (userState.isAuth) {
            askForPermissionToReceiveNotifications().then((result) => {
                if (!result) return;
                userMeApi.v1PutMessageToken({
                    messageToken: result,
                });
            });
        }
    }, [userState.isAuth]);

    const countUnread = useQuery(
        ['count-unread'],
        async () => {
            const res = await userMeNotificationApi.v1GetCountUnread();

            return res;
        },
        {
            refetchInterval: 2000,
            initialData: 0,
        },
    );

    if (pathName.startsWith(NKRouter.app.product.detail('')) || pathName.startsWith(NKRouter.app.settings.index()))
        return (
            <AuthWrapper>
                <div className="flex h-full flex-1 flex-col items-center justify-center overflow-y-scroll">{children}</div>
            </AuthWrapper>
        );

    return (
        <AuthWrapper>
            <div className="flex h-screen flex-col ">
                <div className="flex h-full flex-1 flex-col items-center justify-center overflow-y-scroll">{children}</div>
                <div className=" bottom-bar bottom-0 z-40 flex w-full items-center justify-between rounded-t-xl bg-white px-16  py-6">
                    <Link
                        href={NKRouter.app.home()}
                        className={clsx('', {
                            'text-indigo-600': pathName === NKRouter.app.home(),
                        })}
                    >
                        <Home strokeWidth={2} size={24} />
                    </Link>
                    <Link
                        href={NKRouter.app.chat.index()}
                        className={clsx('', {
                            'text-indigo-600': pathName.includes('chat'),
                        })}
                    >
                        <PaperAirplane strokeWidth={2} size={24} />
                    </Link>
                    <Link
                        href={NKRouter.app.notification.index()}
                        className={clsx('relative', {
                            'text-indigo-600': pathName.includes('notification'),
                        })}
                    >
                        {Boolean(countUnread.data) && (
                            <div className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs text-white">
                                {countUnread.data}
                            </div>
                        )}
                        <Bell strokeWidth={2} size={24} />
                    </Link>
                    <Link
                        href={NKRouter.app.product.index()}
                        className={clsx('relative', {
                            'text-indigo-600': pathName.includes('product'),
                        })}
                    >
                        {Boolean(countUnread.data) && (
                            <div className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs text-white">
                                {countUnread.data}
                            </div>
                        )}
                        <ShoppingBag strokeWidth={2} size={24} />
                    </Link>
                    <Link
                        className={clsx('', {
                            'text-indigo-600': pathName.includes('settings'),
                        })}
                        href={NKRouter.app.settings.index()}
                    >
                        <Gear strokeWidth={2} size={24} />
                    </Link>
                </div>
            </div>
        </AuthWrapper>
    );
};

export default Layout;
