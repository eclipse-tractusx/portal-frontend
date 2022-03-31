import { ChipProps as MuiStatusChipProps } from '@mui/material/Chip';
interface StatusChipProps extends Omit<MuiStatusChipProps, 'color'> {
    color?: 'pending' | 'confirmed' | 'declined' | 'label';
}
export declare const StatusTag: ({ variant, color, onDelete, ...props }: StatusChipProps) => JSX.Element;
export {};
