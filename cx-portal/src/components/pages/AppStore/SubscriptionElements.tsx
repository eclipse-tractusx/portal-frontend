/********************************************************************************
 * Copyright (c) 2021,2022 BMW Group AG
 * Copyright (c) 2021,2022 Contributors to the Eclipse Foundation
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
  Button,
  PageNotifications,
  Typography,
} from 'cx-portal-shared-components'
import { useTheme, CircularProgress } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { useDispatch } from 'react-redux'
import { show } from 'features/control/overlay/actions'
import { OVERLAYS } from 'types/Constants'
import { SubscriptionContent } from 'features/appStore/appStoreApiSlice'
import './AppStore.scss'

export default function SubscriptionElements({
  subscriptions,
  selectedTab,
}: {
  subscriptions?: SubscriptionContent[]
  selectedTab: string
}) {
  const theme = useTheme()
  const { t } = useTranslation()
  const dispatch = useDispatch()

  if (subscriptions && subscriptions.length === 0) {
    return (
      <div className="recommended-section">
        <PageNotifications
          description={t('content.serviceMarketplace.noDataMessage')}
          open
          severity="error"
          showIcon
          title="Error"
        />
      </div>
    )
  }

  return (
    <div className="recommended-main">
      {subscriptions && subscriptions.length ? (
        <ul className="group">
          {subscriptions.map((subscriptionData) => {
            return subscriptionData.companySubscriptionStatuses.map(
              (subscription) => (
                <li key={subscription.subscriptionId} className="item">
                  <Typography
                    variant="h5"
                    className={`firstSection ${
                      selectedTab === 'request' ? 'wd-25' : 'wd-32'
                    }`}
                  >
                    {subscription.companyName}
                  </Typography>
                  <Typography
                    variant="h5"
                    className={`secondSection ${
                      selectedTab === 'request' ? 'wd-25' : 'wd-32'
                    }`}
                  >
                    {subscriptionData.serviceName}
                  </Typography>
                  <Typography
                    variant="caption3"
                    className={`thirdSection ${
                      selectedTab === 'request' ? 'wd-25' : 'wd-32'
                    } `}
                  >
                    {'Placeholders for add details such as BPN; etc'}
                  </Typography>
                  {subscription.offerSubscriptionStatus === 'PENDING' && (
                    <div className="forthSection">
                      <Button
                        color="primary"
                        className="wd-25"
                        onClick={() =>
                          dispatch(
                            show(
                              OVERLAYS.ADD_SUBSCRIPTION,
                              subscription.subscriptionId
                            )
                          )
                        }
                        size="small"
                        variant="contained"
                      >
                        {t('content.appStore.activateBtn')}
                      </Button>
                    </div>
                  )}
                </li>
              )
            )
          })}
        </ul>
      ) : (
        <div className="loading-progress">
          <CircularProgress
            size={50}
            sx={{
              color: theme.palette.primary.main,
            }}
          />
        </div>
      )}
    </div>
  )
}
