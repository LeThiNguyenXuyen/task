import * as React from 'react';

import { useQuery } from '@tanstack/react-query';
import { Outlet, createFileRoute } from '@tanstack/react-router';
import { Bell, ChatDots, Gear, Image, Newspaper, ShoppingBag } from 'akar-icons';
import clsx from 'clsx';
import { useSelector } from 'react-redux';

import { NKRouter } from '@/core/NKRouter';
import { userMeNotificationApi } from '@/core/api/user-me-notification';
import { userMeApi } from '@/core/api/user-me.api';
import AuthWrapper from '@/core/components/wrapper/AuthWrapper';
import NKLink from '@/core/routing/components/NKLink';
import { useNKPathname } from '@/core/routing/hooks/NKPathname';
import { askForPermissionToReceiveNotifications } from '@/core/services/push-notification';
import { RootState } from '@/core/store';

interface LayoutProps {}

const Layout: React.FunctionComponent<LayoutProps> = () => {
    const userState = useSelector<RootState, RootState['user']>((state) => state.user);

    const pathName = useNKPathname();
    React.useEffect(() => {
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

    if (
        pathName.startsWith(NKRouter.app.product.detail('')) ||
        pathName.startsWith(NKRouter.app.settings.index()) ||
        pathName.startsWith(NKRouter.app.userSale.detail('')) ||
        pathName.startsWith(NKRouter.app.userSaleBooking.detail('')) ||
        pathName.startsWith(NKRouter.app.userSaleBookingHistory.detail(''))
    )
        return (
            <AuthWrapper>
                <div className="flex h-full flex-1 flex-col items-start justify-start overflow-y-scroll">
                    <Outlet />
                </div>
            </AuthWrapper>
        );

    return (
        <AuthWrapper>
            <div className="flex h-screen w-full flex-col">
                <div className="flex h-full flex-1 flex-col items-center justify-center overflow-y-scroll">
                    <Outlet />
                </div>
                <div className=" bottom-bar bottom-0 z-40 flex h-20 w-full items-start justify-center gap-0 rounded-t-xl bg-white px-4">
                    {/* <Link
                        href={NKRouter.app.home()}
                        className={clsx('', {
                            'text-indigo-600': pathName === NKRouter.app.home(),
                        })}
                    >
                        <Home strokeWidth={2} size={24} />
                    </Link> */}
                    <NKLink
                        href={NKRouter.app.chat.index()}
                        className={clsx('relative flex h-full w-full items-center justify-center ', {
                            'border-t-2 border-current text-indigo-600': pathName.includes('chat'),
                        })}
                    >
                        <ChatDots strokeWidth={2} size={32} />
                    </NKLink>
                    <NKLink
                        href={NKRouter.app.post.index()}
                        className={clsx('relative flex h-full w-full items-center justify-center', {
                            'border-t-2 border-current text-indigo-600': pathName.includes('post'),
                        })}
                    >
                        <Newspaper strokeWidth={2} size={32} />
                    </NKLink>
                    <NKLink
                        href={NKRouter.app.userSale.index()}
                        className={clsx('relative flex h-full w-full items-center justify-center', {
                            'border-t-2 border-current text-indigo-600': pathName.includes('user-sale'),
                        })}
                    >
                        <ShoppingBag strokeWidth={2} size={32} />
                    </NKLink>
                    <NKLink
                        href={NKRouter.app.userSaleBooking.index()}
                        className={clsx('relative flex h-full w-full items-center justify-center', {
                            'border-t-2 border-current text-indigo-600': pathName.includes('booking'),
                        })}
                    >
                        <Image strokeWidth={2} size={32} />
                    </NKLink>
                    <NKLink
                        href={NKRouter.app.notification.index()}
                        className={clsx('relative flex h-full w-full items-center justify-center', {
                            'border-t-2 border-current text-indigo-600': pathName.includes('notification'),
                        })}
                    >
                        {Boolean(countUnread.data) && (
                            <div className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs text-white">
                                {countUnread.data}
                            </div>
                        )}
                        <Bell strokeWidth={2} size={32} />
                    </NKLink>

                    <NKLink
                        className={clsx('flex h-full w-full items-center justify-center', {
                            'border-t-2 border-current text-indigo-600': pathName.includes('settings'),
                        })}
                        href={NKRouter.app.settings.index()}
                    >
                        <Gear strokeWidth={2} size={32} />
                    </NKLink>
                </div>
            </div>
        </AuthWrapper>
    );
};

export const Route = createFileRoute('/_app-layout')({
    component: Layout,
});
