import { TextFieldProps } from '@mui/material';
interface SearchProps extends Omit<TextFieldProps, 'variant'> {
    variant?: 'outlined';
}
export declare const SearchInput: ({ variant, ...props }: SearchProps) => JSX.Element;
export {};
