export const NKRouter = {
    auth: {
        login: () => '/auth/login',
        register: () => '/auth/register',
        forgotPassword: () => '/auth/forgot-password',
    },

    app: {
        settings: {
            index: () => '/app/settings',
            update: () => '/app/settings/update',
            changePassword: () => '/app/settings/change-password',
            language: () => '/app/settings/language',
        },
        contactUs: {
            index: () => '/app/contact-us',
        },
        premium: {
            index: () => '/app/premium',
        },
        chat: {
            index: () => '/app/chat',
            detail: (id: string) => `/app/chat/${id}`,
        },
        notification: {
            index: () => '/app/notification',
        },
    },
};
