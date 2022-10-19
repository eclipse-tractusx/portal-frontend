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

import { CardHorizontalTable, DataProp } from 'cx-portal-shared-components'
import {
  IdentityProvider,
  useFetchIDPListQuery,
} from 'features/admin/idpApiSlice'
import { show } from 'features/control/overlay/actions'
import { TFunction, useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'
import { OVERLAYS } from 'types/Constants'
import { updateIDPSelector } from 'features/control/updatesSlice'
import IDPDetailForm from './IDPDetailsInfo'
import './style.scss'

interface MenuItems {
  key: string
  label: string
  isDisable: boolean
  tooltipTitle?: string
}

const MENU_KEYS = {
  DELETE: 'delete',
  ENABLE: 'enable',
  DISABLE: 'disable',
}

const checkIfDeleteAvailable = (
  row: IdentityProvider,
  rows: IdentityProvider[]
) => {
  const { enabled: status, displayName } = row
  return (
    status && rows.filter((row) => row.displayName === displayName).length === 1
  )
}

const checkIfStatusChangeAvailable = (
  row: IdentityProvider,
  rows: IdentityProvider[]
) => {
  const { displayName } = row

  return (
    row.enabled &&
    rows
      .filter((row) => row.displayName === displayName)
      .every((row) => row.enabled)
  )
}

const mapMenuItems = (
  row: IdentityProvider,
  rows: IdentityProvider[],
  t: TFunction<'translation', undefined>
) => {
  let menuOptions: MenuItems[] = []

  if (row.enabled) {
    menuOptions = [
      ...menuOptions,
      {
        key: MENU_KEYS.DISABLE,
        label: 'Disable',
        isDisable: checkIfStatusChangeAvailable(row, rows),
        tooltipTitle: t('overlays.idp_status_tooltip_info'),
      },
    ]
  }

  if (!row.enabled) {
    menuOptions = [
      ...menuOptions,
      {
        key: MENU_KEYS.ENABLE,
        label: 'Enable',
        isDisable: checkIfStatusChangeAvailable(row, rows),
        tooltipTitle: t('overlays.idp_status_tooltip_info'),
      },
    ]
  }

  menuOptions = [
    ...menuOptions,
    {
      key: MENU_KEYS.DELETE,
      label: 'Delete',
      isDisable: checkIfDeleteAvailable(row, rows),
      tooltipTitle: t('overlays.idp_delete_tooltip_info'),
    },
  ]

  return menuOptions
}

export const IDPList = () => {
  const update = useSelector(updateIDPSelector)
  const { data } = useFetchIDPListQuery(update)
  const dispatch = useDispatch()

  const { t } = useTranslation()

  const updatedData = data?.map((row, index, rows) => {
    return {
      ...row,
      body: <IDPDetailForm id={row.identityProviderId}></IDPDetailForm>,
      menuOptions: mapMenuItems(row, rows, t),
    }
  })

  const handleMenuClick = (key: string, args: DataProp) => {
    switch (key) {
      case MENU_KEYS.DELETE:
        dispatch(
          show(OVERLAYS.IDP_CONFIRM, args.identityProviderId, args.displayName)
        )
        break

      case MENU_KEYS.DISABLE:
      case MENU_KEYS.ENABLE:
        dispatch(
          show(
            OVERLAYS.IDP_STATUS,
            args.identityProviderId,
            args.displayName,
            args.enabled
          )
        )
        break

      default:
        break
    }
  }

  return (
    <>
      {updatedData?.map((row) => (
        <CardHorizontalTable
          key={row.identityProviderId}
          data={row}
          inactiveLabel={t('global.state.disabled')}
          activeLabel={t('global.state.enabled')}
          onMenuClick={(key, row) => handleMenuClick(key, row)}
        />
      ))}
    </>
  )
}
