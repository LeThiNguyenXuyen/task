import * as React from 'react';

import { Link, LinkProps } from '@tanstack/react-router';

interface NKLinkProps extends Omit<LinkProps, 'to' | 'params' | 'href'> {
    href: string;
}

export const NKLink: React.FunctionComponent<NKLinkProps> = ({ href, ...rest }) => {
    return <Link params to={href} {...rest} />;
};
