import React from 'react';
interface FilterValue {
    value: string;
    label?: string;
}
interface Filter {
    name: string;
    values: FilterValue[];
}
export declare type SelectedFilter = {
    [name: string]: string[];
};
export interface ToolbarProps {
    title?: string;
    numberOfColumns?: number;
    buttonLabel?: string;
    onButtonClick?: React.MouseEventHandler;
    onSearch?: (value: string) => void;
    filter?: Filter[];
    onFilter?: (selectedFilter: SelectedFilter) => void;
}
export declare const Toolbar: ({ title, numberOfColumns, buttonLabel, onButtonClick, onSearch, filter, onFilter, }: ToolbarProps) => JSX.Element;
export {};
