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
import CommonService, {
  type SubNavigationType,
  type CompanyRolesType,
  type CompanyType,
  type StandardLibraryType,
} from 'services/CommonService'
import { getAssetBase } from 'services/EnvironmentService'
import { StaticTemplateResponsive } from 'components/shared/templates/StaticTemplateResponsive'
import { useSelector } from 'react-redux'
import { languageSelector } from 'features/language/slice'

export default function CompanyRoles() {
  const [companyRoles, setCompanyRoles] = useState<CompanyType>()
  const [stdJson, setStdJson] = useState<StandardLibraryType>()
  const [linkArray, setLinkArray] = useState<SubNavigationType[]>()
  const url = window.location.href
  const language = useSelector(languageSelector)
  const [topReached, setTopReached] = useState<boolean>(false)

  useEffect(() => {
    CommonService.getCompanyRoles((data: CompanyRolesType) => {
      if (url.indexOf('companyrolesappprovider') > 1) {
        setCompanyRoles(data.appProvider)
        setLinkArray(data.appProvider.subNavigation)
      } else if (url.indexOf('companyrolesserviceprovider') > 1) {
        setCompanyRoles(data.serviceProvider)
        setLinkArray(data.serviceProvider.subNavigation)
      } else if (url.indexOf('companyrolesconformitybody') > 1) {
        setCompanyRoles(data.conformity)
        setLinkArray(data.conformity.subNavigation)
      } else if (url.indexOf('companyrolesonboardingserviceprovider') > 1) {
        setCompanyRoles(data.ospProvider)
        setLinkArray(data.ospProvider.subNavigation)
      } else {
        setCompanyRoles(data.participant)
        setLinkArray(data.participant.subNavigation)
      }
    })
    CommonService.StandardLibraryResponse((data: StandardLibraryType) => {
      setStdJson(data)
    })
  }, [url, language])

  const scrollStarted = () => {
    setTopReached(window.scrollY > 500)
  }

  window.addEventListener('scroll', scrollStarted)

  return (
    <main className="companyRoles">
      {companyRoles && linkArray && (
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
