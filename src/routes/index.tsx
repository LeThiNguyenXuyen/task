import React from 'react';

import { createFileRoute } from '@tanstack/react-router';
import { ChevronRight } from 'akar-icons';
import { Badge, Button } from 'antd';
import {
    ArrowUpRight,
    BellIcon,
    CalendarIcon,
    Check,
    CheckCircle,
    ClipboardList,
    FacebookIcon,
    InstagramIcon,
    Lightbulb,
    MessageSquareIcon,
    Phone,
    PieChart,
    Search,
    ShoppingCart,
    Star,
    TwitterIcon,
} from 'lucide-react';

import ButtonSecondary from '@/core/components/buttons/ButtonSecondary';
import NKLink from '@/core/routing/components/NKLink';
import { cn } from '@/core/utils/tailwind';

const BRANDS = [
    '/assets/images/cdnlogo.com_aceonics-1.png',
    '/assets/images/cdnlogo.com_airbnb-1.png',
    '/assets/images/cdnlogo.com_black-crows-1.png',
    '/assets/images/cdnlogo.com_blumhouse-productions-1.png',
    '/assets/images/cdnlogo.com_dribbble-1.png',
    '/assets/images/cdnlogo.com_greastudio-1.png',
    '/assets/images/cdnlogo.com_red-hat-1-1.png',
];

const PROCESS_CARDS = [
    {
        title: ' Input Processing                                    ',
        desc: ' The chatbot receives user’s message or query and uses nLP.                                        ',
        img: '/assets/images/svg-image-4.svg',
        mt: 0,
    },
    {
        title: 'Holistic perception',
        desc: 'The chatbot understands the user’s query and context.',
        img: '/assets/images/svg-image-5.svg',
        mt: 40,
    },
    {
        title: 'Query Processing',
        desc: 'The chatbot processes the user’s query and provides a response.',
        img: '/assets/images/svg-image-6.svg',
        mt: 0,
    },
    {
        title: 'Output Delivery',
        desc: 'The chatbot delivers the response to the user.',
        img: '/assets/images/svg-image-7.svg',
        mt: 40,
    },
];

const FEATURE_CARDS = [
    {
        title: ' Authentication',
        desc: 'The chatbot authenticates the user and provides access to the system.',
        icon: Lightbulb,
    },
    {
        title: 'Voice',
        desc: 'The chatbot processes the user’s query and provides a response.',
        icon: BellIcon,
    },
    {
        title: 'Api',
        desc: 'Chatbot uses APIs to fetch data and provide responses to the user.',
        icon: ClipboardList,
    },
    {
        title: 'Gated Flow',
        desc: 'The chatbot uses a gated flow to guide the user through the conversation.',
        icon: PieChart,
    },
];

const FEATURE_LIST_CHECK = ['Boost SEO ranking', 'Marketing', 'Visual Reviews', 'Social Sharing', 'Retention', 'Reviews'];

const PRICING_LIST = [
    {
        name: 'starter',
        price: 25,
        type: 'month',
        items: ['5 chatbot', '200 subscribers', '1000 monthly message'],
    },
    {
        name: 'professional',
        price: 199,
        type: 'year',
        items: ['150 chatbot', '1000 subscribers', '10000 monthly message', 'Provide watermark', 'Internal support services'],
        isMain: true,
    },
    {
        name: 'enterprise',
        price: 99,
        type: 'month',
        items: ['50 chatbot', '550 subscribers', '5000 monthly message'],
    },
];

const OUR_SERVICES = [
    {
        tab: 'Machine Learning',
        icon: Phone,
        content: {
            title: 'Real-Time Actionable Insights',
            desc: 'There are many variations of passages of Lorem Ipsum available, available,have suffered alteration.ullamcorper mattis, pulvinar dapibus leo.',
            items: ['Boost SEO ranking', 'Marketing', 'Visual Reviews', 'Social Sharing', 'Retention', 'Reviews'],
        },
    },
    {
        tab: 'Chatbot Solutions',
        icon: Phone,
        content: {
            title: 'Real-Time Actionable Insights',
            desc: 'There are many variations of passages of Lorem Ipsum available, available,have suffered alteration.ullamcorper mattis, pulvinar dapibus leo.',
            items: ['Boost SEO ranking', 'Marketing', 'Visual Reviews', 'Social Sharing', 'Retention', 'Reviews'],
        },
    },
    {
        tab: 'Analytics & Reporting',
        icon: Phone,
        content: {
            title: 'Real-Time Actionable Insights',
            desc: 'There are many variations of passages of Lorem Ipsum available, available,have suffered alteration.ullamcorper mattis, pulvinar dapibus leo.',
            items: ['Boost SEO ranking', 'Marketing', 'Visual Reviews', 'Social Sharing', 'Retention', 'Reviews'],
        },
    },
    {
        tab: 'Management',
        icon: Phone,
        content: {
            title: 'Real-Time Actionable Insights',
            desc: 'There are many variations of passages of Lorem Ipsum available, available,have suffered alteration.ullamcorper mattis, pulvinar dapibus leo.',
            items: ['Boost SEO ranking', 'Marketing', 'Visual Reviews', 'Social Sharing', 'Retention', 'Reviews'],
        },
    },
    {
        tab: 'Oraganization',
        icon: Phone,
        content: {
            title: 'Real-Time Actionable Insights',
            desc: 'There are many variations of passages of Lorem Ipsum available, available,have suffered alteration.ullamcorper mattis, pulvinar dapibus leo.',
            items: ['Boost SEO ranking', 'Marketing', 'Visual Reviews', 'Social Sharing', 'Retention', 'Reviews'],
        },
    },
];

const REVIEWS = [
    {
        avatar: 'https://i.pravatar.cc/300?u=1',
        username: 'Denver Mark',
        position: 'Software Engineer',
        content: 'Egestas nunc, elementum ut consectetur faucibus vulputate. Massa purus feugiat massa vivamus viverra senectus.',
        rate: 4,
    },
    {
        avatar: 'https://i.pravatar.cc/300?u=2',
        username: 'Maria Ozawa',
        position: 'Software Engineer',
        content: 'Egestas nunc, elementum ut consectetur faucibus vulputate. Massa purus feugiat massa vivamus viverra senectus.',
        rate: 5,
    },
    {
        avatar: 'https://i.pravatar.cc/300?u=3',
        username: 'Jenny Doe',
        position: 'Web Developer',
        content: 'Egestas nunc, elementum ut consectetur faucibus vulputate. Massa purus feugiat massa vivamus viverra senectus.',
        rate: 4,
    },
    {
        avatar: 'https://i.pravatar.cc/300?u=4',
        username: 'John Doe',
        position: 'Java Developer',
        content: 'Egestas nunc, elementum ut consectetur faucibus vulputate. Massa purus feugiat massa vivamus viverra senectus.',
        rate: 5,
    },
];

const PORTFOLIOS = [
    'https://wordpress.iqonic.design/product/wp/talkie/wp-content/uploads/2023/04/data-science-1.jpg',
    'https://wordpress.iqonic.design/product/wp/talkie/wp-content/uploads/2023/04/Digital-marketing-1.jpg',
    'https://wordpress.iqonic.design/product/wp/talkie/wp-content/uploads/2023/04/mind-mapping-1.jpg',
    'https://wordpress.iqonic.design/product/wp/talkie/wp-content/uploads/2023/04/virtual-reality.jpg',
];

const OUR_TEAM_MEMBERS = [
    {
        img: 'https://wordpress.iqonic.design/product/wp/talkie/wp-content/uploads/2023/04/john-danemanager.jpg',
        position: 'Web developer',
        name: 'John Doe',
    },
    {
        img: 'https://wordpress.iqonic.design/product/wp/talkie/wp-content/uploads/2019/10/t1-2.jpg',
        position: 'Lead',
        name: 'Emiri Suzuhara',
    },
    {
        img: 'https://wordpress.iqonic.design/product/wp/talkie/wp-content/uploads/2019/10/t2-2.jpg',
        position: 'Designer',
        name: 'Maria Takayama',
    },
];

const ARTICLES = [
    {
        title: 'ROI of Chatbots Measuring Impact on Business Success',
        created_at: '2023-04-01',
        img: 'https://wordpress.iqonic.design/product/wp/talkie/wp-content/uploads/2020/01/blog-3-2.jpg',
        tag: 'Business',
        comments: 2,
    },
    {
        title: 'How Chatbots are Revolutionizing the Healthcare Industry',
        created_at: '2023-04-01',
        img: 'https://wordpress.iqonic.design/product/wp/talkie/wp-content/uploads/2020/01/blog-2-2.jpg',
        tag: 'Healthcare',
        comments: 3,
    },
    {
        title: 'The Future of Chatbots in the Banking Industry',
        created_at: '2023-04-01',
        img: 'https://wordpress.iqonic.design/product/wp/talkie/wp-content/uploads/2020/01/blog-1-2.jpg',
        tag: 'Banking',
        comments: 5,
    },
];

const INFO_CARDS = [
    {
        name: '24/7 Available',
        img: '/assets/images/svg-image-11.svg',
        value: '+123456789',
    },
    {
        name: 'Address',
        img: '/assets/images/svg-image-12.svg',
        value: '1234 North Avenue Luke Lane, South Bend, IN 360001',
    },
    {
        name: 'Online Support Mail',
        img: '/assets/images/svg-image-13.svg',
        value: 'support@iqonic.design',
    },
];

const FOOTER_COLS = [
    {
        title: 'Quick Links',
        items: ['About Us', 'Services', 'Portfolio', 'Team'],
    },
    {
        title: 'Integrations',
        items: ['Slack', 'Google Drive', 'Dropbox', 'Github'],
    },
];

const SubTitle = ({ children, hasBorder, className }: { children: React.ReactNode; hasBorder?: boolean; className?: string }) => {
    return (
        <div className={cn('mb-2 flex items-center justify-center gap-1 text-center', className)}>
            {hasBorder && <div className="w-4 border-b-2 border-bittersweet-400" />}
            <p className="italic text-bittersweet-400">{children}</p>
            {hasBorder && <div className="w-4 border-b-2 border-bittersweet-400" />}
        </div>
    );
};

const Title = ({
    children,
    className,
}: {
    children: React.ReactNode;

    className?: string;
}) => {
    return <h3 className={cn('text-governor-bay-800 text-center text-5xl font-medium', className)}>{children}</h3>;
};

const Description = ({ children, className }: { children: React.ReactNode; className?: string }) => {
    return <p className={cn('mx-auto mt-6 max-w-3xl text-center text-lg text-[#302F5B]', className)}>{children}</p>;
};

const Section = ({ children, className }: { children: React.ReactNode; className?: string }) => {
    return <section className={cn('py-32', className)}>{children}</section>;
};

const Header = () => {
    return (
        <header className="fixed left-0 right-0 top-0 z-50 flex h-16 items-center bg-white">
            <div className="container-app">
                <div className="flex items-center justify-between">
                    <NKLink href="/">
                        <img src="/assets/images/logo.jpg" className="h-12 w-12 rounded-full object-cover" />
                    </NKLink>

                    <div className="flex items-center gap-4">
                        <Badge size="small" count={0} showZero>
                            <ShoppingCart className="h-5 w-5 cursor-pointer text-[#302F5B]" />
                        </Badge>
                        <Search className="h-5 w-5 cursor-pointer  text-[#302F5B]" />
                        <Button type="primary" className="flex items-center gap-2" size="large">
                            Login
                            <ArrowUpRight className="h-4 w-4" />
                        </Button>
                    </div>
                </div>
            </div>
        </header>
    );
};

const Hero = () => {
    return (
        <div className="pb-16 pt-32">
            <div className="container-app">
                <div className="flex items-center justify-between">
                    <div className="flex max-w-[600px] flex-col items-start gap-10">
                        <h1 className="text-governor-bay-800 flex flex-wrap items-center gap-6 text-7xl font-semibold">
                            <span className="">Revise</span>
                            <img src="/assets/images/hero-1.png" alt="" /> # <img src="/assets/images/hero-2.png" alt="" />{' '}
                            <span className="font-normal">Content With</span> Chatbot <img src="/assets/images/hero-3.png" alt="" />
                        </h1>
                        <p className="max-w-[376px]">
                            Robotic Process Automation, or RPA, uses AI and machine learning to perform a variety of repeatable tasks, such as
                            calculations, data entry, handling queries, etc.
                        </p>
                        <ButtonSecondary className="h-auto gap-2 px-7 py-4 uppercase ">
                            Get Started <ArrowUpRight className="h-4 w-4" />
                        </ButtonSecondary>
                    </div>
                    <div className="max-w-3xl">
                        <img src="/assets/images/hero-4.png" alt="" />
                    </div>
                </div>
            </div>
        </div>
    );
};

const Brands = () => {
    return (
        <div className="bg-neutral-100 py-20">
            <div className="container-app">
                <div className="flex flex-wrap items-center gap-20">
                    {BRANDS.map((brand, index) => {
                        return <img key={index} src={brand} alt="" />;
                    })}
                </div>
            </div>
        </div>
    );
};

const ProcessCard = ({ title, desc, img, mt }: { title: string; desc: string; img: string; mt: number }) => {
    return (
        <div
            className="flex flex-col items-center text-center"
            style={{
                marginTop: mt,
            }}
        >
            <div className="flex h-56 w-56 items-center justify-center rounded-full border border-solid border-neutral-200 bg-white">
                <div className="bg-governor-bay-100 flex h-44 w-44 items-center justify-center rounded-full">
                    <img src={img} alt="" className="h-20 w-20 object-cover" />
                </div>
            </div>
            <div className="mt-9">
                <span className="text-governor-bay-800 mb-3 text-xl font-medium">{title}</span>
                <p className="text-[#302F5B]">{desc}</p>
            </div>
        </div>
    );
};

const SectionProcess = () => {
    return (
        <Section>
            <div className="container-app">
                <div className="mb-11">
                    <SubTitle hasBorder>Process</SubTitle>
                    <Title>Engage in Conversations </Title>
                    <Description>
                        There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form.
                    </Description>
                </div>
                <div
                    style={{
                        background: 'url(/assets/images/process-border.png)',
                        backgroundPosition: '50% 28%',
                        backgroundRepeat: 'no-repeat',
                    }}
                >
                    <div className="grid grid-cols-4">
                        {PROCESS_CARDS.map((card, index) => {
                            return (
                                <div key={index} className="flex items-center gap-10">
                                    <ProcessCard {...card} key={index} />
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </Section>
    );
};

const FeatureCard = ({ title, desc, icon }: { title: string; desc: string; icon: any }) => {
    const Icon: any = icon;
    return (
        <div
            className="flex flex-col items-start px-7 py-10 "
            style={{
                boxShadow: '0 12px 32px 0 rgba(25,41,66,0.07)',
            }}
        >
            <Icon className="mb-5 h-10 w-10 text-bittersweet-400 " />
            <span className="text-governor-bay-800 mb-1 text-xl font-medium">{title}</span>
            <p className="text-[#302F5B]">{desc}</p>
        </div>
    );
};

const SectionFeatures = () => {
    return (
        <Section className="pt-0">
            <div className="container-app">
                <div className="flex items-center gap-10">
                    <div className="w-full max-w-xl">
                        {
                            <div className="grid grid-cols-2 gap-x-7">
                                {FEATURE_CARDS.map((card, index) => {
                                    return (
                                        <div
                                            key={index}
                                            style={{
                                                marginTop: index % 2 !== 0 ? '28px' : 0,
                                            }}
                                        >
                                            <FeatureCard {...card} />
                                        </div>
                                    );
                                })}
                            </div>
                        }
                    </div>
                    <div>
                        <SubTitle className="justify-start text-left" hasBorder>
                            Features
                        </SubTitle>
                        <Title className="text-left">Our Core Features </Title>
                        <Description className="text-left">
                            It is a long established fact that a reader will be distracted by the readable content of a page when looking at its
                            layout. The point of using Lorem Ipsum is that it has.
                        </Description>
                        <ul className="mt-8 grid grid-cols-2 gap-4">
                            {FEATURE_LIST_CHECK.map((feature, index) => {
                                return (
                                    <li key={index} className="flex items-center gap-4 text-[#302F5B]">
                                        <CheckCircle className="h-4 w-4 text-bittersweet-400" />
                                        <span>{feature}</span>
                                    </li>
                                );
                            })}
                        </ul>
                        <ButtonSecondary className="mt-5 h-auto px-8 py-4">
                            Read More <ArrowUpRight className="h-4 w-4" />
                        </ButtonSecondary>
                    </div>
                </div>
            </div>
        </Section>
    );
};

const SectionPricing = () => {
    return (
        <Section className="bg-governor-bay-50">
            <div className="container-app">
                <div className="mb-11">
                    <SubTitle hasBorder>Pricing</SubTitle>
                    <Title>Our Pricing Plans</Title>
                </div>
                <div className="grid grid-cols-3 items-center gap-5">
                    {PRICING_LIST.map((item) => {
                        return (
                            <div
                                key={item.name}
                                className={cn('mt-6 flex flex-col items-center gap-7 rounded-lg bg-white p-7', {
                                    'mt-0 bg-bittersweet-400': item.isMain,
                                })}
                                style={{
                                    boxShadow: '0 12px 32px 0 rgba(25,41,66,0.07)',
                                }}
                            >
                                <span
                                    className={cn('uppercase text-bittersweet-400', {
                                        'text-white': item.isMain,
                                    })}
                                >
                                    {item.name}
                                </span>
                                <span
                                    className={cn('text-governor-bay-900 text-6xl font-medium', {
                                        'text-white': item.isMain,
                                    })}
                                >
                                    {item.price}$
                                </span>
                                <span
                                    className={cn('uppercase text-bittersweet-400', {
                                        'text-white': item.isMain,
                                    })}
                                >
                                    Per {item.type}
                                </span>
                                <ul
                                    className={cn('flex flex-col items-center font-medium text-[#302F5B]', {
                                        'text-white': item.isMain,
                                    })}
                                >
                                    {item.items.map((_item) => {
                                        return (
                                            <li key={_item} className="h-11">
                                                - {_item}
                                            </li>
                                        );
                                    })}
                                </ul>
                                <Button
                                    className={cn('mt-11 flex h-auto w-full items-center justify-center gap-2 px-9 py-5 font-semibold uppercase', {
                                        '!bg-white text-[#302F5B] hover:!bg-white hover:!text-[#302F5B]': item.isMain,
                                    })}
                                    type="primary"
                                >
                                    Read more
                                    <ArrowUpRight className="h-4 w-4" />
                                </Button>
                            </div>
                        );
                    })}
                </div>
            </div>
        </Section>
    );
};

const SectionBestService = () => {
    const [activeTabIndex, setActiveTabIndex] = React.useState(0);

    const activeTab = OUR_SERVICES[activeTabIndex];

    return (
        <Section>
            <div className="container-app">
                <div className="mb-11">
                    <SubTitle hasBorder>Services</SubTitle>
                    <Title>Our Best Services</Title>
                </div>
                <div
                    className="flex bg-white p-7"
                    style={{
                        boxShadow: '0 12px 32px 0 rgba(25,41,66,0.07)',
                    }}
                >
                    <div className="flex w-full max-w-md flex-col items-start border-r border-neutral-200">
                        {OUR_SERVICES.map((service, index) => {
                            return (
                                <div
                                    key={index}
                                    className={cn('text-governor-bay-800 flex cursor-pointer items-center gap-2 px-4 py-2 ', {
                                        'text-bittersweet-400': index === activeTabIndex,
                                    })}
                                    onClick={() => setActiveTabIndex(index)}
                                >
                                    <service.icon className="h-4 w-4" />
                                    <span className="font-semibold">{service.tab}</span>
                                </div>
                            );
                        })}
                    </div>
                    <div className="pl-14">
                        <span className="text-governor-bay-800 mb-4 inline-block text-2xl font-medium">{activeTab.content.title}</span>
                        <p className="tex-lg text-[#302F5B]">{activeTab.content.desc}</p>
                        <ul className="tex-lg mt-4 grid grid-cols-2 gap-2 text-[#302F5B]">
                            {activeTab.content.items.map((item, index) => {
                                return (
                                    <li key={index} className="flex items-center gap-2">
                                        <Check className="h-4 w-4 " />
                                        {item}
                                    </li>
                                );
                            })}
                        </ul>
                        <ButtonSecondary className="mt-4 h-auto gap-2 px-7 py-4 uppercase">
                            Read more <ArrowUpRight className="h-4 w-4" />
                        </ButtonSecondary>
                    </div>
                </div>
            </div>
        </Section>
    );
};

const SectionTestimonials = () => {
    return (
        <Section className="bg-governor-bay-50 overflow-x-hidden">
            <div className="container-app">
                <div className="flex items-start gap-7">
                    <div className="w-full max-w-3xl flex-shrink-0">
                        <SubTitle hasBorder className="justify-start">
                            Testimonial
                        </SubTitle>
                        <Title className="text-start">What Our Trusted Client Say About -Talkie</Title>
                        <Description className="mx-0 text-start">
                            It is a long established fact that a reader will be distracted by the of readable content the of readable content of a
                            page when looking at its layout of a page when looking at its layout.
                        </Description>
                        <ButtonSecondary className="mt-11 h-auto px-8 py-4 uppercase">
                            Contact now <ArrowUpRight className="h-4 w-4" />
                        </ButtonSecondary>
                    </div>
                    <div className="w-full flex-1 flex-shrink-0">
                        <ul className="flex items-center gap-4">
                            {REVIEWS.map((review, index) => {
                                return (
                                    <li key={index} className="min-w-80 rounded-lg bg-white px-7 py-10">
                                        <div className="mb-7 flex items-center gap-4">
                                            <img src={review.avatar} alt="" className="h-16 w-16 rounded-full object-cover" />
                                            <div className="flex flex-col">
                                                <span className="text-lg font-semibold">{review.username}</span>
                                                <span className="text-sm">{review.position}</span>
                                            </div>
                                        </div>
                                        <p className="mb-11 text-[#302F5B]">{review.content}</p>
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-2">
                                                {[1, 2, 3, 4, 5].map((rate) => {
                                                    return <Star key={rate} className={cn('h-4 w-4', { 'text-yellow-500': rate <= review.rate })} />;
                                                })}
                                            </div>
                                            <svg
                                                width="45"
                                                height="31"
                                                viewBox="0 0 45 31"
                                                fill="none"
                                                xmlns="http://www.w3.org/2000/svg"
                                                className="h-6 w-6 text-neutral-200"
                                            >
                                                <path
                                                    d="M29.2708 15.1458H40.1042V4.3125H29.2708V15.1458ZM4.89584 15.1458H15.7292V4.3125H4.89584V15.1458ZM32.3854 30.0417L37.8021 19.2083H25.2083V0.25H44.1667V19.75L39.0208 30.0417H32.3854ZM8.01043 30.0417L13.4271 19.2083H0.833344V0.25H19.7917V19.75L14.6458 30.0417H8.01043Z"
                                                    fill="currentColor"
                                                ></path>
                                            </svg>
                                        </div>
                                    </li>
                                );
                            })}
                        </ul>
                    </div>
                </div>
            </div>
        </Section>
    );
};

const SectionPortfolio = () => {
    return (
        <Section className="pb-0">
            <div className="container-app">
                <div className="flex items-end justify-between">
                    <div>
                        <SubTitle hasBorder className="justify-start">
                            Portfolio
                        </SubTitle>
                        <Title className="text-left">Our Amazing Portfolio</Title>
                    </div>
                    <ul className="flex items-center gap-4">
                        <li>All</li>
                        <li>Design</li>
                        <li>Html</li>
                    </ul>
                </div>
                <ul className="mt-[74px] grid min-h-[400px] grid-cols-4 gap-5">
                    {PORTFOLIOS.map((portfolio, index) => {
                        return (
                            <li key={index} className="relative h-full">
                                <img src={portfolio} alt="" className="h-full w-full rounded object-cover" />
                            </li>
                        );
                    })}
                </ul>
            </div>
        </Section>
    );
};

const SectionOurTeam = () => {
    return (
        <Section className="pb-0">
            <div className="container-app">
                <div>
                    <SubTitle hasBorder>Our Team</SubTitle>
                    <Title>Meet The Team</Title>
                </div>
                <ul className="mt-11 grid grid-cols-3 gap-5">
                    {OUR_TEAM_MEMBERS.map((member, index) => {
                        return (
                            <li key={index}>
                                <div
                                    className="flex flex-col items-center rounded p-5"
                                    style={{
                                        boxShadow: '0 12px 32px 0 rgba(25,41,66,0.07)',
                                    }}
                                >
                                    <div className="aspect-square w-full">
                                        <img src={member.img} className="h-full w-full rounded object-cover" />
                                    </div>
                                    <span className="text-governor-bay-800 mt-5 inline-block text-xl font-semibold">{member.name}</span>
                                    <span className="mt-2 inline-block">{member.position}</span>
                                </div>
                            </li>
                        );
                    })}
                </ul>
            </div>
        </Section>
    );
};

const SectionArticle = () => {
    return (
        <Section>
            <div className="container-app">
                <div>
                    <SubTitle hasBorder>Articles</SubTitle>
                    <Title>Latest Blog Post</Title>
                </div>
                <ul className="mt-11 grid grid-cols-3 gap-7">
                    {ARTICLES.map((article, index) => {
                        return (
                            <li key={index}>
                                <div
                                    className="flex flex-col items-center rounded"
                                    style={{
                                        boxShadow: '0 12px 32px 0 rgba(25,41,66,0.07)',
                                    }}
                                >
                                    <img src={article.img} className="h-full w-full rounded border-b border-neutral-200 object-cover" />
                                    <div className="w-full px-5 py-8 ">
                                        <div className="flex w-full items-center justify-between text-[#302F5B]">
                                            <div className="flex items-center gap-2">
                                                <div className="flex items-center gap-1">
                                                    <CalendarIcon className="h-4 w-4" />
                                                    <span className="text-governor-bay-800 text-sm font-medium">{article.created_at}</span>
                                                </div>
                                                <span className="bg-governor-bay-50 inline-block rounded p-1 text-sm font-medium ">
                                                    {article.tag}
                                                </span>
                                            </div>
                                            <div className="flex items-center gap-1">
                                                <MessageSquareIcon className="h-4 w-4" />
                                                <span>{article.comments}</span>
                                            </div>
                                        </div>
                                        <span className="text-governor-bay-800 mt-4 line-clamp-2 inline-block text-xl font-semibold">
                                            {article.title}
                                        </span>
                                    </div>
                                    <div className="hover:bg-governor-bay-800 flex w-full items-center justify-center py-5 text-sm font-semibold uppercase hover:text-white">
                                        Read More <ArrowUpRight className="h-4 w-4" />
                                    </div>
                                </div>
                            </li>
                        );
                    })}
                </ul>
            </div>
        </Section>
    );
};

const SectionInfo = () => {
    return (
        <Section className="bg-governor-bay-50">
            <div className="container-app">
                <ul className="grid grid-cols-3 gap-7">
                    {INFO_CARDS.map((card, index) => {
                        return (
                            <li key={index} className="flex items-center  gap-7">
                                <div className="flex h-20 w-20 flex-shrink-0 items-center justify-center rounded-full bg-white">
                                    <img src={card.img} alt="" className="h-7 w-7" />
                                </div>
                                <div className="flex flex-col gap-1">
                                    <span>{card.name}</span>
                                    <span className="text-governor-bay-800 text-lg">{card.value}</span>
                                </div>
                            </li>
                        );
                    })}
                </ul>
            </div>
        </Section>
    );
};

const Footer = () => {
    return (
        <footer className="bg-governor-bay-50  border-t border-neutral-200">
            <div className="container-app">
                <Section className="border-b border-neutral-200">
                    <div className="flex gap-14">
                        <div className="max-w-80">
                            <NKLink href="/">
                                <img src="/assets/images/logo.jpg" className="h-12 w-12 rounded-full object-cover" />
                            </NKLink>
                            <p className="mb-12 mt-6">
                                Talkie Programmed To Generate Human-Like Responses And Provide Information On A Wide Range Of Topics.
                            </p>
                            <div className="flex items-center gap-4">
                                <ButtonSecondary className="h-9 w-9">
                                    <TwitterIcon className="h-4 w-4 flex-shrink-0 text-white" />
                                </ButtonSecondary>
                                <ButtonSecondary className="h-9 w-9">
                                    <InstagramIcon className="h-4 w-4 flex-shrink-0 text-white" />
                                </ButtonSecondary>
                                <ButtonSecondary className="h-9 w-9">
                                    <FacebookIcon className="h-4 w-4 flex-shrink-0 text-white" />
                                </ButtonSecondary>
                            </div>
                        </div>
                        <ul className="grid grid-cols-3 gap-7">
                            {FOOTER_COLS.map((col, index) => {
                                return (
                                    <li key={index} className="min-w-44">
                                        <span className="text-governor-bay-800 text-xl font-semibold">{col.title}</span>
                                        <ul className="mt-4 space-y-4">
                                            {col.items.map((item, index) => {
                                                return (
                                                    <li key={index} className="flex items-center gap-1 text-[#302F5B]">
                                                        <ChevronRight className="h-4 w-4 text-bittersweet-400" />
                                                        {item}
                                                    </li>
                                                );
                                            })}
                                        </ul>
                                    </li>
                                );
                            })}
                            <li className="min-w-44">
                                <span className="text-governor-bay-800 text-xl font-semibold">Subscribe Us</span>
                                <p className="text-governor-bay-800 mb-8 mt-4 font-semibold">Get hot news and benefits delivered to your inbox</p>
                                <div className="flex w-full items-center border-b border-neutral-200 pb-1">
                                    <input type="text" placeholder="Enter your email" className="w-full border-none bg-transparent outline-none" />
                                    <div className="flex h-9 w-9 flex-shrink-0 cursor-pointer items-center justify-center rounded bg-white">
                                        <ArrowUpRight className="h-4 w-4" />
                                    </div>
                                </div>
                                <p className="mt-3 text-xs">For Any Question/Query Email: talkiehelp@gmail.com</p>
                            </li>
                        </ul>
                    </div>
                </Section>
            </div>
            <div className="flex items-center justify-center pb-12 pt-6">
                <p className="font-medium">Copyright 2024 talkie All Rights Reserved.</p>
            </div>
        </footer>
    );
};

const Page: React.FunctionComponent = () => {
    return (
        <>
            <Header />
            <Hero />
            <Brands />
            <SectionProcess />
            <SectionFeatures />
            <SectionPricing />
            <SectionBestService />
            <SectionTestimonials />
            <SectionPortfolio />
            <SectionOurTeam />
            <SectionArticle />
            <SectionInfo />
            <Footer />
        </>
    );
};

export const Route = createFileRoute('/')({
    component: Page,
});
