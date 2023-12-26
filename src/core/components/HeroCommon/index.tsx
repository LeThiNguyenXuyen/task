import * as React from 'react';

interface HeroCommonProps {
    title: string;
    description: string;
}

const HeroCommon: React.FunctionComponent<HeroCommonProps> = ({ description, title }) => {
    return (
        <div className="w-full h-[342px] py-[88px] flex justify-center items-center">
            <div className="w-full px-[72px] max-w-app h-full justify-center items-end relative ">
                <div className="absolute left-[72px] top-0  h-[142px] w-[142px] opacity-25">
                    <img src="/assets/images/vector.png" className="w-full h-full" alt="" />
                </div>
                <div className="flex h-full flex-col justify-end relative text-white">
                    <h1 className="text-[51px] font-black">{title}</h1>
                    <p className="text-sm max-w-[542px] w-full">{description}</p>
                </div>
            </div>
        </div>
    );
};

export default HeroCommon;
