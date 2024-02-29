export const NKRouter = {
    home: () => '/',
    setting: {
        index: () => '/setting',
        password: () => '/setting/password',
        wallet: {
            index: () => '/setting/wallet',
            deposit: () => '/setting/wallet/deposit',
            withdraw: () => '/setting/wallet/withdraw',
        },
    },
    auth: {
        login: () => '/auth/login',
        register: () => '/auth/register',
        forgotPassword: () => '/auth/forgot-password',
    },
    landlord: {
        index: () => '/landlord',
        detail: (id: string) => `/landlord/${id}`,
    },
    userMe: {
        updateProfile: () => '/me/update-profile',
        changePassword: () => '/me/change-password',
        wallet: () => '/me/wallet',
        customerFeedback: () => '/me/customer-feedback',
    },
    booking: {
        index: () => '/booking',
        detail: (id: string) => `/booking/${id}/detail`,
    },
    freelancer: {
        index: () => '/designer',
        detail: (id: string) => `/designer/${id}`,
    },
    myService: {
        request: {
            index: () => '/my-service/request',
            detail: (id: string) => `/my-service/request/${id}/detail`,
        },
        service: {
            index: () => '/my-service/service',
            detail: (id: string) => `/my-service/service/${id}/detail`,
            create: () => '/my-service/service/create',
            edit: (id: string) => `/my-service/service/${id}/edit`,
        },
    },

    me: {
        index: () => '/me',
        updateProfile: () => '/me/update-profile',
        changePassword: () => '/me/change-password',
        wallet: () => '/me/wallet',
        customerFeedback: () => '/me/customer-feedback',
    },

    freelance: {
        index: () => '/freelance',
        detail: (id: string) => `/freelance/${id}/detail`,
    },

    forum: {
        index: () => '/forum',
        detail: (id: string) => `/forum/${id}`,
    },
};
