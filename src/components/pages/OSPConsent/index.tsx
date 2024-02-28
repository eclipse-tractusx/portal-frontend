/********************************************************************************
 * Copyright (c) 2021, 2024 Contributors to the Eclipse Foundation
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
import { Trans, useTranslation } from 'react-i18next'
import { useMediaQuery, useTheme } from '@mui/material'
import { uniqueId } from 'lodash'
import { useNavigate } from 'react-router-dom'
import {
  StaticTable,
  type TableType,
  Typography,
  Button,
  Checkbox,
  LoadingButton,
} from '@catena-x/portal-shared-components'
import {
  useFetchApplicationsQuery,
  useFetchCompanyDetailsWithAddressQuery,
  useFetchAgreementDataQuery,
  type companyRole,
  useFetchAgreementConsentsQuery,
  useUpdateAgreementConsentsMutation,
  CONSENT_STATUS,
  type AgreementData,
} from 'features/registration/registrationApiSlice'
import RegistrationStatusList from 'components/shared/frame/Header/RegistrationReviewOverlay/RegistrationReviewContent/RegistrationStatusList'
import { getApiBase } from 'services/EnvironmentService'
import UserService from 'services/UserService'
import { download } from 'utils/downloadUtils'
import './style.scss'

export const OSPConsent = () => {
  const tm = useTranslation().t
  const { t } = useTranslation('registration')
  const navigate = useNavigate()
  const theme = useTheme()
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

  const { data: companyDetails } = useFetchCompanyDetailsWithAddressQuery(
    applicationId ?? ''
  )
  const { data: allConsentData } = useFetchAgreementDataQuery()
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

  const handleAgreementCheck = (id: string) => {
    const updatedMap = { ...agreementChecked }
    updatedMap[id] = !updatedMap[id]
    setAgreementChecked(updatedMap)
  }

  const handleCompanyRoleCheck = (id: string) => {
    const updatedMap = { ...companyRoleChecked }
    updatedMap[id] = !updatedMap[id]

    if (!updatedMap[id]) {
      const companyRoleIndex =
        allConsentData?.companyRoles.findIndex(
          (item) => item.companyRole === id
        ) ?? 0

      const updatedAgreementIds = allConsentData?.companyRoles[
        companyRoleIndex
      ].agreementIds.reduce((prev: {}, next: string) => {
        return { ...prev, [next]: false }
      }, {})

      setAgreementChecked((prevState: { [key: string]: boolean }) => ({
        ...prevState,
        ...updatedAgreementIds,
      }))
    }

    setCompanyRoleChecked(updatedMap)
  }

  const handleDownloadClick = (documentId: string, documentName: string) => {
    if (!documentId) return
    try {
      fetch(
        `${getApiBase()}/api/registration/registrationDocuments/${documentId}`,
        {
          method: 'GET',
          headers: {
            authorization: `Bearer ${UserService.getToken()}`,
          },
        }
      )
        .then(async (res) => {
          const fileType = res.headers.get('content-type') ?? ''
          const file = await res.blob()
          download(file, fileType, documentName)
        })
        .catch((error) => {
          console.log(error)
        })
    } catch (error) {
      console.error(error, 'ERROR WHILE FETCHING DOCUMENT')
    }
  }

  const renderTermsText = (agreement: AgreementData) => {
    return (
      <>
        <strong>{t('osp.companyRole.TermsAndCondSpan1')} </strong>
        <Typography
          variant={isMobile ? 'body3' : 'body2'}
          className={agreement.documentId ? 'agreement-span' : ''}
          onClick={() => {
            handleDownloadClick(agreement.documentId, agreement.name)
          }}
          onKeyDown={() => {
            // do nothing
          }}
        >
          {agreement.name}
        </Typography>{' '}
        <strong>{t('osp.companyRole.TermsAndCondSpan3')}</strong>
      </>
    )
  }

  const renderTermsSection = (role: companyRole) => {
    if (role.agreementIds.length === 0) return null
    return (
      <ul className="agreement-check-list">
        {role.agreementIds.map((id) => (
          <li key={id} className="agreement-li">
            <Checkbox
              label=""
              className="agreement-check"
              onChange={() => {
                handleAgreementCheck(id)
              }}
              checked={agreementChecked?.[id]}
            />
            {allConsentData?.agreements
              .filter((agreement) => agreement.agreementId === id)
              .map((agreement) => (
                <Typography
                  variant={isMobile ? 'body3' : 'body2'}
                  className="agreement-text"
                  key={agreement.agreementId}
                >
                  {agreement.documentId
                    ? renderTermsText(agreement)
                    : agreement.name}
                </Typography>
              ))}
          </li>
        ))}
      </ul>
    )
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

  const tableData: TableType = {
    head: [t('osp.companyName'), t('osp.bmw')],
    body: [
      [t('osp.street'), companyDetails?.streetName ?? ''],
      [t('osp.zip'), companyDetails?.zipCode ?? ''],
      [t('osp.city'), companyDetails?.city ?? ''],
      [t('osp.region'), companyDetails?.region ?? ''],
      [t('osp.country'), companyDetails?.countryAlpha2Code ?? ''],
    ],
  }

  const renderRegistrationSection = () => {
    if (isSuccess) {
      return (
        <div className="registration-confirmation">
          <Typography variant={isMobile ? 'h4' : 'h3'}>
            {t('osp.success.heading')}
          </Typography>
          <Trans>
            <Typography variant="body2" className="description">
              {t('osp.success.description')}
            </Typography>
          </Trans>
          <div className="statusDetails">
            <Typography variant="h5" className="stepTitle">
              {t('osp.success.stepTitle')}
            </Typography>
            {applicationData?.[0] && (
              <RegistrationStatusList
                checklist={applicationData[0].applicationChecklist}
              />
            )}
          </div>
          <div className="homeBtn">
            <Button
              variant="contained"
              size="small"
              onClick={() => {
                navigate('/home')
              }}
            >
              {t('osp.success.homepage')}
            </Button>
          </div>
        </div>
      )
    } else if (isError) {
      return (
        <div className="registration-error">
          <Trans>
            <Typography variant="body2" className="description">
              {t('osp.error.description')}
            </Typography>
          </Trans>
          <div className="retryBtn">
            {loading ? (
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
                sx={{ marginLeft: '10px' }}
              />
            ) : (
              <Button variant="contained" size="small" onClick={handleSubmit}>
                {t('osp.error.retry')}
              </Button>
            )}
            <Button
              variant="outlined"
              size="small"
              className="backBtn"
              onClick={() => {
                setIsError(false)
              }}
            >
              {t('osp.error.back')}
            </Button>
          </div>
          <div className="helpdeskText">
            <Trans>
              <Typography variant="body3">{t('osp.helpText')}</Typography>
            </Trans>
          </div>
        </div>
      )
    } else {
      return (
        <div className="registration-details">
          <Typography
            variant={isMobile ? 'h4' : 'h3'}
            className="company-heading"
          >
            {t('osp.companyHeading')}
          </Typography>
          <Typography variant="body2" className="company-message">
            {t('osp.companyMessage')}
          </Typography>
          {companyDetails && (
            <StaticTable data={tableData} horizontal={false} />
          )}
          <div className="rolesSection">
            <Typography
              variant={isMobile ? 'h4' : 'h3'}
              className="company-heading"
            >
              {t('osp.companyRole.title')}
            </Typography>
            <Typography variant="body2" className="company-message">
              {t('osp.companyRole.subTitle')}
            </Typography>
            <div className="rolesList">
              {allConsentData?.companyRoles.map((role) => (
                <div
                  className="company-role-section"
                  key={uniqueId(role.companyRole)}
                >
                  <div className="role-checkbox-row">
                    <div className="role-checkbox">
                      <Checkbox
                        label=""
                        onChange={() => {
                          handleCompanyRoleCheck(role.companyRole)
                        }}
                        checked={companyRoleChecked?.[role.companyRole]}
                      />
                    </div>
                    <div className="role-checkbox-text">
                      <Typography
                        variant={isMobile ? 'label2' : 'label1'}
                        className="company-heading"
                      >
                        {t(`osp.companyRole.${role.companyRole}`)}
                      </Typography>
                      <Typography variant={isMobile ? 'body3' : 'body2'}>
                        {
                          role.descriptions[
                            'en' as keyof typeof role.descriptions
                          ]
                        }
                      </Typography>
                      {companyRoleChecked?.[role.companyRole] &&
                        renderTermsSection(role)}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            {submitError && (
              <Typography variant="body3" className="submitError">
                {t('osp.submitError')}
              </Typography>
            )}
          </div>
          <div className="submitBtn">
            {loading ? (
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
                sx={{ marginLeft: '10px' }}
              />
            ) : (
              <Button variant="contained" size="small" onClick={handleSubmit}>
                {tm('global.actions.submit')}
              </Button>
            )}
          </div>
          <div className="helpdeskText">
            <Trans>
              <Typography variant="body3">{t('osp.helpText')}</Typography>
            </Trans>
          </div>
        </div>
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
