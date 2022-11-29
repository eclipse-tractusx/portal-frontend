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

import { Typography } from 'cx-portal-shared-components'
import '../../CompanyRoles.scss'
import { CardDetailsProps, ProviderProps } from '../../types'
import CardWithImage from '../Cards/CardWithImage'
import CardWithoutImage from '../Cards/CardWithoutImage'

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
                <div className="topFlexContainer">
                  <div>
                    <Typography variant="h2">{provider.title}</Typography>
                    <Typography
                      sx={{
                        paddingTop: '34px',
                      }}
                      variant="body1"
                    >
                      {provider.description}
                    </Typography>
                  </div>
                  <img
                    src={provider.imageUrl}
                    width="482"
                    alt={'alt tag info'}
                  />
                </div>
                <div className="cardGridContainer">
                  {provider.detailsWithImage &&
                    provider.detailsWithImage.map((card: CardDetailsProps) => {
                      return <CardWithImage detail={card} />
                    })}
                </div>
                <div className="cardGridContainer">
                  {provider.detailsWithoutImage &&
                    provider.detailsWithoutImage.map(
                      (card: CardDetailsProps) => {
                        return <CardWithoutImage detail={card} />
                      }
                    )}
                </div>
              </div>
            </div>
          )
        })}
    </div>
  )
}
