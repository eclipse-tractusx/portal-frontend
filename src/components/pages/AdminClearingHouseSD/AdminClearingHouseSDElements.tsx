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

import { useState } from 'react'
import { Typography } from '@mui/material'
import './AdminClearingHouseSD.scss'
import { Trans } from 'react-i18next'
import { t } from 'i18next'
import {
  Button,
  CircleProgress,
  ToggleSwitch,
} from '@catena-x/portal-shared-components'
import {
  type ComapnyDataType,
  useFetchCompanyDataQuery,
  useFetchConnectorsQuery,
} from 'features/adminClearingHouseSD/adminClearingHouseSDApiSlice'

const AdminclearinghouseSDElements = () => {
  const [checked, setChecked] = useState(true)

  const handleChange = (newChecked: boolean) => {
    setChecked(newChecked)
  }

  const {
    data: companyData,
    isFetching: isFetchingCompanyData,
    refetch: refetchCompanyData,
  } = useFetchCompanyDataQuery({ page: 0 })

  const {
    data: connectors,
    isFetching: isFetchingConnectors,
    refetch: refetchConnectors,
  } = useFetchConnectorsQuery({ page: 0 })

  return (
    <div className="admin-container">
      <Typography variant="h2">
        {t('content.clearinghouseSelfDescription.heading')}
      </Typography>
      <Trans>
        <Typography variant="h6">
          {t('content.clearinghouseSelfDescription.description')}
        </Typography>
      </Trans>

      <div className="compliance-status">
        <Typography variant="h5">
          {t('content.clearinghouseSelfDescription.complianceStatus')}
        </Typography>

        <div className="switch-container">
          <ToggleSwitch
            checked={checked}
            onChange={handleChange}
            disabled={true}
          />
        </div>
      </div>

      <div className="section">
        <Typography variant="h5">
          {t('content.clearinghouseSelfDescription.legalPerson')}
        </Typography>
        <Typography variant="body1">
          {t('content.clearinghouseSelfDescription.legalPersonDesc')}
        </Typography>
        {isFetchingCompanyData ? (
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
        ) : (
          <ul>
            {companyData?.content?.map(
              (company: ComapnyDataType, index: number) => (
                <li key={index}>{company?.name}</li>
              )
            )}
          </ul>
        )}
        <div className="btn-container">
          <Button
            variant="contained"
            size="small"
            onClick={() => refetchCompanyData()}
            disabled={isFetchingCompanyData}
          >
            {t('content.clearinghouseSelfDescription.reprocess')}
          </Button>
        </div>
      </div>

      <div className="section">
        <Typography variant="h5">
          {t('content.clearinghouseSelfDescription.connectors')}
        </Typography>
        <Typography variant="body1">
          {t('content.clearinghouseSelfDescription.connectorsDesc')}
        </Typography>

        {isFetchingConnectors ? (
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
        ) : (
          <div className="connectors-list">
            {connectors?.content?.map((connector, index) => (
              <div key={index} className="connector">
                <span>{connector?.name}</span>
                <span>{connector?.companyName}</span>
              </div>
            ))}
          </div>
        )}
        <div className="btn-container">
          <Button
            variant="contained"
            size="small"
            onClick={() => refetchConnectors()}
            disabled={isFetchingConnectors}
          >
            {t('content.clearinghouseSelfDescription.reprocess')}
          </Button>
        </div>
      </div>
    </div>
  )
}

export default AdminclearinghouseSDElements
