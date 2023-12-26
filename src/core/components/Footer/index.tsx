'use client';

import * as React from 'react';

import Link from 'next/link';

import { IconContext } from 'react-icons';
import { FaAngleRight, FaFacebookSquare, FaInstagramSquare, FaLinkedin, FaMapMarkerAlt, FaTwitterSquare } from 'react-icons/fa';
import { HiMail } from 'react-icons/hi';

interface FooterProps {}

const social = [
    {
        name: 'Facebook',
        icon: (
            <IconContext.Provider value={{ className: 'w-[24px] h-[24px]' }}>
                <FaFacebookSquare />
            </IconContext.Provider>
        ),
        link: 'https://www.facebook.com',
    },

    {
        name: 'Twitter',
        icon: (
            <IconContext.Provider value={{ className: 'w-[24px] h-[24px]' }}>
                <FaTwitterSquare />
            </IconContext.Provider>
        ),
        link: 'https://www.twitter.com',
    },
    {
        name: 'Instagram',
        icon: (
            <IconContext.Provider value={{ className: 'w-[24px] h-[24px]' }}>
                <FaInstagramSquare />
            </IconContext.Provider>
        ),
        link: 'https://www.instagram.com',
    },
    {
        name: 'LinkedIn',
        icon: (
            <IconContext.Provider value={{ className: 'w-[24px] h-[24px]' }}>
                <FaLinkedin />
            </IconContext.Provider>
        ),
        link: 'https://www.instagram.com',
    },
];

const navItems = [
    {
        name: 'Trang chủ',
        link: '/',
    },
    {
        name: 'Về chúng tôi',
        link: '/about-us',
    },
    {
        name: 'Dịch vụ',
        link: '/services',
    },
    {
        name: 'FAQS',
        link: '/faqs',
    },
];

const contactItems = [
    {
        name: 'Địa chỉ',
        icon: (
            <IconContext.Provider value={{ className: 'w-5 h-5' }}>
                <FaMapMarkerAlt />
            </IconContext.Provider>
        ),
        value: 'Ho Chi Minh City, Viet Nam',
        href: '#',
    },
    {
        icon: (
            <IconContext.Provider value={{ className: 'w-5 h-5' }}>
                <HiMail />
            </IconContext.Provider>
        ),
        name: 'Email',
        value: 'moodboost1.0@gmail.com',
        href: 'mailto:moodboost1.0@gmail.com',
    },
];

const Footer: React.FunctionComponent<FooterProps> = () => {
    return (
        <footer className="bg-primary w-full h-[348px] flex flex-col px-[52px] ">
            <div className="grid-cols-8 gap-x-16 grid w-full py-11 text-white">
                <div className="col-span-3 flex justify-center items-center">
                    <Link href={'/'} className="h-[196px] w-[316px]">
                        <img src="/assets/images/logo.png" className="w-full h-full object-cover" alt="" />
                    </Link>
                </div>
                <div className="col-span-2 pt-8 flex item justify-start flex-col gap-[18px]">
                    <h3 className="text-lg font-black uppercase">Theo dõi chúng tôi</h3>
                    <div className="flex flex-col gap-[18px]">
                        <p className="text-sm">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus
                            leo.
                        </p>
                        <nav className="flex gap-5">
                            {social.map((item, index) => (
                                <a href={item.link} key={item.name}>
                                    {item.icon}
                                </a>
                            ))}
                        </nav>
                    </div>
                </div>
                <div className="col-span-1 pt-8  flex item justify-start flex-col gap-[18px]">
                    <h3 className="text-lg font-black uppercase">Điều Hướng</h3>
                    <ul className="flex flex-col gap-2.5">
                        {navItems.map((item, index) => (
                            <li key={item.name}>
                                <a className="flex items-center gap-2" href={item.link}>
                                    <IconContext.Provider value={{ className: 'w-5 h-5' }}>
                                        <FaAngleRight />
                                    </IconContext.Provider>
                                    <p className="text-sm">{item.name}</p>
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="col-span-2 pt-8  flex item justify-start flex-col gap-[18px]">
                    <h3 className="text-lg font-black uppercase">Điều Hướng</h3>
                    <ul className="flex flex-col gap-2.5">
                        {contactItems.map((item) => (
                            <li key={item.name}>
                                <a className="flex items-center gap-2" href={item.href}>
                                    {item.icon}
                                    <p className="text-sm">{item.value}</p>
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            <div className="h-[58px] flex justify-between items-center w-full border-t  font-semibold text-white text-xs uppercase border-white/25">
                <p>Allright Reserved - Moodboost</p>
                <nav className="flex items-center gap-8 t">
                    <Link href={'/policy'}>Chính sách người dùng</Link>
                    <Link href={'/term-and-conditions'}>Điều khoản & điều kiện</Link>
                </nav>
            </div>
        </footer>
    );
};

export default Footer;
