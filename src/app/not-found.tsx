import * as React from 'react';

import Link from 'next/link';

interface NotFoundPageProps {}

const NotFoundPage: React.FunctionComponent<NotFoundPageProps> = () => {
    return (
        <div className="h-[1000px] w-full flex flex-col justify-center items-center bg-primary/50 text-white">
            <h1 className="text-[100px] font-black">ERROR 404</h1>
            <p className="text-[25px] mb-10">Page not Found, please o back</p>
            <Link href="/">
                <div className="text-[15px] justify-center items-center flex w-[272px] h-[88px] bg-primary">Back To Home</div>
            </Link>
        </div>
    );
};

export default NotFoundPage;
