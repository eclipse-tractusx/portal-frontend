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

import { PageHeader, Typography } from '@catena-x/portal-shared-components'
import { useTranslation } from 'react-i18next'
import AppSubscriptions from './AppSubscriptions'
import { useDispatch } from 'react-redux'
import { show } from 'features/control/overlay'
import './Organization.scss'
import { OVERLAYS } from 'types/Constants'
import {
  useFetchSubscribedActiveAppsQuery,
  useUnsubscribeAppMutation,
} from 'features/apps/apiSlice'
import { subscribedApps } from 'features/apps/mapper'
import { useFetchOwnCompanyDetailsQuery } from 'features/admin/userApiSlice'
import LoadingError from './LoadingError'
import { CompanyDetailsToCards } from 'features/admin/mapper'
import { UserDetailCard } from 'components/shared/basic/UserDetailInfo/UserDetailCard'
import { useState } from 'react'
import UnSubscribeOverlay from './UnSubscribeOverlay'
import { error, success } from 'services/NotifyService'

export default function Organization() {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const { data, refetch } = useFetchSubscribedActiveAppsQuery()
  const appSubscribedData = data && subscribedApps(data)
  const {
    data: companyDetails,
    isError: companyDetailsError,
    isLoading: companyDetailsLoading,
  } = useFetchOwnCompanyDetailsQuery()
  const companyDetailsData =
    companyDetails && CompanyDetailsToCards(companyDetails)
  const [subscriptionId, setSubscriptionId] = useState<string>('')
  const [appId, setAppId] = useState<string>('')
  const [showUnsubscribeOverlay, setShowUnsubscribeOverlay] =
    useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(false)
  const [unsubscribeMutation] = useUnsubscribeAppMutation()

  const handleClick = (id: string | undefined) => {
    dispatch(show(OVERLAYS.APP, id, t('content.organization.company.title')))
  }

  const onUnsubscribe = async () => {
    setLoading(true)
    await unsubscribeMutation(subscriptionId)
      .unwrap()
      .then(() => {
        success(t('content.organization.unsubscribe.unsubscribeSuccess'))
      })
      .catch(() => {
        error(t('content.organization.unsubscribe.unsubscribeError'))
      })
    setLoading(false)
    setShowUnsubscribeOverlay(false)
    refetch()
  }

  return (
    <main>
      {showUnsubscribeOverlay && (
        <UnSubscribeOverlay
          openDialog={showUnsubscribeOverlay}
          handleOverlayClose={() => {
            setShowUnsubscribeOverlay(false)
          }}
          handleConfirmClick={() => onUnsubscribe()}
          loading={loading}
          appId={appId}
          subscriptionId={subscriptionId}
          enableErrorMessage={false}
        />
      )}
      <PageHeader
        title={t('pages.organization')}
        topPage={false}
        headerHeight={200}
      />
      <div className="organization-main">
        <div className="organization-content">
          {companyDetailsData ? (
            <UserDetailCard
              cardCategory={companyDetailsData?.cardCategory}
              cardContentItems={companyDetailsData?.cardContentItems}
            />
          ) : null}
          <LoadingError
            isLoading={companyDetailsLoading}
            isError={companyDetailsError}
            errorText={t('content.organization.company.error')}
          />
        </div>
        {appSubscribedData?.length !== 0 && (
          <Typography className="title">
            {t('content.organization.subscriptions.title')}
          </Typography>
        )}
        <div className="organization-content">
          {appSubscribedData?.map((app) => (
            <AppSubscriptions
              key={app.offerId}
              image={app.image}
              onButtonClick={() => {
                handleClick(app.offerId)
              }}
              name={app.name || ''}
              provider={app.provider}
              status={app.status}
              onUnsubscribe={(e) => {
                setShowUnsubscribeOverlay(true)
                setAppId(app.offerId)
                setSubscriptionId(app.subscriptionId)
                e.stopPropagation()
              }}
            />
          ))}
        </div>
      </div>
    </main>
  )
}
