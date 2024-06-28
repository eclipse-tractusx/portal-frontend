/********************************************************************************
 * Copyright (c) 2023 Mercedes-Benz Group AG and BMW Group AG
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

enum URLs {
  companyRolesAppProvider = 'companyRolesAppProvider',
  companyRolesServiceProvider = 'companyRolesServiceProvider',
  companyRolesConformityBody = 'companyRolesConformityBody',
  companyRolesOnboardingServiceProvider = 'companyRolesOnboardingServiceProvider',
}

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
    const roles = []
    if (companyRolesResponse && standardLibraryResponse) {
      if (url.includes(URLs.companyRolesAppProvider)) {
        setCompanyRoles(companyRolesResponse.appProvider)
        setLinkArray(companyRolesResponse.appProvider.subNavigation)
        roles.push(3)
      } else if (url.includes(URLs.companyRolesServiceProvider)) {
        setCompanyRoles(companyRolesResponse.serviceProvider)
        setLinkArray(companyRolesResponse.serviceProvider.subNavigation)
        roles.push(2)
      } else if (url.includes(URLs.companyRolesConformityBody)) {
        setCompanyRoles(companyRolesResponse.conformity)
        setLinkArray(companyRolesResponse.conformity.subNavigation)
      } else if (url.includes(URLs.companyRolesOnboardingServiceProvider)) {
        setCompanyRoles(companyRolesResponse.ospProvider)
        setLinkArray(companyRolesResponse.ospProvider.subNavigation)
        roles.push(15)
      } else {
        setCompanyRoles(companyRolesResponse.participant)
        setLinkArray(companyRolesResponse.participant.subNavigation)
        roles.push(6)
      }
      setStdJson({
        ...standardLibraryResponse,
        rows: getFiltered(standardLibraryResponse, roles),
      })
    }
  }, [url, language, companyRolesResponse, standardLibraryResponse])

  const intersect = (a: number[], b: number[]) =>
    a.filter((value: number) => b.includes(value))

  const getFiltered = (std: StandardLibraryType, cr: number[]) =>
    std.rows.filter(
      (row: { roles: number[] }) => intersect(row.roles, cr).length > 0
    )

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
