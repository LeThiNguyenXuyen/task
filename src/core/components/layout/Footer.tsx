import * as React from 'react';

import { IconContext } from 'react-icons';
import { FaAngleRight, FaFacebookSquare, FaInstagramSquare, FaLinkedin, FaMapMarkerAlt, FaTwitterSquare } from 'react-icons/fa';
import { HiMail } from 'react-icons/hi';

import NKLink from '@/core/routing/components/NKLink';

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
        <footer className="bg-primary flex h-[348px] w-full flex-col px-[52px] ">
            <div className="grid w-full grid-cols-8 gap-x-16 py-11 text-white">
                <div className="col-span-3 flex items-center justify-center">
                    <NKLink params={{}} href={'/'} className="h-[196px] w-[316px]">
                        <img src="/assets/images/logo.png" className="h-full w-full object-cover" alt="" />
                    </NKLink>
                </div>
                <div className="item col-span-2 flex flex-col justify-start gap-[18px] pt-8">
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
                <div className="item col-span-1  flex flex-col justify-start gap-[18px] pt-8">
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
                <div className="item col-span-2  flex flex-col justify-start gap-[18px] pt-8">
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

            <div className="flex h-[58px] w-full items-center justify-between border-t  border-white/25 text-xs font-semibold uppercase text-white">
                <p>Allright Reserved - Moodboost</p>
                <nav className="t flex items-center gap-8">
                    <NKLink params={{}} href={'/policy'}>
                        Chính sách người dùng
                    </NKLink>
                    <NKLink href={'/term-and-conditions'}>Điều khoản & điều kiện</NKLink>
                </nav>
            </div>
        </footer>
    );
};

export default Footer;
