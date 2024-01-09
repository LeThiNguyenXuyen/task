export const NKRouter = {
    auth: {
        login: () => '/auth/login',
        register: () => '/auth/register',
        forgotPassword: () => '/auth/forgot-password',
    },

    app: {
        home: () => '/app',
        settings: {
            index: () => '/app/settings',
            update: () => '/app/settings/update',
            changePassword: () => '/app/settings/change-password',
            language: () => '/app/settings/language',
            orderHistory: () => '/app/settings/order-history',
            terms: () => '/app/settings/terms',
            policy: () => '/app/settings/policy',
            wallet: {
                index: () => '/app/settings/wallet',
                deposit: () => '/app/settings/wallet/deposit',
            },
        },
        userSale: {
            index: () => '/app/user-sale',
            detail: (id: string) => `/app/user-sale/${id}`,
        },
        userMeSale: {
            index: () => '/app/user-me-sale',
            detail: (id: string) => `/app/user-me-sale/${id}`,
        },
        userBooking: {
            index: () => '/app/user-booking',
            detail: (id: string) => `/app/user-booking/${id}`,
        },
        userMeBooking: {
            index: () => '/app/user-me-booking',
            detail: (id: string) => `/app/user-me-booking/${id}`,
        },
        post: {
            index: () => '/app/post',
            detail: (id: string) => `/app/post/${id}`,
            user: (id: string) => `/app/post/user/${id}`,
        },
        photographers: {
            index: () => '/app/photographers',
            detail: (id: string) => `/app/photographers/${id}`,
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
        product: {
            index: () => '/app/product',
            detail: (id: string) => `/app/product/${id}`,
        },
        cart: () => '/app/cart',
    },
};
