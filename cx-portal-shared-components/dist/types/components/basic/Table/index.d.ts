import { DataGridProps } from '@mui/x-data-grid';
import { StatusTag } from './components/StatusTag';
import { ToolbarProps } from './components/Toolbar';
export { StatusTag };
export interface TableProps extends DataGridProps {
    title: string;
    numberOfColumns?: number;
    toolbar?: ToolbarProps;
}
export declare const Table: ({ columns, rows, autoHeight, headerHeight, rowHeight, title, numberOfColumns, toolbar, ...props }: TableProps) => JSX.Element;
