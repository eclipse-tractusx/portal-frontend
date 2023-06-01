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

import { useTranslation } from 'react-i18next'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  StaticTable,
  TableType,
  Typography,
} from 'cx-portal-shared-components'
import { useFetchSubscriptionDetailQuery } from 'features/appSubscription/appSubscriptionApiSlice'
import ReleaseStepper from 'components/shared/basic/ReleaseProcess/stepper'
import { SubscriptionStatus } from 'features/apps/apiSlice'

interface AppSubscriptionDetailProps {
  openDialog: boolean
  appId: string
  subscriptionId: string
  handleOverlayClose: () => void
}

const AppSubscriptionDetailOverlay = ({
  openDialog = false,
  appId,
  subscriptionId,
  handleOverlayClose,
}: AppSubscriptionDetailProps) => {
  const { t } = useTranslation()
  const { data } = useFetchSubscriptionDetailQuery({ appId, subscriptionId })

  const stepLists = [
    {
      headline: t('content.appSubscription.detailOverlay.stepLists.firstStep'),
      step: 1,
    },
    {
      headline: t('content.appSubscription.detailOverlay.stepLists.secondStep'),
      step: 2,
    },
    {
      headline: t('content.appSubscription.detailOverlay.stepLists.thirdStep'),
      step: 3,
    },
  ]

  const subscriptionDetails: TableType = {
    head: [t('content.appSubscription.detailOverlay.subscriptionDetails'), ''],
    body: [
      [
        `${t('content.appSubscription.detailOverlay.appTitle')}`,
        data && data.name ? data.name : 'N/A',
      ],
      [
        `${t('content.appSubscription.detailOverlay.status')}`,
        data && data.offerSubscriptionStatus
          ? data.offerSubscriptionStatus
          : 'N/A',
      ],
      [
        `${t('content.appSubscription.detailOverlay.customer')}`,
        data && data.customer ? data.customer : 'N/A',
      ],
      [
        `${t('content.appSubscription.detailOverlay.bpn')}`,
        data && data.bpn ? data.bpn : 'N/A',
      ],
      [
        `${t('content.appSubscription.detailOverlay.contact')}`,
        data && data.contact.length ? data.contact.toString() : 'N/A',
      ],
    ],
  }

  const technicalDetails: TableType = {
    head: [t('content.appSubscription.detailOverlay.technicalDetails'), ''],
    body: [
      [
        `${t('content.appSubscription.detailOverlay.technicalName')}`,
        data && data.technicalUserData && data.technicalUserData.length > 0
          ? data.technicalUserData[0].name
          : 'N/A',
      ],
      [
        `${t('content.appSubscription.detailOverlay.technicalPermission')}`,
        data && data.technicalUserData && data.technicalUserData.length > 0
          ? data.technicalUserData[0].permissions.toString()
          : 'N/A',
      ],
    ],
  }

  const getActiveSteps = () => {
    if (data?.offerSubscriptionStatus === SubscriptionStatus.PENDING) {
      return 2
    } else if (data?.offerSubscriptionStatus === SubscriptionStatus.ACTIVE) {
      return 4
    } else {
      return 3
    }
  }

  return (
    <div>
      <Dialog
        open={openDialog}
        sx={{
          '.MuiDialog-paper': {
            maxWidth: '45%',
          },
        }}
      >
        <DialogHeader
          title={t('content.appSubscription.detailOverlay.title')}
          intro={t('content.appSubscription.detailOverlay.description')}
          closeWithIcon={true}
          onCloseWithIcon={() => handleOverlayClose()}
        />
        <DialogContent>
          <ReleaseStepper
            stepsList={stepLists}
            numberOfSteps={3}
            activePage={getActiveSteps()}
          />
          <div style={{ marginTop: '30px' }}>
            <StaticTable data={subscriptionDetails} />
          </div>
          <div style={{ marginTop: '20px' }}>
            <StaticTable data={technicalDetails} />
          </div>
          <div style={{ marginTop: '20px' }}>
            <Typography
              variant="caption2"
              sx={{ display: 'inherit', width: '100%' }}
            >
              {t('content.appSubscription.detailOverlay.helpText')}
            </Typography>
            <Typography variant="caption2" sx={{ color: '#0f71cb' }}>
              {t('content.appSubscription.detailOverlay.email')}
            </Typography>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default AppSubscriptionDetailOverlay
