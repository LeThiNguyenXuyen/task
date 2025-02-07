import * as React from 'react';



import Barcode from 'react-barcode';


interface FieldBarCodeProps {
    value: string;
}

const NKFieldBarCode: React.FC<FieldBarCodeProps> = ({ value }) => {
    return (
        <div className="">
            <Barcode value={value} />
        </div>
    );
};

export default NKFieldBarCode;