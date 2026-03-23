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
import { Trans, useTranslation } from 'react-i18next'
import { useMediaQuery, useTheme } from '@mui/material'
import { uniqueId } from 'lodash'
import {
  StaticTable,
  type TableType,
  Typography,
  Button,
  Checkbox,
  LoadingButton,
} from '@arena2036/portal-shared-components-construct-x'
import {
  useFetchCompanyDetailsWithAddressQuery,
  useFetchAgreementDataQuery,
  type companyRole,
  useFetchAgreementConsentsQuery,
  type AgreementData,
  type SubmitData,
} from 'features/registration/registrationApiSlice'
import { getApiBase } from 'services/EnvironmentService'
import UserService from 'services/UserService'
import { download } from 'utils/downloadUtils'
import './style.scss'

enum uniqueIdTypeText {
  COMMERCIAL_REG_NUMBER = 'Commercial Registration Number',
  VAT_ID = 'VAT ID',
  LEI_CODE = 'LEI CODE',
  VIES = 'VIES',
  EORI = 'EORI',
}
interface CompanyDetailsProps {
  applicationId: string
  loading: boolean
  handleSubmit: () => void
  submitError: boolean
  updateConsents: (data: SubmitData) => void
}

export const CompanyDetails = ({
  applicationId,
  loading,
  handleSubmit,
  submitError,
  updateConsents,
}: CompanyDetailsProps) => {
  const tm = useTranslation().t
  const { t, i18n } = useTranslation('registration')
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

  const { data: companyDetails } = useFetchCompanyDetailsWithAddressQuery(
    applicationId ?? ''
  )
  const { data: allConsentData } = useFetchAgreementDataQuery()
  const { data: consentData } = useFetchAgreementConsentsQuery(
    applicationId ?? ''
  )

  useEffect(() => {
    updateConsents({
      roles: companyRoleChecked,
      consents: agreementChecked,
    })
  }, [companyRoleChecked, agreementChecked])

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

  const checkUniqueIdType = (type: string): string =>
    uniqueIdTypeText[type as keyof typeof uniqueIdTypeText] ??
    uniqueIdTypeText.VAT_ID
  const tableData: TableType = {
    head: [t('osp.companyName'), companyDetails?.name ?? ''],
    body: [
      [t('osp.legalName'), companyDetails?.shortName ?? ''],
      [
        t('osp.street'),
        `${companyDetails?.streetName ?? ''} ${companyDetails?.streetNumber ?? ''}`,
      ],
      [t('osp.zip'), companyDetails?.zipCode ?? ''],
      [t('osp.city'), companyDetails?.city ?? ''],
      [t('osp.region'), companyDetails?.region ?? ''],
      [t('osp.country'), companyDetails?.countryAlpha2Code ?? ''],
      ...(companyDetails?.uniqueIds?.map((id) => [
        checkUniqueIdType(id.type as string),
        id.value,
      ]) ?? []),
    ],
  }

  return (
    <div className="registration-details">
      <Typography variant={isMobile ? 'h4' : 'h3'} className="company-heading">
        {t('osp.companyHeading')}
      </Typography>
      <Typography variant="body2" className="company-message">
        {t('osp.companyMessage')}
      </Typography>
      {companyDetails && <StaticTable data={tableData} horizontal={false} />}
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
          {allConsentData?.companyRoles
            .filter((role) =>
              consentData?.companyRoles.includes(role.companyRole)
            )
            .map((role) => (
              <div
                className="companyRole-section"
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
                          i18n.language as keyof typeof role.descriptions
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
