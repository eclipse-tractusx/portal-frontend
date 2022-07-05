import * as React from 'react'
import { styled } from '@mui/material/styles'
import List from '@mui/material/List'
import Divider from '@mui/material/Divider'
import { SearchItem } from 'features/info/search/types'
import { SearchResultItem } from '../SearchResultItem'
import { useTranslation } from 'react-i18next'

const SearchResultList = styled(List)<{ component?: React.ElementType }>({
  '& .MuiListItemButton-root': {
    paddingLeft: 12,
    paddingRight: 12,
  },
})

export const SearchResultGroup = ({
  category,
  items,
  expr,
  isFirst,
}: {
  category: string
  items: SearchItem[]
  expr?: string
  isFirst: boolean
}) => {
  const { t } = useTranslation('', { keyPrefix: 'global.search.category' })
  return (
    <>
      {!isFirst && <Divider style={{ marginTop: 12, marginBottom: 12 }} />}
      <span
        style={{
          marginLeft: 14,
          fontSize: 11,
          fontWeight: 800,
          color: '#a0a0a0',
        }}
      >
        {t(category)}
      </span>
      <SearchResultList component="nav" disablePadding>
        {items.map((item) => (
          <SearchResultItem key={item.id} item={item} expr={expr} />
        ))}
      </SearchResultList>
    </>
  )
}
