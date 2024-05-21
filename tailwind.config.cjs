import typography from '@tailwindcss/typography';

/** @type {import('tailwindcss').Config} */
export default {
    darkMode: ['class'],
    content: ['./src/**/*.{tsx,css}'],
    theme: {
        extend: {
            colors: {
                tango: {
                    DEFAULT: '#EA6D22',
                    50: '#FADCCA',
                    100: '#F8CFB7',
                    200: '#F5B792',
                    300: '#F19E6D',
                    400: '#EE8647',
                    500: '#EA6D22',
                    600: '#C25412',
                    700: '#8E3E0E',
                    800: '#5B2809',
                    900: '#281104',
                    950: '#0E0601',
                },
                bittersweet: {
                    DEFAULT: '#0EA5E9',
                    50: '#B4E5FA',
                    100: '#A1DEF9',
                    200: '#7AD0F7',
                    300: '#54C3F5',
                    400: '#2DB5F2',
                    500: '#0EA5E9',
                    600: '#0B80B4',
                    700: '#085A7F',
                    800: '#04354A',
                    900: '#010F15',
                    950: '#000000',
                },
                'governor-bay': {
                    50: '#eff3fe',
                    100: '#e1ebfe',
                    200: '#c9d7fc',
                    300: '#a8bdf9',
                    400: '#859af4',
                    500: '#6877ec',
                    600: '#4c51df',
                    700: '#3d3ec5',
                    800: '#3639a4',
                    900: '#31357e',
                    950: '#1d1e49',
                },
            },
            backgroundImage: {
                'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
                'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
            },
            maxWidth: {
                app: '1440px',
            },
        },
    },
    plugins: [typography],
};
