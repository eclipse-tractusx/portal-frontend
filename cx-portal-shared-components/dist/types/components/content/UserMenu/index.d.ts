/// <reference types="react" />
interface UserMenuProps {
    open: boolean;
    userName: string;
    userRole: string;
    top?: number;
    children?: React.ReactElement[];
    onClickAway?: (event: MouseEvent | TouchEvent) => void;
}
export declare const UserMenu: ({ open, userName, userRole, children, top, onClickAway, ...props }: UserMenuProps) => JSX.Element;
export {};
