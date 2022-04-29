import { HorizontalTable } from './HorizontalTable';
import { VerticalTable } from './VerticalTable';
import { TableType } from './types'

export const StaticTable = ({ data, horizontal }: {data: TableType, horizontal?: boolean}) => (
    horizontal ? (
        <HorizontalTable data={data} />
    ) : (
        <VerticalTable data={data} />
    )
)