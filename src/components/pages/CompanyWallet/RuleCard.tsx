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
import './CompanyWallet.scss'
import { type WalletContent } from 'features/compayWallet/companyWalletApiSlice'
import dayjs from 'dayjs'

type Hash<T> = Record<string, T>;

export default function RuleCard({
  sections,
}: {
  sections: Hash<WalletContent[]>
}): JSX.Element {
  const keys = Object.keys(sections)
  return (
    <>
      {keys.map((key) => (
        <div key={key} className="rulecard">
          <Typography
            sx={{
              color: '#111111',
              marginBottom: '30px',
              textAlign: 'left',
              marginLeft: '20px',
            }}
            variant="h4"
          >
            {key}
          </Typography>
          <div className="main-rule-card-container">
            {sections[key]?.map((card: WalletContent) => (
              <div key={card.id} className="rule-card-container">
                <Typography className="text" variant="body2">
                  {card?.credentialSubject[0].status ?? 'Inactive'}
                </Typography>
                <Typography className="text" variant="h4">
                  {card.issuer?.split('.net:')[1]}
                </Typography>
                <div>
                  <Typography className="text" variant="body3">
                    {card?.credentialSubject[0].type}
                  </Typography>
                  <Typography className="text" variant="body3">
                    {dayjs(card.expirationDate).format('YYYY-MM-DD')}
                  </Typography>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </>
  )
}
