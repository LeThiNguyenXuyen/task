import React from 'react';

import { useQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';
import { Button } from 'antd';

import { subscriptionApi } from '@/core/api/subscription.api';
import { useNKRouter } from '@/core/routing/hooks/NKRouter';

const Page: React.FunctionComponent = () => {
    const router = useNKRouter();
    const subscriptionsQuery = useQuery({
        queryKey: ['subscriptions'],
        queryFn: async () => {
            return subscriptionApi.v1Get({
                filters: [],
                orderBy: [],
                page: 0,
                pageSize: 9999,
            });
        },
    });

    const handleNavigateToCreate = () => {
        if (import.meta.env.DEV) {
            window.location.href = `http://localhost:3000?next=${encodeURI('/setting/subscription')}`;
        } else {
            window.location.href = `https://motel-admin.vercel.app?next=${encodeURI('/setting/subscription')}`;
        }
    };

    return (
        <div className="mx-auto w-full px-4 ">
            <div
                className="nc-SectionOurFeatures relative mx-auto  flex max-w-7xl flex-col items-center lg:flex-row lg:py-14"
                data-nc-id="SectionOurFeatures"
            >
                <div className="flex-grow">
                    <img
                        alt=""
                        loading="lazy"
                        width={1179}
                        height={1032}
                        decoding="async"
                        data-nimg={1}
                        src="/assets/images/our-features.webp"
                        style={{ color: 'transparent' }}
                    />
                </div>
                <div className="mt-10 max-w-2xl flex-shrink-0 lg:mt-0 lg:w-2/5 lg:pl-16">
                    <span className="text-sm uppercase tracking-widest text-gray-400">Lợi ích</span>
                    <h2 className="mt-5 text-4xl font-semibold">Thành phố vui vẻ</h2>
                    <ul className="mt-16 space-y-10">
                        <li className="space-y-4">
                            <span className="nc-Badge relative  inline-flex rounded-full bg-blue-100 px-2.5 py-1 text-xs font-medium  text-blue-800">
                                Quảng cáo
                            </span>
                            <span className="block text-xl font-semibold">Quảng cáo tiết kiệm chi phí</span>
                            <span className="mt-5 block text-neutral-500 dark:text-neutral-400">
                                Với danh sách miễn phí, bạn có thể quảng cáo cho thuê của mình mà không mất phí trả trước
                            </span>
                        </li>
                        <li className="space-y-4">
                            <span className="nc-Badge relative  inline-flex rounded-full bg-green-100 px-2.5 py-1 text-xs font-medium  text-green-800">
                                Khám phá
                            </span>
                            <span className="block text-xl font-semibold">Tiếp cận hàng triệu người với Chisfis</span>
                            <span className="mt-5 block text-neutral-500 dark:text-neutral-400">
                                Hàng triệu người đang tìm kiếm những địa điểm lưu trú độc đáo trên khắp thế giới
                            </span>
                        </li>
                        <li className="space-y-4">
                            <span className="nc-Badge relative  inline-flex rounded-full bg-red-100 px-2.5 py-1 text-xs font-medium  text-red-800">
                                An toàn
                            </span>
                            <span className="block text-xl font-semibold">Đơn giản và an toàn</span>
                            <span className="mt-5 block text-neutral-500 dark:text-neutral-400">
                                Danh sách Holiday Lettings cung cấp cho bạn một cách an toàn và dễ dàng để đặt chỗ và thanh toán trực tuyến
                            </span>
                        </li>
                    </ul>
                </div>
            </div>
            <div className="nc-SectionHowItWork  mx-auto mt-16 max-w-7xl" data-nc-id="SectionHowItWork">
                <div className="nc-Section-Heading relative mb-10 text-neutral-900 dark:text-neutral-50">
                    <div className="mx-auto mb-4 w-full max-w-2xl text-center">
                        <h2 className="text-3xl font-semibold md:text-4xl">Cách thức hoạt động</h2>
                        <span className="mt-2 block text-base font-normal text-neutral-500 dark:text-neutral-400 sm:text-lg md:mt-3">
                            Chỉ cần giữ bình tĩnh và đi tiếp
                        </span>
                    </div>
                </div>
                <div className="relative mt-20 grid gap-20 md:grid-cols-3">
                    <img
                        alt=""
                        loading="lazy"
                        width={1431}
                        height={105}
                        decoding="async"
                        data-nimg={1}
                        className="absolute inset-x-0 top-10 hidden md:block"
                        src="/assets/images/VectorHIW.2937dfc5.svg"
                        style={{ color: 'transparent' }}
                    />
                    <div className="relative mx-auto flex max-w-xs flex-col items-center">
                        <img
                            alt=""
                            loading="lazy"
                            width={744}
                            height={707}
                            decoding="async"
                            data-nimg={1}
                            className="mx-auto mb-8 max-w-[180px]"
                            src="/assets/images/HIW1.webp"
                            style={{ color: 'transparent' }}
                        />
                        <div className="mt-auto text-center">
                            <h3 className="text-xl font-semibold">Đặt phòng và thư giản</h3>
                            <span className="mt-5 block text-neutral-500 dark:text-neutral-400">
                                Hãy để mỗi chuyến đi là một hành trình đầy cảm hứng, mỗi căn phòng là một không gian yên bình
                            </span>
                        </div>
                    </div>
                    <div className="relative mx-auto flex max-w-xs flex-col items-center">
                        <img
                            alt=""
                            loading="lazy"
                            width={806}
                            height={689}
                            decoding="async"
                            data-nimg={1}
                            className="mx-auto mb-8 max-w-[180px]"
                            src="/assets/images/HIW2.webp"
                            style={{ color: 'transparent' }}
                        />
                        <div className="mt-auto text-center">
                            <h3 className="text-xl font-semibold">Danh sách kiểm tra thông minh</h3>
                            <span className="mt-5 block text-neutral-500 dark:text-neutral-400">
                                Hãy để mỗi chuyến đi là một hành trình đầy cảm hứng, mỗi căn phòng là một không gian yên bình
                            </span>
                        </div>
                    </div>
                    <div className="relative mx-auto flex max-w-xs flex-col items-center">
                        <img
                            alt=""
                            loading="lazy"
                            width={771}
                            height={689}
                            decoding="async"
                            data-nimg={1}
                            className="mx-auto mb-8 max-w-[180px]"
                            src="/assets/images/HIW3.webp"
                            style={{ color: 'transparent' }}
                        />
                        <div className="mt-auto text-center">
                            <h3 className="text-xl font-semibold">Tiết kiệm hơn</h3>
                            <span className="mt-5 block text-neutral-500 dark:text-neutral-400">
                                Hãy để mỗi chuyến đi là một hành trình đầy cảm hứng, mỗi căn phòng là một không gian yên bình
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="nc-SectionHowItWork  mx-auto mt-16 max-w-7xl" data-nc-id="SectionHowItWork">
                <div className="nc-Section-Heading relative mb-10 text-neutral-900 dark:text-neutral-50">
                    <div className="mx-auto mb-4 w-full max-w-2xl text-center">
                        <h2 className="text-3xl font-semibold md:text-4xl">Đăng ký gói dịch vụ</h2>
                        <span className="mt-2 block text-base font-normal text-neutral-500 dark:text-neutral-400 sm:text-lg md:mt-3">
                            Gồm nhiều gói dịch vụ phù hợp với nhu cầu của bạn
                        </span>
                    </div>
                </div>
                <ul className="m-0 flex list-none items-center justify-center gap-4 p-0">
                    {subscriptionsQuery.data?.data.map((subscription) => {
                        return (
                            <li key={subscription.id}>
                                <div className="flex flex-col items-center gap-2 rounded border border-solid border-neutral-200 p-2 shadow-sm">
                                    <img src={subscription.imageUrls[0]} alt="subscription-image" className="h-36 w-36 object-cover" />
                                    <span className="block text-center text-lg font-medium">{subscription.name}</span>
                                    <span className="font-medium">✅ Hỗ trợ 24/7</span>
                                    <span className="font-medium">✅ Trải nghiệm tính năng mới nhất</span>
                                    <span className="font-medium">✅ Tối đa {subscription.maxCompany} khách sạn</span>
                                    <span className="text-lg font-medium">
                                        {new Intl.NumberFormat('vi-VN', {
                                            style: 'currency',
                                            currency: 'VND',
                                        }).format(subscription.price)}{' '}
                                        / {subscription.duration} ngày
                                    </span>

                                    <button
                                        className="w-full rounded-md bg-tango-500 p-2 font-medium text-white hover:bg-tango-400"
                                        onClick={handleNavigateToCreate}
                                    >
                                        Đăng ký
                                    </button>
                                </div>
                            </li>
                        );
                    })}
                </ul>
            </div>

            <div className="relative mx-auto mt-16 max-w-7xl py-16">
                <div
                    className="nc-BackgroundSection absolute inset-y-0 left-1/2 z-0 w-screen -translate-x-1/2 transform bg-neutral-100 dark:bg-black dark:bg-opacity-20 xl:max-w-[1340px] xl:rounded-[40px] 2xl:max-w-screen-2xl "
                    data-nc-id="BackgroundSection"
                />
                <div className="nc-SectionBecomeAnAuthor relative flex flex-col items-center lg:flex-row  " data-nc-id="SectionBecomeAnAuthor">
                    <div className="mb-16 flex-shrink-0 lg:mb-0 lg:mr-10 lg:w-2/5">
                        <a className="ttnc-logo text-primary-6000 inline-block h-12 w-12 focus:outline-none focus:ring-0" href="/">
                            <img src="/assets/images/logo.png" />
                        </a>
                        <h2 className="mt-6 text-3xl font-semibold sm:mt-11 sm:text-4xl">Tại sao bạn nên chọn chúng tôi? </h2>
                        <span className="mt-6 block text-neutral-500 dark:text-neutral-400">
                            Đồng hành cùng chúng tôi, bạn sẽ có một chuyến đi đầy trải nghiệm. Với Chisfis, đặt chỗ ở, biệt thự nghỉ dưỡng, khách sạn,
                            tư nhân
                        </span>
                        <button className="nc-Button ttnc-ButtonPrimary bg-primary-6000 hover:bg-primary-700 relative mt-6 inline-flex h-auto items-center justify-center rounded-full px-4 py-3 text-sm  font-medium text-neutral-50 transition-colors disabled:bg-opacity-70 sm:mt-11 sm:px-6 sm:text-base ">
                            Trở thành tác giả
                        </button>
                    </div>
                    <div className="flex-grow">
                        <img
                            alt=""
                            loading="lazy"
                            width={890}
                            height={694}
                            decoding="async"
                            data-nimg={1}
                            src="/assets/images/BecomeAnAuthorImg.webp"
                            style={{ color: 'transparent' }}
                        />
                    </div>
                </div>
            </div>
            <div
                className="nc-SectionSubscribe2 relative mx-auto mt-16 flex max-w-7xl flex-col lg:flex-row lg:items-center"
                data-nc-id="SectionSubscribe2"
            >
                <div className="mb-10 flex-shrink-0 lg:mb-0 lg:mr-10 lg:w-2/5">
                    <h2 className="text-4xl font-semibold">Tham gia bản tin của chúng tôi 🎉</h2>
                    <span className="mt-5 block text-neutral-500 dark:text-neutral-400">
                        Đọc và chia sẻ những quan điểm mới về bất kỳ chủ đề nào. Mọi người đều được chào đón.
                    </span>
                    <ul className="mt-10 space-y-4">
                        <li className="flex items-center space-x-4">
                            <span className="nc-Badge relative  inline-flex rounded-full bg-blue-100 px-2.5 py-1 text-xs font-medium  text-blue-800">
                                01
                            </span>
                            <span className="font-medium text-neutral-700 dark:text-neutral-300">Nhận được nhiều ưu đãi hơn</span>
                        </li>
                        <li className="flex items-center space-x-4">
                            <span className="nc-Badge relative  inline-flex rounded-full bg-red-100 px-2.5 py-1 text-xs font-medium  text-red-800">
                                02
                            </span>
                            <span className="font-medium text-neutral-700 dark:text-neutral-300">Nhận tạp chí cao cấp</span>
                        </li>
                    </ul>
                    <form className="relative mt-10 max-w-sm">
                        <input
                            className="focus:border-primary-300 focus:ring-primary-200 dark:focus:ring-primary-6000 block h-12 w-full rounded-full border-neutral-200 bg-white px-5 py-3 text-sm font-normal focus:ring focus:ring-opacity-50 dark:border-neutral-700 dark:bg-neutral-900 dark:focus:ring-opacity-25 "
                            required
                            aria-required="true"
                            placeholder="Enter your email"
                            type="email"
                        />
                        <button
                            className="ttnc-ButtonCircle bg-primary-6000 hover:bg-primary-700 absolute right-1.5 top-1/2 flex h-10 w-10 -translate-y-1/2 transform items-center justify-center rounded-full !leading-none text-neutral-50 disabled:bg-opacity-70 "
                            type="submit"
                        >
                            <i className="las la-arrow-right text-xl" />
                        </button>
                    </form>
                </div>
                <div className="flex-grow">
                    <img
                        alt=""
                        loading="lazy"
                        width={1120}
                        height={803}
                        decoding="async"
                        data-nimg={1}
                        src="/assets/images/SVG-subcribe2.webp"
                        style={{ color: 'transparent' }}
                    />
                </div>
            </div>

            <div className="relative mx-auto mt-16 max-w-7xl py-16">
                <div
                    className="nc-BackgroundSection absolute inset-y-0 left-1/2 z-0 w-screen -translate-x-1/2 transform bg-neutral-100 dark:bg-black dark:bg-opacity-20 xl:max-w-[1340px] xl:rounded-[40px] 2xl:max-w-screen-2xl "
                    data-nc-id="BackgroundSection"
                />
                <div className="nc-SectionClientSay relative  ">
                    <div className="nc-Section-Heading relative mb-10 text-neutral-900 dark:text-neutral-50">
                        <div className="mx-auto mb-4 w-full max-w-2xl text-center">
                            <h2 className="text-3xl font-semibold md:text-4xl">Tin vui từ phương xa</h2>
                            <span className="mt-2 block text-base font-normal text-neutral-500 dark:text-neutral-400 sm:text-lg md:mt-3">
                                Hãy xem mọi người nghĩ gì về Chisfis
                            </span>
                        </div>
                    </div>
                    <div className="relative mx-auto max-w-2xl md:mb-16">
                        <div className="hidden md:block">
                            <img
                                alt="client 1"
                                loading="lazy"
                                width={59}
                                height={59}
                                decoding="async"
                                data-nimg={1}
                                className="absolute -left-20 top-9"
                                src="/assets/images/clientSay1.webp"
                                style={{ color: 'transparent' }}
                            />
                            <img
                                alt="client 2"
                                loading="lazy"
                                width={60}
                                height={59}
                                decoding="async"
                                data-nimg={1}
                                className="absolute bottom-[100px] right-full mr-40"
                                src="/assets/images/clientSay2.webp"
                                style={{ color: 'transparent' }}
                            />
                            <img
                                alt="client 3"
                                loading="lazy"
                                width={55}
                                height={58}
                                decoding="async"
                                data-nimg={1}
                                className="absolute left-[140px] top-full"
                                src="/assets/images/clientSay3.webp"
                                style={{ color: 'transparent' }}
                            />
                            <img
                                alt="client 4"
                                loading="lazy"
                                width={47}
                                height={49}
                                decoding="async"
                                data-nimg={1}
                                className="absolute -bottom-10 right-[140px]"
                                src="/assets/images/clientSay4.webp"
                                style={{ color: 'transparent' }}
                            />
                            <img
                                alt="client 5"
                                loading="lazy"
                                width={65}
                                height={63}
                                decoding="async"
                                data-nimg={1}
                                className="absolute bottom-[80px] left-full ml-32"
                                src="/assets/images/clientSay5.webp"
                                style={{ color: 'transparent' }}
                            />
                            <img
                                alt="client 6"
                                loading="lazy"
                                width={57}
                                height={56}
                                decoding="async"
                                data-nimg={1}
                                className="absolute -right-10 top-10 "
                                src="/assets/images/clientSay6.webp"
                                style={{ color: 'transparent' }}
                            />
                        </div>
                        <img
                            alt=""
                            loading="lazy"
                            width={126}
                            height={120}
                            decoding="async"
                            data-nimg={1}
                            className="mx-auto"
                            src="/assets/images/clientSayMain.webp"
                            style={{ color: 'transparent' }}
                        />
                        <div className="relative mt-12 lg:mt-16 ">
                            <img
                                alt=""
                                loading="lazy"
                                width={52}
                                height={45}
                                decoding="async"
                                data-nimg={1}
                                className="absolute right-full top-1 -mr-16 opacity-50 md:opacity-100 lg:mr-3"
                                src="/assets/images/quotation.webp"
                                style={{ color: 'transparent' }}
                            />
                            <img
                                alt=""
                                loading="lazy"
                                width={52}
                                height={45}
                                decoding="async"
                                data-nimg={1}
                                className="absolute left-full top-1 -ml-16 opacity-50 md:opacity-100 lg:ml-3"
                                src="/assets/images/quotation2.webp"
                                style={{ color: 'transparent' }}
                            />
                            <div className="relative overflow-hidden whitespace-nowrap">
                                <div
                                    className="inline-flex flex-col items-center whitespace-normal text-center"
                                    style={{ opacity: 1, transform: 'none' }}
                                >
                                    <span className="block text-2xl">
                                        Nơi này giống hệt như hình ảnh được đăng trên Chisfis. Dịch vụ tuyệt vời, chúng tôi đã có một kỳ nghỉ tuyệt
                                        vời!
                                    </span>
                                    <span className="mt-8 block text-2xl font-semibold">Tiana Abie</span>
                                    <div className="mt-2 flex items-center space-x-2 text-lg text-neutral-400">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            strokeWidth="1.5"
                                            stroke="currentColor"
                                            aria-hidden="true"
                                            className="h-5 w-5"
                                        >
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
                                            />
                                        </svg>
                                        <span>Malaysia</span>
                                    </div>
                                </div>
                                <div className="mt-10 flex items-center justify-center space-x-2">
                                    <button className="h-2 w-2 rounded-full bg-black/70" />
                                    <button className="h-2 w-2 rounded-full bg-black/10 " />
                                    <button className="h-2 w-2 rounded-full bg-black/10 " />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="nc-Footer relative mt-16 border-t border-neutral-200 py-24 dark:border-neutral-700 lg:py-28">
                <div className="container mx-auto grid max-w-7xl grid-cols-2 gap-x-5 gap-y-10 sm:gap-x-8 md:grid-cols-4  lg:grid-cols-5 lg:gap-x-10">
                    <div className="col-span-2 grid grid-cols-4 gap-5 md:col-span-4 lg:md:col-span-1 lg:flex lg:flex-col">
                        <div className="col-span-2 md:col-span-1">
                            <a className="ttnc-logo text-primary-6000 inline-block h-16 w-16 focus:outline-none focus:ring-0" href="/">
                                <img src="/assets/images/logo.png" className="h-full w-full" />
                            </a>
                        </div>
                        <div className="col-span-2 flex items-center md:col-span-3">
                            <div
                                className="nc-SocialsList1 flex items-center space-x-3 lg:flex-col lg:items-start lg:space-x-0 lg:space-y-2.5"
                                data-nc-id="SocialsList1"
                            >
                                <a
                                    href="#"
                                    className="group flex items-center space-x-2 text-2xl leading-none text-neutral-700 hover:text-black dark:text-neutral-300 dark:hover:text-white"
                                >
                                    <i className="lab la-facebook-square" />
                                    <span className="hidden text-sm lg:block">Facebook</span>
                                </a>
                                <a
                                    href="#"
                                    className="group flex items-center space-x-2 text-2xl leading-none text-neutral-700 hover:text-black dark:text-neutral-300 dark:hover:text-white"
                                >
                                    <i className="lab la-twitter" />
                                    <span className="hidden text-sm lg:block">Twitter</span>
                                </a>
                                <a
                                    href="#"
                                    className="group flex items-center space-x-2 text-2xl leading-none text-neutral-700 hover:text-black dark:text-neutral-300 dark:hover:text-white"
                                >
                                    <i className="lab la-youtube" />
                                    <span className="hidden text-sm lg:block">Youtube</span>
                                </a>
                                <a
                                    href="#"
                                    className="group flex items-center space-x-2 text-2xl leading-none text-neutral-700 hover:text-black dark:text-neutral-300 dark:hover:text-white"
                                >
                                    <i className="lab la-instagram" />
                                    <span className="hidden text-sm lg:block">Instagram</span>
                                </a>
                            </div>
                        </div>
                    </div>
                    <div className="text-sm">
                        <h2 className="font-semibold text-neutral-700 dark:text-neutral-200">Getting started</h2>
                        <ul className="mt-5 space-y-4">
                            <li>
                                <a className="text-neutral-6000 hover:text-black dark:text-neutral-300 dark:hover:text-white" href="#">
                                    Installation
                                </a>
                            </li>
                            <li>
                                <a className="text-neutral-6000 hover:text-black dark:text-neutral-300 dark:hover:text-white" href="#">
                                    Release Notes
                                </a>
                            </li>
                            <li>
                                <a className="text-neutral-6000 hover:text-black dark:text-neutral-300 dark:hover:text-white" href="#">
                                    Upgrade Guide
                                </a>
                            </li>
                            <li>
                                <a className="text-neutral-6000 hover:text-black dark:text-neutral-300 dark:hover:text-white" href="#">
                                    Browser Support
                                </a>
                            </li>
                            <li>
                                <a className="text-neutral-6000 hover:text-black dark:text-neutral-300 dark:hover:text-white" href="#">
                                    Editor Support
                                </a>
                            </li>
                        </ul>
                    </div>
                    <div className="text-sm">
                        <h2 className="font-semibold text-neutral-700 dark:text-neutral-200">Explore</h2>
                        <ul className="mt-5 space-y-4">
                            <li>
                                <a className="text-neutral-6000 hover:text-black dark:text-neutral-300 dark:hover:text-white" href="#">
                                    Đặc điểm thiết kế
                                </a>
                            </li>
                            <li>
                                <a className="text-neutral-6000 hover:text-black dark:text-neutral-300 dark:hover:text-white" href="#">
                                    Nguyên mẫu
                                </a>
                            </li>
                            <li>
                                <a className="text-neutral-6000 hover:text-black dark:text-neutral-300 dark:hover:text-white" href="#">
                                    Hệ thống thiết kế
                                </a>
                            </li>
                            <li>
                                <a className="text-neutral-6000 hover:text-black dark:text-neutral-300 dark:hover:text-white" href="#">
                                    Định giá
                                </a>
                            </li>
                            <li>
                                <a className="text-neutral-6000 hover:text-black dark:text-neutral-300 dark:hover:text-white" href="#">
                                    Bảo mật
                                </a>
                            </li>
                        </ul>
                    </div>
                    <div className="text-sm">
                        <h2 className="font-semibold text-neutral-700 dark:text-neutral-200">Resources</h2>
                        <ul className="mt-5 space-y-4">
                            <li>
                                <a className="text-neutral-6000 hover:text-black dark:text-neutral-300 dark:hover:text-white" href="#">
                                    Best practices
                                </a>
                            </li>
                            <li>
                                <a className="text-neutral-6000 hover:text-black dark:text-neutral-300 dark:hover:text-white" href="#">
                                    Hỗ trợ
                                </a>
                            </li>
                            <li>
                                <a className="text-neutral-6000 hover:text-black dark:text-neutral-300 dark:hover:text-white" href="#">
                                    Nhà phát triển
                                </a>
                            </li>
                            <li>
                                <a className="text-neutral-6000 hover:text-black dark:text-neutral-300 dark:hover:text-white" href="#">
                                    Học thiết kế
                                </a>
                            </li>
                            <li>
                                <a className="text-neutral-6000 hover:text-black dark:text-neutral-300 dark:hover:text-white" href="#">
                                    Học lập trình
                                </a>
                            </li>
                        </ul>
                    </div>
                    <div className="text-sm">
                        <h2 className="font-semibold text-neutral-700 dark:text-neutral-200">Cộng đồng</h2>
                        <ul className="mt-5 space-y-4">
                            <li>
                                <a className="text-neutral-6000 hover:text-black dark:text-neutral-300 dark:hover:text-white" href="#">
                                    Forum
                                </a>
                            </li>
                            <li>
                                <a className="text-neutral-6000 hover:text-black dark:text-neutral-300 dark:hover:text-white" href="#">
                                    Quy tắc cộng đồng
                                </a>
                            </li>
                            <li>
                                <a className="text-neutral-6000 hover:text-black dark:text-neutral-300 dark:hover:text-white" href="#">
                                    Tài nguyên cộng đồng
                                </a>
                            </li>
                            <li>
                                <a className="text-neutral-6000 hover:text-black dark:text-neutral-300 dark:hover:text-white" href="#">
                                    Đóng góp
                                </a>
                            </li>
                            <li>
                                <a className="text-neutral-6000 hover:text-black dark:text-neutral-300 dark:hover:text-white" href="#">
                                    Sự kiện
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export const Route = createFileRoute('/')({
    component: Page,
});
