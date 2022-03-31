/// <reference types="react" />
import { BoxProps } from '@mui/material';
import { MenuType } from '.';
declare type LinkItem = Partial<Record<'href' | 'to', string>>;
export interface MenuItemProps extends LinkItem {
    title: string;
    children?: MenuItemProps[];
    component?: React.ElementType;
    divider?: boolean;
    menuProps?: BoxProps;
    Menu?: MenuType;
}
export declare const MenuItem: ({ title, children, divider, component, menuProps, Menu, ...props }: MenuItemProps) => JSX.Element;
export {};
