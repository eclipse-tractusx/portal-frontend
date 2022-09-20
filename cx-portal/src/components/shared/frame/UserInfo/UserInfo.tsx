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

import { useRef, useState } from 'react'
import {
  LanguageSwitch,
  UserAvatar,
  UserMenu,
  UserNav,
} from 'cx-portal-shared-components'
import UserService from 'services/UserService'
import i18next, { changeLanguage } from 'i18next'
import I18nService from 'services/I18nService'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import './UserInfo.scss'

export const UserInfo = ({ pages }: { pages: string[] }) => {
  const { t } = useTranslation()
  const [menuOpen, setMenuOpen] = useState(false)
  const avatar = useRef<HTMLDivElement>(null)

  const menu = pages.map((link) => ({
    to: link,
    title: t(`pages.${link}`),
  }))

  const openMenu = () => setMenuOpen(true)
  const onClickAway = (e: MouseEvent | TouchEvent) => {
    if (!avatar.current?.contains(e.target as HTMLDivElement)) {
      setMenuOpen(false)
    }
  }

  return (
    <div className="UserInfo">
      <div ref={avatar}>
        <UserAvatar onClick={openMenu} />
      </div>
      <UserMenu
        open={menuOpen}
        top={60}
        userName={UserService.getName()}
        userRole={UserService.getCompany()}
        onClickAway={onClickAway}
      >
        <UserNav component={Link} divider items={menu} />
        <LanguageSwitch
          current={i18next.language}
          languages={I18nService.supportedLanguages.map((key) => ({ key }))}
          onChange={changeLanguage}
        />
      </UserMenu>
    </div>
  )
}
