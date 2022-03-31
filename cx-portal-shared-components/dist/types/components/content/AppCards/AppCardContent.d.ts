import { AppCardRatingProps } from './AppCardRating';
export interface AppCardContentProps extends Partial<AppCardRatingProps> {
    title: string;
    subtitle: string;
    price?: string;
    description?: string;
}
export declare const AppCardContent: ({ title, subtitle, rating, price, description, }: AppCardContentProps) => JSX.Element;
