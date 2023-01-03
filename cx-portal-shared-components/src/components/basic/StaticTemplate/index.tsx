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

import { ProviderProps } from './StaticTypes'
import TextImageSideBySide from './Cards/TextImageSideBySide'
import TextVideoSideBySide from './Cards/TextVideoSideBySide'
import TextImageCenterAligned from './Cards/TextImageCenterAligned'
import TextCenterAligned from './Cards/TextCenterAligned'
import CardGrid from './Cards/CardGrid'
import LinkButtonGrid from './Cards/LinkButtonGrid'
import { Box } from '@mui/material'
import VideoTextSideBySide from './Cards/VideoTextSideBySide'

const TemplateConfig = ({ provider }: { provider: ProviderProps }) => {
  switch (provider.template) {
    //Text in the left and image in the right side
    case 'TextImageSideBySide':
      return <TextImageSideBySide provider={provider} />
    //Text in the left and video in the right side
    case 'TextVideoSideBySide':
      return <TextVideoSideBySide provider={provider} />
    //video in the left and Text in the right side
    case 'VideoTextSideBySide':
      return <VideoTextSideBySide provider={provider} />
    //Text and image component both center aligned
    case 'TextImageCenterAligned':
      return <TextImageCenterAligned provider={provider} />
    //Text component center aligned
    case 'TextCenterAligned':
      return <TextCenterAligned provider={provider} />
    //Combination of Text and image component both center aligned with grid layout card component
    case 'TextImageCenterAlignedWithCardGrid':
      return (
        <>
          <TextImageCenterAligned provider={provider} />
          <CardGrid align="center" provider={provider} grid={provider.grid} />
        </>
      )
    //Combination of Text center aligned component with grid layout card component
    case 'TextCenterAlignedWithCardGrid':
      return (
        <>
          <TextCenterAligned provider={provider} />
          <CardGrid align="center" provider={provider} grid={provider.grid} />
        </>
      )
    //Combination of Text and image side by side with grid layout card component
    case 'TextImageSideBySideWithCardGrid':
      return (
        <>
          <TextImageSideBySide provider={provider} />
          <CardGrid provider={provider} grid={provider.grid} />
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
      return <TextImageSideBySide provider={provider} />
  }
}

export const StaticTemplate = ({ sectionInfo }: { sectionInfo: any }) => {
  return (
    <div>
      {sectionInfo &&
        sectionInfo.map((provider: ProviderProps) => {
          return (
            <Box
              sx={{
                padding: '0 180px',
                margin: 'auto',
                overflow: 'hidden',
                backgroundColor: provider.backgroundColor,
              }}
              key={provider.id}
              id={`${provider.id}`}
            >
              <Box
                sx={{
                  maxWidth: '1200px',
                  margin: 'auto',
                }}
              >
                <TemplateConfig provider={provider} />
              </Box>
            </Box>
          )
        })}
    </div>
  )
}
