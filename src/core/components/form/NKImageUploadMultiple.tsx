import * as React from 'react';

import { useMutation } from '@tanstack/react-query';
import { ArrowCycle, ArrowDown, Plus, TrashBin } from 'akar-icons';
import clsx from 'clsx';
import { useFormContext } from 'react-hook-form';
import ImageUploading, { ImageListType, ImageType, ImageUploadingPropsType } from 'react-images-uploading';

import { uploadFileApi } from '@/core/api/upload-file.api';

import NKFieldWrapper from './NKFieldWrapper';

export interface NKImageUploadMultipleProps extends Omit<ImageUploadingPropsType, 'onChange' | 'value'> {
    name: string;
    label: string;
    isShow?: boolean;
    labelClassName?: string;
}

const NKImageUploadMultiple: React.FC<NKImageUploadMultipleProps> = ({ label, name, isShow = true, labelClassName, ...rest }) => {
    const formMethods = useFormContext();

    const [imageList, setImageList] = React.useState<ImageType[]>([]);

    React.useEffect(() => {
        if (formMethods.getValues(name)) {
            const imageUrls = formMethods.getValues(name) as string[];

            const newImageList = imageUrls.map((item) => {
                return {
                    data_url: item,
                };
            });

            setImageList(newImageList);
        }
    }, [name]);

    const uploadImageMutation = useMutation((file: File) => {
        return uploadFileApi.v1UploadFile(file);
    });

    const onChange = async (imageList: ImageListType, addUpdateIndex?: number[] | undefined) => {
        const newImageList: Promise<ImageListType> = Promise.all(
            (imageList as ImageType[]).map((item) => {
                if (!item.file) return item;

                return uploadImageMutation.mutateAsync(item.file as File).then((res) => ({ file: undefined, data_url: res }));
            }),
        );

        setImageList(await newImageList);
    };

    React.useEffect(() => {
        const imageUrls = imageList.map((item) => item.data_url);

        formMethods.setValue(name, imageUrls);
    }, [imageList]);

    React.useEffect(() => {
        if (formMethods.getValues(name)) {
            const imageUrls = formMethods.getValues(name) as string[];

            const newImageList = imageUrls.map((item) => {
                return {
                    data_url: item,
                };
            });

            setImageList(newImageList);
        }
    }, [name]);

    return (
        <NKFieldWrapper className={labelClassName} isShow={isShow} label={label} name={name}>
            <div className="flex flex-wrap gap-2">
                <ImageUploading multiple value={imageList} onChange={(a, b) => onChange(a, b)} {...rest}>
                    {({ imageList, onImageUpload, onImageUpdate, onImageRemove, isDragging, dragProps }) => (
                        // write your building UI
                        <div className="flex flex-wrap items-start justify-start gap-2">
                            <button
                                className={clsx('flex  h-20 w-20 items-center justify-center rounded bg-blue-600 text-white', {
                                    'opacity-80': isDragging,
                                    'opacity-100': !isDragging,
                                })}
                                onClick={onImageUpload}
                                {...dragProps}
                            >
                                {isDragging ? <ArrowDown /> : <Plus />}
                            </button>

                            {imageList.map((image, index) => (
                                <div key={index} className="relative h-20 w-20 overflow-hidden rounded bg-blue-600">
                                    <img src={image['data_url']} alt="" className="h-full w-full object-cover" />
                                    <div className="absolute left-1/2 top-1 flex w-full -translate-x-1/2 justify-between gap-2 px-1">
                                        <button
                                            onClick={() => onImageUpdate(index)}
                                            className="flex h-5 w-5 items-center justify-center rounded bg-blue-600 p-1 text-white"
                                        >
                                            <ArrowCycle />
                                        </button>
                                        <button
                                            onClick={() => {
                                                onImageRemove(index);
                                            }}
                                            className="flex h-5 w-5 items-center justify-center rounded bg-red-600 p-1 text-white"
                                        >
                                            <TrashBin />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </ImageUploading>
            </div>
        </NKFieldWrapper>
    );
};

export default NKImageUploadMultiple;
