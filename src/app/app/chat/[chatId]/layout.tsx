"use client";
import { ChatContextProvider } from "@/core/contexts/useChatContext";
import * as React from "react";

interface LayoutProps {}

const Layout: React.FunctionComponent<LayoutProps & React.PropsWithChildren> = ({ children }) => {
    return <ChatContextProvider>{children}</ChatContextProvider>;
};

export default Layout;
