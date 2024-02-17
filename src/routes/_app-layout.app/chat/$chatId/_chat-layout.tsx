import * as React from 'react';

import { Outlet, createFileRoute } from '@tanstack/react-router';

import { ChatContextProvider } from '@/core/contexts/ChatContext';

interface LayoutProps {}

const Layout: React.FunctionComponent<LayoutProps> = () => {
    return (
        <ChatContextProvider>
            <Outlet />
        </ChatContextProvider>
    );
};

export const Route = createFileRoute('/_app-layout/app/chat/$chatId/_chat-layout')({
    component: Layout,
});
