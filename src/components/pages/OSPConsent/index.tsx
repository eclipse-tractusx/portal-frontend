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
import { useTranslation } from 'react-i18next'
import { useMediaQuery, useTheme } from '@mui/material'
import { Typography } from '@catena-x/portal-shared-components'
import {
  useFetchApplicationsQuery,
  useFetchAgreementConsentsQuery,
  useUpdateAgreementConsentsMutation,
  CONSENT_STATUS,
  ApplicationStatus,
  ApplicationType,
  type SubmitData,
} from 'features/registration/registrationApiSlice'
import './style.scss'
import { SuccessRegistration } from './SuccessRegistration'
import { ErrorRegistration } from './ErrorRegistration'
import { CompanyDetails } from './CompanyDetails'
import { useNavigate } from 'react-router-dom'

export const OSPConsent = () => {
  const { t } = useTranslation('registration')
  const theme = useTheme()
  const navigate = useNavigate()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'), {
    defaultMatches: true,
  })

  const [companyRoleChecked, setCompanyRoleChecked] = useState<{
    [key: string]: boolean
  }>({})
  const [agreementChecked, setAgreementChecked] = useState<{
    [key: string]: boolean
  }>({})
  const [loading, setLoading] = useState(false)
  const [submitError, setSubmitError] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [isError, setIsError] = useState(false)

  const { data: applicationData, refetch } = useFetchApplicationsQuery()
  const applicationId = applicationData?.[0].applicationId

  if (
    applicationData?.[0].applicationStatus === ApplicationStatus.SUBMITTED &&
    applicationData?.[0].applicationType === ApplicationType.INTERNAL
  ) {
    navigate('/')
  }

  const { data: consentData } = useFetchAgreementConsentsQuery(
    applicationId ?? ''
  )
  const [updateAgreementConsents] = useUpdateAgreementConsentsMutation()

  useEffect(() => {
    updateSelectedRolesAndAgreement()
  }, [consentData])

  const updateSelectedRolesAndAgreement = () => {
    consentData &&
      setCompanyRoleChecked(
        consentData?.companyRoles.reduce((prev, next) => {
          return { ...prev, [next]: true }
        }, {})
      )

    consentData &&
      setAgreementChecked(
        consentData?.agreements.reduce((prev, next) => {
          return { ...prev, [next.agreementId]: true }
        }, {})
      )
  }

  const setConsents = (data: SubmitData) => {
    setCompanyRoleChecked(data.roles)
    setAgreementChecked(data.consents)
  }

  const handleSubmit = async () => {
    setLoading(true)
    const companyRoles = Object.keys(companyRoleChecked).filter(
      (item) => companyRoleChecked[item]
    )

    const agreements = Object.keys(agreementChecked)
      .filter((agreementId) => agreementChecked[agreementId])
      .map((agreementId) => {
        return {
          agreementId,
          consentStatus: CONSENT_STATUS.ACTIVE,
        }
      })

    const data = {
      companyRoles,
      agreements,
    }

    await updateAgreementConsents(data)
      .unwrap()
      .then(() => {
        setIsError(false)
        setIsSuccess(true)
        refetch()
      })
      .catch((errors) => {
        if (errors.status === 500) setIsError(true)
        else setSubmitError(true)
      })
    setLoading(false)
  }

  const renderRegistrationSection = () => {
    if (!applicationData || !applicationId) return
    if (isSuccess) {
      return <SuccessRegistration applicationData={applicationData} />
    } else if (isError) {
      return (
        <ErrorRegistration
          loading={loading}
          handleSubmit={handleSubmit}
          setIsError={setIsError}
        />
      )
    } else {
      return (
        <CompanyDetails
          applicationId={applicationId}
          loading={loading}
          handleSubmit={handleSubmit}
          submitError={submitError}
          updateConsents={setConsents}
        />
      )
    }
  }

  return (
    <div className="ospMain">
      <div className="mainContainer">
        <Typography
          className={`heading ${isError && 'error-heading'}`}
          variant={isMobile ? 'h3' : 'h2'}
        >
          {isError ? t('osp.error.heading') : t('osp.heading')}
        </Typography>
        {renderRegistrationSection()}
      </div>
    </div>
  )
}
