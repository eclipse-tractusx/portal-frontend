/********************************************************************************
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
import AccessService from 'services/AccessService'
import {
  ApplicationStatus,
  useFetchApplicationsQuery,
} from 'features/registration/registrationApiSlice'
import { useEffect, useState } from 'react'
import { appearMenuSelector, setAppear } from 'features/control/appear'
import { useDispatch, useSelector } from 'react-redux'
import { ProfileLink } from './ProfileLink'
import { NotificationLink } from './NotificationLink'
import { type CompanyMenuTypes, MyCompanyLink } from './MyCompanyLink'
import { MenuSubItems } from './MenuChildren'
import { MenuFooter } from './MenuFooter'
import { t } from 'i18next'

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
  const { data } = useFetchApplicationsQuery()
  const companyData = data?.[0]
  const [userMenu, setUserMenu] = useState<string[]>(
    AccessService.userMenuComp()
  )
  const [children, setSelectedChildren] = useState<MenuItemProps[]>([])
  const [selectedSection, setSelectedSection] = useState<string>('')

  const addTitle = (items: string[]): CompanyMenuTypes[] =>
    items?.map((item: string) => ({
      to: JSON.parse(JSON.stringify(item)),
      title: t(`pages.${JSON.parse(JSON.stringify(item))}`),
    }))

  const companyMenu = addTitle(userMenu) ?? []

  const onSelectItem = (title: string, item: MenuItemProps[]): void => {
    setSelectedChildren(item)
    setSelectedSection(title)
  }

  useEffect(() => {
    if (
      companyData != null &&
      Object.values(ApplicationStatus).includes(companyData.applicationStatus)
    ) {
      setUserMenu(AccessService.userMenuReg())
    }
  }, [companyData])

  return (
    <Box {...props}>
      {children.length === 0 && (
        <>
          <List sx={{ padding: 0 }}>
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
          </List>
          {divider && <Divider sx={{ margin: spacing(0, 1) }} />}
          <ProfileLink to={'/account'} />
          <NotificationLink to={'/notifications'} />
          <MyCompanyLink companyMenu={companyMenu} onSelect={onSelectItem} />
          {divider && <Divider sx={{ margin: spacing(0, 1) }} />}
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
        >
          {children}
        </MenuSubItems>
      )}
      {divider && <Divider sx={{ margin: spacing(0, 1) }} />}
      <MenuFooter />
    </Box>
  )
}

export type MenuType = typeof MobileMenu
