import * as React from 'react';

interface FieldTextProps {
    value: string;
}

const NKFieldText: React.FC<FieldTextProps> = ({ value }) => {
    return <div>{value}</div>;
};

export default NKFieldText;
