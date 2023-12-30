"use client";

import React, { useEffect } from "react";

import Link from "next/link";
import { useParams, usePathname, useSearchParams } from "next/navigation";

import { useQuery } from "@tanstack/react-query";
import { Bell, Gear, Home, PaperAirplane, ShoppingBag } from "akar-icons";
import clsx from "clsx";
import { useSelector } from "react-redux";

import { NKRouter } from "@/core/NKRouter";
import { userMeNotificationApi } from "@/core/api/user-me-notification";
import { userMeApi } from "@/core/api/user-me.api";
import AuthWrapper from "@/core/components/wrapper/AuthWrapper";
import { askForPermissionToReceiveNotifications } from "@/core/services/push-notification";
import { RootState } from "@/core/store";
import { UserState } from "@/core/store/user";

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
        ["count-unread"],
        async () => {
            const res = await userMeNotificationApi.v1GetCountUnread();

            return res;
        },
        {
            refetchInterval: 2000,
            initialData: 0,
        }
    );

    if (pathName.startsWith(NKRouter.app.product.detail(""))) return <AuthWrapper>{children}</AuthWrapper>;

    return (
        <AuthWrapper>
            <div className="h-screen flex-col flex ">
                <div className="flex-1 flex flex-col justify-center items-center overflow-y-scroll">{children}</div>
                <div className=" z-40 w-full items-center justify-between px-16 py-6 flex bg-white rounded-t-xl bottom-0  bottom-bar">
                    <Link
                        href={NKRouter.app.hone()}
                        className={clsx("", {
                            "text-indigo-600": pathName === NKRouter.app.hone(),
                        })}
                    >
                        <Home strokeWidth={2} size={24} />
                    </Link>
                    <Link
                        href={NKRouter.app.chat.index()}
                        className={clsx("", {
                            "text-indigo-600": pathName.includes("chat"),
                        })}
                    >
                        <PaperAirplane strokeWidth={2} size={24} />
                    </Link>
                    <Link
                        href={NKRouter.app.notification.index()}
                        className={clsx("relative", {
                            "text-indigo-600": pathName.includes("notification"),
                        })}
                    >
                        {Boolean(countUnread.data) && (
                            <div className="absolute -top-2 -right-2 w-5 h-5 text-xs flex items-center justify-center rounded-full text-white bg-red-500">
                                {countUnread.data}
                            </div>
                        )}
                        <Bell strokeWidth={2} size={24} />
                    </Link>
                    <Link
                        href={NKRouter.app.product.index()}
                        className={clsx("relative", {
                            "text-indigo-600": pathName.includes("product"),
                        })}
                    >
                        {Boolean(countUnread.data) && (
                            <div className="absolute -top-2 -right-2 w-5 h-5 text-xs flex items-center justify-center rounded-full text-white bg-red-500">
                                {countUnread.data}
                            </div>
                        )}
                        <ShoppingBag strokeWidth={2} size={24} />
                    </Link>
                    <Link
                        className={clsx("", {
                            "text-yellow-600": pathName.includes("settings"),
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
