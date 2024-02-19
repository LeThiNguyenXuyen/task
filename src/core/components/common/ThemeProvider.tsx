import { PropsWithChildren, useEffect, useState } from 'react';

import { ConfigProvider, theme } from 'antd';

export type ProviderProps = PropsWithChildren<{}>;

export function AntdConfigProvider({ children }: ProviderProps) {
    return (
        <ConfigProvider
            theme={{
                algorithm:
                    // nowTheme === 'dark' ? theme.darkAlgorithm : theme.defaultAlgorithm,
                    theme.defaultAlgorithm,
                token: {
                    borderRadius: 8,
                    colorPrimary: '#EA6D22',
                    colorInfo: '#EA6D22',
                    colorPrimaryActive: '#EA6D22',
                    // colorBgBase: '#F4F7FE',
                    // colorBgLayout: '#F4F7FE',
                },
                components: {
                    Menu: {
                        // itemBg: '#FADCCA',
                        itemSelectedColor: '#EA6D22',
                    },
                    Table: {
                        // colorBgContainer: '#F4F7FE',
                    },
                    Layout: {
                        colorBgBody: '#F4F7FE',
                        bodyBg: '#F4F7FE',
                    },
                },
            }}
        >
            {children}
        </ConfigProvider>
    );
}

export default function ThemeProvider(props: ProviderProps) {
    const [mounted, setMounted] = useState(false);

    // useEffect only runs on the client, so now we can safely show the UI
    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        // use your loading page
        return <div className="hidden">{props.children}</div>;
    }

    return <AntdConfigProvider {...props} />;
}
