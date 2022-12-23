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

import { ProviderProps } from 'types/StaticTemplate'
import CardGrid from '../Cards/CardGrid'
import LinkButtonGrid from '../Cards/LinkButtonGrid'
import TextCenterAligned from '../Cards/TextCenterAligned'
import TextImageCenterAligned from '../Cards/TextImageCenterAligned'
import TextImageSideBySide from '../Cards/TextImageSideBySide'
import TextVideoSideBySide from '../Cards/TextVideoSideBySide'
import '../StaticTemplate.scss'

const TemplateConfig = ({ provider }: { provider: ProviderProps }) => {
  switch (provider.template) {
    case 'TextImageSideBySide':
      return <TextImageSideBySide provider={provider} />
    case 'TextVideoSideBySide':
      return <TextVideoSideBySide provider={provider} />
    case 'TextImageCenterAligned':
      return <TextImageCenterAligned provider={provider} />
    case 'TextCenterAligned':
      return <TextCenterAligned provider={provider} />
    case 'TextImageCenterAlignedWithCardGrid':
      return (
        <>
          <TextImageCenterAligned provider={provider} />
          <CardGrid align="center" provider={provider} grid={provider.grid} />
        </>
      )
    case 'TextCenterAlignedWithCardGrid':
      return (
        <>
          <TextCenterAligned provider={provider} />
          <CardGrid align="center" provider={provider} grid={provider.grid} />
        </>
      )
    case 'TextImageSideBySideWithCardGrid':
      return (
        <>
          <TextImageSideBySide provider={provider} />
          <CardGrid provider={provider} grid={provider.grid} />
        </>
      )
    case 'TextCenterAlignedWithLinkButtonGrid':
      return (
        <>
          <TextCenterAligned provider={provider} />
          <LinkButtonGrid provider={provider} grid={provider.grid} />
        </>
      )
    default:
      return <TextImageSideBySide provider={provider} />
  }
}

export default function Section({ sectionInfo }: { sectionInfo: any }) {
  return (
    <div>
      {sectionInfo &&
        sectionInfo.map((provider: ProviderProps) => {
          return (
            <div
              className="mainContainer"
              key={provider.id}
              id={`${provider.id}`}
              style={{
                backgroundColor: provider.backgroundColor,
              }}
            >
              <div className="subContainer">
                <TemplateConfig provider={provider} />
              </div>
            </div>
          )
        })}
    </div>
  )
}
