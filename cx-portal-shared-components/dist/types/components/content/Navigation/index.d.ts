import { MenuProps } from '../../basic/Menu';
export interface NavigationProps extends MenuProps {
    active?: string;
    unstyled?: boolean;
}
export declare const Navigation: ({ items, component, active, unstyled, }: NavigationProps) => JSX.Element;
