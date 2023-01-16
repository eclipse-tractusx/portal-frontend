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
import { useEffect, useState } from 'react'
import StageSection from 'components/shared/templates/StageSection'
import { StageSubNavigation } from 'components/shared/templates/StageSubNavigation'
import { useTranslation } from 'react-i18next'
import { StaticTemplate } from 'cx-portal-shared-components'

export default function CompanyRoles() {
  const { t } = useTranslation('companyroles')
  const [messageContent, setMessageContent] = useState<string>()
  const url = window.location.href
  useEffect(() => {
    if (url.indexOf('companyrolesappprovider') > 1) {
      setMessageContent('appProvider')
    } else if (url.indexOf('companyrolesserviceprovider') > 1) {
      setMessageContent('serviceProvider')
    } else if (url.indexOf('companyrolesconfirmitybody') > 1) {
      setMessageContent('confirmity')
    } else {
      setMessageContent('participant')
    }
  }, [url, t])

  const linkArray = [
    {
      index: 1,
      title: t('subNavigation.link1Label'),
      navigation: 'provider-id',
    },
    {
      index: 2,
      title: t('subNavigation.link2Label'),
      navigation: 'operations-id',
    },
    {
      index: 3,
      title: t('subNavigation.link3Label'),
      navigation: 'participant-id',
    },
  ]

  return (
    <main className="companyRoles">
      {messageContent && (
        <>
          <StageSection
            title={t(`${messageContent}.title`)}
            description={t(`${messageContent}.description`)}
          />
          <StageSubNavigation linkArray={linkArray} />
          <StaticTemplate
            sectionInfo={t(`${messageContent}.sections`, {
              returnObjects: true,
            })}
          />
        </>
      )}
    </main>
  )
}
