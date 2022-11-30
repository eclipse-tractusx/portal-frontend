/********************************************************************************
 * Copyright (c) 2021,2022 Mercedes-Benz Group AG and BMW Group AG
 * Copyright (c) 2021,2022 Contributors to the Eclipse Foundation
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
import StageSection from './components/StageSection'
import { useEffect, useState } from 'react'
import participant from './json/participant.json'
import serviceProvider from './json/serviceProvider.json'
import appProvider from './json/appProvider.json'
import confirmity from './json/confirmity.json'
import Section from './components/Section'
import { StageSubNavigation } from './components/StageSubNavigation'

export default function CompanyRoles() {
  const [messageContent, setMessageContent] = useState<any>({})
  const url = window.location.href
  useEffect(() => {
    if (url.indexOf('companyrolesappprovider') > 1) {
      setMessageContent(appProvider)
    } else if (url.indexOf('companyrolesserviceprovider') > 1) {
      setMessageContent(serviceProvider)
    } else if (url.indexOf('companyrolesconfirmitybody') > 1) {
      setMessageContent(confirmity)
    } else {
      setMessageContent(participant)
    }
  }, [url])

  return (
    <main className="companyRoles">
      <StageSection
        title={messageContent.title}
        description={messageContent.description}
      />
      <StageSubNavigation />
      <Section sectionInfo={messageContent.providers} />
    </main>
  )
}
