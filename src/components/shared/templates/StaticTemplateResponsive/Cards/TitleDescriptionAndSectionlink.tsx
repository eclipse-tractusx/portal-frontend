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

import {
  IconButton,
  Typography,
} from '@arena2036/portal-shared-components-construct-x'
import '../style.scss'
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward'
import { Trans } from 'react-i18next'
import type { ProviderProps, subSectionsType } from '../StaticTypes'

export default function TitleDescriptionAndSectionlink({
  scrollTop,
  showScroll,
  provider,
  defaultTitleVariation = true,
}: {
  scrollTop?: () => void
  showScroll?: boolean
  provider: ProviderProps | subSectionsType
  defaultTitleVariation?: boolean
}) {
  const navigateTo = (link: { internal: boolean; id: string }) => {
    if (link.internal) {
      const element = document.getElementById(link.id)
      const top = element && element.offsetTop - 200
      window.scrollTo({
        top: top ?? 0,
        behavior: 'smooth',
      })
    } else {
      window.open(link.id, '_blank')
    }
  }
  return (
    <>
      {provider.title !== '' && (
        <div className="titleWithIcon sideBySideTitle">
          {defaultTitleVariation ? (
            <>
              <Typography variant="h2">{provider.title}</Typography>
              {showScroll && (
                <IconButton onClick={scrollTop}>
                  <ArrowUpwardIcon />
                </IconButton>
              )}
            </>
          ) : (
            <Typography variant="h3">{provider.title}</Typography>
          )}
        </div>
      )}
      {provider.description !== '' && (
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
      )}
      {provider.sectionLink && (
        <>
          {provider.sectionLink.data.map((link) => (
            <Typography
              className={'highlightText'}
              onClick={() => {
                navigateTo(link)
              }}
              key={link.title}
            >
              {link.title}
            </Typography>
          ))}
        </>
      )}
    </>
  )
}
