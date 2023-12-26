"use client";

import * as React from "react";

import Link from "next/link";

import { useMutation, useQuery } from "@tanstack/react-query";
import { ChevronLeft } from "akar-icons";
import joi from "joi";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

import { NKRouter } from "@/core/NKRouter";
import { chatMessageApi } from "@/core/api/chat-message.api";
import { uploadFileApi } from "@/core/api/upload-file.api";
import { userMeSettingApi } from "@/core/api/user-me-setting.api";
import { IV1UpdateProfileDto, userMeApi } from "@/core/api/user-me.api";
import NKFormWrapper from "@/core/components/form/NKFormWrapper";
import NKSelectField from "@/core/components/form/NKSelectField";
import { NKTextFieldTheme } from "@/core/components/form/NKTextField";
import { UserSetting } from "@/core/models/userSetting";
import { RootState } from "@/core/store";
import { UserState } from "@/core/store/user";

interface PageProps {}

interface SettingForm extends Pick<UserSetting, "lang"> {}

const Page: React.FC<PageProps> = () => {
    const userState = useSelector<RootState, UserState>((state) => state.user);
    const userMeQuery = useQuery(
        ["user-me", userState.id],
        () => {
            return userMeApi.v1Get();
        },
        {
            enabled: !!userState.id,
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

    return (
        <div className="flex flex-1 bg-white w-full flex-col fade-in p-4">
            {Boolean(userMeQuery.data?.id) && (
                <>
                    <div className="relative">
                        <Link href={NKRouter.app.settings.index()} className="absolute text-black  top-4 left-4 w-6 h-6 bg-white/90 rounded-lg">
                            <div>
                                <ChevronLeft strokeWidth={2} size={24} />
                            </div>
                        </Link>
                    </div>
                    <div className="text-lg mb-4 font-bold mt-16">Change Language</div>
                    <div className="flex flex-col gap-2">
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
                                toast.success("Cập nhật thông tin thành công");
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
                    </div>
                </>
            )}
        </div>
    );
};

export default Page;
