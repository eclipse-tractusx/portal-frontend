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

import {
  PageLoadingTable,
  Tab,
  TabPanel,
  Tabs,
  Typography,
} from '@catena-x/portal-shared-components'
import { useTranslation } from 'react-i18next'
import {
  useFetchSubscribedActiveAppsStatusQuery,
  useUnsubscribeAppMutation,
} from 'features/apps/apiSlice'
import { type SyntheticEvent, useEffect, useState } from 'react'
import { isName } from 'types/Patterns'
import { useDispatch, useSelector } from 'react-redux'
import { setSearchInput } from 'features/appManagement/actions'
import { updateApplicationRequestSelector } from 'features/control/updates'
import UnSubscribeOverlay from '../Organization/UnSubscribeOverlay'
import { success } from 'services/NotifyService'
import {
  CompanySubscriptionFilterType,
  type SubscribedActiveApps,
} from 'features/apps/types'
import { CompanySubscriptionsTableColumns } from './CompanySubscriptionsTableColumns'
import {
  useFetchCompanyServiceSubscriptionsQuery,
  useUnsubscribeServiceMutation,
} from 'features/serviceSubscription/serviceSubscriptionApiSlice'
import { Box } from '@mui/material'

interface FetchHookArgsType {
  statusId: string
  expr: string
}

export default function CompanySubscriptions() {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const [refresh, setRefresh] = useState(0)
  const [searchExpr, setSearchExpr] = useState<string>('')
  const [fetchHookArgs, setFetchHookArgs] = useState<FetchHookArgsType>()
  const [filterStatus, setFilterStatus] = useState<string>(
    CompanySubscriptionFilterType.SHOW_ALL
  )
  const searchInputData = useSelector(updateApplicationRequestSelector)
  const [group, setGroup] = useState<string>(
    t('content.companySubscriptions.filter.showAll')
  )
  const [showUnsubscribeOverlay, setShowUnsubscribeOverlay] =
    useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(false)
  const [appId, setAppId] = useState<string>('')
  const [subscriptionId, setSubscriptionId] = useState<string>('')
  const [unsubscribeAppMutation] = useUnsubscribeAppMutation()
  const [unsubscribeServiceMutation] = useUnsubscribeServiceMutation()
  const [enableErrorMessage, setEnableErrorMessage] = useState<boolean>(false)
  const [currentActive, setCurrentActive] = useState<number>(0)

  const setView = (e: React.MouseEvent<HTMLInputElement>) => {
    const viewValue = e.currentTarget.value
    setFilterStatus(viewValue)
    setGroup(viewValue)
    setRefresh(Date.now())
  }

  const handleTabChange = (
    _e: SyntheticEvent<Element, Event>,
    value: number
  ) => {
    setCurrentActive(value)
  }

  const filterView = [
    {
      buttonText: t('content.companySubscriptions.filter.pending'),
      buttonValue: CompanySubscriptionFilterType.PENDING,
      onButtonClick: setView,
    },
    {
      buttonText: t('content.companySubscriptions.filter.active'),
      buttonValue: CompanySubscriptionFilterType.ACTIVE,
      onButtonClick: setView,
    },
    {
      buttonText: t('content.companySubscriptions.filter.inactive'),
      buttonValue: CompanySubscriptionFilterType.INACTIVE,
      onButtonClick: setView,
    },
    {
      buttonText: t('content.companySubscriptions.filter.showAll'),
      buttonValue: CompanySubscriptionFilterType.SHOW_ALL,
      onButtonClick: setView,
    },
  ]

  useEffect(() => {
    setFetchHookArgs({
      statusId: filterStatus,
      expr: searchExpr,
    })
  }, [filterStatus, searchExpr])

  const onValidate = (expr: string) => {
    const validateExpr = isName(expr)
    if (validateExpr) dispatch(setSearchInput({ open: true, text: expr }))
    return validateExpr
  }

  const callSuccess = () => {
    success(t('content.organization.unsubscribe.unsubscribeSuccess'))
    setLoading(false)
    setShowUnsubscribeOverlay(false)
    setEnableErrorMessage(false)
    setRefresh(Date.now())
  }

  const onUnsubscribeSubmit = async () => {
    setLoading(true)
    await (
      currentActive === 0
        ? unsubscribeAppMutation(subscriptionId)
        : unsubscribeServiceMutation(subscriptionId)
    )
      .unwrap()
      .then(() => {
        callSuccess()
      })
      .catch(() => {
        setLoading(false)
        setEnableErrorMessage(true)
      })
  }

  const handleOverlay = (row: SubscribedActiveApps, enable: boolean) => {
    setAppId(row.offerId)
    setShowUnsubscribeOverlay(enable)
    setSubscriptionId(row.subscriptionId)
  }

  const companySubscriptionsCols = CompanySubscriptionsTableColumns(
    t,
    handleOverlay,
    currentActive
  )

  const getIcon = (num: number) => {
    return (
      <Typography
        variant="label3"
        sx={{
          background: currentActive + 1 === num ? '#0f71cb' : 'white',
          color: currentActive + 1 === num ? 'white' : '#0f71cb',
          outline: '2px solid #0f71cb',
          flex: '0',
          marginRight: '20px',
          borderRadius: '50%',
          height: '20px',
          width: '20px',
          minWidth: '20px',
          textAlign: 'center',
          lineHeight: '20px',
          position: 'relative',
        }}
      >
        {num}
      </Typography>
    )
  }

  // Add an ESLint exception until there is a solution
  // eslint-disable-next-line
  const renderTable = (query: any) => (
    <div className={'table-container'}>
      <PageLoadingTable<SubscribedActiveApps, FetchHookArgsType>
        sx={{
          '.MuiDataGrid-cell': {
            alignContent: 'center !important',
          },
        }}
        autoFocus={false}
        searchExpr={searchExpr}
        alignCell="start"
        defaultFilter={group}
        filterViews={filterView}
        toolbarVariant={'searchAndFilter'}
        hasBorder={false}
        columnHeadersBackgroundColor={'transparent'}
        searchPlaceholder={t('content.companySubscriptions.searchName')}
        searchInputData={searchInputData}
        onSearch={(expr: string) => {
          if (expr !== '' && !onValidate(expr)) return
          setRefresh(Date.now())
          setSearchExpr(expr)
        }}
        searchDebounce={1000}
        title={''}
        loadLabel={t('global.actions.more')}
        fetchHook={query}
        fetchHookArgs={fetchHookArgs}
        fetchHookRefresh={refresh}
        getRowId={(row: { [key: string]: string }) => row.subscriptionId}
        columns={companySubscriptionsCols}
      />
    </div>
  )

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
          activeTab={currentActive}
        />
      )}
      <Typography
        className="subTitle"
        variant="h2"
        sx={{ pb: 3, marginTop: '35px' }}
      >
        {t('content.companySubscriptions.headertitle')}
      </Typography>
      <Box>
        <Tabs
          value={currentActive}
          onChange={handleTabChange}
          sx={{ margin: '0 auto 20px', maxWidth: '1110px', width: '100%' }}
        >
          <Tab
            iconPosition="start"
            icon={getIcon(1)}
            aria-controls={`simple-tabpanel-${currentActive}`}
            id={`simple-tab-${currentActive}`}
            label={'App Company Subscriptions'}
            sx={{
              textTransform: 'none',
              display: 'inline-flex',
              width: '100%',
              maxWidth: '550px',
              '&.Mui-selected': {
                borderBottom: '3px solid #0f71cb',
              },
            }}
          />
          <Tab
            iconPosition="start"
            icon={getIcon(2)}
            aria-controls={`simple-tabpanel-${currentActive}`}
            id={`simple-tab-${currentActive}`}
            label={'Service Company Subscriptions'}
            sx={{
              textTransform: 'none',
              display: 'inline-flex',
              width: '100%',
              maxWidth: '550px',
              '&.Mui-selected': {
                borderBottom: '3px solid #0f71cb',
              },
            }}
          />
        </Tabs>
        <TabPanel value={currentActive} index={0}>
          {renderTable(useFetchSubscribedActiveAppsStatusQuery)}
        </TabPanel>
        <TabPanel value={currentActive} index={1}>
          {renderTable(useFetchCompanyServiceSubscriptionsQuery)}
        </TabPanel>
      </Box>
    </main>
  )
}
