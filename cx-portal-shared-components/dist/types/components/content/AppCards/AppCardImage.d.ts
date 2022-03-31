export declare type AppCardImageSize = 'normal' | 'small';
export declare type AppCardImageShape = 'round' | 'square';
export interface IAppCardImage {
    src: string;
    alt?: string;
}
export interface AppCardImageProps {
    image: IAppCardImage;
    imageSize?: AppCardImageSize;
    imageShape?: AppCardImageShape;
    preview?: boolean;
}
export declare const AppCardImage: ({ image, imageSize, imageShape, preview, }: AppCardImageProps) => JSX.Element;
