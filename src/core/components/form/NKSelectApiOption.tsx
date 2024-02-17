import * as React from 'react';

import { useQuery } from '@tanstack/react-query';
import { AutoComplete, AutoCompleteProps } from 'antd';
import flat from 'flat';
import { isNull, isUndefined } from 'lodash';
import { useFormContext } from 'react-hook-form';

import NKFieldWrapper, { NKFieldWrapperProps } from './NKFieldWrapper';

export interface NKSelectApiOptionProps extends AutoCompleteProps {
    apiAction: (value: string) => Promise<any[]>;
    isAllOption?: boolean;
}

type Props = NKSelectApiOptionProps & NKFieldWrapperProps;

const NKSelectApiOption: React.FC<Props> = ({ name, isShow = true, label, labelClassName, isAllOption = false, ...rest }) => {
    const [searchValue, setSearchValue] = React.useState('');
    const [isDefault, setIsDefault] = React.useState(false);
    const { setValue, getValues } = useFormContext();
    const optionsQuery = useQuery({
        queryKey: ['options', name, searchValue],
        queryFn: async () => {
            const res = await (rest.apiAction ? rest.apiAction(searchValue) : Promise.resolve([]));

            return isAllOption
                ? [
                      {
                          id: '',
                          label: 'All',
                          name: 'All',
                      },
                      ...res,
                  ]
                : res;
        },
        initialData: [],
    });

    React.useEffect(() => {
        if (optionsQuery.data.length === 0 || isDefault) return;
        const defaultValues = getValues(name);

        if (isNull(defaultValues) || isUndefined(defaultValues)) {
            //select first option
            setSearchValue(optionsQuery.data[0].name);
            setValue(name, optionsQuery.data[0].id);
        } else {
            const res = optionsQuery.data.find((item) => item.id === defaultValues);
            setSearchValue(res?.name || '');
        }
        setIsDefault(true);
    }, [optionsQuery.data, isDefault]);

    const onSelect = (data: string) => {
        const res = optionsQuery.data.find((item) => item.id === data);
        setSearchValue(res?.name || '');
        setValue(`${name}`, data, { shouldTouch: true });
    };

    const onChange = (data: string) => {
        setSearchValue(data);
    };

    return (
        <NKFieldWrapper labelClassName={labelClassName} isShow={isShow} label={label} name={name}>
            <AutoComplete
                value={searchValue}
                options={optionsQuery.data.map((item) => ({
                    label: item.name,
                    value: item.id,
                }))}
                onSelect={onSelect}
                onChange={onChange}
                onBlur={() => {
                    const res = optionsQuery.data.find((item) => item.name === searchValue);

                    if (res) {
                        setSearchValue(res.name);
                    } else {
                        setSearchValue('');
                        setIsDefault(false);
                    }
                }}
                className="w-full"
            />
        </NKFieldWrapper>
    );
};

export default NKSelectApiOption;
