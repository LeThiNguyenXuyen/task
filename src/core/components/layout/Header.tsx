import * as React from 'react';

import clsx from 'clsx';
import { motion, useScroll } from 'framer-motion';

interface HeaderProps {}

const Header: React.FunctionComponent<HeaderProps> = () => {
    const { scrollYProgress } = useScroll();

    const [isSticky, setSticky] = React.useState(false);

    React.useEffect(() => {
        scrollYProgress.onChange((latest) => {
            if (latest > 0.05) {
                setSticky(true);
            } else {
                setSticky(false);
            }
        });
    }, [scrollYProgress]);

    return (
        <motion.header
            className={clsx('fixed left-0 top-0 z-50 w-full justify-center duration-200', {
                'bg-white dark:bg-neutral-900': isSticky,
                'bg-transparent': !isSticky,
            })}
        >
            <nav className="relative z-10 mx-auto  w-full max-w-7xl">
                <div className="flex h-20 items-center justify-between px-4 lg:container">
                    <div className=" flex-1 justify-start space-x-3 sm:space-x-8 md:flex lg:space-x-10">
                        <a className="ttnc-logo text-primary-6000 inline-block h-16 w-16 self-center focus:outline-none focus:ring-0" href="/">
                            <img src="/assets/images/logo.png" alt="logo" className="h-full w-full" />
                        </a>
                        <div className="hidden h-10 self-center border-l border-neutral-300 dark:border-neutral-500 lg:block" />
                        <div className="hidden lg:flex ">
                            <div className="DropdownTravelers relative flex" data-headlessui-state>
                                <button
                                    className="group h-10 self-center rounded-md py-2 text-sm font-medium text-opacity-90 hover:text-opacity-100 focus:outline-none sm:h-12 sm:text-base"
                                    type="button"
                                    aria-expanded="false"
                                    data-headlessui-state
                                    id="headlessui-popover-button-:rad:"
                                >
                                    <div className=" inline-flex items-center " role="button">
                                        <span>Travelers</span>
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 24 24"
                                            fill="currentColor"
                                            aria-hidden="true"
                                            className="ml-2 h-5 w-5 text-neutral-700 text-opacity-70 transition duration-150 ease-in-out group-hover:text-opacity-80 "
                                        >
                                            <path
                                                fillRule="evenodd"
                                                d="M12.53 16.28a.75.75 0 01-1.06 0l-7.5-7.5a.75.75 0 011.06-1.06L12 14.69l6.97-6.97a.75.75 0 111.06 1.06l-7.5 7.5z"
                                                clipRule="evenodd"
                                            />
                                        </svg>
                                    </div>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
        </motion.header>
    );
};

export default Header;
