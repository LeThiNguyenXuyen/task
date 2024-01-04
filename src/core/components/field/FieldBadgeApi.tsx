import * as React from 'react';

import { useQuery } from '@tanstack/react-query';
import { kebabCase } from 'lodash';

interface FieldBadgeApiProps {
    value: any;
    apiAction?: () => Promise<any[]>;
}

const FieldBadgeApi: React.FC<FieldBadgeApiProps> = ({ value, apiAction }) => {
    const [label, setLabel] = React.useState<string>('undefined');
    const [color, setColor] = React.useState<string>('red');

    useQuery(
        ['options', kebabCase(apiAction?.toString())],
        async () => {
            return apiAction ? apiAction() : Promise.resolve([]);
        },
        {
            cacheTime: Infinity,
            onSuccess: (data) => {
                const option = data.find((item) => item.value === value);
                if (option) {
                    setLabel(option.label);
                    setColor(option.color);
                }
            },
        },
    );

    console.log('Color', color);

    return (
        <div
            style={{
                color,
            }}
        >
            {label}
        </div>
    );
};

export default FieldBadgeApi;
