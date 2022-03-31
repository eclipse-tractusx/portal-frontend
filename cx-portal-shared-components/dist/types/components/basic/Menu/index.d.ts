/// <reference types="react" />
import { BoxProps } from '@mui/material';
import { MenuItemProps } from './MenuItem';
export interface MenuProps extends BoxProps {
    items: MenuItemProps[];
    component?: React.ElementType;
    divider?: boolean;
}
export declare const Menu: ({ items, divider, component, ...props }: MenuProps) => JSX.Element;
export declare type MenuType = typeof Menu;
