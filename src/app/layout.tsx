"use client";

import { useEffect } from "react";

import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import Script from "next/script";

import clsx from "clsx";
import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";

import TanQueryClient from "@/core/components/common/TanQueryClient";
import TryAuthWrapper from "@/core/components/wrapper/TryAuthWrapper";
import { store } from "@/core/store";

import "./globals.css";
import "@smastrom/react-rating/style.css";
import "react-toastify/dist/ReactToastify.css";
import "swiper/css";

const roboto = Roboto({
    display: "swap",
    subsets: ["latin-ext", "vietnamese"],
    weight: ["100", "300", "400", "500", "700", "900"],
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <head>
                <link rel="manifest" href="/manifest.json" />
                <link rel="apple-touch-icon" href="/apple-touch-icon.png"></link>
                <meta name="theme-color" content="#fff" />
                <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />

                <Script strategy="lazyOnload" src={`https://www.googletagmanager.com/gtag/js?id=G-RJSXHSX9ZW`} />

                <Script id="google-analytic" strategy="lazyOnload">
                    {`
                    window.dataLayer = window.dataLayer || [];
                    function gtag(){dataLayer.push(arguments);}
                    gtag('js', new Date());
                    gtag('config', 'G-RJSXHSX9ZW', {
                    page_path: window.location.pathname,
                    });
                `}
                </Script>
            </head>
            <body className={clsx(roboto.className, "min-h-screen w-full flex flex-col")}>
                <Provider store={store}>
                    <TanQueryClient>
                        <TryAuthWrapper>
                            <div className="flex-1 flex flex-col">{children}</div>
                            <ToastContainer closeButton={false} position="bottom-center" autoClose={4000} limit={2} />
                            {/* <div className="fixed bottom-10 right-10 bg-gray-200 py-2 px-4 z-50 rounded font-semibold">
                                <PWAButton />
                            </div> */}
                        </TryAuthWrapper>
                    </TanQueryClient>
                </Provider>
            </body>
        </html>
    );
}
