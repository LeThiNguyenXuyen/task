import { Button, ButtonProps } from 'antd';

import { cn } from '@/core/utils/tailwind';

type Props = ButtonProps;

const ButtonSecondary = ({ className, ...props }: Props) => {
    return (
        <Button
            className={cn('flex items-center justify-center !bg-governor-bay-800 hover:!bg-bittersweet-400', className)}
            {...props}
            type="primary"
        />
    );
};

export default ButtonSecondary;
