import { TabsProps as MuiTabsProps } from '@mui/material/Tabs';
import React from 'react';
interface TabsProps extends MuiTabsProps {
    children?: React.ReactElement[];
}
export declare const Tabs: ({ children, ...props }: TabsProps) => JSX.Element;
export {};
