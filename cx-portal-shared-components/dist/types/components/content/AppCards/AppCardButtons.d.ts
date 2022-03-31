/// <reference types="react" />
export interface AppCardButtonsProps {
    buttonText: string;
    onButtonClick: React.MouseEventHandler;
    onSecondaryButtonClick?: React.MouseEventHandler;
}
export declare const AppCardButtons: ({ buttonText, onButtonClick, onSecondaryButtonClick, }: AppCardButtonsProps) => JSX.Element;
