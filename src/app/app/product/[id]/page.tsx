"use client";
import { NKRouter } from "@/core/NKRouter";
import { formatMoneyVND } from "@/core/utils/string.helper";
import { ArrowLeft, Star } from "akar-icons";
import Link from "next/link";
import * as React from "react";
import { Tab } from "@headlessui/react";
import { useQuery } from "@tanstack/react-query";
import { productApi } from "@/core/api/product.api";
import _get from "lodash/get";
import { useParams } from "next/navigation";
import { Swiper, SwiperSlide } from "swiper/react";
import clsx from "clsx";
import { BsStarFill } from "react-icons/bs";
import { PiStarFill } from "react-icons/pi";

interface PageProps {}

const Page: React.FunctionComponent<PageProps> = () => {
    const [quantity, setQuantity] = React.useState(1);

    const params = useParams();
    const id = _get(params, "id") as string;

    const productQuery = useQuery(
        ["product", id],
        async () => {
            const res = await productApi.v1GetById(id);

            return res;
        },
        {
            enabled: !!id,
        }
    );

    const handleIncrease = () => {
        setQuantity(quantity + 1);
    };

    const handleDecrease = () => {
        if (quantity <= 1) return;
        setQuantity(quantity - 1);
    };

    return (
        <div className="flex flex-col w-full h-full relative">
            <div className="left-4 top-4 absolute z-10">
                <Link href={NKRouter.app.product.index()} className="h-6 w-6">
                    <ArrowLeft className="h-full w-full text-white" />
                </Link>
            </div>
            {productQuery.isSuccess ? (
                <>
                    <Swiper className="w-screen h-56 relative z-0 overflow-hidden" slidesPerView={1}>
                        {productQuery.data?.productVariants[0].imageUrls.map((image) => (
                            <SwiperSlide key={image}>
                                <img src={image} className="w-full h-full object-cover" alt="" />
                            </SwiperSlide>
                        ))}
                    </Swiper>
                    <div className="h-full relative w-full bg-white flex flex-col px-6 z-10 shadow-none">
                        <div className="absolute -top-[14px] left-0 w-full h-4 bg-white rounded-t-2xl"></div>
                        <p className="text-gray-900 font-semibold text-sm">{productQuery.data?.productCategory.name}</p>
                        <p className="text-gray-900 font-semibold text-xl">{productQuery.data?.productVariants[0].name}</p>
                        <div className="flex justify-between w-full gap-2 mt-2">
                            <p className="text-purple-600 font-semibold text-2xl">
                                {formatMoneyVND(productQuery.data?.productVariants[0].price ?? 0)}
                            </p>
                            <div className="flex bg-gray-200 items-center text-center  justify-center font-semibold rounded-full overflow-hidden">
                                <button className="w-10 flex-shrink-0 text-purple-600 text-4xl" onClick={() => handleDecrease()}>
                                    -
                                </button>
                                <span className="w-10 flex-shrink-0 text-xl">{quantity}</span>
                                <button className="w-10 flex-shrink-0 text-2xl text-purple-600" onClick={() => handleIncrease()}>
                                    +
                                </button>
                            </div>
                        </div>
                        <div className="flex justify-between w-full gap-2 my-4">
                            <div className="flex items-center gap-2">
                                <div className="h-5 w-5 text-yellow-400">
                                    <PiStarFill strokeWidth={2} className="w-full h-full" />
                                </div>
                                <p className="text-base text-black font-semibold">
                                    4.5 <span className="text-gray-400 text-sm font-normal">(128 reviews)</span>
                                </p>
                            </div>
                            <div className="flex">
                                <div className="h-10 w-10  border border-white rounded-full overflow-hidden translate-x-4 relative z-0 ">
                                    <img src="https://i.pravatar.cc/40" className="w-full h-full object-cover" alt="" />
                                </div>
                                <div className="h-10 w-10  border border-white rounded-full overflow-hidden translate-x-2 z-10">
                                    <img src="https://i.pravatar.cc/40" className="w-full h-full object-cover" alt="" />
                                </div>
                                <div className="h-10 w-10  border border-white rounded-full overflow-hidden z-20">
                                    <img src="https://i.pravatar.cc/40" className="w-full h-full object-cover" alt="" />
                                </div>
                            </div>
                        </div>
                        <Tab.Group>
                            <Tab.List className={"w-full flex"}>
                                <Tab
                                    className={(props) =>
                                        clsx("text-lg font-semibold h-10 w-full border-b-2 outline-none", {
                                            "text-black border-purple-600": props.selected,
                                            "text-gray-400  border-white": !props.selected,
                                        })
                                    }
                                >
                                    Description
                                </Tab>
                                <Tab
                                    className={(props) =>
                                        clsx("text-lg font-semibold h-10 w-full border-b-2 outline-none", {
                                            "text-black border-purple-600": props.selected,
                                            "text-gray-400  border-white": !props.selected,
                                        })
                                    }
                                >
                                    Review
                                </Tab>
                            </Tab.List>
                            <Tab.Panels className={"h-full w-full py-5"}>
                                <Tab.Panel className={"relative bg-blue-400 w-full"}>
                                    <div className="whitespace-pre-line absolute top-0 left-0 text-black font-medium text-sm w-full overflow-y-scroll">
                                        {productQuery.data?.productVariants[0].description}
                                    </div>
                                </Tab.Panel>
                                <Tab.Panel className={"flex flex-col w-full gap-2"}>
                                    {productQuery.data.productReviews.length > 0 ? (
                                        <>
                                            {productQuery.data.productReviews.map((review) => (
                                                <div key={review.id} className="flex gap-4 border-b border-gray-200  pb-2">
                                                    <div className="h-5 w-5 border border-black flex-shrink-0 rounded-full overflow-hidden">
                                                        <img src="https://i.pravatar.cc/40" className="w-full h-full object-cover" alt="" />
                                                    </div>
                                                    <div className="flex flex-col gap-2">
                                                        <p className="text-black font-semibold text-xs">Pham Vinh Tai</p>
                                                        <div className="flex gap-2">
                                                            {Array.from({ length: review.rate }).map((_, index) => (
                                                                <div key={`${review.id}-${index}`} className="h-3 w-3 text-yellow-400">
                                                                    <PiStarFill strokeWidth={2} className="w-full h-full" />
                                                                </div>
                                                            ))}
                                                        </div>
                                                        <p className="text-black font-medium text-sm ">
                                                            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has
                                                            been the industrys standard dummy text ever since the 1500s, when an unknown printer took
                                                            a galley of type and scrambled it to make a type specimen book. It has survived not only
                                                            five centuries, but also the leap into electronic typesetting, remaining essentially
                                                            unchanged. It was popularised in the 1960s with the release of Letraset sheets containing
                                                            Lorem Ipsum passages, and more recently with desktop publishing software like Aldus
                                                            PageMaker including versions of Lorem Ipsum.
                                                        </p>
                                                    </div>
                                                </div>
                                            ))}
                                        </>
                                    ) : (
                                        <p>
                                            <span className="text-gray-600 italic font-semibold text-sm">No review</span>
                                        </p>
                                    )}
                                </Tab.Panel>
                            </Tab.Panels>
                        </Tab.Group>
                    </div>
                </>
            ) : (
                <></>
            )}
        </div>
    );
};

export default Page;
