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

import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { CircularProgress, MenuItem } from '@mui/material'
import ReportProblemIcon from '@mui/icons-material/ReportProblem'
import './style.scss'
import {
  DropdownMenu,
  StatusTag,
  Table,
  Typography,
} from '@catena-x/portal-shared-components'
import IDPStateProgress from './IDPStateProgress'
import { show } from 'features/control/overlay'
import { OVERLAYS } from 'types/Constants'
import { error, success } from 'services/NotifyService'
import {
  type IdentityProvider,
  useEnableIDPMutation,
  useFetchIDPListQuery,
  useRemoveIDPMutation,
  IDPCategory,
} from 'features/admin/idpApiSlice'

const MenuItemOpenOverlay = ({
  overlay,
  id,
  label,
}: {
  overlay: OVERLAYS
  id: string
  label: string
}) => {
  const dispatch = useDispatch()

  const openOverlay = (
    e: React.MouseEvent<HTMLElement, MouseEvent>,
    overlay: OVERLAYS,
    id: string
  ) => {
    try {
      e.stopPropagation()
      dispatch(show(overlay, id))
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <MenuItem
      onClick={(e: React.MouseEvent<HTMLElement, MouseEvent>) => {
        openOverlay(e, overlay, id)
      }}
    >
      {label}
    </MenuItem>
  )
}

export const IDPList = () => {
  const { t } = useTranslation()
  const ti = useTranslation('idp').t

  const [disableLoading, setDisableLoading] = useState(false)
  const [deleteLoading, setDeleteLoading] = useState(false)

  const { data, isFetching } = useFetchIDPListQuery()
  const idpsData = data
    ?.slice()
    .sort((a: IdentityProvider, b: IdentityProvider) =>
      (a?.displayName ?? '').localeCompare(b.displayName ?? '')
    )
  const [removeIDP] = useRemoveIDPMutation()
  const [enableIDP] = useEnableIDPMutation()

  const doDelete = async (
    e: React.MouseEvent<HTMLElement, MouseEvent>,
    idp: IdentityProvider
  ) => {
    e.stopPropagation()
    setDeleteLoading(true)
    try {
      await removeIDP(idp.identityProviderId).unwrap()
      success(ti('delete.success'))
      setDeleteLoading(false)
    } catch (err) {
      error(ti('delete.error'), '', err as object)
      setDeleteLoading(false)
    }
  }

  const doEnableDisableToggle = async (
    e: React.MouseEvent<HTMLElement, MouseEvent>,
    idp: IdentityProvider
  ) => {
    e.stopPropagation()
    setDisableLoading(true)
    try {
      await enableIDP({ id: idp.identityProviderId, enabled: !idp.enabled })
      success(idp.enabled ? ti('disable.success') : ti('enable.success'))
      setDisableLoading(false)
    } catch (err) {
      error(ti('disable.error'), '', err as object)
      setDisableLoading(false)
    }
  }

  const getStatus = (enabled: boolean, clientId: string | undefined) => {
    let status = `${ti('field.status1')}`
    if (enabled && !clientId) {
      status = `${ti('field.status2')}`
    } else if (!enabled && clientId) {
      status = `${ti('field.status3')}`
    } else if (enabled && clientId) {
      status = `${ti('field.status4')}`
    }
    return <StatusTag color="label" label={status} />
  }

  const renderMenu = (idp: IdentityProvider) => {
    const isManaged = idp.identityProviderTypeId === IDPCategory.MANAGED

    const menuItems = {
      configure: (
        <MenuItemOpenOverlay
          overlay={OVERLAYS.UPDATE_IDP}
          id={idp.identityProviderId}
          label={ti('action.configure')}
        />
      ),
      addUsers: (
        <MenuItemOpenOverlay
          overlay={OVERLAYS.ADDUSERS_IDP}
          id={idp.identityProviderId}
          label={ti('action.users')}
        />
      ),
      delete: isManaged ? (
        <MenuItemOpenOverlay
          overlay={OVERLAYS.DELETE_MANAGED_IDP}
          id={idp.identityProviderId}
          label={ti('action.delete')}
        />
      ) : (
        <MenuItem
          onClick={(e: React.MouseEvent<HTMLElement, MouseEvent>) =>
            !deleteLoading && doDelete(e, idp)
          }
          sx={{
            color: deleteLoading ? '#b6b6b6' : '#111111',
          }}
          disabled={idp.enabled}
        >
          {ti('action.delete')}
          {deleteLoading && (
            <CircularProgress
              size={15}
              sx={{
                marginLeft: '5px',
              }}
            />
          )}
        </MenuItem>
      ),
      register: (
        <MenuItemOpenOverlay
          overlay={OVERLAYS.REGISTER_OSP}
          id={idp.identityProviderId}
          label={ti('action.register')}
        />
      ),
      registerNext: (
        <MenuItemOpenOverlay
          overlay={OVERLAYS.REGISTER_NEXT_OSP}
          id={idp.identityProviderId}
          label={ti('action.register_next')}
        />
      ),
      consent: (
        <MenuItemOpenOverlay
          overlay={OVERLAYS.CONSENT_OSP}
          id={idp.identityProviderId}
          label={ti('action.consent')}
        />
      ),
      enableToggle: isManaged ? (
        <MenuItemOpenOverlay
          overlay={OVERLAYS.DISABLE_MANAGED_IDP}
          id={idp.identityProviderId}
          label={idp.enabled ? ti('action.disable') : ti('action.enable')}
        />
      ) : (
        <MenuItem
          onClick={(e: React.MouseEvent<HTMLElement, MouseEvent>) =>
            !disableLoading && doEnableDisableToggle(e, idp)
          }
          sx={{
            color: disableLoading ? '#b6b6b6' : '#111111',
          }}
          disabled={
            data &&
            idp.enabled &&
            data?.filter((idp: IdentityProvider) => idp.enabled).length < 2
          }
        >
          {idp.enabled ? ti('action.disable') : ti('action.enable')}
          {disableLoading && (
            <CircularProgress
              size={15}
              sx={{
                marginLeft: '5px',
              }}
            />
          )}
        </MenuItem>
      ),
    }

    return (
      <div className="action-menu">
        <DropdownMenu buttonText={ti('action.actions')}>
          {menuItems.configure}
          {isManaged && idp.enabled && menuItems.register}
          {idp.oidc?.clientId && menuItems.enableToggle}
          {!isManaged && (idp.enabled ? menuItems.addUsers : menuItems.delete)}
          {isManaged && !idp.enabled && idp.oidc?.clientId && menuItems.delete}
        </DropdownMenu>
      </div>
    )
  }

  return (
    <Table
      rowsCount={idpsData?.length}
      hideFooter
      loading={isFetching}
      disableRowSelectionOnClick={true}
      disableColumnFilter={true}
      disableColumnMenu={true}
      disableColumnSelector={true}
      disableDensitySelector={true}
      columnHeadersBackgroundColor={'#ffffff'}
      title=""
      toolbarVariant="ultimate"
      columns={[
        {
          field: 'displayName',
          headerName: t('global.field.name'),
          flex: 2,
          renderCell: ({ row }: { row: IdentityProvider }) =>
            row.displayName ?? (
              <>
                <ReportProblemIcon color="error" fontSize="small" />
                <Typography variant="body2" sx={{ marginLeft: '5px' }}>
                  {ti('field.error')}
                </Typography>
              </>
            ),
        },
        {
          field: 'alias',
          headerName: t('global.field.alias'),
          flex: 1.5,
          renderCell: ({ row }: { row: IdentityProvider }) =>
            row.alias ?? (
              <>
                <ReportProblemIcon color="error" fontSize="small" />
                <Typography variant="body2" sx={{ marginLeft: '5px' }}>
                  {ti('field.error')}
                </Typography>
              </>
            ),
        },
        {
          field: 'identityProviderTypeId',
          headerName: t('global.field.authMethod'),
          flex: 2,
        },
        {
          field: 'progress',
          headerName: t('global.field.progress'),
          flex: 2,
          sortable: false,
          renderCell: ({ row }: { row: IdentityProvider }) => (
            <IDPStateProgress idp={row} />
          ),
        },
        {
          field: 'enabled',
          headerName: t('global.field.status'),
          flex: 2,
          renderCell: ({ row }: { row: IdentityProvider }) =>
            getStatus(row.enabled, row.oidc?.clientId),
        },
        {
          field: 'details',
          headerName: t('global.field.action'),
          flex: 2,
          sortable: false,
          renderCell: ({ row }: { row: IdentityProvider }) => renderMenu(row),
        },
      ]}
      rows={idpsData ?? []}
      getRowId={(row: { [key: string]: string }) => row.identityProviderId}
      hasBorder={false}
    />
  )
}
