import { ChipProps } from '@mui/material/Chip';
interface ChipCustomProps extends ChipProps {
    type?: 'decline' | 'confirm';
    withIcon?: true | false;
}
export declare const Chip: ({ variant, color, type, withIcon, onDelete, ...props }: ChipCustomProps) => JSX.Element;
export {};
