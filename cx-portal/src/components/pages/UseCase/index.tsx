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
import StageSection from 'components/shared/templates/StageSection'
import { StageSubNavigation } from 'components/shared/templates/StageSubNavigation'
import { useTranslation } from 'react-i18next'
import { StaticTemplate } from 'cx-portal-shared-components'

export default function UseCase() {
  const { t } = useTranslation('usecase')
  const linkArray = [
    {
      index: 1,
      title: t('subNavigation.link1Label'),
      navigation: 'intro-id',
    },
    {
      index: 2,
      title: t('subNavigation.link2Label'),
      navigation: 'data-id',
    },
    {
      index: 3,
      title: t('subNavigation.link3Label'),
      navigation: 'business-id',
    },
  ]

  return (
    <main className="useCase">
      <StageSection
        title={t('traceability.title')}
        description={t('traceability.description')}
      />
      <StageSubNavigation linkArray={linkArray} />
      <StaticTemplate
        sectionInfo={t('traceability.sections', { returnObjects: true })}
      />
    </main>
  )
}
