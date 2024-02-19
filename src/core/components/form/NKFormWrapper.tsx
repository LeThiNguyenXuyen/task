import * as React from 'react';

import { joiResolver } from '@hookform/resolvers/joi';
import { useMutation } from '@tanstack/react-query';
import joi from 'joi';
import { FormProvider, UseFormReturn, useForm } from 'react-hook-form';

import { toastError } from '@/core/utils/api.helper';

interface NKFormRenderExtraProps {
    methods: UseFormReturn;
    isChange: boolean;
    isFetching: boolean;
}

interface NKFormWrapperProps<T> {
    children: React.ReactNode | ((props: NKFormRenderExtraProps) => React.ReactNode);
    schema: Record<keyof T, joi.AnySchema>;
    locale?: string;
    defaultValues: T;
    apiAction: (value: T) => Promise<any>;
    isResetFormAfterSubmit?: boolean;
    formProps?: React.ReactHTMLElement<HTMLFormElement>;
    onExtraSuccessAction?: (data: any, methods: UseFormReturn) => void;
    onExtraErrorAction?: (data: any, methods: UseFormReturn) => void;
    isLoading?: boolean;
    isDebug?: boolean;
}

const NKFormWrapper = <T extends Object>({
    children,
    schema,
    locale = 'en',
    apiAction,
    defaultValues,
    formProps,
    onExtraSuccessAction,
    onExtraErrorAction,
    isLoading = false,
    isDebug = false,
}: NKFormWrapperProps<T>) => {
    const formMethods = useForm<any>({
        //  NOTE - Fix by https://stackoverflow.com/questions/62242657/how-to-change-react-hook-form-defaultvalue-with-useeffect
        defaultValues: React.useMemo(() => {
            return defaultValues;
        }, [defaultValues]),
        resolver: joiResolver(joi.object(schema)),
    });

    const mutate = useMutation(apiAction, {
        onSuccess: (data) => {
            onExtraSuccessAction?.(data, formMethods);
        },
        onError: (error) => {
            onExtraErrorAction?.(error, formMethods);
            toastError(error);
        },
    });

    // NOTE - Fix by https://stackoverflow.com/questions/62242657/how-to-change-react-hook-form-defaultvalue-with-useeffect
    React.useEffect(() => {
        formMethods.reset(defaultValues);
    }, [defaultValues]);

    React.useEffect(() => {
        if (isDebug) {
            console.log('defaultValues', defaultValues);
            console.log('value', formMethods.getValues());
            console.log('errors', formMethods.formState.errors);
        }
    }, [isDebug, defaultValues]);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <FormProvider {...formMethods}>
            <form
                {...formProps}
                className="w-full"
                onSubmit={formMethods.handleSubmit((data) => {
                    mutate.mutate(data);
                })}
            >
                {typeof children === 'function'
                    ? children({ methods: formMethods, isChange: formMethods.formState.isDirty, isFetching: mutate.isLoading })
                    : children}
            </form>
        </FormProvider>
    );
};

export default NKFormWrapper;
