/********************************************************************************
 * Copyright (c) 2023 BMW Group AG
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

import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { MenuItem } from '@mui/material'
import ReportProblemIcon from '@mui/icons-material/ReportProblem'
import './style.scss'
import {
  CircleProgress,
  DropdownMenu,
  StatusTag,
  Table,
  Typography,
} from '@catena-x/portal-shared-components'
import IDPStateProgress from './IDPStateProgress'
import { show } from 'features/control/overlay'
import { OVERLAYS } from 'types/Constants'
import LogService from 'services/LogService'
import { error, success } from 'services/NotifyService'
import {
  type IdentityProvider,
  IdpAccountStatus,
  useEnableIDPMutation,
  useFetchIDPListQuery,
  useRemoveIDPMutation,
  IDPCategory,
} from 'features/admin/idpApiSlice'

type StatusTagColor = 'pending' | 'confirmed' | 'declined' | undefined

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
    } catch (e) {
      LogService.error(e as string)
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

export const IDPList = ({ isManagementOSP }: { isManagementOSP?: boolean }) => {
  const { t } = useTranslation()
  const ti = useTranslation('idp').t
  const dispatch = useDispatch()

  const [disableLoading, setDisableLoading] = useState(false)
  const [deleteLoading, setDeleteLoading] = useState(false)

  const { data, isFetching } = useFetchIDPListQuery()
  const idpsData = data
    ?.slice()
    .sort((a: IdentityProvider, b: IdentityProvider) =>
      (a?.displayName ?? '').localeCompare(b.displayName ?? '')
    )
  const [searchExpr, setSearchExpr] = useState<string>('')
  const [removeIDP] = useRemoveIDPMutation()
  const [enableIDP] = useEnableIDPMutation()
  const managedIdpsData = idpsData?.filter(
    (a) => a.identityProviderTypeId === IDPCategory.MANAGED
  )
  const [idpsManagedData, setIdpsManagedData] = useState(managedIdpsData)

  useEffect(() => {
    setIdpsManagedData(managedIdpsData)
  }, [data])

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

  const statusColorMap: Record<IdpAccountStatus, StatusTagColor> = {
    [IdpAccountStatus.ACTIVE]: 'confirmed',
    [IdpAccountStatus.DISABLED]: 'declined',
    [IdpAccountStatus.OPEN]: 'pending',
    [IdpAccountStatus.IDP_CREATED]: 'pending',
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
    return (
      <StatusTag
        color={statusColorMap[status as IdpAccountStatus]}
        label={status}
      />
    )
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
            <CircleProgress
              variant="indeterminate"
              colorVariant="primary"
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
      enableToggle:
        isManaged && idp.enabled ? (
          <MenuItemOpenOverlay
            overlay={OVERLAYS.DISABLE_MANAGED_IDP}
            id={idp.identityProviderId}
            label={ti('action.disable')}
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
              <CircleProgress
                variant="indeterminate"
                colorVariant="primary"
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
          {isManaged &&
            idp.oidc?.clientId === null &&
            idp.oidc?.hasClientSecret === false &&
            menuItems.delete}
        </DropdownMenu>
      </div>
    )
  }

  const renderManagementOSPMenu = (idp: IdentityProvider) => {
    const isManagedIdp = idp.identityProviderTypeId === IDPCategory.MANAGED
    const menuItems = {
      edit: (
        <MenuItemOpenOverlay
          overlay={OVERLAYS.UPDATE_IDP}
          label={ti('action.edit')}
          id={idp.identityProviderId}
        />
      ),
      delete: isManagedIdp ? (
        <MenuItemOpenOverlay
          overlay={OVERLAYS.DELETE_MANAGED_IDP}
          label={ti('action.delete')}
          id={idp.identityProviderId}
        />
      ) : (
        <MenuItem
          sx={{
            color: deleteLoading ? '#b6b6b6' : '#111111',
          }}
          onClick={(e: React.MouseEvent<HTMLElement, MouseEvent>) =>
            !deleteLoading && doDelete(e, idp)
          }
          disabled={idp.enabled}
        >
          {ti('action.delete')}
          {deleteLoading && (
            <CircleProgress
              colorVariant="primary"
              variant="indeterminate"
              sx={{
                marginLeft: '5px',
              }}
              size={15}
            />
          )}
        </MenuItem>
      ),
      enableToggle:
        isManagedIdp && idp.enabled ? (
          <MenuItemOpenOverlay
            overlay={OVERLAYS.DISABLE_MANAGED_IDP}
            label={ti('action.disable')}
            id={idp.identityProviderId}
          />
        ) : (
          <MenuItem
            sx={{
              color: disableLoading ? '#b6b6b6' : '#111111',
            }}
            disabled={
              data &&
              idp.enabled &&
              data?.filter((idp: IdentityProvider) => idp.enabled).length < 2
            }
            onClick={(e: React.MouseEvent<HTMLElement, MouseEvent>) =>
              !disableLoading && doEnableDisableToggle(e, idp)
            }
          >
            {idp.enabled ? ti('action.disable') : ti('action.enable')}
            {disableLoading && (
              <CircleProgress
                size={15}
                variant="indeterminate"
                sx={{
                  marginLeft: '5px',
                }}
                colorVariant="primary"
              />
            )}
          </MenuItem>
        ),
    }

    return (
      <div className="action-menu">
        <DropdownMenu buttonText={ti('action.actions')}>
          {menuItems.edit}
          {menuItems.enableToggle}
          {menuItems.delete}
        </DropdownMenu>
      </div>
    )
  }

  const onSearch = (value: string) => {
    if (value) {
      const searchFilter = managedIdpsData?.filter(
        (i) => i.alias === value || i.displayName === value
      )
      setIdpsManagedData(searchFilter)
      setSearchExpr(value)
    } else setIdpsManagedData(managedIdpsData)
  }

  const style = {
    '.MuiDataGrid-columnHeadersInner': {
      fontSize: '16px',
      fontWeight: '400',
      backgroundColor: '#E9E9E9',
    },
    '.MuiDataGrid-row': {
      fontSize: '14px',
      fontWeight: '400',
    },
  }

  return (
    <Table
      rowsCount={isManagementOSP ? idpsManagedData?.length : idpsData?.length}
      hideFooter
      loading={isFetching}
      disableRowSelectionOnClick={true}
      disableColumnFilter={true}
      disableColumnMenu={true}
      disableColumnSelector={true}
      disableDensitySelector={true}
      columnHeadersBackgroundColor={'#ffffff'}
      title={
        isManagementOSP
          ? t('content.onboardingServiceProvider.ospIdentityProvider')
          : ''
      }
      toolbarVariant={isManagementOSP ? undefined : 'ultimate'}
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
          renderCell: ({ row }: { row: IdentityProvider }) =>
            isManagementOSP ? renderManagementOSPMenu(row) : renderMenu(row),
        },
      ]}
      rows={(isManagementOSP ? idpsManagedData : idpsData) ?? []}
      getRowId={(row: { [key: string]: string }) => row.identityProviderId}
      hasBorder={false}
      searchPlaceholder={
        isManagementOSP
          ? t('content.onboardingServiceProvider.search')
          : undefined
      }
      searchExpr={isManagementOSP ? searchExpr : undefined}
      onSearch={
        isManagementOSP
          ? (expr: string) => {
              isManagementOSP && onSearch(expr)
              setSearchExpr(expr)
            }
          : undefined
      }
      searchDebounce={isManagementOSP ? 1000 : undefined}
      onButtonClick={() => dispatch(show(OVERLAYS.ADD_IDP))}
      buttonLabel={t('content.onboardingServiceProvider.addIdentityProvider')}
      sx={isManagementOSP ? style : undefined}
    />
  )
}
