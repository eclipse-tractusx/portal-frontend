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
  CircleProgress,
  StatusTag,
  Tooltips,
} from '@arena2036/portal-shared-components-construct-x'
import { useTranslation } from 'react-i18next'
import { Box } from '@mui/material'
import HighlightOffIcon from '@mui/icons-material/HighlightOff'
import {
  type ServiceAccountDetail,
  type ServiceAccountRole,
  useResetCredentialMutation,
} from 'features/admin/serviceApiSlice'
import { OVERLAYS } from 'types/Constants'
import { useDispatch } from 'react-redux'
import { show } from 'features/control/overlay'
import { KeyValueView } from 'components/shared/basic/KeyValueView'
import SyncIcon from '@mui/icons-material/Sync'
import { type ComponentProps, useState } from 'react'
import { error, success } from 'services/NotifyService'
import { ServiceAccountStatus } from 'features/admin/serviceApiSlice'
import Info from '@mui/icons-material/Info'

export const statusColorMap: Record<
  ServiceAccountStatus,
  ComponentProps<typeof StatusTag>['color']
> = {
  [ServiceAccountStatus.ACTIVE]: 'confirmed',
  [ServiceAccountStatus.PENDING]: 'pending',
  [ServiceAccountStatus.PENDING_DELETION]: 'pending',
}

export type DataValue = string | number | JSX.Element | string[]
export interface ValueItem {
  key?: DataValue
  value: DataValue
  copy?: boolean
  showHideButton?: boolean
  masked?: boolean
}

const getValueWithTooltip = (value: string, tooltipTitle: string) => {
  return (
    value || (
      <Tooltips
        color="dark"
        tooltipPlacement="bottom-start"
        tooltipText={tooltipTitle}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            marginRight: '-38px',
          }}
        >
          N/A
          <Info
            sx={{
              width: '2em',
              fontSize: '19px',
              color: '#888888',
              cursor: 'pointer',
              '&:hover': {
                color: '#0088CC',
              },
            }}
          />
        </Box>
      </Tooltips>
    )
  )
}

export default function TechnicalUserDetailsContent({
  data,
}: {
  data: ServiceAccountDetail
}) {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const [mutationRequest] = useResetCredentialMutation()
  const [loading, setLoading] = useState<boolean>(false)
  const [newData, setNewData] = useState<ServiceAccountDetail>(data)
  const missingInformationHint = t(
    'content.usermanagement.technicalUser.detailsPage.missingInfoHint'
  )
  const [technicalUserDetailList, setTechnicalUserDetailList] = useState<
    Array<ValueItem>
  >([
    {
      key: t('global.field.status'),
      value: (
        <StatusTag
          color={statusColorMap[newData?.status]}
          label={newData?.status}
        />
      ),
      copy: false,
    },
    {
      key: t('content.usermanagement.technicalUser.detailsPage.userType'),
      value: getValueWithTooltip(newData.usertype, missingInformationHint),
      copy: false,
    },
    {
      key: 'ID',
      value: newData.serviceAccountId,
      copy: true,
    },
    {
      key: `${t('content.usermanagement.technicalUser.serviceaccount')} ${t(
        'global.field.name'
      )}`,
      value: newData.name,
      copy: true,
    },
    {
      key: t(
        'content.usermanagement.technicalUser.detailsPage.serviceEndpoint'
      ),
      value: getValueWithTooltip(
        newData.authenticationServiceUrl,
        missingInformationHint
      ),
      copy: !!newData.authenticationServiceUrl,
    },
    {
      key: t(
        'content.usermanagement.technicalUser.detailsPage.companyServiceAccountTypeID'
      ),
      value: newData.companyServiceAccountTypeId,
      copy: false,
    },
    {
      key: t('global.field.clientId'),
      value: newData.clientId,
      copy: true,
      showHideButton: true,
      masked: true,
    },
    {
      key: t(
        'content.usermanagement.technicalUser.detailsPage.authenticationType'
      ),
      value: newData.authenticationType,
    },
    {
      key: t('global.field.secret'),
      value: newData.secret,
      copy: true,
      showHideButton: true,
      masked: true,
    },
  ])

  const connectedData = [
    {
      key: t('content.usermanagement.technicalUser.detailsPage.connectorLink'),
      value: newData?.connector?.name ?? 'N/A',
    },
    {
      key: t('content.usermanagement.technicalUser.detailsPage.offerLink'),
      value: newData?.offer?.name ?? 'N/A',
      copy: !!newData.offer?.name,
    },
  ]

  const reset = async () => {
    setLoading(true)
    await mutationRequest(newData.serviceAccountId)
      .unwrap()
      .then((payload: ServiceAccountDetail) => {
        success(
          t('content.usermanagement.technicalUser.resetCredentialSuccess'),
          ''
        )
        setNewData(payload)
      })
      .catch((err) => {
        error(
          t('content.usermanagement.technicalUser.resetCredentialError'),
          '',
          err
        )
      })
    setLoading(false)
  }

  return (
    <section>
      <Button
        size="small"
        variant="outlined"
        startIcon={<HighlightOffIcon />}
        onClick={() =>
          dispatch(show(OVERLAYS.DELETE_TECH_USER, newData.serviceAccountId))
        }
      >
        {t('content.usermanagement.technicalUser.delete')}
      </Button>

      <Button
        size="small"
        variant="outlined"
        disabled={loading}
        startIcon={
          loading ? (
            <CircleProgress
              thickness={1}
              size={20}
              variant="indeterminate"
              colorVariant="primary"
            />
          ) : (
            <SyncIcon />
          )
        }
        onClick={() => reset()}
        sx={{
          marginLeft: '10px',
          '@media (max-width: 600px)': {
            margin: '10px 0',
          },
        }}
      >
        {t('content.usermanagement.technicalUser.credentialReset')}
      </Button>

      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          marginTop: '80px',
          marginBottom: '92px',
          width: '100%',
        }}
      >
        <Box
          sx={{
            '@media (max-width: 1200px)': {
              order: 1,
              width: '100%',
            },
          }}
        >
          <KeyValueView
            cols={2}
            title={t(
              'content.usermanagement.technicalUser.detailsPage.connectedObjects'
            )}
            items={connectedData}
          />
        </Box>
        <Box
          sx={{
            '@media (max-width: 1200px)': {
              order: 3,
              width: '100%',
            },
          }}
        >
          <KeyValueView
            cols={1}
            title={t('global.field.description')}
            items={[{ value: newData.description }]}
          />
        </Box>
        <Box
          sx={{
            '@media (max-width: 1200px)': {
              order: 2,
              width: '100%',
            },
          }}
        >
          <KeyValueView
            cols={2}
            title={t(
              'content.usermanagement.technicalUser.detailsPage.userDetails'
            )}
            items={technicalUserDetailList}
            setTechnicalUserDetailList={setTechnicalUserDetailList}
          />
        </Box>
        <Box
          sx={{
            '@media (max-width: 1200px)': {
              order: 4,
              width: '100%',
            },
          }}
        >
          <KeyValueView
            cols={1}
            title={t('global.field.permission')}
            items={newData.roles.map((role: ServiceAccountRole) => ({
              value: role.roleName,
            }))}
          />
        </Box>
      </Box>
    </section>
  )
}
