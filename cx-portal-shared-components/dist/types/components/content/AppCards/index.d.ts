import { AppCardProps } from './AppCard';
export declare type AppCardItems = Omit<AppCardProps, 'variant' | 'imageSize' | 'imageShape' | 'buttonText'>;
interface AppCardsProps {
    items: AppCardItems[];
    buttonText: AppCardProps['buttonText'];
    variant?: AppCardProps['variant'];
    imageSize?: AppCardProps['imageSize'];
    imageShape?: AppCardProps['imageShape'];
    columns?: number;
}
export declare const AppCards: ({ items, buttonText, variant, imageSize, imageShape, columns, }: AppCardsProps) => JSX.Element;
export {};
