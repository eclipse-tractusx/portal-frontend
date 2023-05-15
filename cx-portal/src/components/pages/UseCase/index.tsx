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
import { useSelector } from 'react-redux'
import { languageSelector } from 'features/language/slice'

export default function UseCase() {
  const [useCase, setUseCase] = useState<any>()
  const [linkArray, setLinkArray] = useState<any>()
  const [isTop, setIsTop] = useState<boolean>(false)
  const language = useSelector(languageSelector)

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
  }, [language])

  const onScroll = () => {
    setIsTop(window.scrollY > 500)
  }

  const json = {
    subNavigation: {
      link1Label: 'Intro',
      link2Label: 'Core Values',
      link3Label: 'Details',
      link4Label: 'Business Applications',
    },
    traceability: {
      title: 'Traceability',
      description:
        '...as basis for building digital data chains and enabling data chain-focused use cases',
      sections: [
        {
          title: 'Details to the data exchange',
          description: '',
          imagePath: '/images/content/traceability_dataexchange(en).png',
          backgroundColor: '#F9F9F9',
          id: 'details2-id',
          template: 'TextImageCenterAligned',
        },
        {
          title: '',
          subTitles: [
            "In this example, an “SME” produces components that have a part number (PRT-12345) and the batch (XX1235509). After manufacturing the parts, the SME creates a UUID for the produced batch via App A and automatically registers it in the Digital Twin Registry as a digital twin. The <strong className='tooltip'>“Batch”<0>Each traceable object is mapped via a digital twin and registered in the “Digital Twin Registry</0></strong> aspect model is used for this purpose. On the digital level, a contract is concluded via the SME and the customer's EDC connectors to exchange this data. The physical components (e.g. sensors) are then sent to the 'customer'.<br /><br />",
            "The 'customer' is the manufacturer of an assembly. He creates a UUID for his manufactured serialized item (item number 5A52429 and serial number 21B294301268) via App B and registers it as a digital twin using the 'SerialPartTypization' aspect model. The assembly relationship with the supplier's batch is established using the 'AssemblyPartRelation' aspect model. He scans the components of the 'SME' and the identified data is linked to the digital twin of its serialized component. On the digital level, a contract is concluded via the EDC connectors of the 'customer' and the 'OEM' to exchange this data. The physical component (e.g. transmission) is then sent to the 'OEM'.<br /><br />",
            "During the assembly process, the OEM scans the parts to link the vehicle (VIN/VAN = Vehicle Identification Number) to the serialized part. The OEM can then find the digital twin of the component with the information about the serial number and item number and thus read out the digital twin via the UUID. He then creates a UUID for his manufactured vehicle and registers it in the Digital Twin Registry as a digital twin and establishes the assembly relationship with the installed part of the 'customer' using the 'AssemblyPartRelation' aspect model.<br /><br />",
          ],
          id: 'details3-id',
          backgroundColor: '#f9f9f9',
          template: 'TextCenterAlignedBody2',
        },
      ],
    },
  }

  window.addEventListener('scroll', onScroll)

  return (
    <main className="useCase">
      {useCase && linkArray && (
        <>
          <StageSection
            title={useCase.traceability.title}
            description={useCase.traceability.description}
          />
          <StageSubNavigation fixHeader={isTop} linkArray={linkArray} />
          <StaticTemplateResponsive
            sectionInfo={json.traceability.sections}
            baseUrl={getAssetBase()}
          />
        </>
      )}
    </main>
  )
}
