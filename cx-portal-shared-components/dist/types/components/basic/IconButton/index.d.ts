import { IconButtonProps as MuiIconButtonProps } from '@mui/material/IconButton';
interface IconButtonProps extends Omit<MuiIconButtonProps, 'color' | 'size'> {
    color?: 'primary' | 'secondary';
    size?: 'medium' | 'small';
    variant?: 'outlined';
}
export declare const IconButton: ({ size, variant, ...props }: IconButtonProps) => JSX.Element;
export {};
