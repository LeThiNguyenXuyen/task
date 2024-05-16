import { PropsWithChildren, useEffect, useState } from 'react';

import { ConfigProvider, theme } from 'antd';

export type ProviderProps = PropsWithChildren<{}>;

export function AntdConfigProvider({ children }: ProviderProps) {
    return (
        <ConfigProvider
            theme={{
                algorithm: theme.defaultAlgorithm,
                token: {
                    borderRadius: 4,
                    colorPrimary: '#FF7364',
                    colorInfo: '#FF7364',
                    colorPrimaryActive: '#FF7364',
                },
                components: {
                    Menu: {
                        itemSelectedColor: '#FF7364',
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
