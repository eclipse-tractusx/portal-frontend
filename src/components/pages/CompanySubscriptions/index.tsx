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
  Button,
} from '@catena-x/portal-shared-components'
import { useTranslation } from 'react-i18next'
import {
  useFetchSubscribedActiveAppsStatusQuery,
  useUnsubscribeAppMutation,
} from 'features/apps/apiSlice'
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
import UnSubscribeOverlay from '../Organization/UnSubscribeOverlay'
import { success } from 'services/NotifyService'
import { Box } from '@mui/material'
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline'
import UnpublishedIcon from '@mui/icons-material/Unpublished'
import {
  CompanySubscriptionFilterType,
  type SubscribedActiveApps,
  SubscriptionStatus,
} from 'features/apps/types'

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
  const [group, setGroup] = useState<string>(
    t('content.companySubscriptions.filter.showAll')
  )
  const [showUnsubscribeOverlay, setShowUnsubscribeOverlay] =
    useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(false)
  const [appId, setAppId] = useState<string>('')
  const [subscriptionId, setSubscriptionId] = useState<string>('')
  const [unsubscribeMutation] = useUnsubscribeAppMutation()
  const [enableErrorMessage, setEnableErrorMessage] = useState<boolean>(false)

  const setView = (e: React.MouseEvent<HTMLInputElement>) => {
    const viewValue = e.currentTarget.value
    setFilterStatus(viewValue)
    setGroup(viewValue)
    setRefresh(Date.now())
  }

  const filterView = [
    {
      buttonText: t('content.companySubscriptions.filter.requested'),
      buttonValue: CompanySubscriptionFilterType.REQUESTED,
      onButtonClick: setView,
    },
    {
      buttonText: t('content.companySubscriptions.filter.active'),
      buttonValue: CompanySubscriptionFilterType.ACTIVE,
      onButtonClick: setView,
    },
    {
      buttonText: t('content.companySubscriptions.filter.showAll'),
      buttonValue: CompanySubscriptionFilterType.SHOW_ALL,
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
  }, [filterStatus, searchExpr])

  const onValidate = (expr: string) => {
    const validateExpr = isName(expr)
    if (validateExpr) dispatch(setSearchInput({ open: true, text: expr }))
    return validateExpr
  }

  const onUnsubscribeSubmit = async () => {
    setLoading(true)
    await unsubscribeMutation(subscriptionId)
      .unwrap()
      .then(() => {
        success(t('content.organization.unsubscribe.unsubscribeSuccess'))
        setLoading(false)
        setShowUnsubscribeOverlay(false)
        setEnableErrorMessage(false)
        setRefresh(Date.now())
      })
      .catch(() => {
        setLoading(false)
        setEnableErrorMessage(true)
      })
  }

  const renderStatusButton = (status: string) => {
    if (status === SubscriptionStatus.ACTIVE)
      return (
        <Button
          variant="text"
          startIcon={<CheckCircleOutlineIcon />}
          sx={{ color: '#B3CB2D', pointerEvents: 'none' }}
          size="small"
        >
          {t('content.companySubscriptions.subscribed')}
        </Button>
      )
    else if (status === SubscriptionStatus.PENDING)
      return (
        <Button
          variant="outlined"
          sx={{
            color: '#FFA600',
            borderColor: '#FFA600',
            pointerEvents: 'none',
            ml: 1,
          }}
          size="small"
        >
          {t('content.companySubscriptions.requested')}
        </Button>
      )
    else
      return (
        <Button
          variant="text"
          startIcon={<UnpublishedIcon />}
          sx={{ color: '#D91E18', pointerEvents: 'none' }}
          size="small"
        >
          {t('content.companySubscriptions.declined')}
        </Button>
      )
  }

  const columns = [
    {
      field: 'image',
      headerName: t('content.companySubscriptions.table.appIcon'),
      flex: 2,
      renderCell: ({ row }: { row: SubscribedActiveApps }) => (
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
      headerName: t('content.companySubscriptions.table.appTitle'),
      flex: 3,
      renderCell: ({ row }: { row: SubscribedActiveApps }) => (
        <Box sx={{ display: 'grid' }}>
          <Typography variant="body3">{row.name}</Typography>
          <Typography variant="body3">{row.provider}</Typography>
        </Box>
      ),
    },
    {
      field: 'status',
      headerName: t('content.companySubscriptions.table.status'),
      flex: 2,
      renderCell: ({ row }: { row: SubscribedActiveApps }) => {
        return renderStatusButton(row.status)
      },
    },
    {
      field: 'details',
      headerName: t('content.companySubscriptions.table.details'),
      flex: 2,
      renderCell: ({ row }: { row: SubscribedActiveApps }) => {
        return (
          <IconButton
            color="secondary"
            onClick={() => {
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
      headerName: t('content.companySubscriptions.table.action'),
      flex: 2,
      renderCell: ({ row }: { row: SubscribedActiveApps }) =>
        row.status === SubscriptionStatus.ACTIVE && (
          <Button
            variant="contained"
            size="small"
            onClick={(e) => {
              setShowUnsubscribeOverlay(true)
              setAppId(row.offerId)
              setSubscriptionId(row.subscriptionId)
              e.stopPropagation()
            }}
          >
            {t('content.companySubscriptions.unsubscribe')}
          </Button>
        ),
    },
  ]

  return (
    <main className="page-main-container">
      {showUnsubscribeOverlay && (
        <UnSubscribeOverlay
          openDialog={showUnsubscribeOverlay}
          handleOverlayClose={() => {
            setShowUnsubscribeOverlay(false)
            setLoading(false)
            setEnableErrorMessage(false)
          }}
          handleConfirmClick={() => onUnsubscribeSubmit()}
          loading={loading}
          appId={appId}
          subscriptionId={subscriptionId}
          enableErrorMessage={enableErrorMessage}
        />
      )}
      <Typography
        className="subTitle"
        variant="h2"
        sx={{ pb: 3, marginTop: '35px' }}
      >
        {t('content.companySubscriptions.headertitle')}
      </Typography>

      <div className={'table-container'}>
        <PageLoadingTable<SubscribedActiveApps, FetchHookArgsType>
          sx={{
            '.MuiDataGrid-cell': {
              alignContent: 'center !important',
            },
          }}
          searchExpr={searchExpr}
          alignCell="start"
          defaultFilter={group}
          filterViews={filterView}
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
          title={''}
          loadLabel={t('global.actions.more')}
          fetchHook={useFetchSubscribedActiveAppsStatusQuery}
          fetchHookArgs={fetchHookArgs}
          fetchHookRefresh={refresh}
          getRowId={(row: { [key: string]: string }) => row.subscriptionId}
          columns={columns}
        />
      </div>
    </main>
  )
}
