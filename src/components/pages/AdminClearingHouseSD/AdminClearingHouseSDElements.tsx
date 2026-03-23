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

import { useEffect, useState } from 'react'
import './style.scss'
import { Trans } from 'react-i18next'
import { t } from 'i18next'
import {
  Button,
  CircleProgress,
  ToggleSwitch,
  Typography,
} from '@arena2036/portal-shared-components-construct-x'
import {
  type ComapnyDataType,
  useFetchCompanyDataQuery,
  useFetchConnectorsQuery,
  useTriggerCompanyDataMutation,
  useTriggerConnectorsMutation,
  PAGE_SIZE,
  type ConnectorsType,
} from 'features/adminClearingHouseSD/adminClearingHouseSDApiSlice'
import { error } from 'services/NotifyService'
import { isClearinghouseConnectDisabled } from 'services/EnvironmentService'

const AdminclearinghouseSDElements = () => {
  const [companies, setCompanies] = useState<ComapnyDataType[]>([])
  const [connectors, setConnectors] = useState<ConnectorsType[]>([])
  const [checked, setChecked] = useState(isClearinghouseConnectDisabled())
  const [triggerCompanyData] = useTriggerCompanyDataMutation()
  const [triggerConnectors] = useTriggerConnectorsMutation()
  const [triggerCDLoading, setTriggerCDLoading] = useState<boolean>(false)
  const [triggerConnectorsLoading, setTriggerConnectorsLoading] =
    useState<boolean>(false)
  const [currentCompanyPage, setCurrentCompanyPage] = useState(0)
  const [currentConnectorPage, setCurrentConnectorPage] = useState(0)
  const [isFetchingMoreCompanies, setIsFetchingMoreCompanies] = useState(false)
  const [isFetchingMoreConnectors, setIsFetchingMoreConnectors] =
    useState(false)

  const handleChange = (newChecked: boolean) => {
    setChecked(newChecked)
  }

  const {
    data: companyData,
    isFetching: isFetchingCompanyData,
    refetch: refetchCompanyData,
  } = useFetchCompanyDataQuery({ page: currentCompanyPage })

  const {
    data: connectorsData,
    isFetching: isFetchingConnectors,
    refetch: refetchConnectors,
  } = useFetchConnectorsQuery({ page: currentConnectorPage })

  useEffect(() => {
    if (companyData?.content?.length) {
      setCompanies((prevCompanies) => [
        ...prevCompanies,
        ...companyData.content,
      ])
    }
  }, [companyData])

  useEffect(() => {
    if (connectorsData?.content?.length) {
      setConnectors((prevConnectors) => [
        ...prevConnectors,
        ...connectorsData.content,
      ])
    }
  }, [connectorsData])

  const isCompanyDataAvailable =
    !isFetchingCompanyData && (companies?.length ?? 0) > 0
  const isConnectorsDataAvailable =
    !isFetchingConnectors && (connectors?.length ?? 0) > 0

  // Load more companies
  const loadMoreCompanies = () => {
    if (
      !isFetchingMoreCompanies &&
      (companyData?.meta?.page ?? 0) < (companyData?.meta?.totalPages ?? 1) - 1
    ) {
      const currentItemCount = companyData?.content?.length ?? 0
      if (currentItemCount % PAGE_SIZE === 0) {
        setIsFetchingMoreCompanies(true)
        setCurrentCompanyPage((prev) => prev + 1)
      }
    }
  }

  // Load more connectors
  const loadMoreConnectors = () => {
    if (
      !isFetchingMoreConnectors &&
      (connectorsData?.meta?.page ?? 0) <
        (connectorsData?.meta?.totalPages ?? 1) - 1
    ) {
      const currentItemCount = connectorsData?.content?.length ?? 0
      if (currentItemCount % PAGE_SIZE === 0) {
        setIsFetchingMoreConnectors(true)
        setCurrentConnectorPage((prev) => prev + 1)
      }
    }
  }

  useEffect(() => {
    if (isFetchingMoreCompanies) {
      refetchCompanyData().then(() => {
        setIsFetchingMoreCompanies(false)
      })
    }
  }, [currentCompanyPage, isFetchingMoreCompanies])

  useEffect(() => {
    if (isFetchingMoreConnectors) {
      refetchConnectors().then(() => {
        setIsFetchingMoreConnectors(false)
      })
    }
  }, [currentConnectorPage, isFetchingMoreConnectors])

  // Scroll event to load more data for company list
  useEffect(() => {
    const companyContainer = document.querySelector('.company-list-container')

    const handleCompanyScroll = () => {
      if (companyContainer) {
        const bottom =
          companyContainer.scrollTop + companyContainer.clientHeight >=
          companyContainer.scrollHeight - 10

        if (bottom) {
          loadMoreCompanies()
        }
      }
    }

    companyContainer?.addEventListener('scroll', handleCompanyScroll)

    return () =>
      companyContainer?.removeEventListener('scroll', handleCompanyScroll)
  }, [companyData])

  // Scroll event to load more data for connector list
  useEffect(() => {
    const connectorContainer = document.querySelector('.connectors-list')

    const handleConnectorScroll = () => {
      if (connectorContainer) {
        const bottom =
          connectorContainer.scrollHeight - connectorContainer.scrollTop <=
          connectorContainer.clientHeight + 10
        if (bottom) {
          loadMoreConnectors()
        }
      }
    }

    connectorContainer?.addEventListener('scroll', handleConnectorScroll)

    return () =>
      connectorContainer?.removeEventListener('scroll', handleConnectorScroll)
  }, [connectors])

  const handleTriggerCompanyData = async () => {
    setTriggerCDLoading(true)
    try {
      await triggerCompanyData().unwrap()
      refetchCompanyData()
      setTriggerCDLoading(false)
    } catch (err) {
      setTriggerCDLoading(false)
      error(
        t('content.clearinghouseSelfDescription.errorMsg'),
        '',
        err as object
      )
    }
  }

  const handleTriggerConnectors = async () => {
    setTriggerConnectorsLoading(true)
    try {
      await triggerConnectors().unwrap()
      refetchConnectors()
      setTriggerConnectorsLoading(false)
    } catch (err) {
      setTriggerConnectorsLoading(false)
      error(
        t('content.clearinghouseSelfDescription.errorMsg'),
        '',
        err as object
      )
    }
  }

  const renderCompanyDataContent = () => {
    return (
      <>
        {isCompanyDataAvailable ? (
          <ul className="company-list-container">
            {companies?.map((company: ComapnyDataType) => (
              <li key={company?.companyId}>{company?.name}</li>
            ))}
          </ul>
        ) : (
          <Typography variant="body1" className="no-data-msg">
            {t('content.clearinghouseSelfDescription.noDataMsg')}
          </Typography>
        )}
      </>
    )
  }

  const renderConnectorsContent = () => {
    return (
      <>
        {isConnectorsDataAvailable ? (
          <div className="connectors-list">
            {connectors?.map((connector) => (
              <div key={connector?.connectorId} className="connector">
                <span className="name">{connector?.name}</span>
                <span className="companyName">{connector?.companyName}</span>
              </div>
            ))}
          </div>
        ) : (
          <Typography variant="body1" className="no-data-msg">
            {t('content.clearinghouseSelfDescription.noDataMsg')}
          </Typography>
        )}
      </>
    )
  }

  return (
    <div className="admin-container">
      <Typography variant="h2" className="heading">
        {t('content.clearinghouseSelfDescription.heading')}
      </Typography>
      <Trans>
        <Typography variant="body1" className="description">
          {t('content.clearinghouseSelfDescription.description')}
        </Typography>
      </Trans>

      <div className="status-section">
        <Typography variant="h5" className="status-title">
          {t(
            'content.clearinghouseSelfDescription.selfDescriptionFactoryInterface'
          )}
        </Typography>
        <div className="status">
          <span className="status-label">Status</span>
          <span className="switch-container">
            <ToggleSwitch
              checked={checked}
              onChange={handleChange}
              disabled={true}
              tooltipText={t('content.clearinghouseSelfDescription.statusMsg')}
              hoverEnabled={true}
            />
          </span>
        </div>
      </div>

      <div className="section">
        <div className="list-container">
          <div className="list-title">
            <Typography variant="h5">
              {t('content.clearinghouseSelfDescription.legalPerson')}
            </Typography>
            <Typography variant="body1">
              {t('content.clearinghouseSelfDescription.legalPersonDesc')}
            </Typography>
          </div>

          <div className="legal-person-list">
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
              renderCompanyDataContent()
            )}
          </div>
        </div>
        <div className="btn-container">
          <Button
            variant="contained"
            size="small"
            onClick={() => handleTriggerCompanyData()}
            disabled={isFetchingCompanyData || triggerCDLoading}
          >
            {triggerCDLoading ? (
              <CircleProgress
                size={20}
                step={1}
                interval={0.1}
                colorVariant={'primary'}
                variant={'indeterminate'}
                thickness={8}
              />
            ) : (
              t('content.clearinghouseSelfDescription.reprocess')
            )}
          </Button>
        </div>
      </div>

      <div className="section">
        <div className="list-container">
          <div className="list-title">
            <Typography variant="h5">
              {t('content.clearinghouseSelfDescription.connectors')}
            </Typography>
            <Typography variant="body1">
              {t('content.clearinghouseSelfDescription.connectorsDesc')}
            </Typography>
          </div>

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
            renderConnectorsContent()
          )}
        </div>
        <div className="btn-container">
          <Button
            variant="contained"
            size="small"
            onClick={() => handleTriggerConnectors()}
            disabled={isFetchingConnectors || triggerConnectorsLoading}
          >
            {triggerConnectorsLoading ? (
              <CircleProgress
                size={20}
                step={1}
                interval={0.1}
                colorVariant={'primary'}
                variant={'indeterminate'}
                thickness={8}
              />
            ) : (
              t('content.clearinghouseSelfDescription.reprocess')
            )}
          </Button>
        </div>
      </div>
    </div>
  )
}

export default AdminclearinghouseSDElements
