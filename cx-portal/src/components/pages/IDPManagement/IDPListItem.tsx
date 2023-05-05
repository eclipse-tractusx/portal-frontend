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

import { IdentityProvider } from 'features/admin/idpApiSlice'
import { useDispatch } from 'react-redux'
import { DropdownMenu, MenuItem } from 'cx-portal-shared-components'
import { show } from 'features/control/overlay'
import { OVERLAYS } from 'types/Constants'
import { useTranslation } from 'react-i18next'
import './style.scss'
import { useState } from 'react'
import IDPStateProgress from './IDPStateProgress'

export default function IDPListItem({
  idp,
  allowDisable = false,
  showInfo = false,
}: {
  idp: IdentityProvider
  allowDisable?: boolean
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

  const doConfigure = async (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
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

  const renderMenu = () => {
    return (
      <DropdownMenu buttonText={t('action.actions')}>
        {showInfo && <MenuItem title={t('action.details')} onClick={toggle} />}
        <MenuItem title={t('action.configure')} onClick={doConfigure} />
        {idp.oidc?.clientId &&
          (idp.enabled ? (
            <MenuItem
              title={t('action.disable')}
              onClick={doEnableToggle}
              disable={!allowDisable}
            />
          ) : (
            <MenuItem title={t('action.enable')} onClick={doEnableToggle} />
          ))}
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
          <IDPStateProgress idp={idp} />
        </span>
        <span className={'action menu'}>{renderMenu()}</span>
      </div>
      {open && showInfo && <div className="content">{idp.displayName}</div>}
    </>
  )
}
