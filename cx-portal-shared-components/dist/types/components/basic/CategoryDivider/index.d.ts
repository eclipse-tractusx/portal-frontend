/// <reference types="react" />
interface CategoryDividerProps {
    buttonText: string;
    categoryItemsLength: number;
    categoryName: string;
    onButtonClick: React.MouseEventHandler;
}
export declare const CategoryDivider: ({ buttonText, categoryItemsLength, categoryName, onButtonClick, }: CategoryDividerProps) => JSX.Element;
export {};
