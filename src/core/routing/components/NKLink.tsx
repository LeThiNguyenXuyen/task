import * as React from 'react';

import { Link, LinkProps } from '@tanstack/react-router';

interface NKLinkProps extends Omit<LinkProps, 'to' | 'params'> {
    href: string;
    params?: LinkProps['params'];
}

const NKLink: React.FunctionComponent<NKLinkProps> = ({ href, children, params = {}, ...rest }) => {
    return (
        <Link params={params} to={href} {...rest}>
            {children}
        </Link>
    );
};

export default NKLink;
