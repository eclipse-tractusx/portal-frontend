import { styled } from '@mui/material/styles'
import List from '@mui/material/List'
import Divider from '@mui/material/Divider'
import { SearchItem } from 'features/info/search/types'
import { SearchResultItem } from '../SearchResultItem'
import { useTranslation } from 'react-i18next'
import { Typography } from 'cx-portal-shared-components'
import { useState } from 'react'

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
  const { t } = useTranslation('', { keyPrefix: 'global.search' })
  const [all, setAll] = useState(false)
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
        {t(`category.${category}`)}
      </span>
      <SearchResultList component="nav" disablePadding>
        {(all ? items : items.slice(0, 5)).map((item) => (
          <SearchResultItem key={item.id} item={item} expr={expr} />
        ))}
        {items.length > 5 && (
          <Typography
            sx={{
              cursor: 'pointer',
              color: '#0f71cb',
              marginLeft: 8,
              fontSize: 11,
            }}
            onClick={() => setAll(!all)}
          >
            {t(all ? 'less' : 'more')}
          </Typography>
        )}
      </SearchResultList>
    </>
  )
}
