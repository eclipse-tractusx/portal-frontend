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

import './UseCase.scss'
import { useEffect, useState } from 'react'
import traceablity from './json/traceablity.json'
import StageSection from 'components/shared/templates/StageSection'
import { StageSubNavigation } from 'components/shared/templates/StageSubNavigation'
import Section from 'components/shared/templates/Section'
import { useTranslation } from 'react-i18next'

export default function UseCase() {
  const { t } = useTranslation()
  const [messageContent, setMessageContent] = useState<any>({})
  const url = window.location.href
  useEffect(() => {
    if (url.indexOf('usecasetraceablity') > 1) {
      setMessageContent(traceablity)
    } else {
      setMessageContent(traceablity)
    }
  }, [url])

  const linkArray = [
    {
      index: 1,
      title: t('navigation.useCaseNavigation.link1Label'),
      navigation: 'intro-id',
    },
    {
      index: 2,
      title: t('navigation.useCaseNavigation.link2Label'),
      navigation: 'data-id',
    },
    {
      index: 3,
      title: t('navigation.useCaseNavigation.link3Label'),
      navigation: 'business-id',
    },
  ]

  return (
    <main className="useCase">
      <StageSection
        title={messageContent.title}
        description={messageContent.description}
      />
      <StageSubNavigation linkArray={linkArray} />
      <Section sectionInfo={messageContent.roles} />
    </main>
  )
}
