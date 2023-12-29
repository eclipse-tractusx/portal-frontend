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

interface CardType {
  title: string
  subtitle: string
  signature: string
  date: string
}

export default function RuleCard(): JSX.Element {
  const ruleCards: CardType[] = [
    {
      title: 'Rule Book',
      subtitle: 'Use Case',
      signature: 'Signed by: You',
      date: 'dd.mm.yyyy',
    },
    {
      title: 'Rule Book',
      subtitle: 'Use Case',
      signature: 'Signed by: You',
      date: 'dd.mm.yyyy',
    },
  ]
  return (
    <div className="rulecard">
      <Typography
        sx={{
          color: '#111111',
          marginBottom: '30px',
          textAlign: 'left',
          marginLeft: '20px',
        }}
        variant="h4"
      >
        Rulebooks
      </Typography>
      <div className="main-rule-card-container">
        {ruleCards?.map((card: CardType) => (
          <div className="rule-card-container">
            <Typography
              className='text'
              variant="body2"
            >
              {card.title}
            </Typography>
            <Typography
              className='text'
              variant="h4"
            >
              {card.subtitle}
            </Typography>
            <div>
              <Typography
                className='text'
                variant="body3"
              >
                {card.signature}
              </Typography>
              <Typography
                className='text'
                variant="body3"
              >
                {card.date}
              </Typography>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
