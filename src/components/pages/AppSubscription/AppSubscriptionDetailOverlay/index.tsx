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
  PageSnackbar,
  StaticTable,
  TableType,
  Typography,
} from '@catena-x/portal-shared-components'
import {
  useFetchSubscriptionDetailQuery,
  useUpdateTenantUrlMutation,
} from 'features/appSubscription/appSubscriptionApiSlice'
import ReleaseStepper from 'components/shared/basic/ReleaseProcess/stepper'
import { SubscriptionStatus } from 'features/apps/apiSlice'
import UserService from 'services/UserService'
import { ROLES } from 'types/Constants'
import { useState } from 'react'
import { SuccessErrorType } from 'features/admin/appuserApiSlice'
import { isURL } from 'types/Patterns'
import { SubscriptionTypes } from 'components/shared/templates/Subscription'
import { useFetchServiceSubDetailQuery } from 'features/serviceSubscription/serviceSubscriptionApiSlice'

interface AppSubscriptionDetailProps {
  openDialog: boolean
  appId: string
  subscriptionId: string
  type: string
  handleOverlayClose: () => void
}

enum TenantUrlState {
  NONE = 'NONE',
  SUCCESS = 'SUCCESS',
  ERROR = 'ERROR',
}

const AppSubscriptionDetailOverlay = ({
  openDialog = false,
  appId,
  subscriptionId,
  type,
  handleOverlayClose,
}: AppSubscriptionDetailProps) => {
  const { t } = useTranslation()
  const ti = useTranslation('servicerelease').t
  const fetchAPI =
    type === SubscriptionTypes.APP_SUBSCRIPTION
      ? useFetchSubscriptionDetailQuery
      : useFetchServiceSubDetailQuery
  const { data, refetch } = fetchAPI({
    appId,
    subscriptionId,
  })
  const [updateTenantUrl] = useUpdateTenantUrlMutation()

  const [tenantUrlResponse, setTenantUrlResponse] = useState<TenantUrlState>(
    TenantUrlState.NONE
  )

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

  const getValue = (value?: string) => value ?? 'N/A'

  const subscriptionDetails: TableType = {
    head: [t('content.appSubscription.detailOverlay.subscriptionDetails'), ''],
    body: [
      [
        `${t('content.appSubscription.detailOverlay.appTitle')}`,
        getValue(data?.name),
      ],
      [
        `${t('content.appSubscription.detailOverlay.status')}`,
        getValue(data?.offerSubscriptionStatus),
      ],
      [
        `${t('content.appSubscription.detailOverlay.customer')}`,
        getValue(data?.customer),
      ],
      [
        `${t('content.appSubscription.detailOverlay.bpn')}`,
        getValue(data?.bpn),
      ],
      [
        `${t('content.appSubscription.detailOverlay.contact')}`,
        getValue(data?.contact?.toString()),
      ],
    ],
  }

  const bodyData = [
    [
      `${t('content.appSubscription.detailOverlay.technicalName')}`,
      data?.technicalUserData?.[0]?.name ??
        (data?.offerSubscriptionStatus !== SubscriptionStatus.PENDING
          ? 'N/A'
          : ''),
    ],
    [
      `${t('content.appSubscription.detailOverlay.technicalPermission')}`,
      data?.technicalUserData?.[0]?.permissions.toString() ??
        (data?.offerSubscriptionStatus !== SubscriptionStatus.PENDING
          ? 'N/A'
          : ''),
    ],
  ]

  type === SubscriptionTypes.APP_SUBSCRIPTION &&
    bodyData.unshift(
      [
        `${t('content.appSubscription.detailOverlay.appTenantUrl')}`,
        data?.tenantUrl ?? '',
      ],
      [
        `${t('content.appSubscription.detailOverlay.appId')}`,
        data?.appInstanceId ??
          (data?.offerSubscriptionStatus !== SubscriptionStatus.PENDING
            ? 'N/A'
            : ''),
      ]
    )

  const technicalDetails: TableType = {
    head: [t('content.appSubscription.detailOverlay.technicalDetails'), ''],
    body: bodyData,
    edit: [
      [
        {
          icon: false,
          inputValue: '',
        },
        {
          icon:
            UserService.hasRole(ROLES.APPSTORE_EDIT) &&
            data?.offerSubscriptionStatus === SubscriptionStatus.ACTIVE,
          inputValue: data?.tenantUrl ?? '',
          isValid: (value: string) => isURL(value),
          errorMessage: t('content.appSubscription.pleaseEnterValidURL'),
        },
      ],
      [
        {
          icon: true,
          inputValue: t('content.appSubscription.detailOverlay.appIdInfo'),
        },
        {
          icon: false,
        },
      ],
      [
        {
          icon: true,
          inputValue: t(
            'content.appSubscription.detailOverlay.technicalNameInfo'
          ),
        },
        {
          icon: false,
          clickableLink: data?.technicalUserData[0]?.id
            ? `/techuserdetails/${data?.technicalUserData[0]?.id}`
            : undefined,
        },
      ],
      [
        {
          icon: true,
          inputValue: t(
            'content.appSubscription.detailOverlay.technicalPermissionInfo'
          ),
        },
        {
          icon: false,
        },
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

  const handleSaveURL = async (url: string) => {
    const data = {
      appId: appId,
      subscriptionId: subscriptionId,
      body: { url: url },
    }
    try {
      await updateTenantUrl(data).unwrap()
      refetch()
      setTenantUrlResponse(TenantUrlState.SUCCESS)
    } catch (err) {
      setTenantUrlResponse(TenantUrlState.ERROR)
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
          intro={
            type === SubscriptionTypes.APP_SUBSCRIPTION
              ? t('content.appSubscription.detailOverlay.description')
              : ti('serviceSubscription.detailOverlay.description')
          }
          closeWithIcon={true}
          onCloseWithIcon={() => {
            handleOverlayClose()
          }}
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
            <StaticTable
              data={technicalDetails}
              handleEdit={(url) => handleSaveURL(url)}
            />
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
      <PageSnackbar
        open={tenantUrlResponse !== TenantUrlState.NONE}
        severity={
          tenantUrlResponse === TenantUrlState.SUCCESS
            ? SuccessErrorType.SUCCESS
            : SuccessErrorType.ERROR
        }
        description={
          tenantUrlResponse === TenantUrlState.SUCCESS
            ? t('content.appSubscription.detailOverlay.tenantUrlSuccessMsg')
            : t('content.appSubscription.detailOverlay.tenantUrlErrorMsg')
        }
        showIcon={true}
        autoClose={true}
      />
    </div>
  )
}

export default AppSubscriptionDetailOverlay
