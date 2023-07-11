/********************************************************************************
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

import { ProviderProps } from '../StaticTypes'
import RenderImage from './RenderImage'
import '../StaticTemplate.scss'
import AlignedText from './AlignedText'
import { IconButton, Typography } from '@catena-x/portal-shared-components'
import { Trans } from 'react-i18next'
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward'

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
  const navigate = (link: { internal: boolean; id: string }) => {
    if (link.internal) {
      const element = document.getElementById(link.id)
      const top = element?.offsetTop
      window.scrollTo({
        top: top,
        behavior: 'smooth',
      })
    } else {
      window.open(link.id, '_blank')
    }
  }

  return (
    <div className="imageVideoTextSideBySideWithSections">
      <div className={'imageVideoTextSideBySide padding-bottom-20'}>
        <div
          className={'titleDescriptionBody'}
          style={{
            width: !provider.imagePath ? '100%' : '50%',
          }}
        >
          <div className="titleWithIcon sideBySideTitle">
            <Typography variant="h2">{provider.title}</Typography>
            {showScroll && (
              <IconButton onClick={scrollTop}>
                <ArrowUpwardIcon />
              </IconButton>
            )}
          </div>
          <Typography className={'providerDescription'}>
            <Trans
              key={provider.description}
              i18nKey={provider.description}
              components={[
                <span key={provider.description}></span>,
                <br key={provider.description} />,
              ]}
            ></Trans>
          </Typography>
          {provider.sectionLink && (
            <>
              {provider.sectionLink.data.map((link) => (
                <Typography
                  className={'highlightText'}
                  onClick={() => navigate(link)}
                  key={link.title}
                >
                  {link.title}
                </Typography>
              ))}
            </>
          )}
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
              {provider.subDescriptions.sections &&
                provider.subDescriptions.sections.map(
                  (section: { title: string; link: string; value: string }) => (
                    <>
                      <Typography>
                        <Trans
                          key={section.title}
                          i18nKey={section.title}
                          components={[
                            <span key={section.title}></span>,
                            <br key={section.title} />,
                            <p
                              key={section.title}
                              className="padding-left-30"
                            ></p>,
                          ]}
                        ></Trans>
                      </Typography>
                      <Typography
                        className={'padding-left-30 highlightText'}
                        onClick={() => window.open(section.link, '_blank')}
                        key={section.value}
                      >
                        {section.value}
                      </Typography>
                    </>
                  )
                )}
            </>
          )}
        </div>
        {provider.imagePath !== '' && (
          <RenderImage
            url={baseUrl + provider.imagePath || ''}
            additionalStyles={{
              textAlign: 'center',
            }}
            width="490px"
          />
        )}
      </div>
      {provider.subsections && (
        <>
          {provider.subsections.map((section) => (
            <AlignedText provider={section} align="left" />
          ))}
        </>
      )}
    </div>
  )
}
