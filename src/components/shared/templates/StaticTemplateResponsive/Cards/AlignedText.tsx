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

import { Typography } from '@catena-x/portal-shared-components'
import { subSectionsType } from '../StaticTypes'
import '../StaticTemplate.scss'
import { Trans } from 'react-i18next'

export default function AlignedText({
  provider,
  align,
}: {
  provider: subSectionsType
  align?: string
}) {
  const goTo = (link: { internal: boolean; id: string }) => {
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
    <div className={align === 'left' ? 'leftAligned' : 'rightAligned'}>
      <div>
        {provider.title && (
          <div className="title">
            <Typography variant={'h3'}>{provider.title}</Typography>
          </div>
        )}
        {provider.description && (
          <Typography className={'providerDescription padding-top-10'}>
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
                onClick={() => goTo(link)}
                key={link.title}
              >
                {link.title}
              </Typography>
            ))}
          </>
        )}
      </div>
    </div>
  )
}
