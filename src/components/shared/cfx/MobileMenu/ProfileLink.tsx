/********************************************************************************
 * Copyright (c) 2024 Contributors to the Eclipse Foundation
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

import PermIdentityIcon from '@mui/icons-material/PermIdentity'
import { t } from 'i18next'
import { MenuItem, type MenuItemProps } from './MenuItem'
import '../../MobileMenu/MobileMenu.scss'

interface ProfileLinkProps {
  onSelect?: (title: string, children: MenuItemProps[]) => void
  onClick?: React.MouseEventHandler
  userMenu: MenuItemProps[]
}

export const ProfileLink = ({
  onSelect,
  userMenu,
}: ProfileLinkProps): JSX.Element => {
  return (
    <MenuItem
      title={t('pages.account')}
      onClick={() => {
        if (onSelect) onSelect(t('pages.account'), userMenu)
      }}
      children={userMenu}
      onSelect={onSelect}
      icon={
        <PermIdentityIcon
          sx={{
            height: 18,
            width: 18,
          }}
        />
      }
    />
  )
}
