/********************************************************************************
 * Copyright (c) 2021, 2023 Mercedes-Benz Group AG and BMW Group AG
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

import './CompanyRoles.scss'
import { useEffect, useState } from 'react'
import StageSection from 'components/shared/templates/StageSection'
import { StageSubNavigation } from 'components/shared/templates/StageSubNavigation'
import { getAssetBase } from 'services/EnvironmentService'
import { StaticTemplateResponsive } from 'components/shared/templates/StaticTemplateResponsive'
import { useSelector } from 'react-redux'
import { languageSelector } from 'features/language/slice'
import {
  useFetchCompanyRolesQuery,
  type SubNavigationType,
  type CompanyType,
  type StandardLibraryType,
  useFetchStandardLibraryQuery,
} from 'features/staticContent/staticContentApiSlice'

export default function CompanyRoles() {
  const [companyRoles, setCompanyRoles] = useState<CompanyType>()
  const [stdJson, setStdJson] = useState<StandardLibraryType>()
  const [linkArray, setLinkArray] = useState<SubNavigationType[]>()
  const url = window.location.href
  const language = useSelector(languageSelector)
  const [topReached, setTopReached] = useState<boolean>(false)
  const { data: companyRolesResponse } = useFetchCompanyRolesQuery()
  const { data: standardLibraryResponse } = useFetchStandardLibraryQuery()

  useEffect(() => {
    if (companyRolesResponse) {
      if (url.indexOf('companyrolesappprovider') > 1) {
        setCompanyRoles(companyRolesResponse.appProvider)
        setLinkArray(companyRolesResponse.appProvider.subNavigation)
      } else if (url.indexOf('companyrolesserviceprovider') > 1) {
        setCompanyRoles(companyRolesResponse.serviceProvider)
        setLinkArray(companyRolesResponse.serviceProvider.subNavigation)
      } else if (url.indexOf('companyrolesconformitybody') > 1) {
        setCompanyRoles(companyRolesResponse.conformity)
        setLinkArray(companyRolesResponse.conformity.subNavigation)
      } else if (url.indexOf('companyrolesonboardingserviceprovider') > 1) {
        setCompanyRoles(companyRolesResponse.ospProvider)
        setLinkArray(companyRolesResponse.ospProvider.subNavigation)
      } else {
        setCompanyRoles(companyRolesResponse.participant)
        setLinkArray(companyRolesResponse.participant.subNavigation)
      }
    }
  }, [url, language, companyRolesResponse])

  useEffect(() => {
    setStdJson(standardLibraryResponse)
  }, [language, standardLibraryResponse])

  const scrollStarted = () => {
    setTopReached(window.scrollY > 500)
  }

  window.addEventListener('scroll', scrollStarted)

  return (
    <main className="companyRoles">
      {companyRoles && linkArray && stdJson && (
        <>
          <StageSection
            title={companyRoles.title}
            description={companyRoles.description}
          />
          {linkArray && linkArray.length > 0 && (
            <StageSubNavigation fixHeader={topReached} linkArray={linkArray} />
          )}
          <StaticTemplateResponsive
            sectionInfo={companyRoles.sections}
            baseUrl={getAssetBase()}
            stdLibraries={stdJson}
          />
        </>
      )}
    </main>
  )
}
