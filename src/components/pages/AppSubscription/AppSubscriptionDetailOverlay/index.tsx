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

import { useTranslation } from 'react-i18next'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  PageSnackbar,
  StaticTable,
  type TableType,
  type VerticalTableType,
  Typography,
  VerticalTableNew,
  EditField,
  type TableCellType,
  Tooltips,
  CircleProgress,
} from '@arena2036/portal-shared-components-construct-x'
import {
  ProcessStep,
  type TechnicalUserData,
  useFetchSubscriptionDetailQuery,
  useUpdateTenantUrlMutation,
} from 'features/appSubscription/appSubscriptionApiSlice'
import ReleaseStepper from 'components/shared/basic/ReleaseProcess/Stepper'
import { SubscriptionStatus } from 'features/apps/types'
import { ROLES } from 'types/Constants'
import { useState } from 'react'
import './style.scss'
import { SuccessErrorType } from 'features/admin/appuserApiSlice'
import { isURL } from 'types/Patterns'
import { SubscriptionTypes } from 'components/shared/templates/Subscription'
import { useFetchServiceSubDetailQuery } from 'features/serviceSubscription/serviceSubscriptionApiSlice'
import HelpOutlineIcon from '@mui/icons-material/HelpOutline'
import { Link } from 'react-router-dom'
import { userHasPortalRole } from 'services/AccessService'

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
  const isAppSubscription = type === SubscriptionTypes.APP_SUBSCRIPTION
  const fetchAPI = isAppSubscription
    ? useFetchSubscriptionDetailQuery
    : useFetchServiceSubDetailQuery
  const { data, refetch, isFetching } = fetchAPI({
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

  const getStatus = () => {
    if (
      data?.processStepTypeId === ProcessStep.AWAIT_START_AUTOSETUP ||
      data?.processStepTypeId === ProcessStep.TRIGGER_PROVIDER
    ) {
      return t('content.appSubscription.detailOverlay.subscriptionInitiated')
    } else if (
      data?.processStepTypeId === ProcessStep.ACTIVATE_SUBSCRIPTION ||
      data?.processStepTypeId === ProcessStep.TRIGGER_PROVIDER_CALLBACK
    ) {
      return t('content.appSubscription.detailOverlay.subscriptionActivate')
    } else {
      return t('content.appSubscription.detailOverlay.setupOngoing')
    }
  }

  const getTitle = () => {
    if (isAppSubscription)
      return `${t('content.appSubscription.detailOverlay.appTitle')}`
    else return `${t('content.appSubscription.detailOverlay.serviceTitle')}`
  }

  const getSubscriptionStatus = () => {
    if (isAppSubscription) return getStatus()
    else return getValue(data?.offerSubscriptionStatus)
  }

  const getTechnicalValue = () => {
    if (data?.offerSubscriptionStatus !== SubscriptionStatus.PENDING)
      return 'N/A'
    else return ''
  }

  const subscriptionDetails: TableType = {
    head: [t('content.appSubscription.detailOverlay.subscriptionDetails'), ''],
    body: [
      [getTitle(), getValue(data?.name)],
      [
        `${t('content.appSubscription.detailOverlay.status')}`,
        getSubscriptionStatus(),
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

  const renderTooltipText = (value: string, tooltipText: string) => {
    return (
      <span style={{ display: 'flex', flexDirection: 'row' }}>
        <Typography variant="body3">{value}</Typography>
        <Tooltips
          color="dark"
          tooltipPlacement="bottom-start"
          tooltipText={tooltipText}
        >
          <HelpOutlineIcon
            sx={{
              width: '2em',
              fontSize: '19px',
              color: '#888888',
              cursor: 'pointer',
              paddingTop: '2px',
              '&:hover': {
                color: '#0088CC',
              },
            }}
          />
        </Tooltips>
      </span>
    )
  }

  const renderTechnicalName = (technicalData: TechnicalUserData[]) => (
    <>
      {technicalData.map((data) => (
        <Link
          target="_blank"
          to={`/techUserDetails/${data.id}`}
          style={{
            textDecoration: 'none',
          }}
          key={data.id}
        >
          <Typography
            variant="body3"
            sx={{
              color: '#0088CC',
              cursor: 'pointer',
            }}
          >
            {data.name}
          </Typography>
        </Link>
      ))}
    </>
  )

  const renderTenantUrl = (url: string) => {
    if (
      isAppSubscription &&
      userHasPortalRole(ROLES.APPSTORE_EDIT) &&
      data?.offerSubscriptionStatus === SubscriptionStatus.ACTIVE
    ) {
      return (
        <EditField
          value={url ?? ''}
          isValid={(value: string) => isURL(value)}
          handleEdit={(url: string | number | boolean) =>
            handleSaveURL(url as string)
          }
          errorMessage={t('content.appSubscription.pleaseEnterValidURL')}
        />
      )
    } else return url
  }

  const bodyData: TableCellType[][] = [
    [
      renderTooltipText(
        t('content.appSubscription.detailOverlay.technicalName'),
        t('content.appSubscription.detailOverlay.technicalNameInfo')
      ),
      data?.technicalUserData.length
        ? renderTechnicalName(data?.technicalUserData)
        : getTechnicalValue(),
    ],
    [
      renderTooltipText(
        t('content.appSubscription.detailOverlay.technicalPermission'),
        t('content.appSubscription.detailOverlay.technicalPermissionInfo')
      ),
      data?.technicalUserData.length
        ? data?.technicalUserData
            .map((userdata: TechnicalUserData) => userdata.permissions)
            .toString()
        : getTechnicalValue(),
    ],
  ]

  if (isAppSubscription) {
    bodyData.unshift(
      [
        t('content.appSubscription.detailOverlay.appTenantUrl'),
        renderTenantUrl(data?.tenantUrl ?? ''),
      ],
      [
        renderTooltipText(
          t('content.appSubscription.detailOverlay.appId'),
          t('content.appSubscription.detailOverlay.appIdInfo')
        ),
        data?.appInstanceId ?? getTechnicalValue(),
      ]
    )
  }

  const technicalDetails: VerticalTableType = {
    head: [t('content.appSubscription.detailOverlay.technicalDetails'), ''],
    body: bodyData,
  }

  const externalServicesDetails: VerticalTableType = {
    head: [
      t('content.appSubscription.detailOverlay.externalServices.heading'),
      '',
    ],
    body: [
      [
        renderTooltipText(
          t(
            'content.appSubscription.detailOverlay.externalServices.trustedIssuer.label'
          ),
          t(
            'content.appSubscription.detailOverlay.externalServices.trustedIssuer.description'
          )
        ),
        data?.externalService?.trusted_issuer ?? '-',
      ],
      [
        renderTooltipText(
          t(
            'content.appSubscription.detailOverlay.externalServices.participantId.label'
          ),
          t(
            'content.appSubscription.detailOverlay.externalServices.participantId.description'
          )
        ),
        data?.externalService?.participant_id ?? '-',
      ],
      [
        renderTooltipText(
          t(
            'content.appSubscription.detailOverlay.externalServices.iatpId.label'
          ),
          t(
            'content.appSubscription.detailOverlay.externalServices.iatpId.description'
          )
        ),
        data?.externalService?.iatp_id ?? '-',
      ],
      [
        renderTooltipText(
          t(
            'content.appSubscription.detailOverlay.externalServices.didResolver.label'
          ),
          t(
            'content.appSubscription.detailOverlay.externalServices.didResolver.description'
          )
        ),
        data?.externalService?.did_resolver ?? '-',
      ],
      [
        renderTooltipText(
          t(
            'content.appSubscription.detailOverlay.externalServices.decentralIdentityManagementAuthUrl.label'
          ),
          t(
            'content.appSubscription.detailOverlay.externalServices.decentralIdentityManagementAuthUrl.description'
          )
        ),
        data?.externalService?.decentralIdentityManagementAuthUrl ?? '-',
      ],
      [
        renderTooltipText(
          t(
            'content.appSubscription.detailOverlay.externalServices.decentralIdentityManagementServiceUrl.label'
          ),
          t(
            'content.appSubscription.detailOverlay.externalServices.decentralIdentityManagementServiceUrl.description'
          )
        ),
        data?.externalService?.decentralIdentityManagementServiceUrl ?? '-',
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
      appId,
      subscriptionId,
      body: { url },
    }
    try {
      await updateTenantUrl(data).unwrap()
      refetch()
      setTenantUrlResponse(TenantUrlState.SUCCESS)
    } catch (err) {
      setTenantUrlResponse(TenantUrlState.ERROR)
    }
  }

  const getDialogIntro = () => {
    if (isAppSubscription) {
      return t('content.appSubscription.detailOverlay.description')
    } else {
      return ti('serviceSubscription.detailOverlay.description')
    }
  }

  const getSnackbarSeverity = () => {
    if (tenantUrlResponse === TenantUrlState.SUCCESS) {
      return SuccessErrorType.SUCCESS
    } else {
      return SuccessErrorType.ERROR
    }
  }

  const getSnackbarDesc = () => {
    if (tenantUrlResponse === TenantUrlState.SUCCESS) {
      return t('content.appSubscription.detailOverlay.tenantUrlSuccessMsg')
    } else {
      return t('content.appSubscription.detailOverlay.tenantUrlErrorMsg')
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
          intro={getDialogIntro()}
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
          {isFetching ? (
            <div className="app-subscription-overlay">
              <div className="loading-progress">
                <CircleProgress
                  size={40}
                  step={1}
                  interval={0.1}
                  colorVariant={'primary'}
                  variant={'indeterminate'}
                  thickness={8}
                />
              </div>
            </div>
          ) : (
            <div>
              <div style={{ marginTop: '30px' }}>
                <StaticTable data={subscriptionDetails} />
              </div>
              <div style={{ marginTop: '20px' }}>
                <VerticalTableNew data={technicalDetails} />
              </div>
              <div style={{ marginTop: '20px' }}>
                <VerticalTableNew data={externalServicesDetails} />
              </div>
            </div>
          )}
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
        severity={getSnackbarSeverity()}
        description={getSnackbarDesc()}
        showIcon={true}
        autoClose={true}
      />
    </div>
  )
}

export default AppSubscriptionDetailOverlay
