import * as React from 'react';

import Footer from './Footer';
import Header from './Header';

interface MainLayoutProps {
    children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
    return (
        <div className="flex min-h-screen w-full flex-col">
            <Header />
            <div className="mt-20 flex h-full w-full flex-1 justify-center">{children}</div>
            {/* <Footer /> */}
        </div>
    );
};

export default MainLayout;
