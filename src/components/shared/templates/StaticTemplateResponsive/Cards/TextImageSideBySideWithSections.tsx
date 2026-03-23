/********************************************************************************
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

import type { CardDetailsProps, ProviderProps } from '../StaticTypes'
import RenderImage from './RenderImage'
import '../style.scss'
import AlignedText from './AlignedText'
import { Typography } from '@arena2036/portal-shared-components-construct-x'
import { Trans } from 'react-i18next'
import TitleDescriptionAndSectionlink from './TitleDescriptionAndSectionlink'
import { Box, useMediaQuery, useTheme } from '@mui/material'
import CardWithoutImage from './CardWithoutImage'

export default function TextImageSideBySideWithSections({
  provider,
  baseUrl,
  scrollTop,
  showScroll,
}: {
  provider: ProviderProps
  baseUrl: string
  scrollTop: () => void
  showScroll: boolean
}) {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'), {
    defaultMatches: true,
  })
  return (
    <div className="imageVideoTextSideBySideWithSections">
      <div className={'imageVideoTextSideBySide padding-bottom-20'}>
        <div
          className={'titleDescriptionBody'}
          style={{
            width: !provider.imagePath || isMobile ? '100%' : '50%',
          }}
        >
          <TitleDescriptionAndSectionlink
            showScroll={showScroll}
            provider={provider}
            scrollTop={scrollTop}
          />
          {provider.detailsWithoutImageRow1 && (
            <Box
              className={'gridStyle'}
              sx={{
                marginBottom: '0px',
                gridTemplateColumns: 'repeat(3, 1fr)',
                width: '100% !important',
                marginTop: !provider.sectionLink ? '0px' : '40px',
              }}
            >
              {provider.detailsWithoutImageRow1.map(
                (card: CardDetailsProps) => {
                  return (
                    <CardWithoutImage key={card.title} detail={card} grid={3} />
                  )
                }
              )}
            </Box>
          )}
        </div>
        {provider.imagePath !== '' && (
          <RenderImage
            url={baseUrl + provider.imagePath || ''}
            additionalStyles={{
              textAlign: 'center',
            }}
            width="50%"
          />
        )}
      </div>
      <div
        style={{
          margin: isMobile ? '0px 0px 0px 20px' : '-20px 0px 0px 70px',
        }}
      >
        {provider.subDescriptions && (
          <>
            <Typography className={'providerDescription'}>
              <Trans
                key={provider.subDescriptions.title}
                i18nKey={provider.subDescriptions.title}
                components={[
                  <span key={provider.subDescriptions.title}></span>,
                  <br key={provider.subDescriptions.title} />,
                  <p
                    key={provider.subDescriptions.title}
                    className="padding-left-30"
                  ></p>,
                ]}
              ></Trans>
            </Typography>
            {provider?.subDescriptions?.sections?.length > 0 &&
              provider?.subDescriptions?.sections.map(
                (section: { title: string; link: string; value: string }) => (
                  <div key={section.title}>
                    <Typography>
                      <Trans
                        key={section.title}
                        i18nKey={section.title}
                        components={[
                          <span key={section.title}></span>,
                          <br key={section.title} />,
                          <span
                            key={section.title}
                            className="subDescription"
                          ></span>,
                        ]}
                      ></Trans>
                    </Typography>
                    <Typography
                      className={
                        'padding-left-30 highlightText padding-bottom-20'
                      }
                      onClick={() => window.open(section.link, '_blank')}
                      key={section.value}
                    >
                      {section.value}
                    </Typography>
                  </div>
                )
              )}
          </>
        )}
      </div>
      {provider.subsections && (
        <>
          {provider.subsections.map((section) => (
            <AlignedText key={section.title} provider={section} align="left" />
          ))}
        </>
      )}
    </div>
  )
}
