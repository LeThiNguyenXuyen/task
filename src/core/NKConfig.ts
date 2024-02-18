export const NKConfig = {
    API_URL: import.meta.env.VITE_API_URL || '',
    GOOGLE_ANALYTICS_URL: import.meta.env.VITE_GOOGLE_ANALYTICS_URL || '',
    NODE_ENV: import.meta.env.VITE_NODE_ENV || '',
    LOGIN_GOOGLE_URL: import.meta.env.VITE_LOGIN_GOOGLE_URL || '',
    LOGIN_FACEBOOK_URL: import.meta.env.VITE_LOGIN_FACEBOOK_URL || '',
};

console.log('Config', NKConfig);
