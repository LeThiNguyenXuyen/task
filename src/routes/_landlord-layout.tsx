import { BuildingOfficeIcon } from '@heroicons/react/20/solid';
import { Outlet, createFileRoute } from '@tanstack/react-router';
import clsx from 'clsx';

import { NKRouter } from '@/core/NKRouter';
import AuthWrapper from '@/core/components/wrapper/AuthWrapper';
import NKLink from '@/core/routing/components/NKLink';
import { useNKPathname } from '@/core/routing/hooks/NKPathname';

interface LayoutProps {}

const navigation = [
    {
        name: 'Công Ty',
        href: NKRouter.landlord.index(),
        icon: <BuildingOfficeIcon />,
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

export const Route = createFileRoute('/_landlord-layout')({
    component: Layout,
});
