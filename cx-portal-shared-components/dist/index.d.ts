/// <reference types="react" />
import { ButtonProps as ButtonProps$1 } from '@mui/material/Button';
import { CheckboxProps as CheckboxProps$1 } from '@mui/material/Checkbox';
import { DialogProps as DialogProps$1 } from '@mui/material/Dialog';
import { DialogActionsProps } from '@mui/material/DialogActions';
import { DialogContentProps as DialogContentProps$1 } from '@mui/material/DialogContent';
import { IconButtonProps as IconButtonProps$1 } from '@mui/material/IconButton';
import { TextFieldProps, BoxProps, AvatarProps } from '@mui/material';
import { RadioProps as RadioProps$1 } from '@mui/material/Radio';
import { TabProps } from '@mui/material/Tab';
import React$1 from 'react';
import { DataGridProps } from '@mui/x-data-grid';
import { TabsProps as TabsProps$1 } from '@mui/material/Tabs';
import { TypographyProps } from '@mui/material/Typography';
import { IPreviewProps, StatusValue, IDropzoneProps, ILayoutProps } from 'react-dropzone-uploader';
import { ChipProps } from '@mui/material/Chip';
import * as _mui_material_styles from '@mui/material/styles';

interface ButtonProps extends Omit<ButtonProps$1, 'color'> {
    color?: 'primary' | 'secondary';
}
declare const Button: ({ variant, color: colorProp, ...props }: ButtonProps) => JSX.Element;

interface CheckboxProps extends Omit<CheckboxProps$1, 'size'> {
    size?: 'medium' | 'small';
    label?: string | number;
}
declare const Checkbox: ({ size, label, ...props }: CheckboxProps) => JSX.Element;

declare type DialogProps = Pick<DialogProps$1, 'children' | 'open' | 'scroll'>;
declare const Dialog: ({ scroll, ...props }: DialogProps) => JSX.Element;

interface DialogActionProps extends DialogActionsProps {
    helperText?: string;
}
declare const DialogActions: ({ children, helperText, ...props }: DialogActionProps) => JSX.Element;

declare type DialogContentProps = DialogContentProps$1;
declare const DialogContent: (props: DialogContentProps) => JSX.Element;

interface DialogHeaderProps {
    title: string;
    intro?: string;
}
declare const DialogHeader: ({ title, intro }: DialogHeaderProps) => JSX.Element;

interface IconButtonProps extends Omit<IconButtonProps$1, 'color' | 'size'> {
    color?: 'primary' | 'secondary';
    size?: 'medium' | 'small';
    variant?: 'outlined';
}
declare const IconButton: ({ size, variant, ...props }: IconButtonProps) => JSX.Element;

interface InputProps extends Omit<TextFieldProps, 'variant'> {
    variant?: 'filled';
}
declare const Input: ({ variant, label, placeholder, helperText, error, ...props }: InputProps) => JSX.Element;

interface Language {
    key: string;
    name?: string;
}
interface LanguageSwitchProps {
    current: Language['key'];
    languages: Language[];
    onChange: (key: string) => void;
}
declare const LanguageSwitch: ({ current, languages, onChange, }: LanguageSwitchProps) => JSX.Element;

interface LogoProps {
    variant: 'standard' | 'short' | 'text';
    altText: string;
}
declare const Logo: ({ variant, altText, ...props }: LogoProps) => JSX.Element;

declare type LinkItem = Partial<Record<'href' | 'to', string>>;
interface MenuItemProps extends LinkItem {
    title: string;
    children?: MenuItemProps[];
    component?: React.ElementType;
    divider?: boolean;
    menuProps?: BoxProps;
    Menu?: MenuType;
}

interface MenuProps extends BoxProps {
    items: MenuItemProps[];
    component?: React.ElementType;
    divider?: boolean;
}
declare const Menu: ({ items, divider, component, ...props }: MenuProps) => JSX.Element;
declare type MenuType = typeof Menu;

interface RadioProps extends Omit<RadioProps$1, 'size'> {
    size?: 'medium' | 'small';
    label?: string | number;
}
declare const Radio: ({ size, label, ...props }: RadioProps) => JSX.Element;

interface SearchProps extends Omit<TextFieldProps, 'variant'> {
    variant?: 'outlined';
}
declare const SearchInput: ({ variant, ...props }: SearchProps) => JSX.Element;

interface SharedThemeProviderProps {
    children: React.ReactNode;
}
declare const SharedThemeProvider: ({ children }: SharedThemeProviderProps) => JSX.Element;

declare const Tab: ({ ...props }: TabProps) => JSX.Element;

interface TabPanelProps {
    children?: React$1.ReactNode;
    index: number;
    value: number;
}
declare const TabPanel: (props: TabPanelProps) => JSX.Element;

interface StatusChipProps extends Omit<ChipProps, 'color'> {
    color?: 'pending' | 'confirmed' | 'declined' | 'label';
}
declare const StatusTag: ({ variant, color, onDelete, ...props }: StatusChipProps) => JSX.Element;

interface FilterValue {
    value: string;
    label?: string;
}
interface Filter {
    name: string;
    values: FilterValue[];
}
declare type SelectedFilter = {
    [name: string]: string[];
};
interface ToolbarProps {
    title?: string;
    numberOfColumns?: number;
    buttonLabel?: string;
    onButtonClick?: React$1.MouseEventHandler;
    onSearch?: (value: string) => void;
    filter?: Filter[];
    onFilter?: (selectedFilter: SelectedFilter) => void;
}

interface TableProps extends DataGridProps {
    title: string;
    numberOfColumns?: number;
    toolbar?: ToolbarProps;
}
declare const Table: ({ columns, rows, autoHeight, headerHeight, rowHeight, title, numberOfColumns, toolbar, ...props }: TableProps) => JSX.Element;

interface TabsProps extends TabsProps$1 {
    children?: React$1.ReactElement[];
}
declare const Tabs: ({ children, ...props }: TabsProps) => JSX.Element;

declare const Typography: (props: TypographyProps) => JSX.Element;

interface AllAvatarProps extends Omit<AvatarProps, 'ImageComponent'> {
    altText?: string;
    userImage?: string;
    notificationCount?: number;
    isNotificationAlert?: boolean;
}
declare const UserAvatar: ({ userImage, altText, notificationCount, isNotificationAlert, ...props }: AllAvatarProps) => JSX.Element;

declare type statusText = {
    [k in StatusValue]: string;
};
interface previewProps {
    errorStatus: String[];
    statusText: Partial<statusText>;
}
interface allPreviewProps extends IPreviewProps, previewProps {
}
declare const Preview: ({ meta, statusText, fileWithMeta, canCancel, canRemove, canRestart, errorStatus, }: allPreviewProps) => JSX.Element;

interface DropzoneProps extends IDropzoneProps, previewProps {
    fileTypes: string;
    title: string;
    subTitle: string;
    maxFilesCount: number;
}
declare const Dropzone: ({ title, subTitle, fileTypes, maxFilesCount, getUploadParams, onSubmit, onChangeStatus, statusText, errorStatus, }: DropzoneProps) => JSX.Element;

declare const Layout: ({ input, previews, dropzoneProps, files, extra: { maxFiles }, }: ILayoutProps) => JSX.Element;

interface InputContentProps {
    title: string;
    subTitle: string;
}
declare const InputContent: ({ title, subTitle }: InputContentProps) => JSX.Element;

interface ChipCustomProps extends ChipProps {
    type?: 'decline' | 'confirm';
    withIcon?: true | false;
}
declare const Chip: ({ variant, color, type, withIcon, onDelete, ...props }: ChipCustomProps) => JSX.Element;

interface AppCardButtonsProps {
    buttonText: string;
    onButtonClick: React.MouseEventHandler;
    onSecondaryButtonClick?: React.MouseEventHandler;
}

interface AppCardRatingProps {
    rating: number;
}

interface AppCardContentProps extends Partial<AppCardRatingProps> {
    title: string;
    subtitle: string;
    price?: string;
    description?: string;
}

declare type AppCardImageSize = 'normal' | 'small';
declare type AppCardImageShape = 'round' | 'square';
interface IAppCardImage {
    src: string;
    alt?: string;
}
interface AppCardImageProps {
    image: IAppCardImage;
    imageSize?: AppCardImageSize;
    imageShape?: AppCardImageShape;
    preview?: boolean;
}

declare type Variants = 'minimal' | 'compact' | 'expanded' | 'preview';
interface AppCardProps extends AppCardContentProps, AppCardButtonsProps, AppCardImageProps {
    variant?: Exclude<Variants, 'preview'>;
}

declare type AppCardItems = Omit<AppCardProps, 'variant' | 'imageSize' | 'imageShape' | 'buttonText'>;
interface AppCardsProps {
    items: AppCardItems[];
    buttonText: AppCardProps['buttonText'];
    variant?: AppCardProps['variant'];
    imageSize?: AppCardProps['imageSize'];
    imageShape?: AppCardProps['imageShape'];
    columns?: number;
}
declare const AppCards: ({ items, buttonText, variant, imageSize, imageShape, columns, }: AppCardsProps) => JSX.Element;

interface NavigationProps extends MenuProps {
    active?: string;
    unstyled?: boolean;
}
declare const Navigation: ({ items, component, active, unstyled, }: NavigationProps) => JSX.Element;

interface UserMenuProps {
    open: boolean;
    userName: string;
    userRole: string;
    top?: number;
    children?: React.ReactElement[];
    onClickAway?: (event: MouseEvent | TouchEvent) => void;
}
declare const UserMenu: ({ open, userName, userRole, children, top, onClickAway, ...props }: UserMenuProps) => JSX.Element;

declare type UserNavProps = MenuProps;
declare const UserNav: (props: UserNavProps) => JSX.Element;

declare const theme: _mui_material_styles.Theme;

export { AppCardItems, AppCards, Button, Checkbox, Chip, Dialog, DialogActions, DialogContent, DialogHeader, Dropzone, InputContent as DropzoneInputContent, Layout as DropzoneLayout, Preview as DropzonePreview, IconButton, Input, LanguageSwitch, Logo, Menu, Navigation, NavigationProps, Radio, SearchInput, SharedThemeProvider, StatusTag, Tab, TabPanel, Table, TableProps, Tabs, Typography, UserAvatar, UserMenu, UserNav, theme };
