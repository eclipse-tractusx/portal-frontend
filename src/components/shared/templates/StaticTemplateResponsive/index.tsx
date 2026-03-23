/********************************************************************************
 * Copyright (c) 2023 Mercedes-Benz Group AG and BMW Group AG
 * Copyright (c) 2023 Contributors to the Eclipse Foundation
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

import { type ProviderProps, TemplateNames } from './StaticTypes'
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
import FlexImages from './Cards/FlexImages'
import GridImages from './Cards/GridImages'
import { useState } from 'react'
import { useMediaQuery, useTheme } from '@mui/material'
import TextImageSideBySideWithSections from './Cards/TextImageSideBySideWithSections'
import { Table } from '@arena2036/portal-shared-components-construct-x'
import { uniqueId } from 'lodash'
import TitleDescriptionAndSectionlink from './Cards/TitleDescriptionAndSectionlink'
import { StandardLibrariesTableColumns } from './Cards/StandardLibrariesTableColumns'
import { type StandardLibraryType } from 'features/staticContent/staticContentApiSlice'

const TemplateConfig = ({
  provider,
  baseUrl,
  scrollTop,
  showScroll,
}: {
  provider: ProviderProps
  baseUrl: string
  scrollTop: () => void
  showScroll: boolean
}) => {
  switch (provider.template) {
    //Text in the left and video in the right side
    case TemplateNames.TextVideoSideBySide:
      return (
        <TextVideoSideBySide
          provider={provider}
          scrollTop={scrollTop}
          showScroll={showScroll}
        />
      )
    //video in the left and Text in the right side
    case TemplateNames.VideoTextSideBySide:
      return (
        <VideoTextSideBySide
          provider={provider}
          scrollTop={scrollTop}
          showScroll={showScroll}
        />
      )
    //Text and image component both center aligned
    case TemplateNames.TextImageCenterAligned:
      return (
        <TextImageCenterAligned
          baseUrl={baseUrl}
          provider={provider}
          scrollTop={scrollTop}
          showScroll={showScroll}
        />
      )
    //Image and text component both center aligned
    case TemplateNames.ImageTextCenterAligned:
      return (
        <ImageTextCenterAligned
          baseUrl={baseUrl}
          provider={provider}
          scrollTop={scrollTop}
          showScroll={showScroll}
        />
      )
    //Text component center aligned
    case TemplateNames.TextCenterAligned:
      return (
        <TextCenterAligned
          provider={provider}
          scrollTop={scrollTop}
          showScroll={showScroll}
        />
      )
    //Text component body2
    case TemplateNames.TextCenterAlignedBody2:
      return (
        <TextCenterAlignedBody2
          provider={provider}
          scrollTop={scrollTop}
          showScroll={showScroll}
        />
      )
    //Combination of Text and image component both center aligned with grid layout card component
    case TemplateNames.TextImageCenterAlignedWithCardGrid:
      return (
        <>
          <TextImageCenterAligned
            baseUrl={baseUrl}
            provider={provider}
            scrollTop={scrollTop}
            showScroll={showScroll}
          />
          <CardGrid
            baseUrl={baseUrl}
            align="center"
            provider={provider}
            grid={provider.grid}
          />
        </>
      )
    //Combination of Text center aligned component with grid layout card component
    case TemplateNames.TextCenterAlignedWithCardGrid:
      return (
        <>
          <TextCenterAligned
            provider={provider}
            scrollTop={scrollTop}
            showScroll={showScroll}
          />
          <CardGrid
            align="center"
            baseUrl={baseUrl}
            provider={provider}
            grid={provider.grid}
          />
        </>
      )
    //Combination of Text and image side by side with grid layout card component
    case TemplateNames.TextImageSideBySideWithCardGrid:
      return (
        <>
          <TextImageSideBySide
            baseUrl={baseUrl}
            provider={provider}
            scrollTop={scrollTop}
            showScroll={showScroll}
          />
          <CardGrid
            baseUrl={baseUrl}
            provider={provider}
            grid={provider.grid}
          />
        </>
      )
    //Combination of Text center aligned component with grid layout link component
    case TemplateNames.TextCenterAlignedWithLinkButtonGrid:
      return (
        <>
          <TextCenterAligned
            provider={provider}
            scrollTop={scrollTop}
            showScroll={showScroll}
          />
          <LinkButtonGrid provider={provider} />
        </>
      )
    //Combination of Text center aligned component with images in a row
    case TemplateNames.TextCenterAlignedWithImagesInFlex:
      return (
        <>
          <TextCenterAligned
            provider={provider}
            scrollTop={scrollTop}
            showScroll={showScroll}
          />
          <FlexImages provider={provider} baseUrl={baseUrl} />
        </>
      )
    //Combination of Text center aligned component with images in grid fashion
    case TemplateNames.TextCenterAlignedWithImagesInGrid:
      return (
        <>
          <TextCenterAligned
            provider={provider}
            scrollTop={scrollTop}
            showScroll={showScroll}
          />
          <GridImages
            provider={provider}
            baseUrl={baseUrl}
            grid={provider.grid}
          />
        </>
      )
    //Grid layout link component
    case TemplateNames.LinkButtonGrid:
      return (
        <>
          <LinkButtonGrid provider={provider} />
        </>
      )
    //Text in the left and image in the right side with sub sections
    case TemplateNames.TextImageSideBySideWithSections:
      return (
        <TextImageSideBySideWithSections
          baseUrl={baseUrl}
          provider={provider}
          scrollTop={scrollTop}
          showScroll={showScroll}
        />
      )
    default:
      //Text in the left and image in the right side
      return (
        <TextImageSideBySide
          baseUrl={baseUrl}
          provider={provider}
          scrollTop={scrollTop}
          showScroll={showScroll}
        />
      )
  }
}

export const StaticTemplateResponsive = ({
  sectionInfo,
  baseUrl,
  stdLibraries,
}: {
  sectionInfo: ProviderProps[]
  baseUrl: string
  stdLibraries?: StandardLibraryType
}) => {
  const [showScroll, setShowScroll] = useState(false)
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'), {
    defaultMatches: true,
  })

  const columns = stdLibraries && StandardLibrariesTableColumns(stdLibraries)

  enum PageOffsetValue {
    MOBILE = 100,
    DEFAULT = 400,
  }

  const getValue = () =>
    isMobile ? PageOffsetValue.MOBILE : PageOffsetValue.DEFAULT

  const checkScrollTop = () => {
    if (!showScroll && window.scrollY > getValue()) {
      setShowScroll(true)
    } else if (showScroll && window.scrollY <= getValue()) {
      setShowScroll(false)
    }
  }

  const scrollTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  window.addEventListener('scroll', checkScrollTop)
  return (
    <div>
      {sectionInfo?.map((provider: ProviderProps, i: number) => {
        return (
          <div
            className="sectionContainer"
            style={{
              backgroundColor: provider.backgroundColor,
            }}
            key={`${provider.id}-${i}`}
            id={`${provider.id}`}
          >
            <div className="sectionSubContainer">
              {provider.id !== 'std-libraries-id' ? (
                <TemplateConfig
                  provider={provider}
                  baseUrl={baseUrl}
                  scrollTop={scrollTop}
                  showScroll={showScroll}
                />
              ) : (
                <div className="table-compo">
                  <TitleDescriptionAndSectionlink
                    showScroll={showScroll}
                    provider={provider}
                    scrollTop={scrollTop}
                  />
                  {stdLibraries && (
                    <Table
                      rowsCount={2}
                      hideFooter
                      loading={false}
                      disableRowSelectionOnClick={true}
                      disableColumnFilter={false}
                      disableColumnMenu={false}
                      disableColumnSelector={false}
                      disableDensitySelector={false}
                      columnHeadersBackgroundColor={'#ecf0f4'}
                      title={''}
                      searchPlaceholder={''}
                      toolbarVariant="ultimate"
                      columns={columns ?? []}
                      rows={stdLibraries.rows}
                      getRowId={(row) => uniqueId(row.uid)}
                      hasBorder={false}
                    />
                  )}
                </div>
              )}
            </div>
          </div>
        )
      })}
    </div>
  )
}
