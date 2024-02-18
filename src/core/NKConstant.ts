export const NKConstant = {
    LOCAL_STORAGE_KEY: 'app' as const,
    SUPPORTED_LOCALES: ['en', 'vi'] as const,
    FALLBACK_LOCALE: 'en' as const,
    TOKEN_COOKIE_KEY: 'token' as const,
    TOKEN_HEADER_KEY: 'Authorization' as const,
    APP_NAME: 'Motel' as const,
    AUTH_FAILED_FALLBACK_ROUTE: '/auth' as const,
    AUTH_SUCCESS_FALLBACK_ROUTE: '/' as const,
    AUTH_EXPERT_FAILED_FALLBACK_ROUTE: '/expert' as const,
    AUTH_EXPERT_SUCCESS_FALLBACK_ROUTE: '/expert/dashboard' as const,
};
