// 'use client';
import { Viewport } from 'next';
import { Roboto } from 'next/font/google';
import Script from 'next/script';

import clsx from 'clsx';

import RootProvider from '@/core/components/common/RootProvider';

import './globals.css';
import '@smastrom/react-rating/style.css';
import 'react-quill/dist/quill.bubble.css';
import 'react-quill/dist/quill.snow.css';
import 'react-toastify/dist/ReactToastify.css';
import 'swiper/css';

const roboto = Roboto({
    display: 'swap',
    subsets: ['latin-ext', 'vietnamese'],
    weight: ['100', '300', '400', '500', '700', '900'],
});

export const viewport: Viewport = {
    width: 'device-width',
    initialScale: 1,
    minimumScale: 1,
    maximumScale: 1,
    userScalable: false,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <head>
                <link rel="manifest" href="/manifest.json" />
                <link rel="apple-touch-icon" href="/apple-touch-icon.png"></link>
                <meta name="theme-color" content="#fff" />
                {/* <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" /> */}

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
            <body className={clsx(roboto.className, 'flex min-h-screen w-full flex-col')}>
                <RootProvider>{children}</RootProvider>
            </body>
        </html>
    );
}
