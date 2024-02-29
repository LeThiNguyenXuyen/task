import * as React from 'react';

import { Disclosure } from '@headlessui/react';
import { KeyIcon, UserIcon, WalletIcon } from '@heroicons/react/20/solid';
import { Outlet, createFileRoute } from '@tanstack/react-router';
import { TriangleDownFill } from 'akar-icons';
import clsx from 'clsx';

import { NKRouter } from '@/core/NKRouter';
import AuthWrapper from '@/core/components/wrapper/AuthWrapper';
import { NKLink } from '@/core/routing/components/NKLink';
import { useNKPathname } from '@/core/routing/hooks/NKPathname';

interface LayoutProps {}

const navigation = [
    { name: 'Hồ sơ', href: NKRouter.setting.index(), children: [], icon: <UserIcon /> },
    { name: 'Mật khẩu', href: NKRouter.setting.password(), icon: <KeyIcon />, children: [] },
    {
        name: 'Ví của tôi',
        href: '',
        icon: <WalletIcon />,
        children: [
            { name: 'Lịch sử giao dịch', href: NKRouter.setting.wallet.index() },
            { name: 'Nạp tiền', href: NKRouter.setting.wallet.deposit() },
            { name: 'Rút tiền', href: NKRouter.setting.wallet.withdraw() },
        ],
    },
];

const Layout: React.FunctionComponent<LayoutProps> = () => {
    const pathname = useNKPathname();

    return (
        <AuthWrapper>
            <section className="flex w-full max-w-6xl gap-4 rounded-2xl ">
                <aside className="flex w-72 flex-shrink-0 grow flex-col gap-y-5 overflow-y-auto border-r border-gray-200 bg-white p-6">
                    <nav className="flex flex-1 flex-col">
                        <ul role="list" className="-mx-2 space-y-1">
                            {navigation.map((item) => (
                                <li key={item.name}>
                                    {!item.children.length ? (
                                        <NKLink href={item.href}>
                                            {({ isActive }) => (
                                                <div
                                                    className={clsx(
                                                        'flex w-full items-center gap-x-3 rounded-md p-2 text-left text-sm font-semibold leading-6 text-gray-700 duration-200',
                                                        {
                                                            'bg-tango text-white': isActive && item.href === pathname,
                                                            'text-gray-700 hover:bg-tango-50': !Boolean(isActive && item.href === pathname),
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
                                                            'flex w-full items-center justify-between gap-x-3 rounded-md p-2 text-left text-sm font-semibold leading-6 text-gray-700',
                                                        )}
                                                    >
                                                        <div className="flex items-center gap-x-3">
                                                            <div className="h-6 w-6 flex-shrink-0 text-black">{item.icon} </div>
                                                            <span>{item.name}</span>
                                                        </div>

                                                        <div
                                                            className={clsx('h-6 w-6 flex-shrink-0 duration-200', {
                                                                'opacity-0': open,
                                                            })}
                                                        >
                                                            <TriangleDownFill strokeWidth={2} className="h-full w-full" />
                                                        </div>
                                                    </Disclosure.Button>
                                                    <Disclosure.Panel as="ul" className="mt-1 px-2">
                                                        {item.children.map((subItem) => (
                                                            <li key={subItem.name}>
                                                                <Disclosure.Button as="div">
                                                                    <NKLink href={subItem.href}>
                                                                        {({ isActive }) => (
                                                                            <span
                                                                                className={clsx(
                                                                                    'block rounded-md py-2 pl-9 pr-2 text-sm leading-6 text-gray-700 duration-200',
                                                                                    {
                                                                                        'bg-tango text-white': isActive && subItem.href === pathname,
                                                                                        'text-gray-700 hover:bg-tango-50': !Boolean(
                                                                                            isActive && subItem.href === pathname,
                                                                                        ),
                                                                                    },
                                                                                )}
                                                                            >
                                                                                {subItem.name}
                                                                            </span>
                                                                        )}
                                                                    </NKLink>
                                                                    {/* <a href={subItem.href}>
                                                                        <span
                                                                            className={clsx(
                                                                                'block rounded-md py-2 pl-9 pr-2 text-sm leading-6 text-gray-700 duration-200',
                                                                                {
                                                                                    'bg-tango text-white': subItem.href === pathname,
                                                                                    'text-gray-700 hover:bg-tango-50': !Boolean(
                                                                                        subItem.href === pathname,
                                                                                    ),
                                                                                },
                                                                            )}
                                                                        >
                                                                            {subItem.name}
                                                                        </span>
                                                                    </a> */}
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
