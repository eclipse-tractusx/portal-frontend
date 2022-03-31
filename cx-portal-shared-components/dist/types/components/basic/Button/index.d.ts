import { ButtonProps as MuiButtonProps } from '@mui/material/Button';
export interface ButtonProps extends Omit<MuiButtonProps, 'color'> {
    color?: 'primary' | 'secondary';
}
export declare const Button: ({ variant, color: colorProp, ...props }: ButtonProps) => JSX.Element;
