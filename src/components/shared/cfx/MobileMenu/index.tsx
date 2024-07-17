/********************************************************************************
 * Copyright (c) 2023 Contributors to the Eclipse Foundation
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

import {
  Box,
  type BoxProps,
  Divider,
  List,
  useTheme,
  Link,
} from '@mui/material'
import uniqueId from 'lodash/uniqueId'
import { MenuItem, type MenuItemProps } from './MenuItem'
import { useState } from 'react'
import { appearMenuSelector, setAppear } from 'features/control/appear'
import { useDispatch, useSelector } from 'react-redux'
import { ProfileLink } from './ProfileLink'
import { NotificationLink } from './NotificationLink'
import { MenuSubItems } from './MenuChildren'
import { MenuFooter } from './MenuFooter'
import { t } from 'i18next'
import { PAGES } from 'types/Constants'
import { BackButton, Typography } from '@catena-x/portal-shared-components'
import CloseIcon from '@mui/icons-material/Close'
import { LogoutLink } from './LogoutLink'
import AccessService from 'services/AccessService'
import UserService from 'services/UserService'

export interface MenuProps extends BoxProps {
  items: MenuItemProps[]
  component?: React.ElementType
  divider?: boolean
}

export const MobileMenu = ({
  items,
  divider,
  component = Link,
  onClick,
  ...props
}: MenuProps): JSX.Element => {
  const visible = useSelector(appearMenuSelector)
  const dispatch = useDispatch()
  const { spacing } = useTheme()

  const [children, setSelectedChildren] = useState<MenuItemProps[]>([])
  const [selectedSection, setSelectedSection] = useState<string>('')

  const userMenu = AccessService.userMenu().map((link) => ({
    to: `/${link}`,
    title: t(`pages.${link}`),
  }))

  const onSelectItem = (title: string, item: MenuItemProps[]): void => {
    setSelectedChildren(item)
    setSelectedSection(title)
  }

  const renderHeaderRow = () => {
    switch (selectedSection) {
      case t('pages.account'):
        return (
          <Box
            sx={{
              backgroundColor: '#fff',
              borderBottom: '1px solid',
              borderColor: 'border.border01',
              padding: spacing(1, 1),
            }}
          >
            <Typography
              variant="label1"
              sx={{ color: 'text.secondary', display: 'block' }}
            >
              {UserService.getName()}
            </Typography>
            <Typography variant="label2" sx={{ fontWeight: 500 }}>
              {UserService.getCompany()}
              {UserService.isAdmin() ? (
                <> &nbsp;( {t('common.roles.admin')} )</>
              ) : null}
            </Typography>
          </Box>
        )
      default:
        return null
    }
  }

  return (
    <>
      <div className="topRow">
        <div>
          {children?.length > 0 && (
            <BackButton
              backButtonLabel={t('global.actions.back')}
              backButtonVariant="text"
              onBackButtonClick={() => {
                setSelectedChildren([])
              }}
            />
          )}
        </div>
        <CloseIcon
          onClick={() => dispatch(setAppear({ MENU: !visible }))}
          sx={{
            color: 'icon.icon02',
          }}
          className="closeIcon"
        />
      </div>

      <Divider sx={{ mx: 1 }} />

      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
          justifyContent: 'space-between',
        }}
        {...props}
      >
        <Box>
          {children.length === 0 && (
            <>
              <List sx={{ padding: spacing(0, 1) }}>
                {items?.map((item) => (
                  <MenuItem
                    {...item}
                    component={component}
                    menuProps={props}
                    Menu={MobileMenu}
                    onSelect={onSelectItem}
                    onClick={onClick}
                    key={uniqueId('Menu')}
                  />
                ))}
                {divider && <Divider sx={{ margin: spacing(1, 0) }} />}

                <ProfileLink
                  onSelect={onSelectItem}
                  onClick={onClick}
                  userMenu={userMenu}
                />

                <NotificationLink
                  onSelect={onSelectItem}
                  onClick={onClick}
                  to={PAGES.NOTIFICATIONS}
                />
                <LogoutLink
                  onSelect={onSelectItem}
                  onClick={onClick}
                  to={`/${PAGES.LOGOUT}`}
                />
              </List>
            </>
          )}
          {children?.length > 0 && (
            <MenuSubItems
              title={selectedSection}
              onClick={() => {
                dispatch(setAppear({ MENU: !visible }))
              }}
              onHide={() => {
                setSelectedChildren([])
              }}
              component={component}
              headerRowComponent={renderHeaderRow()}
            >
              {children}
            </MenuSubItems>
          )}
        </Box>
        <Box
          sx={{
            position: 'fixed',
            bottom: 0,
            background: 'common.white',
            width: '280px',
          }}
        >
          {divider && <Divider sx={{ margin: spacing(0, 1) }} />}
          <MenuFooter />
        </Box>
      </Box>
    </>
  )
}

export type MenuType = typeof MobileMenu
