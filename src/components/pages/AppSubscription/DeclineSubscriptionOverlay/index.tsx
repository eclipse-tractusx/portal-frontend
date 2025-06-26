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

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogHeader,
  LoadingButton,
  Typography,
} from '@catena-x/portal-shared-components'
import { useTranslation, Trans } from 'react-i18next'
import { useDeclineAppSubscriptionMutation } from 'features/appSubscription/appSubscriptionApiSlice'
import { useDeclineServiceSubscriptionMutation } from 'features/serviceSubscription/serviceSubscriptionApiSlice'
import { useState } from 'react'
import './style.scss'
import { success, error } from 'services/NotifyService'
import { SubscriptionTypes } from 'components/shared/templates/Subscription'

interface DeclineSubscriptionProps {
  openDialog: boolean
  appId: string
  subscriptionId: string
  title: string
  appName: string
  subscriptionType: string
  handleOverlayClose: () => void
  refetch?: () => void
  declineSubscriptionAction: (subscriptionId: string) => void
}

const DeclineSubscriptionOverlay = ({
  openDialog = false,
  subscriptionId,
  title,
  appName,
  subscriptionType = SubscriptionTypes.APP_SUBSCRIPTION,
  handleOverlayClose,
  declineSubscriptionAction,
}: DeclineSubscriptionProps) => {
  const { t } = useTranslation()
  const [loading, setLoading] = useState(false)

  const [declineAppSubscription] = useDeclineAppSubscriptionMutation()
  const [declineServiceSubscription] = useDeclineServiceSubscriptionMutation()

  const handleDecline = async (subscriptionId: string) => {
    setLoading(true)
    try {
      if (subscriptionType === SubscriptionTypes.APP_SUBSCRIPTION) {
        await declineAppSubscription(subscriptionId).unwrap()
      } else {
        await declineServiceSubscription(subscriptionId).unwrap()
      }
      declineSubscriptionAction(subscriptionId)
      success(t('content.appSubscription.decline.success'))
    } catch (err) {
      error(t('content.appSubscription.error'), '', err as object)
    } finally {
      setLoading(false)
      handleOverlayClose()
    }
  }
  return (
    <Dialog
      open={openDialog}
      sx={{
        '.MuiDialog-paper': {
          maxWidth: '45%',
          width: '400px',
        },
      }}
    >
      <DialogHeader
        title={t('content.appSubscription.decline.heading')}
        intro={t('content.appSubscription.decline.intro').replace(
          '{{appName}}',
          appName
        )}
        closeWithIcon={false}
      />
      <DialogContent>
        <div className="appSubscriptionMain">
          <Trans
            values={{
              companyName: title,
            }}
          >
            <Typography variant="body2">
              {t('content.appSubscription.decline.description')}
            </Typography>
          </Trans>
        </div>
      </DialogContent>
      <DialogActions>
        <Button
          variant="outlined"
          onClick={() => {
            handleOverlayClose()
          }}
        >
          {t('content.appSubscription.decline.cancelBtn')}
        </Button>
        {loading ? (
          <LoadingButton
            color="primary"
            helperText=""
            helperTextColor="success"
            label=""
            loadIndicator="Loading ..."
            loading
            size="medium"
            onButtonClick={() => {
              // do nothing
            }}
            sx={{ marginLeft: '10px' }}
          />
        ) : (
          <Button
            className="cx-decline-btn"
            variant="contained"
            onClick={() => handleDecline(subscriptionId)}
          >
            {t('content.appSubscription.decline.declineBtn')}
          </Button>
        )}
      </DialogActions>
    </Dialog>
  )
}

export default DeclineSubscriptionOverlay
