import { groupBy } from 'lodash'
import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import { SearchItem } from 'features/info/search/types'
import { SearchResultGroup } from '../SearchResultGroup'

export const SearchResult = ({
  expr,
  items,
}: {
  expr?: string
  items: SearchItem[]
}) => {
  const groupedItems = groupBy(items, (item: SearchItem) => item.category)
  const groupList = Object.entries(groupedItems).sort(
    (a: [string, SearchItem[]], b: [string, SearchItem[]]) =>
      a[0].localeCompare(b[0])
  )
  return (
    <Box sx={{ display: 'flex' }}>
      <Paper elevation={5} sx={{ width: 700, padding: 4, borderRadius: 4 }}>
        {groupList.map((item: [string, SearchItem[]], index: number) => (
          <SearchResultGroup
            key={item[0]}
            category={item[0]}
            expr={expr}
            items={item[1]}
            isFirst={index === 0}
          />
        ))}
      </Paper>
    </Box>
  )
}
