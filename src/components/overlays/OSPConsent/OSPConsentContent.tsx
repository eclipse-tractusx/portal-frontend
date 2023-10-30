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

import { Checkbox } from '@catena-x/portal-shared-components'
import { Typography } from '@mui/material'
import { type IdentityProvider } from 'features/admin/idpApiSlice'
import {
  CONSENT_STATUS,
  type CompanyRole,
  type CompanyRoleAgreementData,
  type PartnerRegistrationConsent,
} from 'features/admin/networkApiSlice'
import i18next from 'i18next'
import { useState } from 'react'
import { getHeaders } from 'services/RequestService'
import { getApiBase } from 'services/EnvironmentService'
import './style.scss'

const DocumentDownloadLink = ({ id, name }: { id: string; name: string }) => {
  const onClick = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    e.preventDefault()
    fetch(
      `${getApiBase()}/api/administration/registration/documents/${id}`,
      getHeaders()
    )
      .then((response) => response.blob())
      .then((blob) => {
        const url = window.URL.createObjectURL(new Blob([blob]))
        const link = document.createElement('a')
        link.href = url
        link.setAttribute('download', `${name}.pdf`)
        document.body.appendChild(link)
        link.click()
        link.parentNode!.removeChild(link)
      })
  }

  return (
    <a href={'#'} onClick={onClick}>
      [doc]
    </a>
  )
}

const OSPConsentContentForm = ({
  companyRoleAgreementData,
  onChange,
}: {
  companyRoleAgreementData: CompanyRoleAgreementData
  onChange: (consent: Set<string>) => void
}) => {
  const [consent, setConsent] = useState<Set<string>>(new Set<string>())

  const toggleConsent = (id: string) => {
    const newConsent = new Set<string>(consent)
    if (newConsent.has(id)) {
      newConsent.delete(id)
    } else {
      newConsent.add(id)
    }
    setConsent(newConsent)
    onChange(newConsent)
  }

  return (
    <ul className={'roles'}>
      {companyRoleAgreementData.companyRoles.map((role: CompanyRole) => (
        <li key={role.companyRole}>
          <Typography variant="label3">{role.companyRole}</Typography>
          <div>{role.descriptions[i18next.language]}</div>
          <ul className={'agreements'}>
            {role.agreementIds.map((id) => {
              const agreement = companyRoleAgreementData.agreements.filter(
                (a) => id === a.agreementId
              )?.[0]
              return agreement ? (
                <li key={id}>
                  <Checkbox
                    label={agreement.name}
                    onChange={() => {
                      toggleConsent(agreement.agreementId)
                    }}
                    checked={consent.has(agreement.agreementId)}
                  />
                  <DocumentDownloadLink id={id} name={agreement.name} />
                </li>
              ) : (
                <></>
              )
            })}
          </ul>
        </li>
      ))}
    </ul>
  )
}

export const OSPConsentContent = ({
  idp,
  companyRoleAgreementData,
  onValid,
}: {
  idp: IdentityProvider
  companyRoleAgreementData: CompanyRoleAgreementData
  onValid: (consent: PartnerRegistrationConsent) => void
}) => {
  const [debug, setDebug] = useState<boolean>(false)
  const toggleDebug = () => {
    setDebug(!debug)
  }

  const doCheckData = (consent: Set<string>) => {
    onValid({
      companyRoles: companyRoleAgreementData.companyRoles.map(
        (role) => role.companyRole
      ),
      agreements: [...consent].map((agreementId) => ({
        agreementId,
        consentStatus: CONSENT_STATUS.ACTIVE,
      })),
    })
  }

  return (
    <div>
      <OSPConsentContentForm
        companyRoleAgreementData={companyRoleAgreementData}
        onChange={doCheckData}
      />
      <pre
        style={{
          fontSize: '10px',
          backgroundColor: '#eeeeee',
          cursor: 'pointer',
        }}
        onClick={toggleDebug}
        onKeyUp={toggleDebug}
      >
        {debug ? JSON.stringify(companyRoleAgreementData, null, 2) : '{...}'}
      </pre>
    </div>
  )
}
