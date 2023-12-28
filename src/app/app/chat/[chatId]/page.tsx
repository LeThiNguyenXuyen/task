"use client";

import * as React from "react";

import { NextPage } from "next";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";

import { Dialog, Listbox, Menu, Popover, Transition } from "@headlessui/react";
import { CheckIcon, EllipsisVerticalIcon } from "@heroicons/react/20/solid";
import { useMutation, useQuery } from "@tanstack/react-query";
import { ArrowLeft, ChevronLeft, ChevronRight } from "akar-icons";
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
import { photoGroupApi } from "@/core/api/photo-group.api";
import { uploadFileApi } from "@/core/api/upload-file.api";
import { IV1PutGroupChat, userMeChatApi } from "@/core/api/user-me-chat.api";
import { userMeSubscriptionApi } from "@/core/api/user-me-subscription.api";
import { userApi } from "@/core/api/user.api";
import NKFormWrapper from "@/core/components/form/NKFormWrapper";
import NKTextField, { NKTextFieldTheme } from "@/core/components/form/NKTextField";
import { useChat } from "@/core/hooks/useChat";
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
    const [selectedPhotoGroup, setSelectedPhotoGroup] = React.useState<PhotoGroup>();
    const stickerBtn = React.useRef<HTMLButtonElement>(null);

    const {
        chat,
        chatUser,
        sendImageMessageMutation,
        sendMessageMutation,
        sendStickerMessageMutation,
        chatContainerRef,
        leaveGroupChatMutation,
        addUsersMutation,
    } = useChat(chatId);

    const userSubscription = useQuery(["subscription", "me"], async () => {
        const res = await userMeSubscriptionApi.v1Get();
        return Boolean(res.id);
    });

    const router = useRouter();

    const closeModal = () => {
        setSelected([]);
        setIsOpen(false);
    };

    const handleAddUsers = async () => {
        const userIds = selected.map((user) => user.id);
        addUsersMutation.mutateAsync(userIds).then(() => {
            closeModal();
        });
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

    // NOTE - Leave user to group chat

    const [openLeave, setOpenLeave] = React.useState<boolean>(false);

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

    const createGroupChatMutation = useMutation(async () => {
        if (!chatUser) return;

        const res = await userMeChatApi.v1PostCreateWithGroup({
            name: `Nhóm chat của ${userState.name} và ${chatUser?.name}`,
            userId: chatUser.id,
        });

        return res;
    });

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
                            <div className="flex justify-between relative items-start z-10 p-4 gap-4 h-48 from-blue-500 via-blue-400 to-indigo-600 bg-gradient-to-tr">
                                <Link href={NKRouter.app.chat.index()} className=" text-white  w-6 h-6 rounded-lg">
                                    <div>
                                        <ArrowLeft strokeWidth={2} size={24} />
                                    </div>
                                </Link>
                                <div className="flex items-center gap-1 absolute bottom-1 left-1/2 -translate-x-1/2">
                                    {Boolean(chatUser || chat.data.isGroup) && (
                                        <button onClick={() => {}} className={clsx("flex-1 flex gap-1 items-center  w-full flex-col")}>
                                            <div className="w-14 h-14 flex-shrink-0  overflow-hidden relative">
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
                                            <div className="flex flex-col justify-center  text-left text-white">
                                                <div className="font-semibold ">{chat.data.name}</div>
                                            </div>
                                        </button>
                                    )}
                                </div>
                                <div className="text-xs text-white">
                                    {isActiveTime(chatUser?.lastActive) ? "Online" : HKMoment.moment(chatUser?.lastActive).fromNow()}
                                </div>
                            </div>

                            <div className="flex   h-full relative flex-col justify-end overflow-y-scroll" ref={chatContainerRef}>
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
                                                                        "bg-indigo-700 text-white": message.user.id === userState.id,
                                                                        "bg-[#F1F1F1] text-black": message.user.id !== userState.id,
                                                                    })}
                                                                >
                                                                    {_get(message, "content", "")}
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
                            <form className="w-full z-50 bg-gray-100 py-6 relative">
                                <div className="flex w-full px-4 py-4 rounded-sm  relative bg-white">
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
                                    <input placeholder="" className="w-full h-10 px-4 focus:outline-none" {...formMethods.register("message")} />

                                    <div className="relative">
                                        <Popover>
                                            <Popover.Button className="text-xl w-10 h-10 shrink-0 flex items-center justify-center text-gray-400">
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
                                                        className="text-2xl w-10 h-10 shrink-0 flex items-center justify-center bg-indigo-700 text-white"
                                                    >
                                                        <BsImage />
                                                    </label>
                                                </div>
                                                {userSubscription.data && (
                                                    <button
                                                        className="text-2xl w-10 h-10 shrink-0 flex items-center justify-center bg-indigo-700 text-white"
                                                        onClick={() => {
                                                            stickerBtn.current?.click();
                                                        }}
                                                        type="button"
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
                                        className="text-2xl w-10 h-10 shrink-0 flex items-center rounded-full justify-center bg-indigo-700 text-white"
                                    >
                                        <ChevronRight size={24} />
                                    </button>
                                </div>
                            </form>
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
                                                        onClick={() => handleAddUsers()}
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
                                                        onClick={() =>
                                                            leaveGroupChatMutation.mutateAsync().then(() => {
                                                                router.push(NKRouter.app.chat.index());
                                                            })
                                                        }
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
