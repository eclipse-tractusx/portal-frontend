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

import './UseCase.scss'
import StageSection from 'components/shared/templates/StageSection'
import { StageSubNavigation } from 'components/shared/templates/StageSubNavigation'
import { useEffect, useState } from 'react'
import CommonService from 'services/CommonService'
import { getAssetBase } from 'services/EnvironmentService'
import { StaticTemplateResponsive } from 'components/shared/templates/StaticTemplateResponsive'

export default function UseCase() {
  const [useCase, setUseCase] = useState<any>()
  const [linkArray, setLinkArray] = useState<any>()

  useEffect(() => {
    CommonService.getUseCases((data: any) => {
      setUseCase(data)
      setLinkArray([
        {
          index: 1,
          title: data.subNavigation.link1Label,
          navigation: 'intro-id',
        },
        {
          index: 2,
          title: data.subNavigation.link2Label,
          navigation: 'core-id',
        },
        {
          index: 3,
          title: data.subNavigation.link3Label,
          navigation: 'details-id',
        },
        {
          index: 4,
          title: data.subNavigation.link4Label,
          navigation: 'business-id',
        },
      ])
    })
  }, [])

  return (
    <main className="useCase">
      {useCase && linkArray && (
        <>
          <StageSection
            title={useCase.traceability.title}
            description={useCase.traceability.description}
          />
          <StageSubNavigation linkArray={linkArray} />
          <StaticTemplateResponsive
            sectionInfo={useCase.traceability.sections}
            baseUrl={getAssetBase()}
          />
        </>
      )}
    </main>
  )
}
