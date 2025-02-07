import * as React from 'react';

import { Link, LinkProps } from '@tanstack/react-router';

interface NKLinkProps extends Omit<LinkProps, 'to'> {
    href: string;
}

export const NKLink: React.FunctionComponent<NKLinkProps> = ({ href, children, ...rest }) => {
    return (
        <Link to={href} {...rest}>
            {children}
        </Link>
    );
};

export default NKLink;
