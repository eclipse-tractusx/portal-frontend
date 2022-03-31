import { AppCardButtonsProps } from './AppCardButtons';
import { AppCardContentProps } from './AppCardContent';
import { AppCardImageProps } from './AppCardImage';
declare type Variants = 'minimal' | 'compact' | 'expanded' | 'preview';
export interface AppCardProps extends AppCardContentProps, AppCardButtonsProps, AppCardImageProps {
    variant?: Exclude<Variants, 'preview'>;
}
export declare const AppCard: ({ variant: variantProp, title, subtitle, rating, price, description, image, imageSize, imageShape, buttonText, onButtonClick, onSecondaryButtonClick, }: AppCardProps) => JSX.Element;
export {};
