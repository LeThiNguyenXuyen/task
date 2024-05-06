import * as React from 'react';



import { useQuery } from '@tanstack/react-query';
import { kebabCase } from 'lodash';
import _get from 'lodash/get';
import { useTranslation } from 'react-i18next';


interface FieldBadgeApiProps {
    value: any;
    apiAction?: (...value: any) => any;
}

const NKFieldBadgeApi: React.FC<FieldBadgeApiProps> = ({ value, apiAction }) => {
    const [label, setLabel] = React.useState<string>('Đang tải...');
    const [color, setColor] = React.useState<string>('gray');
    const { i18n } = useTranslation();

    const options = useQuery({
        queryKey: ['options', kebabCase(apiAction?.toString()), value],
        queryFn: async () => {
            return apiAction ? apiAction('', true) : Promise.resolve([]);
        },
    });

    React.useEffect(() => {
        if (options.data) {
            const option = options.data.find((item: any) => item.value === value);

            if (option) {
                setLabel(_get(option, `label.${i18n.language}`, option?.name));
                setColor(option.color);
            }
        }
    }, [options.data, value]);

    return (
        <div
            className="inline-block rounded-lg border border-solid border-tango-50 px-2 py-1 text-sm font-semibold"
            style={{
                color: color,
                backgroundColor: 'white',
            }}
        >
            {label}
        </div>
    );
};

export default NKFieldBadgeApi;