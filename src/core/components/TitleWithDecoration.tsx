import { FC, PropsWithChildren } from 'react';

interface TitleWithDecorationProps extends PropsWithChildren {}

const TitleWithDecoration: FC<TitleWithDecorationProps> = ({ children }) => {
    return (
        <div className="relative">
            <img src="/assets/images/dashboard/textDecoration.svg" className="absolute -top-16 -left-20" />
            <div className="font-semibold text-[40px] text-[#2D2D2D]">{children}</div>
        </div>
    );
};

export default TitleWithDecoration;
