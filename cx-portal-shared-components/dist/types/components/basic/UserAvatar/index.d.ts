import { AvatarProps } from '@mui/material';
interface AllAvatarProps extends Omit<AvatarProps, 'ImageComponent'> {
    altText?: string;
    userImage?: string;
    notificationCount?: number;
    isNotificationAlert?: boolean;
}
export declare const UserAvatar: ({ userImage, altText, notificationCount, isNotificationAlert, ...props }: AllAvatarProps) => JSX.Element;
export {};
