/********************************************************************************
 * Copyright (c) 2021, 2023 BMW Group AG
 * Copyright (c) 2021, 2023 Contributors to the Eclipse Foundation
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

import { UserInfo } from '../UserInfo'
import { NavLink } from 'react-router-dom'
import { Button, MainNavigation } from '@catena-x/portal-shared-components'
import { useTranslation } from 'react-i18next'
import type { MenuItem, Tree } from 'types/MainTypes'
import './Header.scss'
import SearchIcon from '@mui/icons-material/Search'
import { getAssetBase } from 'services/EnvironmentService'
import {
  appearSearchSelector,
  setAppear,
  appearMenuSelector,
} from 'features/control/appear'
import { useSelector, useDispatch } from 'react-redux'
import { Logo } from '../Logo'
import MenuIcon from '@mui/icons-material/Menu'
import { Box } from '@mui/material'

export const Header = ({ main, user }: { main: Tree[]; user: string[] }) => {
  const { t } = useTranslation()
  const visible = useSelector(appearSearchSelector)
  const show = useSelector(appearMenuSelector)
  const dispatch = useDispatch()

  const addTitle = (items: Tree[] | undefined) =>
    items?.map(
      (item: Tree): MenuItem => ({
        ...item,
        to: `/${item.name}`,
        title: t(`pages.${item.name}`),
        hint: item.hint ? t(`hints.${item.hint}`) : '',
        children: addTitle(item.children),
      })
    )

  const menu = addTitle(main) ?? []

  return (
    <>
      <header>
        <MainNavigation items={menu} component={NavLink}>
          <Logo />
          <div className="d-flex">
            <div
              onClick={() => dispatch(setAppear({ SEARCH: !visible }))}
              className="search-icon"
              onKeyUp={() => {
                // do nothing
              }}
            >
              <SearchIcon sx={{ color: '#0f71cb' }} />
            </div>
            <Button
              size="small"
              color="secondary"
              variant="contained"
              onClick={() => {
                window.open(
                  `${document.location.origin}/documentation/`,
                  'documentation',
                  'noreferrer'
                )
              }}
              sx={{ backgroundColor: 'white', marginRight: '16px' }}
            >
              {t('pages.help')}
            </Button>
            <UserInfo pages={user} />
          </div>
        </MainNavigation>
      </header>
      <div className="mobileNav">
        <div className="mobileHeader">
          <img src={`${getAssetBase()}/images/logos/cx-short.svg`} alt="logo" />
        </div>
        <div className="mobileHeaderRight">
          <div
            onClick={() => dispatch(setAppear({ SEARCH: !visible }))}
            className="mobile-search-icon"
            onKeyDown={() => {
              // do nothing
            }}
          >
            <SearchIcon sx={{ color: '#0f71cb' }} />
          </div>
          <Box
            onClick={() => dispatch(setAppear({ MENU: !show }))}
            className="mobile-search-icon"
            onKeyDown={() => {
              // do nothing
            }}
          >
            <MenuIcon sx={{ color: '#0f71cb' }} />
          </Box>
        </div>
      </div>
    </>
  )
}
