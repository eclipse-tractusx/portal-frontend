import * as React from 'react'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import IconButton from '@mui/material/IconButton'
import Tooltip from '@mui/material/Tooltip'
import ArrowRight from '@mui/icons-material/ArrowRight'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter'
import BusinessIcon from '@mui/icons-material/Business'
import ExitToAppIcon from '@mui/icons-material/ExitToApp'
import Home from '@mui/icons-material/Home'
import NewspaperIcon from '@mui/icons-material/Newspaper'
import WebIcon from '@mui/icons-material/Web'
import Settings from '@mui/icons-material/Settings'
import { SearchCategory, SearchItem } from 'features/info/search/types'
import { Overlay } from 'features/control/overlay/types'
import { show } from 'features/control/overlay/actions'
import { useTranslation } from 'react-i18next'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

export const getCategoryOverlay = (category: SearchCategory): Overlay => {
  switch (category) {
    case SearchCategory.APP:
      return Overlay.APP
    case SearchCategory.PARTNER:
      return Overlay.COMPANY
    case SearchCategory.USER:
      return Overlay.USER
    default:
      return Overlay.NONE
  }
}

const getHighlightedText = (text: string, expr?: string) =>
  expr ? (
    <>
      {text.split(new RegExp(`(${expr})`, 'gi')).map((part, i) => (
        <span
          key={i}
          style={
            part.toLowerCase() === expr.toLowerCase()
              ? { backgroundColor: '#eeeeee' }
              : {}
          }
        >
          {part}
        </span>
      ))}
    </>
  ) : (
    text
  )

const getIcon = (category: string) => {
  const style = { width: 42, height: 42, color: '#808080' }
  switch (category) {
    case SearchCategory.USECASE:
      return <BusinessCenterIcon sx={style} />
    case SearchCategory.APP:
      return <WebIcon sx={style} />
    case SearchCategory.PAGE:
      return <ExitToAppIcon sx={style} />
    case SearchCategory.PARTNER:
      return <BusinessIcon sx={style} />
    case SearchCategory.USER:
      return <AccountCircleIcon sx={style} />
    case SearchCategory.NEWS:
      return <NewspaperIcon sx={style} />
    default:
      return <Home sx={style} />
  }
}

export const SearchResultItem = ({
  item,
  expr,
}: {
  item: SearchItem
  expr?: string
}) => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  return (
    <ListItem
      component="div"
      disablePadding
      sx={{
        height: 56,
        padding: 1,
        borderRadius: 3,
        cursor: 'pointer',
        ':hover': {
          backgroundColor: 'selected.hover',
          color: 'primary.dark',
          '.MuiSvgIcon-root': {
            color: 'primary.dark',
          },
        },
      }}
      onClick={() =>
        item.category === SearchCategory.PAGE
          ? navigate(`/${item.id}`)
          : dispatch(show(getCategoryOverlay(item.category), item.id))
      }
    >
      <ListItemIcon>{getIcon(item.category)}</ListItemIcon>
      <ListItemText
        primary={getHighlightedText(t(item.title), expr)}
        secondary={item.description}
        primaryTypographyProps={{
          color: '#606060',
          fontWeight: 800,
          fontSize: 12,
        }}
        secondaryTypographyProps={{
          color: '#606060',
          fontWeight: 400,
          fontSize: 11,
        }}
      />
    </ListItem>
  )
}
