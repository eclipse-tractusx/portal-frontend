/********************************************************************************
 * Copyright (c) 2021,2022 BMW Group AG
 * Copyright (c) 2021,2022 Contributors to the Eclipse Foundation
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

import { IdentityProvider } from 'features/admin/idpApiSlice'
import { useDispatch } from 'react-redux'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import ToggleOffIcon from '@mui/icons-material/ToggleOff'
import ToggleOnIcon from '@mui/icons-material/ToggleOn'
import EditIcon from '@mui/icons-material/Edit'
import InfoIcon from '@mui/icons-material/Info'
import GroupAddIcon from '@mui/icons-material/GroupAdd'
import {
  Checkbox,
  DropdownMenu,
  IconButton,
  MenuItem,
} from 'cx-portal-shared-components'
import { show } from 'features/control/overlay/actions'
import { OVERLAYS } from 'types/Constants'
import { useTranslation } from 'react-i18next'
import './style.scss'
import { useState } from 'react'

export default function IDPListItem({
  idp,
  buttons,
  showInfo = false,
}: {
  idp: IdentityProvider
  buttons?: boolean
  showInfo?: boolean
}) {
  const { t } = useTranslation('idp')
  const dispatch = useDispatch()
  const [open, setOpen] = useState<boolean>(false)
  const toggle = () => setOpen(!open)

  const doConfirmDelete = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    e.stopPropagation()
    dispatch(show(OVERLAYS.DELETE_IDP, idp.identityProviderId))
  }

  const doAddUsers = async (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    try {
      e.stopPropagation()
      dispatch(show(OVERLAYS.ADDUSERS_IDP, idp.identityProviderId))
    } catch (error) {
      console.log(error)
    }
  }

  const doEdit = async (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    try {
      e.stopPropagation()
      dispatch(show(OVERLAYS.UPDATE_IDP, idp.identityProviderId))
    } catch (error) {
      console.log(error)
    }
  }

  const doEnableToggle = async (
    e: React.MouseEvent<HTMLElement, MouseEvent>
  ) => {
    try {
      e.stopPropagation()
      dispatch(
        show(
          idp.enabled ? OVERLAYS.DISABLE_IDP : OVERLAYS.ENABLE_IDP,
          idp.identityProviderId
        )
      )
    } catch (error) {
      console.log(error)
    }
  }

  const renderButtons = () => {
    return (
      <>
        {showInfo && (
          <IconButton
            title={t('action.details')}
            color={open ? 'primary' : 'secondary'}
            onClick={toggle}
          >
            <InfoIcon />
          </IconButton>
        )}
        <IconButton
          title={t('action.edit')}
          disabled={idp.alias === 'CX-Test-Access'}
          color="secondary"
          onClick={doEdit}
        >
          <EditIcon />
        </IconButton>
        {idp.enabled ? (
          <IconButton
            title={t('action.disable')}
            disabled={idp.alias === 'CX-Test-Access'}
            color="primary"
            onClick={doEnableToggle}
          >
            <ToggleOnIcon />
          </IconButton>
        ) : (
          <IconButton
            title={t('action.enable')}
            color="secondary"
            onClick={doEnableToggle}
          >
            <ToggleOffIcon />
          </IconButton>
        )}

        {idp.enabled ? (
          <IconButton
            title={t('action.users')}
            color="secondary"
            onClick={doAddUsers}
          >
            <GroupAddIcon />
          </IconButton>
        ) : (
          <IconButton
            title={t('action.delete')}
            color="secondary"
            onClick={doConfirmDelete}
          >
            <DeleteForeverIcon />
          </IconButton>
        )}
      </>
    )
  }

  const renderMenu = () => {
    return (
      <DropdownMenu buttonText={t('action.actions')}>
        {showInfo && <MenuItem title={t('action.details')} onClick={toggle} />}
        <MenuItem title={t('action.edit')} onClick={doEdit} />
        {idp.enabled ? (
          <MenuItem title={t('action.disable')} onClick={doEnableToggle} />
        ) : (
          <MenuItem title={t('action.enable')} onClick={doEnableToggle} />
        )}
        {idp.enabled ? (
          <MenuItem title={t('action.users')} onClick={doAddUsers} />
        ) : (
          <MenuItem title={t('action.delete')} onClick={doConfirmDelete} />
        )}
      </DropdownMenu>
    )
  }

  return (
    <>
      <div className="idp-list-item">
        <span className="category">{idp.identityProviderCategoryId}</span>
        <span className="name">{idp.displayName || '-'}</span>
        <span className="alias">{idp.alias}</span>
        <span className="state">
          <Checkbox disabled={true} checked={idp.enabled} />
        </span>
        <span className={`action ${buttons ? 'buttons' : 'menu'}`}>
          {buttons ? renderButtons() : renderMenu()}
        </span>
      </div>
      {open && showInfo && <div className="content">{idp.displayName}</div>}
    </>
  )
}
