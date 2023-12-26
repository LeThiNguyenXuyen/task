"use client";

import * as React from "react";

import { NextPage } from "next";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";

import { Dialog, Listbox, Menu, Popover, Transition } from "@headlessui/react";
import { CheckIcon, EllipsisVerticalIcon } from "@heroicons/react/20/solid";
import { useMutation, useQuery } from "@tanstack/react-query";
import { ChevronLeft } from "akar-icons";
import clsx from "clsx";
import joi from "joi";
import _get from "lodash/get";
import { useForm } from "react-hook-form";
import { BsImage } from "react-icons/bs";
import { FiSend } from "react-icons/fi";
import { PiSmileySticker } from "react-icons/pi";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

import { NKRouter } from "@/core/NKRouter";
import { chatMessageApi } from "@/core/api/chat-message.api";
import { photoGroupApi } from "@/core/api/photo-group.api";
import { uploadFileApi } from "@/core/api/upload-file.api";
import { IV1PutGroupChat, userMeChatApi } from "@/core/api/user-me-chat.api";
import { userMeSettingApi } from "@/core/api/user-me-setting.api";
import { userMeSubscriptionApi } from "@/core/api/user-me-subscription.api";
import { userApi } from "@/core/api/user.api";
import NKFormWrapper from "@/core/components/form/NKFormWrapper";
import NKSelectField from "@/core/components/form/NKSelectField";
import NKTextField, { NKTextFieldTheme } from "@/core/components/form/NKTextField";
import { FilterComparator } from "@/core/models/common";
import { PhotoGroup } from "@/core/models/photoGroup";
import { User } from "@/core/models/user";
import { UserSetting } from "@/core/models/userSetting";
import { RootState } from "@/core/store";
import { UserState } from "@/core/store/user";
import { isActiveTime } from "@/core/utils/data.helper";
import { HKMoment } from "@/core/utils/moment";

interface SettingForm extends Pick<UserSetting, "lang"> {}
interface PageProps {}

interface SendMessageForm {
    message: string;
}

const defaultValues: SendMessageForm = {
    message: "",
};

const Page: NextPage<PageProps> = () => {
    const params = useParams();
    const chatId = _get(params, "chatId") as string;
    const formMethods = useForm<SendMessageForm>({ defaultValues });
    const userState = useSelector<RootState, UserState>((state) => state.user);
    const [isOpen, setIsOpen] = React.useState(false);
    const [isOpenChangeLanguage, setIsOpenChangeLanguage] = React.useState(false);
    const wrapperRef = React.useRef<HTMLDivElement>(null);
    const [lastMessageId, setLastMessageId] = React.useState<string>("");
    const [lastMessageScrollId, setLastMessageScrollId] = React.useState<string>("");
    const [chatUser, setChatUser] = React.useState<User>();
    const [selectedPhotoGroup, setSelectedPhotoGroup] = React.useState<PhotoGroup>();
    const [isShowSticker, setIsShowSticker] = React.useState<boolean>(false);
    const stickerBtn = React.useRef<HTMLButtonElement>(null);

    React.useEffect(() => {
        if (lastMessageId !== lastMessageScrollId) {
            setLastMessageScrollId(lastMessageId);
            setTimeout(() => {
                scrollToBottom();
            }, 1000);
        }
    }, [lastMessageId]);

    const scrollToBottom = () => {
        wrapperRef.current?.scrollTo({
            top: wrapperRef.current?.scrollHeight,
            behavior: "smooth",
        });
    };
    const userSubscription = useQuery(["subscription", "me"], async () => {
        const res = await userMeSubscriptionApi.v1Get();
        return Boolean(res.id);
    });

    // const { chatId }: { chatId: string } = useParams();

    const chat = useQuery(
        ["chat", chatId],
        async () => {
            const res = await userMeChatApi.v1GetById(chatId);
            const chatUser = res.users.filter((u) => u.id !== userState.id)[0];

            const isActive = res.users.every((u) => {
                return isActiveTime(u.lastActive);
            });

            if (chatUser) {
                setChatUser(chatUser);
            }
            return res;
        },
        {
            refetchInterval: 1000,
            enabled: Boolean(chatId),
            onSuccess: (data) => {
                if (!data.chatMessages.length) return;
                setLastMessageId(data.chatMessages[data.chatMessages.length - 1].id);
            },
        }
    );

    const sendMessageMutation = useMutation(
        (message: string) => {
            return userMeChatApi.v1CreateMessage(chatId, {
                content: message,
                type: "TEXT",
            });
        },
        {
            onSuccess: (data) => {
                chat.refetch();
                setTimeout(() => {
                    scrollToBottom();
                }, 1000);
            },
        }
    );

    const sendStickerMessageMutation = useMutation(
        async (image: string) => {
            return userMeChatApi.v1CreateMessage(chatId, {
                content: image,
                type: "IMAGE",
            });
        },
        {
            onSuccess: (data) => {
                chat.refetch();
                setTimeout(() => {
                    scrollToBottom();
                }, 1000);
            },
        }
    );
    const sendImageMessageMutation = useMutation(
        async (file: File) => {
            const res = await uploadFileApi.v1UploadFile(file);

            return userMeChatApi.v1CreateMessage(chatId, {
                content: res,
                type: "IMAGE",
            });
        },
        {
            onSuccess: (data) => {
                chat.refetch();
                setTimeout(() => {
                    scrollToBottom();
                }, 1000);
            },
        }
    );
    const router = useRouter();

    const createGroupChatMutation = useMutation(
        async () => {
            if (!chatUser) return;

            const res = await userMeChatApi.v1PostCreateWithGroup({
                name: `Nhóm chat của ${userState.name} và ${chatUser?.name}`,
                userId: chatUser.id,
            });

            return res;
        },
        {
            onSuccess: (data) => {
                if (!data) return;
                router.push(NKRouter.app.chat.detail(data.id));
            },
        }
    );

    const closeModal = () => {
        setSelected([]);
        setIsOpen(false);
    };

    const [selected, setSelected] = React.useState<User[]>([]);

    const searchMethods = useForm<{ search: string }>({ defaultValues: { search: "" } });

    const searchWatch = searchMethods.watch("search");

    const users = useQuery(
        ["user-system", "user", searchWatch],
        async () => {
            const res = await userApi.v1Get({
                filters: [
                    `name||${FilterComparator.LIKE}||${searchWatch}`,
                    // `slug||${FilterComparator.LIKE}||${chat.data?.slug || ''}`
                ],
                orderBy: [],
                page: 0,
                pageSize: 10000,
            });

            return res.data.filter((user) => user.id !== userState.id);
        },
        {
            enabled: Boolean(chat.data?.isGroup),
            initialData: [],
        }
    );

    const addUsersMutation = useMutation(
        async () => {
            if (!chat.data || !chat.data.isGroup) return;

            const res = await userMeChatApi.v1PostAddUsers(chatId, {
                userIds: selected.map((user) => user.id),
            });

            return res;
        },
        {
            onSuccess: (data) => {
                chat.refetch();
                setSelected([]);
                closeModal();
            },
        }
    );

    // NOTE - Leave user to group chat

    const [openLeave, setOpenLeave] = React.useState<boolean>(false);

    const leaveGroupChatMutation = useMutation(
        async () => {
            if (!chat.data || !chat.data.isGroup) return;

            const res = await userMeChatApi.v1PostLeave(chatId);

            return res;
        },
        {
            onSuccess: (data) => {
                router.push(NKRouter.app.chat.index());
            },
        }
    );

    const userSettingQuery = useQuery<UserSetting>(
        ["settings"],
        async () => {
            return await userMeSettingApi.v1GetAll();
        },
        {
            initialData: {
                lang: "englishContent",
            },
        }
    );

    const languagesQuery = useQuery(
        ["languages"],
        async () => {
            const res = await chatMessageApi.v1GetEnumLanguage();
            return res;
        },
        {
            initialData: [],
        }
    );

    const photoGroup = useQuery(
        ["photo-group"],
        async () => {
            const res = await photoGroupApi.v1GetAll();
            return res;
        },
        {
            refetchOnReconnect: false,
            refetchOnWindowFocus: false,
            initialData: [],
            onSuccess: (data) => {
                if (data.length) {
                    setSelectedPhotoGroup(data[0]);
                }
            },
        }
    );

    const [openUpdateInfo, setOpenUpdateInfo] = React.useState<boolean>(false);

    const uploadImageMutation = useMutation((file: File) => {
        return uploadFileApi.v1UploadFile(file);
    });

    return (
        <>
            <div className="flex flex-1 flex-col  w-full gap-4 overflow-y-auto h-[calc(100vh-4.5rem)]">
                {!chat.isSuccess ? (
                    <div className="flex flex-1 justify-center items-center">Loading...</div>
                ) : (
                    <>
                        <div className="fixed z-50 flex flex-col h-screen w-screen bg-white fade-in left-0 top-0">
                            <div className="flex justify-between items-center z-10 p-2 gap-4 border-b border-black">
                                <div className="flex items-center gap-4">
                                    <Link href={NKRouter.app.chat.index()} className=" text-black  w-6 h-6 rounded-lg">
                                        <div>
                                            <ChevronLeft strokeWidth={2} size={24} />
                                        </div>
                                    </Link>

                                    {Boolean(chatUser || chat.data.isGroup) && (
                                        <button onClick={() => {}} className={clsx("flex-1 flex gap-4 items-center  w-full")}>
                                            <div className="w-10 h-10 flex-shrink-0  overflow-hidden relative">
                                                <img
                                                    className="w-full h-full rounded-full overflow-hidden"
                                                    src={chat.data.isGroup ? chat.data.banner : chatUser?.avatar}
                                                    alt={""}
                                                />
                                                {isActiveTime(chatUser?.lastActive) && (
                                                    <>
                                                        <div className="absolute z-10 bottom-0.5 right-0.5 w-3 h-3 bg-green-500 rounded-full"></div>
                                                    </>
                                                )}
                                            </div>
                                            <div className="flex flex-col justify-center  text-left">
                                                <div className="font-semibold ">{chat.data.name}</div>
                                                <div className="text-xs">
                                                    {isActiveTime(chatUser?.lastActive) ? "Online" : HKMoment.moment(chatUser?.lastActive).fromNow()}
                                                </div>
                                            </div>
                                        </button>
                                    )}
                                </div>
                                <div>
                                    <div></div>
                                    <Menu as="div" className="relative inline-block text-left">
                                        <div className="flex items-center justify-center">
                                            <Menu.Button className="h-6 w-6 flex-shrink-0 text-black">
                                                <EllipsisVerticalIcon />
                                            </Menu.Button>
                                        </div>
                                        <Transition
                                            as={React.Fragment}
                                            enter="transition ease-out duration-100"
                                            enterFrom="transform opacity-0 scale-95"
                                            enterTo="transform opacity-100 scale-100"
                                            leave="transition ease-in duration-75"
                                            leaveFrom="transform opacity-100 scale-100"
                                            leaveTo="transform opacity-0 scale-95"
                                        >
                                            <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                                <div className="px-1 py-1 ">
                                                    <Menu.Item>
                                                        {({ active }) => (
                                                            <button
                                                                onClick={() => setIsOpenChangeLanguage(true)}
                                                                className={`${
                                                                    active ? "bg-violet-500 text-white" : "text-gray-900"
                                                                } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                                                            >
                                                                Change language
                                                            </button>
                                                        )}
                                                    </Menu.Item>
                                                    {!chat.data.isGroup ? (
                                                        <Menu.Item>
                                                            {({ active }) => (
                                                                <button
                                                                    onClick={() => createGroupChatMutation.mutateAsync()}
                                                                    className={`${
                                                                        active ? "bg-violet-500 text-white" : "text-gray-900"
                                                                    } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                                                                >
                                                                    Create group chat with {chatUser?.name}
                                                                </button>
                                                            )}
                                                        </Menu.Item>
                                                    ) : (
                                                        <React.Fragment>
                                                            <Menu.Item>
                                                                <button
                                                                    onClick={() => setIsOpen(true)}
                                                                    className={`group flex w-full items-center rounded-md px-2 py-2 text-sm text-gray-900`}
                                                                >
                                                                    Add member
                                                                </button>
                                                            </Menu.Item>
                                                            <Menu.Item>
                                                                <button
                                                                    onClick={() => setOpenUpdateInfo(true)}
                                                                    className={`group flex w-full items-center rounded-md px-2 py-2 text-sm text-gray-900`}
                                                                >
                                                                    Change group info
                                                                </button>
                                                            </Menu.Item>
                                                            <Menu.Item>
                                                                <button
                                                                    onClick={() => setOpenLeave(true)}
                                                                    className={`group flex w-full items-center rounded-md px-2 py-2 text-sm text-red-400`}
                                                                >
                                                                    Leave the group chat
                                                                </button>
                                                            </Menu.Item>
                                                        </React.Fragment>
                                                    )}
                                                </div>
                                            </Menu.Items>
                                        </Transition>
                                    </Menu>
                                </div>
                            </div>

                            <div className="flex   h-full relative flex-col justify-end overflow-y-scroll" ref={wrapperRef}>
                                <div className="flex   min-h-full justify-start  flex-col h-fit gap-2 py-10 w-full  absolute top-0 left-0 px-2 ">
                                    {chat.data.chatMessages
                                        .sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime())
                                        .map((message, idx) => {
                                            return (
                                                <div className="flex flex-col  w-full" key={message.id}>
                                                    {HKMoment.moment(message.createdAt)
                                                        .subtract(10, "minutes")
                                                        .isAfter(HKMoment.moment(chat.data.chatMessages[idx - 1]?.createdAt)) && (
                                                        <p className="text-center text-gray-700 text-xs my-3">
                                                            {HKMoment.moment(message.createdAt).format("HH:mm - DD/MM")}
                                                        </p>
                                                    )}

                                                    <div
                                                        className={clsx("flex items-end fade-in gap-2 justify-end w-full ", {
                                                            "flex-row-reverse": message.user.id !== userState.id,
                                                        })}
                                                    >
                                                        <div
                                                            className={clsx("max-w-[280px] w-full flex justify-end", {
                                                                "flex-row-reverse": message.user.id !== userState.id,
                                                            })}
                                                        >
                                                            {message.type === "IMAGE" ? (
                                                                <img className="w-full h-full object-cover" src={message.content} alt="" />
                                                            ) : (
                                                                <p
                                                                    className={clsx("break-words  px-4 py-2 rounded-md", {
                                                                        "bg-[#EADA99]": message.user.id === userState.id,
                                                                        "bg-[#F1F1F1]": message.user.id !== userState.id,
                                                                    })}
                                                                >
                                                                    {_get(message, userSettingQuery.data.lang, message.content)}
                                                                </p>
                                                            )}
                                                        </div>
                                                        <div className="flex-shrink-0 h-4 w-4">
                                                            {chat.data.chatMessages[idx + 1]?.user.id !== message.user.id && (
                                                                <div className="rounded-full overflow-hidden  h-full w-full">
                                                                    <img className="w-full h-full object-cover" src={message.user.avatar} alt="" />
                                                                </div>
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>
                                            );
                                        })}
                                </div>
                            </div>
                            <div className="w-full z-50 bg-white py-6 relative">
                                <div className="flex w-full px-4 rounded-sm  relative">
                                    <Popover className="left-0 px-0  bottom-full z-50 absolute">
                                        <Popover.Button ref={stickerBtn}></Popover.Button>

                                        <Popover.Panel unmount={true} className="w-full    fade-in">
                                            <div className="bg-gray-200   p-4 flex flex-col gap-2 w-screen">
                                                <div className="flex gap-1 items-center overflow-y-auto flex-nowrap">
                                                    {photoGroup.data.map((group) => (
                                                        <button
                                                            onClick={() => {
                                                                setSelectedPhotoGroup(group);
                                                            }}
                                                            key={group.id}
                                                            className={clsx(
                                                                "text-sm whitespace-nowrap px-4 py-1 rounded-md text-black duration-300",
                                                                {
                                                                    "bg-[#EADA99]": selectedPhotoGroup?.id === group.id,
                                                                }
                                                            )}
                                                        >
                                                            {group.name}
                                                        </button>
                                                    ))}
                                                </div>

                                                <div className="grid grid-cols-4 overflow-x-auto   h-64">
                                                    {selectedPhotoGroup?.imageUrls.map((image) => (
                                                        <button
                                                            key={image}
                                                            onClick={() => {
                                                                sendStickerMessageMutation.mutate(image);
                                                                stickerBtn.current?.click();
                                                            }}
                                                            className="w-20 h-20"
                                                        >
                                                            <img src={image} className="w-full h-full object-contain" />
                                                        </button>
                                                    ))}
                                                </div>
                                            </div>
                                        </Popover.Panel>
                                    </Popover>
                                    <input
                                        placeholder=""
                                        className="w-full h-10 px-4 focus:outline-none border"
                                        {...formMethods.register("message")}
                                    />

                                    <div className="relative">
                                        <Popover>
                                            <Popover.Button className="text-2xl w-10 h-10 shrink-0 flex items-center justify-center bg-[#EADA99] text-white">
                                                <BsImage />
                                            </Popover.Button>
                                            <Popover.Panel className="absolute flex  flex-col bottom-[120%] left-0 fade-in">
                                                <div>
                                                    <input
                                                        id="file"
                                                        type="file"
                                                        className="hidden"
                                                        onChange={(e) => {
                                                            const file = e.target.files?.[0];
                                                            if (!file) return;
                                                            sendImageMessageMutation.mutateAsync(file);
                                                        }}
                                                    />
                                                    <label
                                                        htmlFor="file"
                                                        className="text-2xl w-10 h-10 shrink-0 flex items-center justify-center bg-[#EADA99] text-white"
                                                    >
                                                        <BsImage />
                                                    </label>
                                                </div>
                                                {userSubscription.data && (
                                                    <button
                                                        className="text-2xl w-10 h-10 shrink-0 flex items-center justify-center bg-[#EADA99] text-white"
                                                        onClick={() => {
                                                            stickerBtn.current?.click();
                                                        }}
                                                    >
                                                        <PiSmileySticker />
                                                    </button>
                                                )}
                                            </Popover.Panel>
                                        </Popover>
                                    </div>
                                    <button
                                        onClick={formMethods.handleSubmit((data) => {
                                            sendMessageMutation.mutate(data.message);
                                            formMethods.reset();
                                        })}
                                        className="text-2xl w-10 h-10 shrink-0 flex items-center justify-center bg-[#EADA99] text-white"
                                    >
                                        <FiSend />
                                    </button>
                                </div>
                            </div>
                        </div>
                        {/* NOTE - Add user to group chat */}
                        <Transition appear show={isOpen} as={React.Fragment}>
                            <Dialog as="div" className="relative z-50" onClose={() => setIsOpen(false)}>
                                <Transition.Child
                                    as={React.Fragment}
                                    enter="ease-out duration-300"
                                    enterFrom="opacity-0"
                                    enterTo="opacity-100"
                                    leave="ease-in duration-200"
                                    leaveFrom="opacity-100"
                                    leaveTo="opacity-0"
                                >
                                    <div className="fixed inset-0 z-0  bg-black bg-opacity-25" />
                                </Transition.Child>

                                <div className="fixed inset-0 z-10  h-full overflow-y-auto">
                                    <div className="flex min-h-[640px] h-full items-center justify-center p-4 text-center">
                                        <Transition.Child
                                            as={React.Fragment}
                                            enter="ease-out duration-300"
                                            enterFrom="opacity-0 scale-95"
                                            enterTo="opacity-100 scale-100"
                                            leave="ease-in duration-200"
                                            leaveFrom="opacity-100 scale-100"
                                            leaveTo="opacity-0 scale-95"
                                        >
                                            <Dialog.Panel className="max-w-md w-full transform flex flex-col overflow-hidden  rounded bg-white p-6 text-left align-middle shadow-xl transition-all">
                                                <Dialog.Title as="h3" className="text-lg mb-2 font-medium leading-6 text-gray-900">
                                                    Add member to group
                                                </Dialog.Title>
                                                <input
                                                    placeholder="Find"
                                                    className="w-full border border-black rounded-full mb-2 py-2 pl-3 pr-10 text-sm leading-5 text-gray-900 focus:ring-0"
                                                    {...searchMethods.register("search")}
                                                />
                                                <Transition
                                                    as={"div"}
                                                    leave="transition ease-in duration-100"
                                                    leaveFrom="opacity-100"
                                                    leaveTo="opacity-0"
                                                    className={"flex gap-2 flex-wrap mb-2"}
                                                    show={Boolean(selected.length)}
                                                >
                                                    {selected.map((user) => (
                                                        <div key={user.id} className="h-10 w-10 rounded-full overflow-hidden">
                                                            <img src={user.avatar} alt="" className="w-full h-full object-cover" />
                                                        </div>
                                                    ))}
                                                </Transition>
                                                <Listbox multiple value={selected} onChange={setSelected}>
                                                    <div className="relative mt-1">
                                                        <Transition
                                                            as={React.Fragment}
                                                            leave="transition ease-in duration-100"
                                                            leaveFrom="opacity-100"
                                                            leaveTo="opacity-0"
                                                            show={true}
                                                        >
                                                            <Listbox.Options className="h-80 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                                                                {users.data.length === 0 ? (
                                                                    <div className="relative cursor-default select-none py-2 px-4 text-gray-700">
                                                                        Not Found
                                                                    </div>
                                                                ) : (
                                                                    users.data.map((user) => (
                                                                        <Listbox.Option
                                                                            className={({ active }) =>
                                                                                `relative cursor-default select-none py-2 pl-10 pr-4 ${
                                                                                    active ? "bg-teal-600 text-white" : "text-gray-900"
                                                                                }`
                                                                            }
                                                                            key={user.id}
                                                                            value={user}
                                                                        >
                                                                            {({ selected, active }) => (
                                                                                <div className="flex items-center gap-2">
                                                                                    <div className="h-8 w-8 rounded-full overflow-hidden">
                                                                                        <img
                                                                                            src={user.avatar}
                                                                                            alt=""
                                                                                            className="w-full h-full object-cover"
                                                                                        />
                                                                                    </div>
                                                                                    <span
                                                                                        className={`block truncate ${
                                                                                            selected ? "font-medium" : "font-normal"
                                                                                        }`}
                                                                                    >
                                                                                        {user.name}
                                                                                    </span>
                                                                                    {selected ? (
                                                                                        <span
                                                                                            className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
                                                                                                active ? "text-white" : "text-teal-600"
                                                                                            }`}
                                                                                        >
                                                                                            <CheckIcon className="h-5 w-5" aria-hidden="true" />
                                                                                        </span>
                                                                                    ) : null}
                                                                                </div>
                                                                            )}
                                                                        </Listbox.Option>
                                                                    ))
                                                                )}
                                                            </Listbox.Options>
                                                        </Transition>
                                                    </div>
                                                </Listbox>
                                                <div className="mt-4">
                                                    <button
                                                        type="button"
                                                        className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                                                        onClick={() => addUsersMutation.mutateAsync()}
                                                    >
                                                        Add member
                                                    </button>
                                                </div>
                                            </Dialog.Panel>
                                        </Transition.Child>
                                    </div>
                                </div>
                            </Dialog>
                        </Transition>

                        {/* NOTE - Change language */}
                        <Transition appear show={isOpenChangeLanguage} as={React.Fragment}>
                            <Dialog as="div" className="relative z-50" onClose={() => setIsOpenChangeLanguage(false)}>
                                <Transition.Child
                                    as={React.Fragment}
                                    enter="ease-out duration-300"
                                    enterFrom="opacity-0"
                                    enterTo="opacity-100"
                                    leave="ease-in duration-200"
                                    leaveFrom="opacity-100"
                                    leaveTo="opacity-0"
                                >
                                    <div className="fixed inset-0 z-0  bg-black bg-opacity-25" />
                                </Transition.Child>

                                <div className="fixed inset-0 z-10  h-full overflow-y-auto">
                                    <div className="flex min-h-[640px] h-full items-center justify-center p-4 text-center">
                                        <Transition.Child
                                            as={React.Fragment}
                                            enter="ease-out duration-300"
                                            enterFrom="opacity-0 scale-95"
                                            enterTo="opacity-100 scale-100"
                                            leave="ease-in duration-200"
                                            leaveFrom="opacity-100 scale-100"
                                            leaveTo="opacity-0 scale-95"
                                        >
                                            <Dialog.Panel className="w-full max-w-sm rounded bg-white p-4">
                                                <NKFormWrapper<SettingForm>
                                                    apiAction={async (data) => {
                                                        await userMeSettingApi.v1PutSetting({
                                                            key: "lang",
                                                            value: data.lang,
                                                        });
                                                    }}
                                                    defaultValues={{
                                                        lang: userSettingQuery.data.lang ?? "",
                                                    }}
                                                    schema={{
                                                        lang: joi.string().required(),
                                                    }}
                                                    onExtraSuccessAction={(data) => {
                                                        toast.success("Update language success");
                                                        setIsOpenChangeLanguage(false);
                                                        userSettingQuery.refetch();
                                                    }}
                                                >
                                                    <div className="flex flex-col gap-3">
                                                        <NKSelectField
                                                            isShow={true}
                                                            name="lang"
                                                            label="Language"
                                                            theme={NKTextFieldTheme.AUTH}
                                                            className="text-white"
                                                            options={languagesQuery.data.map((item) => ({
                                                                label: item.label,
                                                                value: item.value,
                                                            }))}
                                                            defaultValue={userSettingQuery.data.lang}
                                                        />

                                                        <div className="flex items-center justify-center w-full">
                                                            <button className="rounded-xl w-full text-black bg-[#DEE1E6] px-2.5 py-3 text-sm font-semibold  shadow-sm hover:bg-yellow-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-yellow-200">
                                                                Update language
                                                            </button>
                                                        </div>
                                                    </div>
                                                </NKFormWrapper>
                                            </Dialog.Panel>
                                        </Transition.Child>
                                    </div>
                                </div>
                            </Dialog>
                        </Transition>

                        {/* NOTE - Change group info */}
                        <Transition appear show={openUpdateInfo} as={React.Fragment}>
                            <Dialog as="div" className="relative z-50" onClose={() => setOpenLeave(false)}>
                                <Transition.Child
                                    as={React.Fragment}
                                    enter="ease-out duration-300"
                                    enterFrom="opacity-0"
                                    enterTo="opacity-100"
                                    leave="ease-in duration-200"
                                    leaveFrom="opacity-100"
                                    leaveTo="opacity-0"
                                >
                                    <div className="fixed inset-0 z-0  bg-black bg-opacity-25" />
                                </Transition.Child>

                                <div
                                    className="fixed inset-0 z-10  h-full overflo
                                w-y-auto"
                                >
                                    <div className="flex min-h-[640px] h-full items-center justify-center p-4 text-center">
                                        <Transition.Child
                                            as={React.Fragment}
                                            enter="ease-out duration-300"
                                            enterFrom="opacity-0 scale-95"
                                            enterTo="opacity-100 scale-100"
                                            leave="ease-in duration-200"
                                            leaveFrom="opacity-100 scale-100"
                                            leaveTo="opacity-0 scale-95"
                                        >
                                            <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                                                <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-900">
                                                    Group info
                                                </Dialog.Title>

                                                <div className="mt-2">
                                                    <NKFormWrapper<IV1PutGroupChat>
                                                        apiAction={async (data) => {
                                                            return await userMeChatApi.v1PutGroupChat(chatId, data);
                                                        }}
                                                        defaultValues={{
                                                            name: chat.data?.name ?? "",
                                                            banner: chat.data?.banner ?? "",
                                                        }}
                                                        schema={{
                                                            name: joi.string().required(),

                                                            banner: joi.string().required(),
                                                        }}
                                                        onExtraSuccessAction={(data) => {
                                                            toast.success("Update group info success");
                                                            setOpenUpdateInfo(false);
                                                            chat.refetch();
                                                        }}
                                                    >
                                                        {(methods) => (
                                                            <>
                                                                <div
                                                                    className="relative w-full flex justify-center"
                                                                    onClick={() => {
                                                                        // create a new input element
                                                                        const input = document.createElement("input");
                                                                        // set its type to file
                                                                        input.type = "file";
                                                                        // set how many files it can accept
                                                                        input.accept = "image/*";
                                                                        // set onchange event to call callback when user has selected file

                                                                        input.onchange = async (e: any) => {
                                                                            const file = e.target.files[0];
                                                                            if (file) {
                                                                                const url = await uploadImageMutation.mutateAsync(file);
                                                                                methods.setValue("banner", url);
                                                                            }
                                                                        };
                                                                        // click the input element to show file browser dialog
                                                                        input.click();
                                                                    }}
                                                                >
                                                                    <img src={methods.watch("banner")} className="w-20 h-20 rounded-full" />
                                                                </div>
                                                                <NKTextField
                                                                    name="name"
                                                                    label="Name"
                                                                    placeholder="Name"
                                                                    theme={NKTextFieldTheme.AUTH}
                                                                    className="text-white"
                                                                />
                                                                <div className="mt-4">
                                                                    <button
                                                                        type="submit"
                                                                        className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                                                                    >
                                                                        Update group info
                                                                    </button>
                                                                </div>
                                                            </>
                                                        )}
                                                    </NKFormWrapper>
                                                </div>
                                            </Dialog.Panel>
                                        </Transition.Child>
                                    </div>
                                </div>
                            </Dialog>
                        </Transition>

                        {/* NOTE - Leave user to group chat */}
                        <Transition appear show={openLeave} as={React.Fragment}>
                            <Dialog as="div" className="relative z-50" onClose={() => setOpenLeave(false)}>
                                <Transition.Child
                                    as={React.Fragment}
                                    enter="ease-out duration-300"
                                    enterFrom="opacity-0"
                                    enterTo="opacity-100"
                                    leave="ease-in duration-200"
                                    leaveFrom="opacity-100"
                                    leaveTo="opacity-0"
                                >
                                    <div className="fixed inset-0 z-0  bg-black bg-opacity-25" />
                                </Transition.Child>

                                <div className="fixed inset-0 z-10  h-full overflow-y-auto">
                                    <div className="flex min-h-[640px] h-full items-center justify-center p-4 text-center">
                                        <Transition.Child
                                            as={React.Fragment}
                                            enter="ease-out duration-300"
                                            enterFrom="opacity-0 scale-95"
                                            enterTo="opacity-100 scale-100"
                                            leave="ease-in duration-200"
                                            leaveFrom="opacity-100 scale-100"
                                            leaveTo="opacity-0 scale-95"
                                        >
                                            <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                                                <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-900">
                                                    Leave the group chat
                                                </Dialog.Title>
                                                <div className="mt-2">
                                                    <p className="text-sm text-gray-500">
                                                        Are you sure you want to leave the group chat? You will not be able to undo this action once
                                                        it is done.
                                                    </p>
                                                </div>

                                                <div className="mt-4">
                                                    <button
                                                        type="button"
                                                        className="inline-flex justify-center rounded-md border border-transparent bg-red-100 px-4 py-2 text-sm font-medium text-red-900 hover:bg-red-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2"
                                                        onClick={() => leaveGroupChatMutation.mutateAsync()}
                                                    >
                                                        Leave the group chat
                                                    </button>
                                                </div>
                                            </Dialog.Panel>
                                        </Transition.Child>
                                    </div>
                                </div>
                            </Dialog>
                        </Transition>
                    </>
                )}
            </div>
        </>
    );
};

export default Page;
