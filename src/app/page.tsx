'use client';

import React, { use, useEffect } from 'react';

import { useRouter } from 'next/navigation';

import { Bell, Gear, PaperAirplane } from 'akar-icons';
import { toast } from 'react-toastify';

import { NKConstant } from '@/core/NKConstant';
import AuthWrapper from '@/core/components/wrapper/AuthWrapper';

interface HomePageProps {}

const HomePage: React.FunctionComponent<HomePageProps> = () => {
    const router = useRouter();

    return (
        <div className="mx-auto w-full ">
            <div className="MainNav2 relative z-10  mx-auto max-w-7xl">
                <div className="flex h-20 justify-between px-4 lg:container">
                    <div className="hidden flex-1 justify-start space-x-3 sm:space-x-8 md:flex lg:space-x-10">
                        <a className="ttnc-logo text-primary-6000 inline-block h-16 w-16 self-center focus:outline-none focus:ring-0" href="/">
                            <img src="/images/logo.png" alt="logo" className="h-full w-full" />
                        </a>
                        <div className="hidden h-10 self-center border-l border-neutral-300 lg:block dark:border-neutral-500" />
                        <div className="hidden lg:flex ">
                            <div className="DropdownTravelers relative flex" data-headlessui-state>
                                <button
                                    className="group
                h-10 self-center rounded-md py-2 text-sm font-medium text-opacity-90 hover:text-opacity-100 focus:outline-none sm:h-12 sm:text-base"
                                    type="button"
                                    aria-expanded="false"
                                    data-headlessui-state
                                    id="headlessui-popover-button-:rad:"
                                >
                                    <div className=" inline-flex items-center " role="button">
                                        <span>Travelers</span>
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 24 24"
                                            fill="currentColor"
                                            aria-hidden="true"
                                            className="ml-2 
                  h-5 w-5 text-neutral-700 text-opacity-70 transition duration-150 ease-in-out group-hover:text-opacity-80 "
                                        >
                                            <path
                                                fillRule="evenodd"
                                                d="M12.53 16.28a.75.75 0 01-1.06 0l-7.5-7.5a.75.75 0 011.06-1.06L12 14.69l6.97-6.97a.75.75 0 111.06 1.06l-7.5 7.5z"
                                                clipRule="evenodd"
                                            />
                                        </svg>
                                    </div>
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="hidden flex-1 flex-shrink-0 justify-end text-neutral-700 md:flex lg:flex-none dark:text-neutral-100">
                        <div className="hidden space-x-1 lg:flex">
                            <a
                                className="group inline-flex items-center self-center rounded-full border border-neutral-300 px-4 py-2 text-sm font-medium text-gray-700 text-opacity-90 hover:border-neutral-400 hover:text-opacity-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 dark:border-neutral-700 dark:text-neutral-300"
                                href="/add-listing"
                            >
                                List your property
                            </a>
                            <div className="relative flex " data-headlessui-state>
                                <button
                                    className=" group relative inline-flex h-10 w-10 items-center justify-center self-center rounded-full text-base font-medium text-opacity-90 hover:bg-gray-100 hover:text-opacity-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 sm:h-12 sm:w-12 dark:hover:bg-neutral-800"
                                    type="button"
                                    aria-expanded="false"
                                    data-headlessui-state
                                    id="headlessui-popover-button-:raj:"
                                >
                                    <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-blue-500" />
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth="1.5"
                                        stroke="currentColor"
                                        aria-hidden="true"
                                        className="h-6 w-6"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0"
                                        />
                                    </svg>
                                </button>
                            </div>

                            <div className="AvatarDropdown relative flex " data-headlessui-state>
                                <button
                                    className="flex h-10 w-10 items-center justify-center self-center rounded-full text-slate-700 hover:bg-slate-100 focus:outline-none sm:h-12 sm:w-12 dark:text-slate-300 dark:hover:bg-slate-800"
                                    type="button"
                                    aria-expanded="false"
                                    data-headlessui-state
                                    id="headlessui-popover-button-:ral:"
                                >
                                    <div className="wil-avatar relative inline-flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full font-semibold uppercase text-neutral-100 shadow-inner ring-1 ring-white sm:h-9 sm:w-9 dark:ring-neutral-900">
                                        <img
                                            alt="John Doe"
                                            loading="lazy"
                                            width={256}
                                            height={256}
                                            decoding="async"
                                            data-nimg={1}
                                            className="absolute inset-0 h-full w-full rounded-full object-cover"
                                            src="https://fastly.picsum.photos/id/166/200/300.jpg?hmac=tt6C1FuYJwyz0in9uZ9vFTADVlaezHjouGMPh60xVVo"
                                            style={{ color: 'transparent' }}
                                        />
                                        <span className="wil-avatar__name">J</span>
                                    </div>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
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
                        src="/images/our-features.webp"
                        style={{ color: 'transparent' }}
                    />
                </div>
                <div className="mt-10 max-w-2xl flex-shrink-0 lg:mt-0 lg:w-2/5 lg:pl-16">
                    <span className="text-sm uppercase tracking-widest text-gray-400">BENnefits</span>
                    <h2 className="mt-5 text-4xl font-semibold">Happening cities </h2>
                    <ul className="mt-16 space-y-10">
                        <li className="space-y-4">
                            <span className="nc-Badge relative  inline-flex rounded-full bg-blue-100 px-2.5 py-1 text-xs font-medium  text-blue-800">
                                Advertising
                            </span>
                            <span className="block text-xl font-semibold">Cost-effective advertising</span>
                            <span className="mt-5 block text-neutral-500 dark:text-neutral-400">
                                With a free listing, you can advertise your rental with no upfront costs
                            </span>
                        </li>
                        <li className="space-y-4">
                            <span className="nc-Badge relative  inline-flex rounded-full bg-green-100 px-2.5 py-1 text-xs font-medium  text-green-800">
                                Exposure
                            </span>
                            <span className="block text-xl font-semibold">Reach millions with Chisfis</span>
                            <span className="mt-5 block text-neutral-500 dark:text-neutral-400">
                                Millions of people are searching for unique places to stay around the world
                            </span>
                        </li>
                        <li className="space-y-4">
                            <span className="nc-Badge relative  inline-flex rounded-full bg-red-100 px-2.5 py-1 text-xs font-medium  text-red-800">
                                Secure
                            </span>
                            <span className="block text-xl font-semibold">Secure and simple</span>
                            <span className="mt-5 block text-neutral-500 dark:text-neutral-400">
                                A Holiday Lettings listing gives you a secure and easy way to take bookings and payments online
                            </span>
                        </li>
                    </ul>
                </div>
            </div>
            <div className="nc-SectionHowItWork  mx-auto mt-16 max-w-7xl" data-nc-id="SectionHowItWork">
                <div className="nc-Section-Heading relative mb-10 text-neutral-900 dark:text-neutral-50">
                    <div className="mx-auto mb-4 w-full max-w-2xl text-center">
                        <h2 className="text-3xl font-semibold md:text-4xl">How it work</h2>
                        <span className="mt-2 block text-base font-normal text-neutral-500 sm:text-lg md:mt-3 dark:text-neutral-400">
                            Keep calm &amp; travel on
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
                        src="/images/VectorHIW.2937dfc5.svg"
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
                            src="/images/HIW1.webp"
                            style={{ color: 'transparent' }}
                        />
                        <div className="mt-auto text-center">
                            <h3 className="text-xl font-semibold">Book &amp; relax</h3>
                            <span className="mt-5 block text-neutral-500 dark:text-neutral-400">
                                Let each trip be an inspirational journey, each room a peaceful space
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
                            src="/images/HIW2.webp"
                            style={{ color: 'transparent' }}
                        />
                        <div className="mt-auto text-center">
                            <h3 className="text-xl font-semibold">Smart checklist</h3>
                            <span className="mt-5 block text-neutral-500 dark:text-neutral-400">
                                Let each trip be an inspirational journey, each room a peaceful space
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
                            src="/images/HIW3.webp"
                            style={{ color: 'transparent' }}
                        />
                        <div className="mt-auto text-center">
                            <h3 className="text-xl font-semibold">Save more</h3>
                            <span className="mt-5 block text-neutral-500 dark:text-neutral-400">
                                Let each trip be an inspirational journey, each room a peaceful space
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="relative mx-auto mt-16 max-w-7xl py-16">
                <div
                    className="nc-BackgroundSection absolute inset-y-0 left-1/2 z-0 w-screen -translate-x-1/2 transform bg-neutral-100 xl:max-w-[1340px] xl:rounded-[40px] 2xl:max-w-screen-2xl dark:bg-black dark:bg-opacity-20 "
                    data-nc-id="BackgroundSection"
                />
                <div className="nc-SectionBecomeAnAuthor relative flex flex-col items-center lg:flex-row  " data-nc-id="SectionBecomeAnAuthor">
                    <div className="mb-16 flex-shrink-0 lg:mb-0 lg:mr-10 lg:w-2/5">
                        <a className="ttnc-logo text-primary-6000 inline-block h-12 w-12 focus:outline-none focus:ring-0" href="/">
                            <img src="/images/logo.png" />
                        </a>
                        <h2 className="mt-6 text-3xl font-semibold sm:mt-11 sm:text-4xl">Why did you choose us?</h2>
                        <span className="mt-6 block text-neutral-500 dark:text-neutral-400">
                            Accompanying us, you have a trip full of experiences. With Chisfis, booking accommodation, resort villas, hotels, private
                            houses, apartments... becomes fast, convenient and easy.
                        </span>
                        <button className="nc-Button ttnc-ButtonPrimary bg-primary-6000 hover:bg-primary-700 relative mt-6 inline-flex h-auto items-center justify-center rounded-full px-4 py-3 text-sm  font-medium text-neutral-50 transition-colors disabled:bg-opacity-70 sm:mt-11 sm:px-6 sm:text-base ">
                            Become an author
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
                            src="/images/BecomeAnAuthorImg.webp"
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
                    <h2 className="text-4xl font-semibold">Join our newsletter 🎉</h2>
                    <span className="mt-5 block text-neutral-500 dark:text-neutral-400">
                        Read and share new perspectives on just about any topic. Everyone’s welcome.
                    </span>
                    <ul className="mt-10 space-y-4">
                        <li className="flex items-center space-x-4">
                            <span className="nc-Badge relative  inline-flex rounded-full bg-blue-100 px-2.5 py-1 text-xs font-medium  text-blue-800">
                                01
                            </span>
                            <span className="font-medium text-neutral-700 dark:text-neutral-300">Get more discount</span>
                        </li>
                        <li className="flex items-center space-x-4">
                            <span className="nc-Badge relative  inline-flex rounded-full bg-red-100 px-2.5 py-1 text-xs font-medium  text-red-800">
                                02
                            </span>
                            <span className="font-medium text-neutral-700 dark:text-neutral-300">Get premium magazines</span>
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
                        src="/images/SVG-subcribe2.webp"
                        style={{ color: 'transparent' }}
                    />
                </div>
            </div>

            <div className="relative mx-auto mt-16 max-w-7xl py-16">
                <div
                    className="nc-BackgroundSection absolute inset-y-0 left-1/2 z-0 w-screen -translate-x-1/2 transform bg-neutral-100 xl:max-w-[1340px] xl:rounded-[40px] 2xl:max-w-screen-2xl dark:bg-black dark:bg-opacity-20 "
                    data-nc-id="BackgroundSection"
                />
                <div className="nc-SectionClientSay relative  ">
                    <div className="nc-Section-Heading relative mb-10 text-neutral-900 dark:text-neutral-50">
                        <div className="mx-auto mb-4 w-full max-w-2xl text-center">
                            <h2 className="text-3xl font-semibold md:text-4xl">Good news from far away</h2>
                            <span className="mt-2 block text-base font-normal text-neutral-500 sm:text-lg md:mt-3 dark:text-neutral-400">
                                Let&apos;s see what people think of Chisfis
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
                                src="/images/clientSay1.webp"
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
                                src="/images/clientSay2.webp"
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
                                src="/images/clientSay3.webp"
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
                                src="/images/clientSay4.webp"
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
                                src="/images/clientSay5.webp"
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
                                src="/images/clientSay6.webp"
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
                            src="/images/clientSayMain.webp"
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
                                src="/images/quotation.webp"
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
                                src="/images/quotation2.webp"
                                style={{ color: 'transparent' }}
                            />
                            <div className="relative overflow-hidden whitespace-nowrap">
                                <div
                                    className="inline-flex flex-col items-center whitespace-normal text-center"
                                    style={{ opacity: 1, transform: 'none' }}
                                >
                                    <span className="block text-2xl">
                                        This place is exactly like the picture posted on Chisfis. Great service, we had a great stay!
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
            <div className="nc-Footer relative mt-16 border-t border-neutral-200 py-24 lg:py-28 dark:border-neutral-700">
                <div className="container mx-auto grid max-w-7xl grid-cols-2 gap-x-5 gap-y-10 sm:gap-x-8 md:grid-cols-4  lg:grid-cols-5 lg:gap-x-10">
                    <div className="col-span-2 grid grid-cols-4 gap-5 md:col-span-4 lg:md:col-span-1 lg:flex lg:flex-col">
                        <div className="col-span-2 md:col-span-1">
                            <a className="ttnc-logo text-primary-6000 inline-block h-16 w-16 focus:outline-none focus:ring-0" href="/">
                                <img src="/images/logo.png" className="h-full w-full" />
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
                                    Design features
                                </a>
                            </li>
                            <li>
                                <a className="text-neutral-6000 hover:text-black dark:text-neutral-300 dark:hover:text-white" href="#">
                                    Prototyping
                                </a>
                            </li>
                            <li>
                                <a className="text-neutral-6000 hover:text-black dark:text-neutral-300 dark:hover:text-white" href="#">
                                    Design systems
                                </a>
                            </li>
                            <li>
                                <a className="text-neutral-6000 hover:text-black dark:text-neutral-300 dark:hover:text-white" href="#">
                                    Pricing
                                </a>
                            </li>
                            <li>
                                <a className="text-neutral-6000 hover:text-black dark:text-neutral-300 dark:hover:text-white" href="#">
                                    Security
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
                                    Support
                                </a>
                            </li>
                            <li>
                                <a className="text-neutral-6000 hover:text-black dark:text-neutral-300 dark:hover:text-white" href="#">
                                    Developers
                                </a>
                            </li>
                            <li>
                                <a className="text-neutral-6000 hover:text-black dark:text-neutral-300 dark:hover:text-white" href="#">
                                    Learn design
                                </a>
                            </li>
                            <li>
                                <a className="text-neutral-6000 hover:text-black dark:text-neutral-300 dark:hover:text-white" href="#">
                                    Releases
                                </a>
                            </li>
                        </ul>
                    </div>
                    <div className="text-sm">
                        <h2 className="font-semibold text-neutral-700 dark:text-neutral-200">Community</h2>
                        <ul className="mt-5 space-y-4">
                            <li>
                                <a className="text-neutral-6000 hover:text-black dark:text-neutral-300 dark:hover:text-white" href="#">
                                    Discussion Forums
                                </a>
                            </li>
                            <li>
                                <a className="text-neutral-6000 hover:text-black dark:text-neutral-300 dark:hover:text-white" href="#">
                                    Code of Conduct
                                </a>
                            </li>
                            <li>
                                <a className="text-neutral-6000 hover:text-black dark:text-neutral-300 dark:hover:text-white" href="#">
                                    Community Resources
                                </a>
                            </li>
                            <li>
                                <a className="text-neutral-6000 hover:text-black dark:text-neutral-300 dark:hover:text-white" href="#">
                                    Contributing
                                </a>
                            </li>
                            <li>
                                <a className="text-neutral-6000 hover:text-black dark:text-neutral-300 dark:hover:text-white" href="#">
                                    Concurrent Mode
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HomePage;
