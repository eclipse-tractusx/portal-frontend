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
import {
  DropdownMenu,
  Image,
  MenuItem,
  Tooltips,
} from 'cx-portal-shared-components'
import { show } from 'features/control/overlay/actions'
import { OVERLAYS } from 'types/Constants'
import { useTranslation } from 'react-i18next'
import './style.scss'
import { useState } from 'react'

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
  const configured = idp.oidc?.clientId ? true : false

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

  const getStateConjunction = (enabled: boolean) =>
    enabled ? ' &' : `, ${t('field.not')}`

  const getStateText = (configured: boolean, enabled: boolean) =>
    configured
      ? `${t('field.configured')}${getStateConjunction(enabled)} ${t(
          'field.enabled'
        )}`
      : `${t('field.not')} ${t('field.configured')}`

  const getStateImage = (configured: boolean, enabled: boolean) =>
    `<svg viewBox="-6 -6 112 36" xmlns="http://www.w3.org/2000/svg"><g stroke="gray" stroke-width="2">
    <path d="M 12 12 H 80"/>
    <circle fill="gray" cx="12" cy="12" r="11"/>
    <circle fill="${configured ? 'gray' : 'white'}" cx="50" cy="12" r="11"/>
    <circle fill="${enabled ? 'gray' : 'white'}" cx="88" cy="12" r="11"/>
    </g></svg>`

  const stateMessage = getStateText(configured, idp.enabled)

  return (
    <>
      <div className="idp-list-item">
        <span className="category">{idp.identityProviderCategoryId}</span>
        <span className="name">{idp.displayName || '-'}</span>
        <span className="alias">{idp.alias}</span>
        <span className="state">
          <Tooltips tooltipPlacement="left" tooltipText={stateMessage}>
            <div>
              <Image
                alt={stateMessage}
                style={{ width: '112px', height: '40px' }}
                src={`data:image/svg+xml;utf8,${getStateImage(
                  configured,
                  idp.enabled
                )}`}
              />
            </div>
          </Tooltips>
        </span>
        <span className={'action menu'}>{renderMenu()}</span>
      </div>
      {open && showInfo && <div className="content">{idp.displayName}</div>}
    </>
  )
}
