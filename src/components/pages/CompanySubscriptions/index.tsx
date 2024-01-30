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

import {
  IconButton,
  LogoGrayData,
  PageLoadingTable,
  Typography,
  Image,
  Chip,
  Button,
} from '@catena-x/portal-shared-components'
import { useTranslation } from 'react-i18next'
import { useFetchSubscribedActiveAppsStatusQuery } from 'features/apps/apiSlice'
import { useEffect, useState } from 'react'
import { isName } from 'types/Patterns'
import { useDispatch, useSelector } from 'react-redux'
import { setSearchInput } from 'features/appManagement/actions'
import { updateApplicationRequestSelector } from 'features/control/updates'
import { getApiBase } from 'services/EnvironmentService'
import { fetchImageWithToken } from 'services/ImageService'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import { useNavigate } from 'react-router'
import { PAGES } from 'types/Constants'

interface FetchHookArgsType {
  statusFilter: string
  expr: string
}

export default function CompanySubscriptions() {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [refresh, setRefresh] = useState(0)
  const [searchExpr, setSearchExpr] = useState<string>('')
  const [fetchHookArgs, setFetchHookArgs] = useState<FetchHookArgsType>()
  const [filterStatus, setFilterStatus] = useState<string>('')
  const searchInputData = useSelector(updateApplicationRequestSelector)
  const [group, setGroup] = useState<string>('show all')

  const setView = (e: React.MouseEvent<HTMLInputElement>) => {
    const viewValue = e.currentTarget.value
    setFilterStatus(viewValue)
    setGroup(viewValue)
    setRefresh(Date.now())
  }

  const filterView = [
    {
      buttonText: 'requested',
      buttonValue: 'requested',
      onButtonClick: setView,
    },
    {
      buttonText: 'active',
      buttonValue: 'active',
      onButtonClick: setView,
    },
    {
      buttonText: 'show all',
      buttonValue: 'show all',
      onButtonClick: setView,
    },
  ]

  useEffect(() => {
    if (onValidate(searchExpr)) {
      setFetchHookArgs({
        statusFilter: filterStatus,
        expr: searchExpr,
      })
    }
    // eslint-disable-next-line
  }, [filterStatus, searchExpr])

  const onTableCellClick = (params) => {
    if (params.field === 'detail') {
      console.log(params.field)
    }
  }

  const onValidate = (expr: string) => {
    const validateExpr = isName(expr)
    if (validateExpr) dispatch(setSearchInput({ open: true, text: expr }))
    return validateExpr
  }

  return (
    <main className="page-main-container">
      <Typography
        className="subTitle"
        variant="h2"
        sx={{ pb: 3, marginTop: '35px' }}
      >
        {t('content.companySubscriptions.headertitle')}
      </Typography>
      <div className={'table-container'}>
        <PageLoadingTable<any, any>
          searchExpr={searchExpr}
          alignCell="start"
          onCellClick={onTableCellClick}
          toolbarVariant={'searchAndFilter'}
          hasBorder={false}
          columnHeadersBackgroundColor={'transparent'}
          searchPlaceholder={t('global.table.searchName')}
          searchInputData={searchInputData}
          onSearch={(expr: string) => {
            if (!onValidate(expr)) return
            setRefresh(Date.now())
            setSearchExpr(expr)
          }}
          searchDebounce={1000}
          title={t('content.admin.registration-requests.tabletitle')}
          loadLabel={t('global.actions.more')}
          fetchHook={useFetchSubscribedActiveAppsStatusQuery}
          fetchHookArgs={fetchHookArgs}
          fetchHookRefresh={refresh}
          getRowId={(row: { [key: string]: string }) => row.subscriptionId}
          columns={[
            {
              field: 'image',
              headerName: 'App Icon',
              flex: 2,
              renderCell: ({ row }: { row: any }) => (
                <Image
                  src={
                    row.image
                      ? `${getApiBase()}/api/apps/${row.offerId}/appDocuments/${
                          row.image
                        }`
                      : LogoGrayData
                  }
                  loader={fetchImageWithToken}
                  style={{
                    objectFit: 'cover',
                    width: 30,
                    height: 30,
                    borderRadius: '50%',
                    marginRight: '5px',
                  }}
                />
              ),
            },
            {
              field: 'name',
              headerName: 'App title',
              flex: 2,
            },
            {
              field: 'status',
              headerName: 'Status',
              flex: 2,
              renderCell: ({ row }: { row: any }) => {
                return row.status === 'ACTIVE' ? (
                  <Chip
                    color="success"
                    variant="outlined"
                    label={'Subscribed'}
                    size="small"
                    type="confirm"
                    sx={{
                      marginRight: '0 !important',
                      margin: '0 auto',
                      '.MuiChip-label': {
                        fontSize: '14px',
                        borderRadius: '50px',
                      },
                    }}
                  />
                ) : row.status === 'PENDING' ? (
                  <Chip
                    color="warning"
                    variant="outlined"
                    label={'Requested'}
                    size="small"
                    withIcon={false}
                    sx={{
                      marginRight: '0 !important',
                      margin: '0 auto',
                      '.MuiChip-label': {
                        fontSize: '14px',
                        borderRadius: '15px',
                      },
                    }}
                  />
                ) : (
                  <Chip
                    color="error"
                    variant="outlined"
                    label={'Declined'}
                    size="small"
                    type="decline"
                    sx={{
                      '.MuiChip-label': {
                        fontSize: '14px',
                        borderRadius: '15px',
                      },
                    }}
                  />
                )
              },
            },
            {
              field: 'details',
              headerName: 'Details',
              flex: 2,
              renderCell: ({ row }: { row: any }) => {
                return (
                  <IconButton
                    color="secondary"
                    onClick={(data: any) => {
                      console.log('row', row)
                      navigate(
                        `/${PAGES.COMPANY_SUBSCRIPTIONS_DETAIL}/${row.offerId}`,
                        { state: row }
                      )
                    }}
                  >
                    <ArrowForwardIcon />
                  </IconButton>
                )
              },
            },
            {
              field: 'action',
              headerName: 'Action',
              flex: 2,
              renderCell: ({ row }: { row: any }) => {
                return (
                  row.status === 'INACTIVE' && (
                    <Button
                      variant="contained"
                      size="small"
                      onClick={() => {
                        console.log('btn vlick')
                      }}
                    >
                      {'Unsubscribe'}
                    </Button>
                  )
                )
              },
            },
          ]}
          defaultFilter={group}
          filterViews={filterView}
        />
      </div>
    </main>
  )
}
