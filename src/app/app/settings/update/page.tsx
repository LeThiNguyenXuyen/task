"use client";

import * as React from "react";

import Link from "next/link";

import { useMutation, useQuery } from "@tanstack/react-query";
import { ChevronLeft } from "akar-icons";
import joi from "joi";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

import { NKRouter } from "@/core/NKRouter";
import { uploadFileApi } from "@/core/api/upload-file.api";
import { IV1UpdateProfileDto, userMeApi } from "@/core/api/user-me.api";
import NKFormWrapper from "@/core/components/form/NKFormWrapper";
import NKTextField, { NKTextFieldTheme } from "@/core/components/form/NKTextField";
import { RootState } from "@/core/store";
import { UserState } from "@/core/store/user";
import { BsImage } from "react-icons/bs";
import NKDateField from "@/core/components/form/NKDateField";

interface PageProps {}

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

    const uploadImageMutation = useMutation((file: File) => {
        return uploadFileApi.v1UploadFile(file);
    });

    return (
        <div className="flex flex-1 bg-white w-full flex-col fade-in">
            {Boolean(userMeQuery.data?.id) && (
                <>
                    <div className="relative">
                        <Link href={NKRouter.app.settings.index()} className="absolute text-black  top-4 left-4 w-6 h-6 bg-white/90 rounded-lg">
                            <div>
                                <ChevronLeft strokeWidth={2} size={24} />
                            </div>
                        </Link>
                        <div
                            className="h-40"
                            style={{
                                backgroundImage: `url(${userMeQuery.data?.banner})`,
                                backgroundSize: "cover",
                                backgroundPosition: "center",
                            }}
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
                                        await userMeApi.v1Put({
                                            address: userMeQuery.data?.address ?? "",
                                            name: userMeQuery.data?.name ?? "",
                                            phone: userMeQuery.data?.phone ?? "",
                                            avatar: userMeQuery.data?.avatar ?? "",
                                            banner: url,
                                            facebookUrl: "",
                                            major: "",
                                            studentId: "",
                                        });
                                        window.location.reload();
                                    }
                                };
                                // click the input element to show file browser dialog
                                input.click();
                            }}
                        ></div>

                        <div className="absolute -bottom-1/4 left-1/2 -translate-x-1/2 rounded-full border border-indigo-700">
                            <div
                                className="relative"
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
                                            await userMeApi.v1Put({
                                                address: userMeQuery.data?.address ?? "",
                                                name: userMeQuery.data?.name ?? "",
                                                phone: userMeQuery.data?.phone ?? "",
                                                avatar: url,
                                                banner: userMeQuery.data?.banner ?? "",
                                                facebookUrl: "",
                                                major: "",
                                                studentId: "",
                                            });
                                            window.location.reload();
                                        }
                                    };
                                    // click the input element to show file browser dialog
                                    input.click();
                                }}
                            >
                                <img src={userMeQuery.data?.avatar} alt={userMeQuery.data?.name} className="w-20 h-20 rounded-full" />
                                <div className="right-1 absolute bottom-1 text-indigo-700 text-xl">
                                    <BsImage />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="mt-10 flex flex-col px-4 gap-2">
                        <NKFormWrapper<IV1UpdateProfileDto>
                            apiAction={userMeApi.v1Put}
                            defaultValues={{
                                address: userMeQuery.data?.address ?? "",
                                name: userMeQuery.data?.name ?? "",
                                phone: userMeQuery.data?.phone ?? "",
                                avatar: userMeQuery.data?.avatar ?? "",
                                banner: userMeQuery.data?.banner ?? "",
                                facebookUrl: "",
                                major: "",
                                studentId: "",
                            }}
                            schema={{
                                address: joi.string().required(),
                                name: joi.string().required(),
                                phone: joi.string().required(),
                                avatar: joi.string().required(),
                                banner: joi.string().required(),
                                facebookUrl: joi.any().optional(),
                                major: joi.any().optional(),
                                studentId: joi.any().optional(),
                            }}
                            onExtraSuccessAction={(data) => {
                                toast.success("Cập nhật thông tin thành công");
                            }}
                        >
                            <div className="flex flex-col gap-3">
                                <NKTextField name="name" label="Name" placeholder="Name" theme={NKTextFieldTheme.AUTH} className="text-white" />
                                <NKTextField
                                    name="phone"
                                    type="text"
                                    label="Phone"
                                    placeholder="Phone"
                                    theme={NKTextFieldTheme.AUTH}
                                    className="text-white"
                                />
                                <NKTextField
                                    name="address"
                                    label="Address"
                                    placeholder="Address"
                                    theme={NKTextFieldTheme.AUTH}
                                    className="text-white"
                                />
                                <div className="sm:col-span-2">
                                    <NKDateField label="Ngày sinh" name="dob" theme={"AUTH"} />
                                </div>

                                <div className="flex items-center justify-center w-full">
                                    <button className="rounded-xl w-full bg-blue-900 text-white px-2.5 py-3 text-sm font-semibold  shadow-sm hover:bg-blue-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-200">
                                        Update Profile
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
