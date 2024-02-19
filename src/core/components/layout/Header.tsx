import * as React from 'react';

import { Menu, Transition } from '@headlessui/react';
import { useMutation, useQuery } from '@tanstack/react-query';
import { Link, useParams } from '@tanstack/react-router';
import { Button } from 'antd';
import clsx from 'clsx';
import { motion, useScroll } from 'framer-motion';
import { useSelector } from 'react-redux';
import Cookies from 'universal-cookie';

import { NKConstant } from '@/core/NKConstant';
import { NKRouter } from '@/core/NKRouter';
import { meApi } from '@/core/api/me.api';
import { userMeApi } from '@/core/api/user-me.api';
import { NKLink } from '@/core/routing/components/NKLink';
import { useNKRouter } from '@/core/routing/hooks/NKRouter';
import { RootState, store } from '@/core/store';
import { UserState, userActions } from '@/core/store/user';

interface HeaderProps {}

const Header: React.FunctionComponent<HeaderProps> = () => {
    const router = useNKRouter();

    const userState = useSelector<RootState, UserState>((state) => state.user);

    const { mutate: logout } = useMutation(
        () => {
            return meApi.v1PostLogout();
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
            return meApi.v1Get();
        },
        {
            enabled: !!userState.id,
        },
    );

    const { scrollYProgress } = useScroll();

    const [isSticky, setSticky] = React.useState(false);

    React.useEffect(() => {
        scrollYProgress.onChange((latest) => {
            if (latest > 0.05) {
                setSticky(true);
            } else {
                setSticky(false);
            }
        });
    }, [scrollYProgress]);

    return (
        <motion.header
            className={clsx('fixed left-0 top-0 z-50 w-full justify-center duration-200', {
                'bg-white dark:bg-neutral-900': isSticky,
                'bg-transparent': !isSticky,
            })}
        >
            <nav className="relative z-10 mx-auto  w-full max-w-7xl">
                <div className="flex h-20 items-center justify-between px-4 lg:container">
                    <div className="hidden flex-1 justify-start space-x-3 sm:space-x-8 md:flex lg:space-x-10">
                        <a className="ttnc-logo text-primary-6000 inline-block h-16 w-16 self-center focus:outline-none focus:ring-0" href="/">
                            <img src="/assets/images/logo.png" alt="logo" className="h-full w-full" />
                        </a>
                        <div className="hidden h-10 self-center border-l border-neutral-300 dark:border-neutral-500 lg:block" />
                        <div className="hidden lg:flex ">
                            <div className="DropdownTravelers relative flex" data-headlessui-state>
                                <button
                                    className="group h-10 self-center rounded-md py-2 text-sm font-medium text-opacity-90 hover:text-opacity-100 focus:outline-none sm:h-12 sm:text-base"
                                    type="button"
                                    aria-expanded="false"
                                    data-headlessui-state
                                    id="headlessui-popover-button-:rad:"
                                >
                                    <div className=" inline-flex items-center " role="button">
                                        <span>Travelers</span>
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 24 24"
                                            fill="currentColor"
                                            aria-hidden="true"
                                            className="ml-2 h-5 w-5 text-neutral-700 text-opacity-70 transition duration-150 ease-in-out group-hover:text-opacity-80 "
                                        >
                                            <path
                                                fillRule="evenodd"
                                                d="M12.53 16.28a.75.75 0 01-1.06 0l-7.5-7.5a.75.75 0 011.06-1.06L12 14.69l6.97-6.97a.75.75 0 111.06 1.06l-7.5 7.5z"
                                                clipRule="evenodd"
                                            />
                                        </svg>
                                    </div>
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="hidden flex-1 flex-shrink-0 justify-end text-neutral-700 dark:text-neutral-100 md:flex lg:flex-none">
                        <div>
                            {userState.isAuth ? (
                                <div className="hidden items-center space-x-1 lg:flex">
                                    <a
                                        className="group inline-flex items-center self-center rounded-full border border-neutral-300 px-4 py-2 text-sm font-medium text-gray-700 text-opacity-90 hover:border-neutral-400 hover:text-opacity-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 dark:border-neutral-700 dark:text-neutral-300"
                                        href="/add-listing"
                                    >
                                        List your property
                                    </a>
                                    <div className="relative flex " data-headlessui-state>
                                        <button
                                            className=" group relative inline-flex h-10 w-10 items-center justify-center self-center rounded-full text-base font-medium text-opacity-90 hover:bg-gray-100 hover:text-opacity-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 dark:hover:bg-neutral-800 sm:h-12 sm:w-12"
                                            type="button"
                                            aria-expanded="false"
                                            data-headlessui-state
                                            id="headlessui-popover-button-:raj:"
                                        >
                                            <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-blue-500" />
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                strokeWidth="1.5"
                                                stroke="currentColor"
                                                aria-hidden="true"
                                                className="h-6 w-6"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0"
                                                />
                                            </svg>
                                        </button>
                                    </div>
                                    <Menu as="div" className="relative ml-3">
                                        <Menu.Button className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                                            <span className="absolute -inset-1.5" />
                                            <span className="sr-only">Open user menu</span>
                                            <img className="h-8 w-8 flex-shrink-0 rounded-full" src={userMeQuery.data?.avatar} alt="avatar" />
                                        </Menu.Button>

                                        <Transition
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
                                                            href={NKRouter.setting.index()}
                                                            className={clsx(
                                                                active ? 'bg-gray-100' : '',
                                                                'block cursor-pointer px-4 py-2 text-sm text-gray-700',
                                                            )}
                                                        >
                                                            Tuỳ chỉnh
                                                        </NKLink>
                                                    )}
                                                </Menu.Item>
                                                {/* <Menu.Item>
                                                    {({ active }) => (
                                                        <NKLink
                                                            href={''}
                                                            className={clsx(
                                                                active ? 'bg-gray-100' : '',
                                                                'block cursor-pointer px-4 py-2 text-sm text-gray-700',
                                                            )}
                                                        >
                                                            Đăng ký trở thành chủ nhà
                                                        </NKLink>
                                                    )}
                                                </Menu.Item> */}
                                                <Menu.Item>
                                                    {({ active }) => (
                                                        <div
                                                            onClick={() => logout()}
                                                            className={clsx(
                                                                active ? 'bg-gray-100' : '',
                                                                'block cursor-pointer px-4 py-2 text-sm text-gray-700',
                                                            )}
                                                        >
                                                            Đăng xuất
                                                        </div>
                                                    )}
                                                </Menu.Item>
                                            </Menu.Items>
                                        </Transition>
                                    </Menu>
                                </div>
                            ) : (
                                <Button onClick={() => router.push(NKRouter.auth.login())}>Login</Button>
                            )}
                        </div>
                    </div>
                </div>
            </nav>
        </motion.header>
    );
};

export default Header;
