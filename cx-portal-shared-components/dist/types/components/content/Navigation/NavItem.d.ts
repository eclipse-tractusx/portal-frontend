import { MenuItemProps } from '../../basic/Menu/MenuItem';
interface NavItemProps extends MenuItemProps {
    isActive?: boolean;
    unstyled?: boolean;
}
export declare const NavItem: ({ title, children, component, isActive, unstyled, ...props }: NavItemProps) => JSX.Element;
export {};
