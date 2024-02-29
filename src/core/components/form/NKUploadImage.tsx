import * as React from 'react';

import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { useMutation } from '@tanstack/react-query';
import { EyeOpen, File } from 'akar-icons';
import { Upload, UploadProps } from 'antd';
import clsx from 'clsx';
import { ImageIcon } from 'lucide-react';
import { Controller, useFormContext } from 'react-hook-form';
import { PhotoProvider, PhotoView } from 'react-photo-view';

import { uploadFileApi } from '@/core/api/upload-file.api';

import NKFieldWrapper, { NKFieldWrapperProps } from './NKFieldWrapper';

export interface NKUploadImageProps extends UploadProps {}

type Props = NKUploadImageProps & NKFieldWrapperProps;

const NKUploadImage: React.FC<Props> = ({ label, name, isShow = true, labelClassName, ...rest }) => {
    const formMethods = useFormContext();
    const imageUrl = formMethods.watch(name) || null;

    const uploadMutation = useMutation({
        mutationFn: (file: File) => {
            return uploadFileApi.v1UploadFile(file);
        },
    });

    const uploadButton = (
        <div className="flex h-14 w-14 items-center justify-center rounded-md border-2 border-tango-100">
            {uploadMutation.isLoading ? <LoadingOutlined rev="" /> : <File className="text-gray-400" strokeWidth={1.5} size={24} />}
        </div>
    );

    return (
        <NKFieldWrapper
            labelClassName={labelClassName}
            isShow={isShow}
            label={
                <div className="flex items-center gap-2">
                    <span>{label}</span>
                    {imageUrl && (
                        <PhotoProvider>
                            <PhotoView src={imageUrl}>
                                <EyeOpen strokeWidth={1} size={16} />
                            </PhotoView>
                        </PhotoProvider>
                    )}
                </div>
            }
            name={name}
        >
            <Controller
                name={name}
                control={formMethods.control}
                render={({ field }) => (
                    <Upload
                        name={field.name}
                        showUploadList={false}
                        {...rest}
                        action={async (file) => {
                            const url = await uploadMutation.mutateAsync(file);
                            field.onChange(url);
                            return url;
                        }}
                    >
                        {imageUrl ? (
                            <img
                                src={imageUrl}
                                alt="avatar"
                                className={clsx('h-14 w-14 rounded-lg', {
                                    'rounded-full': rest.listType === 'picture-circle',
                                })}
                                style={{ width: '100%' }}
                            />
                        ) : (
                            uploadButton
                        )}
                    </Upload>
                )}
            />
        </NKFieldWrapper>
    );
};

export default NKUploadImage;
