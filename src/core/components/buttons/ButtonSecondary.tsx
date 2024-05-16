import { Button, ButtonProps } from 'antd';

import { cn } from '@/core/utils/tailwind';

type Props = ButtonProps;

const ButtonSecondary = ({ className, ...props }: Props) => {
    return (
        <Button
            className={cn('!bg-governor-bay-800 flex items-center justify-center hover:!bg-bittersweet-400', className)}
            {...props}
            type="primary"
        />
    );
};

export default ButtonSecondary;
