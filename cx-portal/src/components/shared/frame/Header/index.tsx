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

import { UserInfo } from '../UserInfo'
import { NavLink, useNavigate } from 'react-router-dom'
import { Button, MainNavigation } from 'cx-portal-shared-components'
import { useTranslation } from 'react-i18next'
import { MenuItem, Tree } from 'types/MainTypes'
import { Logo } from '../Logo'
import './Header.scss'

export const Header = ({ main, user }: { main: Tree[]; user: string[] }) => {
  const { t } = useTranslation()
  const navigate = useNavigate()

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

  const menu = addTitle(main) || []

  return (
    <header>
      <MainNavigation items={menu} component={NavLink}>
        <Logo />
        <div className="d-flex">
          <Button
            size="small"
            color="secondary"
            variant="contained"
            onClick={() => navigate('/help')}
            sx={{ backgroundColor: 'white', marginRight: '16px' }}
          >
            {t('pages.help')}
          </Button>
          <UserInfo pages={user} />
        </div>
      </MainNavigation>
    </header>
  )
}
