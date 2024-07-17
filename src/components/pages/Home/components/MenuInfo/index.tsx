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

import { useTranslation } from 'react-i18next'
import './menu-info.scss'
import { appearMenuSelector, setAppear } from 'features/control/appear'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import ClickAwayListener from '@mui/material/ClickAwayListener'
import type { MenuItem, Tree } from 'types/MainTypes'
import { MobileMenu } from 'components/shared/cfx/MobileMenu'
import { Drawer } from '@mui/material'

export const MenuInfo = ({ main }: { main: Tree[] }) => {
  const { t } = useTranslation()
  const visible = useSelector(appearMenuSelector)
  const dispatch = useDispatch()
  const addTitle = (items: Tree[] | undefined) =>
    items?.map(
      (item: Tree): MenuItem => ({
        ...item,
        to: `/${item.name}`,
        title: item.children
          ? t(`menu.heading.${item.name}`)
          : t(`pages.${item.name}`),
        hint: item.hint ? t(`hints.${item.hint}`) : '',
        children: addTitle(item.children),
      })
    )

  const menu = addTitle(main) ?? []

  return (
    <Drawer
      sx={{
        width: '280px',
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: '280px',
          borderColor: 'transparent',
          boxShadow: '0px 0px 30px 1px rgb(0 0 0 / 40%)',
        },
        '& .MuiBackdrop-root': {
          backgroundColor: 'transparent',
        },
      }}
      anchor="right"
      open={visible}
      onClose={() => {
        dispatch(setAppear({ MENU: !visible }))
      }}
    >
      <ClickAwayListener
        onClickAway={() => {
          // do nothing
        }}
      >
        <div className="MenuInfo">
          <MobileMenu
            className="userMenuInfo"
            component={Link}
            divider
            items={menu}
          />
        </div>
      </ClickAwayListener>
    </Drawer>
  )
}
