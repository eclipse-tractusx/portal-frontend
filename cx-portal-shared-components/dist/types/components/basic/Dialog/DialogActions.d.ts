import { DialogActionsProps as MuiDialogActionsProps } from '@mui/material/DialogActions';
export interface DialogActionProps extends MuiDialogActionsProps {
    helperText?: string;
}
export declare const DialogActions: ({ children, helperText, ...props }: DialogActionProps) => JSX.Element;
