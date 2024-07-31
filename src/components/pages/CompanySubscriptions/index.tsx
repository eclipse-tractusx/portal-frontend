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

import { PageLoadingTable } from '@catena-x/portal-shared-components'
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
import UnSubscribeOverlay from '../Organization/UnSubscribeOverlay'
import { success } from 'services/NotifyService'
import {
  CompanySubscriptionFilterType,
  type SubscribedActiveApps,
} from 'features/apps/types'
import { CompanySubscriptionsTableColumns } from './CompanySubscriptionsTableColumns'
import { MainHeader } from 'components/shared/cfx/MainHeader'

interface FetchHookArgsType {
  statusFilter: string
  expr: string
}

export default function CompanySubscriptions() {
  const { t } = useTranslation()
  const dispatch = useDispatch()
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

  const handleOverlay = (row: SubscribedActiveApps, enable: boolean) => {
    setAppId(row.offerId)
    setShowUnsubscribeOverlay(enable)
    setSubscriptionId(row.subscriptionId)
  }

  const companySubscriptionsCols = CompanySubscriptionsTableColumns(
    t,
    handleOverlay
  )

  return (
    <main className="page-main-container">
      <MainHeader
        title={t('content.companySubscriptions.title')}
        subTitle={t('content.companySubscriptions.description')}
        headerHeight={250}
        subTitleWidth={750}
      />

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
          searchPlaceholder={t(
            'content.companySubscriptions.searchPlaceholder'
          )}
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
          columns={companySubscriptionsCols}
        />
      </div>
    </main>
  )
}
