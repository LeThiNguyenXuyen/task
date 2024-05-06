import * as React from 'react';

import { Tag } from 'antd';

interface FieldBooleanProps {
    value: boolean;
}

const NKFieldBoolean: React.FC<FieldBooleanProps> = ({ value }) => {
    return (
        <div>
            <Tag color={value ? 'green' : 'red'}>{value ? 'Yes' : 'No'}</Tag>
        </div>
    );
};

export default NKFieldBoolean;
