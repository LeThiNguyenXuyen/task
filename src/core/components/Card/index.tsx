import { FC, PropsWithChildren } from 'react';

interface CardProps extends PropsWithChildren {}

const Card: FC<CardProps> = ({ children }) => {
    return (
        <div
            className="flex flex-col justify-between bg-white min-h-[75vh] p-[24px] min-w-[400px]"
            style={{
                boxShadow: '0px 16px 24px -4px rgba(30, 41, 59, 0.16), 0px 2px 2px -1px rgba(30, 41, 59, 0.04)',
            }}
        >
            {children}
        </div>
    );
};

export default Card;
