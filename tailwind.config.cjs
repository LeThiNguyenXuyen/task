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
