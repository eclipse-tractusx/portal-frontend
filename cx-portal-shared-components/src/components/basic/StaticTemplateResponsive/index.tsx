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

import { ProviderProps } from './StaticTypes'
import TextImageSideBySide from './Cards/TextImageSideBySide'
import TextVideoSideBySide from './Cards/TextVideoSideBySide'
import TextImageCenterAligned from './Cards/TextImageCenterAligned'
import TextCenterAligned from './Cards/TextCenterAligned'
import CardGrid from './Cards/CardGrid'
import LinkButtonGrid from './Cards/LinkButtonGrid'
import VideoTextSideBySide from './Cards/VideoTextSideBySide'
import ImageTextCenterAligned from './Cards/ImageTextCenterAligned'
import TextCenterAlignedBody2 from './Cards/TextCenterAlignedBody2'
import './style.scss'

const TemplateConfig = ({
  provider,
  baseUrl,
}: {
  provider: ProviderProps
  baseUrl: string
}) => {
  switch (provider.template) {
    //Text in the left and image in the right side
    case 'TextImageSideBySide':
      return <TextImageSideBySide baseUrl={baseUrl} provider={provider} />
    //Text in the left and video in the right side
    case 'TextVideoSideBySide':
      return <TextVideoSideBySide provider={provider} />
    //video in the left and Text in the right side
    case 'VideoTextSideBySide':
      return <VideoTextSideBySide provider={provider} />
    //Text and image component both center aligned
    case 'TextImageCenterAligned':
      return <TextImageCenterAligned baseUrl={baseUrl} provider={provider} />
    //Image and text component both center aligned
    case 'ImageTextCenterAligned':
      return <ImageTextCenterAligned baseUrl={baseUrl} provider={provider} />
    //Text component center aligned
    case 'TextCenterAligned':
      return <TextCenterAligned provider={provider} />
    //Text component body2
    case 'TextCenterAlignedBody2':
      return <TextCenterAlignedBody2 provider={provider} />
    //Combination of Text and image component both center aligned with grid layout card component
    case 'TextImageCenterAlignedWithCardGrid':
      return (
        <>
          <TextImageCenterAligned baseUrl={baseUrl} provider={provider} />
          <CardGrid
            baseUrl={baseUrl}
            align="center"
            provider={provider}
            grid={provider.grid}
          />
        </>
      )
    //Combination of Text center aligned component with grid layout card component
    case 'TextCenterAlignedWithCardGrid':
      return (
        <>
          <TextCenterAligned provider={provider} />
          <CardGrid
            align="center"
            baseUrl={baseUrl}
            provider={provider}
            grid={provider.grid}
          />
        </>
      )
    //Combination of Text and image side by side with grid layout card component
    case 'TextImageSideBySideWithCardGrid':
      return (
        <>
          <TextImageSideBySide baseUrl={baseUrl} provider={provider} />
          <CardGrid
            baseUrl={baseUrl}
            provider={provider}
            grid={provider.grid}
          />
        </>
      )
    //Combination of Text center aligned component with grid layout link component
    case 'TextCenterAlignedWithLinkButtonGrid':
      return (
        <>
          <TextCenterAligned provider={provider} />
          <LinkButtonGrid provider={provider} grid={provider.grid} />
        </>
      )
    default:
      return <TextImageSideBySide baseUrl={baseUrl} provider={provider} />
  }
}

export const StaticTemplateResponsive = ({
  sectionInfo,
  baseUrl,
}: {
  sectionInfo: any
  baseUrl: string
}) => {
  return (
    <div>
      {sectionInfo &&
        sectionInfo.map((provider: ProviderProps) => {
          return (
            <div
              className="sectionContainer"
              style={{
                backgroundColor: provider.backgroundColor,
              }}
              key={provider.id}
              id={`${provider.id}`}
            >
              <div className="sectionSubContainer">
                <TemplateConfig provider={provider} baseUrl={baseUrl} />
              </div>
            </div>
          )
        })}
    </div>
  )
}
