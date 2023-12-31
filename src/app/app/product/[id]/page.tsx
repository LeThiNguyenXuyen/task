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
import { useParams, useRouter } from "next/navigation";
import { Swiper, SwiperSlide } from "swiper/react";
import clsx from "clsx";
import { BsStarFill } from "react-icons/bs";
import { PiHeartFill, PiStarFill } from "react-icons/pi";
import { useCart } from "@/core/contexts/CartContext";
import { toast } from "react-toastify";

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

    const router = useRouter();

    const { handleAddToCart } = useCart();

    const clickAddToCart = () => {
        if (!productQuery.data) return;

        handleAddToCart({
            productVariantId: productQuery.data?.productVariants[0].id,
            quantity: quantity,
        });
        setQuantity(1);

        toast.success("Thêm vào giỏ hàng thành công");
    };

    return (
        <div className="flex flex-col w-full h-full relative">
            {/* <Link href={NKRouter.app.product.index()}> */}
            <button className="left-4 top-4 absolute z-10" onClick={() => router.push(NKRouter.app.product.index())}>
                <ArrowLeft className=" text-white h-6 w-6" />
            </button>
            {/* </Link> */}

            {productQuery.isSuccess ? (
                <>
                    <div className="fixed bottom-0 left-0 w-full pt-2 py-10  bg-white shadow z-30 flex justify-center px-4 gap-4">
                        <button className="rounded-full w-20 h-10 flex-shrink-0 bg-blue-600 justify-center flex items-center">
                            <PiHeartFill className="w-6 h-6 text-white" />
                        </button>
                        <button
                            onClick={() => clickAddToCart()}
                            className="rounded-full w-full h-10 bg-purple-600 text-white font-semibold text-sm justify-center flex items-center uppercase "
                        >
                            Bỏ vào túi
                        </button>
                    </div>
                    <Swiper className="w-screen h-56 relative z-0  overflow-hidden" slidesPerView={1}>
                        {productQuery.data?.productVariants[0].imageUrls.map((image) => (
                            <SwiperSlide key={image}>
                                <img src={image} className="w-full h-full object-cover" alt="" />
                            </SwiperSlide>
                        ))}
                    </Swiper>
                    <div className="h-full relative w-full  bg-white flex flex-col px-6 z-10 shadow-none">
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
                        {productQuery.data.productReviews.length > 0 ? (
                            <div className="flex justify-between w-full gap-2 my-4">
                                <div className="flex items-center gap-2">
                                    <div className="h-5 w-5 text-yellow-400">
                                        <PiStarFill strokeWidth={2} className="w-full h-full" />
                                    </div>
                                    <p className="text-base text-black font-semibold">
                                        {productQuery.data.productReviews.reduce((total, a) => total + a.rate, 0) /
                                            productQuery.data.productReviews.length || 1}
                                        <span className="text-gray-400 text-sm font-normal">{productQuery.data.productReviews.length || 0}</span>
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
                        ) : (
                            <p>
                                <span className="text-gray-600 italic font-semibold text-sm">No review</span>
                            </p>
                        )}
                        <div className="">
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
                                <Tab.Panels className={"h-full w-full pt-5  pb-28"}>
                                    <Tab.Panel className={"relative w-full h-full"}>
                                        <div className="whitespace-pre-line  text-black font-medium text-sm w-full overflow-y-scroll">
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
                                                            <p className="text-black font-medium text-sm ">{review.content}</p>
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
                    </div>
                </>
            ) : (
                <></>
            )}
        </div>
    );
};

export default Page;
