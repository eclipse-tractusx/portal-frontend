import * as React from 'react'
import { groupBy } from 'lodash'
import Box from '@mui/material/Box'
import { styled, ThemeProvider, createTheme } from '@mui/material/styles'
import Divider from '@mui/material/Divider'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import Paper from '@mui/material/Paper'
import IconButton from '@mui/material/IconButton'
import Tooltip from '@mui/material/Tooltip'
import ArrowRight from '@mui/icons-material/ArrowRight'
import KeyboardArrowDown from '@mui/icons-material/KeyboardArrowDown'
import Home from '@mui/icons-material/Home'
import Settings from '@mui/icons-material/Settings'
import People from '@mui/icons-material/People'
import PermMedia from '@mui/icons-material/PermMedia'
import Dns from '@mui/icons-material/Dns'
import Public from '@mui/icons-material/Public'
import { SearchCategory, SearchItem } from 'features/info/search/types'
import { SearchResultItem } from '../SearchResultItem'
import { SearchResultGroup } from '../SearchResultGroup'

export const SearchResult = ({
  items,
  expr,
}: {
  items: SearchItem[]
  expr?: string
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
