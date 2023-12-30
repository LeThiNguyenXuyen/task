"use client";

import { NKRouter } from "@/core/NKRouter";
import { ArrowRight, Heart } from "akar-icons";
import Link from "next/link";
import * as React from "react";
import { BsHeartFill } from "react-icons/bs";
import { Swiper, SwiperSlide } from "swiper/react";

interface PageProps {}

const Page: React.FC<PageProps> = () => {
    return (
        <div className="flex flex-col h-full w-full justify-start">
            <div className="p-4 gap-2 flex flex-col">
                <div className="h-24 rounded-3xl gap-4 overflow-hidden w-full">
                    <img src="https://dummyimage.com/358x96/67729D/fff" className="w-full h-full" alt="" />
                </div>
                <p className="text-black text-base uppercase font-semibold leading-5 text-center">
                    Khám phá cùng cộng đồng <br /> nhiếp ảnh gia tại đây!!
                </p>
            </div>
            <div className="p-4 w-full flex flex-col gap-10">
                <div className="flex flex-col gap-2 w-full">
                    <div className="flex justify-between text-black w-full items-center">
                        <p className="font-semibold text-lg">Nhiếp ảnh gia nổi bật</p>
                        <Link className=" text-lg" href={NKRouter.app.photographers.index()}>
                            <ArrowRight />
                        </Link>
                    </div>
                    <Swiper className="w-[calc(100vw-32px)] h-52" slidesPerView={2} spaceBetween={20}>
                        {["1p", "2p", "3p", "4p", "5p", "6p", "7p", "8p"].map((item, index) => (
                            <SwiperSlide key={item} className="w-full h-full">
                                <div className="h-full w-full rounded-3xl overflow-hidden relative">
                                    <Link href={NKRouter.app.photographers.detail("test")} className="absolute h-full w-full top-0 left-0 z-0">
                                        <img src="https://dummyimage.com/168x208/67729D/fff" className="w-full h-full" alt="" />
                                    </Link>
                                    <button className="text-rose-700 absolute left-4 top-4 text-lg z-10">
                                        <BsHeartFill />
                                    </button>
                                    <p className="text-xl text-white font-medium absolute bottom-8 left-4 z-10">Đức</p>
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
                <div className="flex flex-col gap-2 w-full">
                    <div className="flex justify-between text-black w-full items-center">
                        <p className="font-semibold text-lg">Mẫu ảnh nổi bật</p>
                        <Link className=" text-lg" href={NKRouter.app.photographers.index()}>
                            <ArrowRight />
                        </Link>
                    </div>
                    <Swiper className="w-[calc(100vw-32px)] h-52" slidesPerView={2} spaceBetween={20}>
                        {["1p", "2p", "3p", "4p", "5p", "6p", "7p", "8p"].map((item, index) => (
                            <SwiperSlide key={item} className="w-full h-full">
                                <div className="h-full w-full rounded-3xl overflow-hidden relative">
                                    <Link href={NKRouter.app.photographers.detail("test")} className="absolute h-full w-fulltop-0 left-0 z-0">
                                        <img src="https://dummyimage.com/168x208/67729D/fff" className="w-full h-full" alt="" />
                                    </Link>
                                    <button className="text-rose-700 absolute left-4 top-4 text-lg z-10">
                                        <BsHeartFill />
                                    </button>
                                    <p className="text-xl text-white font-medium absolute bottom-8 left-4 z-10">Đức</p>
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
                <div className="flex flex-col gap-2 w-full">
                    <div className="flex justify-between text-black w-full items-center">
                        <p className="font-semibold text-lg">Sản phẩm nổi bật</p>
                        <Link className=" text-lg" href={NKRouter.app.photographers.index()}>
                            <ArrowRight />
                        </Link>
                    </div>
                    <Swiper className="w-[calc(100vw-32px)] h-52" slidesPerView={2} spaceBetween={20}>
                        {["1p", "2p", "3p", "4p", "5p", "6p", "7p", "8p"].map((item, index) => (
                            <SwiperSlide key={item} className="w-full h-full">
                                <div className="h-full w-full rounded-3xl overflow-hidden relative">
                                    <Link href={NKRouter.app.photographers.detail("test")} className="absolute h-full w-fulltop-0 left-0 z-0">
                                        <img src="https://dummyimage.com/168x208/67729D/fff" className="w-full h-full" alt="" />
                                    </Link>
                                    <button className="text-rose-700 absolute left-4 top-4 text-lg z-10">
                                        <BsHeartFill />
                                    </button>
                                    <p className="text-xl text-white font-medium absolute bottom-8 left-4 z-10">Đức</p>
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            </div>
        </div>
    );
};

export default Page;
