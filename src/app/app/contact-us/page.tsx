"use client";

import * as React from "react";

import Link from "next/link";

import { useMutation, useQuery } from "@tanstack/react-query";
import { ChevronLeft } from "akar-icons";
import clsx from "clsx";
import moment from "moment";
import { useForm } from "react-hook-form";
import { FiSend } from "react-icons/fi";

import { NKRouter } from "@/core/NKRouter";
import { userMeTicketApi } from "@/core/api/user-me-ticket.api";

interface SendMessageForm {
    message: string;
}

const defaultValues: SendMessageForm = {
    message: "",
};

interface PageProps {}

const Page: React.FC<PageProps> = () => {
    const formMethods = useForm<SendMessageForm>({ defaultValues });
    const wrapperRef = React.useRef<HTMLDivElement>(null);
    const [lastMessageId, setLastMessageId] = React.useState<string>("");
    const [lastMessageScrollId, setLastMessageScrollId] = React.useState<string>("");

    React.useEffect(() => {
        if (lastMessageId !== lastMessageScrollId) {
            setLastMessageScrollId(lastMessageId);
            setTimeout(() => {
                wrapperRef.current?.scrollTo({
                    top: wrapperRef.current?.scrollHeight,
                    behavior: "smooth",
                });
            }, 1000);
        }
    }, [lastMessageId]);

    const userTicketQuery = useQuery(
        ["user-me-ticket"],
        async () => {
            const res = await userMeTicketApi.v1GetByName("support");

            return res.userTicketMessages;
        },
        {
            initialData: [],
            refetchInterval: 3000,
            onSuccess(data) {
                const lastMessage = data[data.length - 1];
                if (lastMessage.id !== lastMessageId) {
                    setLastMessageId(lastMessage.id);
                }
            },
        }
    );
    const sendMessageMutation = useMutation(
        (message: string) => {
            return userMeTicketApi.v1PostSend({
                message,
                name: "support",
            });
        },
        {
            onSuccess: (data) => {
                userTicketQuery.refetch();
                setTimeout(() => {
                    wrapperRef.current?.scrollTo({
                        top: wrapperRef.current?.scrollHeight,
                        behavior: "smooth",
                    });
                }, 1000);
            },
        }
    );

    return (
        <div className="flex  bg-white w-full flex-col  h-screen fade-in">
            <div className={`w-full z-[9999] fixed top-0 left-0 h-screen bg-cover  flex-col flex border`}>
                <div
                    className={`  bg-[url('https://plus.unsplash.com/premium_photo-1666299884107-2c2cf920ee59?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2069&q=80')] bg-cover py-8 px-4 z-10 w-full flex flex-col justify-center items-center`}
                >
                    <div className="text-black bg-white/70 py-2  px-8 inline-block rounded-md">
                        <div className="font-semibold text-2xl text-center">Contact Us</div>
                        <div className="text-sm text-center">We are here to help you</div>
                    </div>
                    <div className="top-2  h-10 w-full absolute left-0 flex  justify-start px-4 items-center">
                        <Link href={NKRouter.app.settings.index()}>
                            <ChevronLeft strokeWidth={2} size={24} />
                        </Link>
                    </div>
                </div>
                <div className="flex h-full   flex-col justify-end relative overflow-y-auto" ref={wrapperRef}>
                    <div className="flex flex-col w-full  absolute top-0 left-0">
                        <div className="flex-1 p-4  ">
                            <div className="flex flex-col gap-2">
                                {userTicketQuery.data.map((message, idx) => {
                                    return (
                                        <div key={message.id} className="flex flex-col w-full">
                                            {moment(message.createdAt)
                                                .subtract(10, "minutes")
                                                .isAfter(userTicketQuery.data[idx - 1]?.createdAt) && (
                                                <p className="text-center text-gray-700 text-xs my-3">
                                                    {moment(message.createdAt).format("HH:mm - DD/MM")}
                                                </p>
                                            )}

                                            <div
                                                className={clsx("flex items-end fade-in gap-2 justify-end w-full ", {
                                                    "flex-row-reverse": message.isResponse,
                                                })}
                                            >
                                                <div
                                                    className={clsx("max-w-[280px] w-full flex justify-end", {
                                                        "flex-row-reverse": message.isResponse,
                                                    })}
                                                >
                                                    <p
                                                        className={clsx("break-words  px-4 py-2 rounded-md", {
                                                            "bg-[#EADA99]": message.isResponse,
                                                            "bg-[#F1F1F1]": !message.isResponse,
                                                        })}
                                                    >
                                                        {message.content}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="w-full bg-white py-6">
                    <form className="flex w-full px-4 rounded-sm ">
                        <input
                            placeholder="What is your problem?"
                            className="w-full h-10 px-4 focus:outline-none border"
                            {...formMethods.register("message")}
                        />
                        <button
                            onClick={formMethods.handleSubmit((data) => {
                                sendMessageMutation.mutate(data.message);
                                formMethods.reset();
                            })}
                            type="submit"
                            className="text-2xl w-10 h-10 shrink-0 flex items-center justify-center bg-[#EADA99] text-white"
                        >
                            <FiSend />
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Page;
