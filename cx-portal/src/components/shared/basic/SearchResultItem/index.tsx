/********************************************************************************
 * Copyright (c) 2021,2022 BMW Group AG
 * Copyright (c) 2021,2022 Contributors to the CatenaX (ng) GitHub Organisation.
 *
 * See the NOTICE file(s) distributed with this work for additional
 * information regarding copyright ownership.
 *
 * This program and the accompanying materials are made available under the
 * terms of the Apache License, Version 2.0 which is available at
 * https://www.apache.org/licenses/LICENSE-2.0.
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
 * License for the specific language governing permissions and limitations
 * under the License.
 *
 * SPDX-License-Identifier: Apache-2.0
 ********************************************************************************/

import ListItem from '@mui/material/ListItem'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter'
import BusinessIcon from '@mui/icons-material/Business'
import ExitToAppIcon from '@mui/icons-material/ExitToApp'
import Home from '@mui/icons-material/Home'
import LayersIcon from '@mui/icons-material/Layers'
import NewspaperIcon from '@mui/icons-material/Newspaper'
import SettingsIcon from '@mui/icons-material/Settings'
import WebIcon from '@mui/icons-material/Web'
import { SearchCategory, SearchItem } from 'features/info/search/types'
import { exec, show } from 'features/control/overlay/actions'
import { useTranslation } from 'react-i18next'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { OVERLAYS } from 'types/Constants'

export const getCategoryOverlay = (category: SearchCategory): OVERLAYS => {
  switch (category) {
    case SearchCategory.APP:
      return OVERLAYS.APP
    case SearchCategory.PARTNER:
      return OVERLAYS.PARTNER
    case SearchCategory.USER:
      return OVERLAYS.USER
    case SearchCategory.NEWS:
      return OVERLAYS.NEWS
    default:
      return OVERLAYS.NONE
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
              ? { backgroundColor: '#ffffcc' }
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
    case SearchCategory.OVERLAY:
      return <LayersIcon sx={style} />
    case SearchCategory.ACTION:
      return <SettingsIcon sx={style} />
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
      onClick={() => {
        switch (item.category) {
          case SearchCategory.PAGE:
            navigate(`/${item.id}`)
            break
          case SearchCategory.OVERLAY:
            dispatch(show(item.id as OVERLAYS, ''))
            break
          case SearchCategory.ACTION:
            dispatch(exec(item.id))
            break
          default:
            dispatch(show(getCategoryOverlay(item.category), item.id))
        }
      }}
    >
      <ListItemIcon>{getIcon(item.category)}</ListItemIcon>
      <ListItemText
        primary={getHighlightedText(t(item.title), expr)}
        secondary={getHighlightedText(t(item.description!), expr)}
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
