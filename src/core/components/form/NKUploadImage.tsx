import * as React from 'react';

import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { useMutation } from '@tanstack/react-query';
import { Upload, UploadProps } from 'antd';
import { Controller, useFormContext } from 'react-hook-form';

import { uploadFileApi } from '@/core/api/upload-file.api';
import { cn } from '@/core/utils/tailwind';

import NKFieldWrapper, { NKFieldWrapperProps } from './NKFieldWrapper';

export interface NKUploadImageProps extends UploadProps {}

type Props = NKUploadImageProps & NKFieldWrapperProps;

const NKUploadImage: React.FC<Props> = ({ label, name, isShow = true, labelClassName, onChangeExtra, ...rest }) => {
    const [imageUrl, setImageUrl] = React.useState<string>();
    const formMethods = useFormContext();

    React.useEffect(() => {
        if (!imageUrl) {
            const values = formMethods.getValues(name);
            if (values) {
                setImageUrl(values);
            }
        }
    }, [imageUrl]);

    const uploadMutation = useMutation({
        mutationFn: (file: File) => {
            return uploadFileApi.v1UploadFile(file);
        },
    });

    const uploadButton = (
        <div>
            {uploadMutation.isPending ? <LoadingOutlined rev="" /> : <PlusOutlined rev="" />}
            <div style={{ marginTop: 8 }}>Tải Lên</div>
        </div>
    );

    return (
        <NKFieldWrapper labelClassName={labelClassName} isShow={isShow} label={label} name={name} onChangeExtra={onChangeExtra}>
            <Controller
                name={name}
                control={formMethods.control}
                render={({ field }) => (
                    <Upload
                        name={field.name}
                        listType="picture-card"
                        showUploadList={false}
                        {...rest}
                        action={async (file) => {
                            const url = await uploadMutation.mutateAsync(file);
                            setImageUrl(url as string);
                            field.onChange(url);
                            return url;
                        }}
                    >
                        {imageUrl ? (
                            <img
                                src={imageUrl}
                                alt="avatar"
                                className={cn('h-full w-full', {
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
