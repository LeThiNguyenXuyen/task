import { Fragment, FunctionComponent, useMemo } from 'react';

import { Menu, Transition } from '@headlessui/react';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useParams } from '@tanstack/react-router';
import { Button } from 'antd';
import clsx from 'clsx';
import { useSelector } from 'react-redux';
import Cookies from 'universal-cookie';

import { NKConstant } from '@/core/NKConstant';
import { NKRouter } from '@/core/NKRouter';
import { userMeApi } from '@/core/api/user-me.api';
import NKLink from '@/core/routing/components/NKLink';
import { useNKRouter } from '@/core/routing/hooks/NKRouter';
import { RootState, store } from '@/core/store';
import { UserState, userActions } from '@/core/store/user';

interface HeaderProps {}

const sections = [
    {
        id: 'home',
        name: 'Home',
        href: '/',
    },
    {
        id: 'services',
        name: 'Services',
        href: NKRouter.freelance.index(),
    },
    {
        id: 'booking',
        name: 'Booking',
        href: NKRouter.booking.index(),
    },
    {
        id: 'forum',
        name: 'Forum',
        href: NKRouter.forum.index(),
    },
];

const Header: FunctionComponent<HeaderProps> = () => {
    const router = useNKRouter();

    const userState = useSelector<RootState, UserState>((state) => state.user);

    const { mutate: logout } = useMutation(
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

    const userMeQuery = useQuery(
        ['user-me', userState.id],
        () => {
            return userMeApi.v1Get();
        },
        {
            enabled: !!userState.id,
        },
    );

    return (
        <nav className="fixed left-0 top-0 z-50 flex w-full justify-center bg-black px-8">
            <div className={`flex h-20 w-full items-center justify-between gap-x-96 gap-y-2  py-4 text-sm font-normal leading-[17px] tracking-wide`}>
                <NKLink href={NKRouter.app.home()}>
                    <div className="flex items-center justify-center self-stretch pb-px [min-height:48px]">
                        <img
                            className="w-24 self-stretch mix-blend-normal"
                            src={'https://uortjlczjmucmpaqqhqm.supabase.co/storage/v1/object/public/firejet-converted-images/images/33%3A554.webp'}
                        />
                    </div>
                </NKLink>
                <div className="flex     items-center justify-center gap-x-10">
                    {sections.map((item) => (
                        <div key={item.id} className={clsx('flex items-center text-left duration-200 hover:text-green-400')}>
                            <NKLink href={`${item.href}`}>{item.name}</NKLink>
                        </div>
                    ))}
                    <Menu as="div" className="relative ml-3">
                        <div>
                            {userState.isAuth ? (
                                <Menu.Button className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                                    <span className="absolute -inset-1.5" />
                                    <span className="sr-only">Open user menu</span>
                                    <img className="h-8 w-8 flex-shrink-0 rounded-full" src={userMeQuery.data?.avatar} alt="avatar" />
                                </Menu.Button>
                            ) : (
                                <Button onClick={() => router.push(NKRouter.auth.login())}>Login</Button>
                            )}
                        </div>
                        <Transition
                            as={Fragment}
                            enter="transition ease-out duration-100"
                            enterFrom="transform opacity-0 scale-95"
                            enterTo="transform opacity-100 scale-100"
                            leave="transition ease-in duration-75"
                            leaveFrom="transform opacity-100 scale-100"
                            leaveTo="transform opacity-0 scale-95"
                        >
                            <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                <Menu.Item>
                                    {({ active }) => (
                                        <NKLink
                                            href={NKRouter.me.index()}
                                            className={clsx(active ? 'bg-gray-100' : '', 'block cursor-pointer px-4 py-2 text-sm text-gray-700')}
                                        >
                                            Your Profile
                                        </NKLink>
                                    )}
                                </Menu.Item>
                                <Menu.Item>
                                    {({ active }) => (
                                        <NKLink
                                            href={NKRouter.booking.index()}
                                            className={clsx(active ? 'bg-gray-100' : '', 'block cursor-pointer px-4 py-2 text-sm text-gray-700')}
                                        >
                                            My Booking
                                        </NKLink>
                                    )}
                                </Menu.Item>
                                <Menu.Item>
                                    {({ active }) => (
                                        <NKLink
                                            href={NKRouter.myService.service.index()}
                                            className={clsx(active ? 'bg-gray-100' : '', 'block cursor-pointer px-4 py-2 text-sm text-gray-700')}
                                        >
                                            My Service
                                        </NKLink>
                                    )}
                                </Menu.Item>
                                <Menu.Item>
                                    {({ active }) => (
                                        <div
                                            onClick={() => logout()}
                                            className={clsx(active ? 'bg-gray-100' : '', 'block cursor-pointer px-4 py-2 text-sm text-gray-700')}
                                        >
                                            Sign out
                                        </div>
                                    )}
                                </Menu.Item>
                            </Menu.Items>
                        </Transition>
                    </Menu>

                    {!userState && <Button onClick={() => router.push('/auth/login')}>Login</Button>}
                </div>
            </div>
        </nav>
    );
};

export default Header;
