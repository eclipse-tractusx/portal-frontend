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
  CardHorizontal,
  PageNotifications,
  Typography,
} from 'cx-portal-shared-components'
import { Grid, useTheme, CircularProgress } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { SubscriptionContent } from 'features/appStore/appStoreApiSlice'
import './AppStore.scss'

export default function SubscriptionElements({
  subscriptions,
}: {
  subscriptions?: SubscriptionContent[]
}) {
  console.log('sub', subscriptions)
  const theme = useTheme()
  const navigate = useNavigate()
  const { t } = useTranslation()

  const handleClick = (id: string) => {
    navigate(`/servicemarketplacedetail/${id}`)
  }

  if (subscriptions && subscriptions.length === 0) {
    return (
      <div className="recommended-section">
        <PageNotifications
          description={t('content.serviceMarketplace.noDataMessage')}
          onCloseNotification={function noRefCheck() {}}
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
        subscriptions.map((subscription: SubscriptionContent) => (
          <ul>
            <li>
              <ul className="group">
                <li>
                  <div className="item">
                    <div className="firstSection">
                      <Typography variant="h5">
                        {subscription.serviceName}
                      </Typography>
                    </div>
                    <div className="middleSection">
                      <Typography variant="h5">
                        {
                          subscription.companySubscriptionStatuses[0]
                            .companyName
                        }
                      </Typography>
                    </div>
                    <div className="lastSection">
                      <Typography variant="caption2">
                        {
                          subscription.companySubscriptionStatuses[0]
                            .companyName
                        }
                      </Typography>
                    </div>
                    <div className="actionButton">
                      <Button
                        color="primary"
                        className="activateBtn"
                        onClick={function noRefCheck() {}}
                        size="small"
                        variant="contained"
                      >
                        {t('content.appStore.activateBtn')}
                      </Button>
                    </div>
                  </div>
                </li>
              </ul>
            </li>
          </ul>
        ))
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
