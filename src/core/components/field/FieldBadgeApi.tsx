import * as React from 'react';

import { useQuery } from '@tanstack/react-query';
import { Tag } from 'antd/lib';
import { kebabCase } from 'lodash';

interface FieldBadgeApiProps {
    value: any;
    apiAction?: (...value: any) => any;
}

const FieldBadgeApi: React.FC<FieldBadgeApiProps> = ({ value, apiAction }) => {
    const [label, setLabel] = React.useState<string>('undefined');
    const [color, setColor] = React.useState<string>('red');

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
                setLabel(option.label);
                setColor(option.color);
            }
        }
    }, [options.data, value]);

    return <Tag color={color}>{label}</Tag>;
};

export default FieldBadgeApi;
