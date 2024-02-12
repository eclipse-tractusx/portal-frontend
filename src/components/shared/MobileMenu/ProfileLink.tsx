/********************************************************************************
 * Copyright (c) 2021, 2024 Contributors to the Eclipse Foundation
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

import { Box, Link, ListItem } from '@mui/material'
import type { MenuItemProps } from './MenuItem'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import { Link as LinkRouter } from 'react-router-dom'
import './MobileMenu.scss'
import { useDispatch, useSelector } from 'react-redux'
import { appearMenuSelector, setAppear } from 'features/control/appear'
import { t } from 'i18next'

type LinkItem = Partial<Record<'href' | 'to', string>>

interface ProfileLinkProps extends LinkItem {
  onSelect?: (children: MenuItemProps) => void
}

export const ProfileLink = ({
  onSelect,
  ...props
}: ProfileLinkProps): JSX.Element => {
  const dispatch = useDispatch()
  const visible = useSelector(appearMenuSelector)
  return (
    <Box
      sx={{
        margin: '10px 0px 5px 0px',
      }}
      onClick={() => {
        dispatch(setAppear({ MENU: !visible }))
      }}
    >
      <ListItem>
        <Link
          className="titleBox"
          sx={{
            color: 'text.primary',
            pointerEvents: 'auto',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            borderRadius: 3,
            typography: 'label3',
            textDecoration: 'none',
            whiteSpace: 'nowrap',
            ':hover': {
              backgroundColor: 'selected.hover',
              color: 'primary.dark',
              '.MuiSvgIcon-root': {
                color: 'primary.dark',
              },
            },
            cursor: 'pointer',
          }}
        >
          <AccountCircleIcon
            sx={{
              color: '#0f71cb',
              width: '30px',
              height: '30px',
              marginRight: '10px',
            }}
          />
          <LinkRouter
            className="link-router-text"
            to={props.to ?? '/'}
            {...props}
          >
            {t('pages.account')}
          </LinkRouter>
        </Link>
      </ListItem>
    </Box>
  )
}
