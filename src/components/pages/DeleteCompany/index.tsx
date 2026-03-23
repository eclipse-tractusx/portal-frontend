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
 * distributed under the License is distributed on an 'AS IS' BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
 * License for the specific language governing permissions and limitations
 * under the License.
 *
 * SPDX-License-Identifier: Apache-2.0
 ********************************************************************************/

import { useEffect, useState } from 'react'
import { Trans, useTranslation } from 'react-i18next'
import { uniqueId } from 'lodash'
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline'
import { getAssetBase } from 'services/EnvironmentService'
import {
  Button,
  CircleProgress,
  LoadingButton,
  Typography,
} from '@arena2036/portal-shared-components-construct-x'
import {
  ApplicationStatus,
  useDeclineRegistrationMutation,
  useFetchDeclineDataQuery,
} from 'features/deleteCompany/deleteCompanyApiSlice'
import './style.scss'

export default function DeleteCompany() {
  const { t } = useTranslation()

  const [initialPage, setInitialPage] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [isError, setIsError] = useState(false)
  const [notSupported, setNotSupported] = useState(false)
  const [isLoadingBtn, setIsLoadingBtn] = useState(false)

  const { data, isLoading } = useFetchDeclineDataQuery()
  const companyData = data?.[0]
  const [declineRegistration] = useDeclineRegistrationMutation()

  useEffect(() => {
    if (
      companyData &&
      Object.values(ApplicationStatus).includes(companyData?.applicationStatus)
    ) {
      setInitialPage(true)
      setNotSupported(false)
    } else {
      setNotSupported(true)
    }
  }, [companyData])

  const handleDeleteCompany = async () => {
    if (companyData) {
      setIsLoadingBtn(true)
      try {
        await declineRegistration(companyData.applicationId).unwrap()
        setInitialPage(false)
        setIsSuccess(true)
        setIsLoadingBtn(false)
      } catch (err) {
        setInitialPage(false)
        setIsError(true)
        setIsLoadingBtn(false)
      }
    }
  }

  const handleRetryDelete = () => {
    setIsError(false)
    setInitialPage(true)
  }

  return (
    <>
      {isLoading ? (
        <div className="loading">
          <CircleProgress
            variant="indeterminate"
            colorVariant="primary"
            size={100}
          />
        </div>
      ) : (
        <div
          className="deleteMain"
          style={{
            backgroundImage: `url(${getAssetBase()}/images/frame/home-stage-desktop.jpg)`,
          }}
        >
          <div className="container">
            <div className="logo text-center">
              <img
                src={`${getAssetBase()}/images/logos/construct-x-logo.svg`}
                alt="logo"
              />
            </div>
            {initialPage && (
              <div className="content">
                <Typography variant="h4" className="text-center mb-20">
                  {t('content.deleteCompany.title')}
                </Typography>
                <Trans
                  values={{
                    companyName: companyData?.companyName,
                    name: companyData?.user,
                  }}
                >
                  <Typography variant="body1" className="text-center mb-25">
                    {t('content.deleteCompany.description')}
                  </Typography>
                </Trans>
                <div className="contentListing">
                  <div className="d-flex mb-15">
                    <CheckCircleOutlineIcon className="icon mr-10" />
                    <Trans
                      values={{
                        name: companyData?.user,
                      }}
                    >
                      <Typography variant="body3">
                        {t('content.deleteCompany.heading1')}
                      </Typography>
                    </Trans>
                  </div>
                  <div className="d-flex align-item-center mb-15">
                    <CheckCircleOutlineIcon className="icon mr-10" />
                    <Typography variant="body3">
                      {t('content.deleteCompany.heading2')}
                    </Typography>
                  </div>

                  <ul className="mb-25">
                    {companyData?.users.map((user) => (
                      <li key={uniqueId(user)}>{user}</li>
                    ))}
                  </ul>
                  {isLoadingBtn ? (
                    <LoadingButton
                      color="primary"
                      helperText=""
                      helperTextColor="success"
                      label=""
                      loadIndicator="Loading ..."
                      loading
                      size="small"
                      onButtonClick={() => {
                        // do nothing
                      }}
                    />
                  ) : (
                    <Button
                      onClick={() => {
                        handleDeleteCompany()
                      }}
                      className="deleteBtn"
                      size="small"
                    >
                      {t('content.deleteCompany.deleteBtn')}
                    </Button>
                  )}
                </div>
              </div>
            )}
            {isSuccess && (
              <div className="content text-center ">
                <Typography variant="h4" className="mb-20">
                  {t('content.deleteCompany.successTitle')}
                </Typography>
                <Typography variant="body1">
                  {t('content.deleteCompany.successDescription')}
                </Typography>
              </div>
            )}
            {isError && (
              <div className="content text-center">
                <Typography variant="h4" className="mb-20">
                  {t('content.deleteCompany.errorTitle')}
                </Typography>
                <Typography variant="body1" className="mb-25">
                  {t('content.deleteCompany.errorDescription')}
                </Typography>
                <Button
                  onClick={() => {
                    handleRetryDelete()
                  }}
                  className="deleteBtn"
                  size="small"
                >
                  {t('content.deleteCompany.retryBtn')}
                </Button>
              </div>
            )}
            {notSupported && (
              <div className="content text-center">
                <Typography variant="h4" className="mb-20">
                  {t('content.deleteCompany.notSupportedTitle')}
                </Typography>
                <Typography variant="body1">
                  {t('content.deleteCompany.notSupportedDescription')}
                </Typography>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  )
}
