import { TextFieldProps } from '@mui/material';
interface InputProps extends Omit<TextFieldProps, 'variant'> {
    variant?: 'filled';
}
export declare const Input: ({ variant, label, placeholder, helperText, error, ...props }: InputProps) => JSX.Element;
export {};
