import * as React from 'react';

import { Outlet, createFileRoute } from '@tanstack/react-router';

import { NKRouter } from '@/core/NKRouter';
import UnAuthWrapper from '@/core/components/wrapper/UnAuthWrapper';
import { NKLink } from '@/core/routing/components/NKLink';

interface LayoutProps extends React.PropsWithChildren {}

const Layout: React.FunctionComponent<LayoutProps> = () => {
    return (
        <UnAuthWrapper>
            <div className="faded-in  flex w-full justify-start bg-white bg-[url(https://images.unsplash.com/photo-1625669709111-6df35affa0a5?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)] bg-cover px-20 py-10">
                <div className="flex max-w-2xl flex-1 flex-col items-center justify-start gap-10 rounded-2xl bg-tango-50 p-10 shadow-lg">
                    <NKLink href={NKRouter.home()} className="flex  items-center justify-center gap-6 ">
                        <img className="h-32" src="/assets/images/logo.png " alt="banner" />
                        <span className="text-5xl font-medium text-black">Motel</span>
                    </NKLink>
                    <Outlet />
                </div>
            </div>
        </UnAuthWrapper>
    );
};

export const Route = createFileRoute('/_auth-layout')({
    component: Layout,
});
