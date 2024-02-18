import * as React from 'react';

import { Disclosure } from '@headlessui/react';
import { KeyIcon, UserIcon, WalletIcon } from '@heroicons/react/20/solid';
import { Outlet, createFileRoute } from '@tanstack/react-router';
import clsx from 'clsx';

import { NKRouter } from '@/core/NKRouter';
import AuthWrapper from '@/core/components/wrapper/AuthWrapper';
import { NKLink } from '@/core/routing/components/NKLink';

interface LayoutProps {}

const navigation = [
    { name: 'Hồ sơ', href: NKRouter.setting.index(), children: [], icon: <UserIcon /> },
    { name: 'Mật khẩu', href: '#', icon: <KeyIcon />, children: [{ name: 'Thay đổi mật khẩu', href: NKRouter.setting.changePassword }] },
    {
        name: 'Ví tiền',
        href: '#',
        icon: <WalletIcon />,
        children: [
            { name: 'Lịch sử giao dịch', href: '#' },
            { name: 'Nạp tiền', href: '#' },
        ],
    },
];

const Layout: React.FunctionComponent<LayoutProps> = () => {
    return (
        <AuthWrapper>
            <section className="flex w-full max-w-5xl gap-4 rounded-2xl ">
                <aside className="flex w-72 flex-shrink-0 grow flex-col gap-y-5 overflow-y-auto rounded-xl border-r border-gray-200 bg-white p-6">
                    <nav className="flex flex-1 flex-col">
                        <ul role="list" className="-mx-2 space-y-1">
                            {navigation.map((item) => (
                                <li key={item.name}>
                                    {!item.children.length ? (
                                        <NKLink href={item.href}>
                                            {({ isActive }) => (
                                                <div
                                                    className={clsx(
                                                        'flex w-full items-center gap-x-3 rounded-md p-2 text-left text-sm font-semibold leading-6 text-gray-700',
                                                        {
                                                            'bg-tango text-white': isActive,
                                                            'text-gray-700 hover:bg-tango-50': !isActive,
                                                        },
                                                    )}
                                                >
                                                    <div className="h-6 w-6 flex-shrink-0 ">{item.icon}</div>
                                                    <span>{item.name}</span>
                                                </div>
                                            )}
                                        </NKLink>
                                    ) : (
                                        <Disclosure as="div" defaultOpen={true}>
                                            {({ open }) => (
                                                <>
                                                    <Disclosure.Button
                                                        className={clsx(
                                                            'flex w-full items-center gap-x-3 rounded-md p-2 text-left text-sm font-semibold leading-6 text-gray-700',
                                                        )}
                                                    >
                                                        <div className="h-6 w-6 flex-shrink-0 text-black">{item.icon}</div>
                                                        {item.name}
                                                    </Disclosure.Button>
                                                    <Disclosure.Panel as="ul" className="mt-1 px-2">
                                                        {item.children.map((subItem) => (
                                                            <li key={subItem.name}>
                                                                <Disclosure.Button as="div">
                                                                    <NKLink href={'#'}>
                                                                        {({ isActive }) => (
                                                                            <span
                                                                                className={clsx(
                                                                                    'block rounded-md py-2 pl-9 pr-2 text-sm leading-6 text-gray-700',
                                                                                    {
                                                                                        'bg-tango text-white': isActive,
                                                                                        'text-gray-700 hover:bg-tango-50': !isActive,
                                                                                    },
                                                                                )}
                                                                            >
                                                                                {subItem.name}
                                                                            </span>
                                                                        )}
                                                                    </NKLink>
                                                                </Disclosure.Button>
                                                            </li>
                                                        ))}
                                                    </Disclosure.Panel>
                                                </>
                                            )}
                                        </Disclosure>
                                    )}
                                </li>
                            ))}
                        </ul>
                    </nav>
                </aside>
                <aside className="w-full bg-white p-6">
                    <Outlet />
                </aside>
            </section>
        </AuthWrapper>
    );
};

export const Route = createFileRoute('/_setting-layout')({
    component: Layout,
});
