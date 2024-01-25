/********************************************************************************
 * Copyright (c) 2021, 2024 Contributors to the Eclipse Foundation
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
import { useTranslation } from 'react-i18next'
import { Grid } from '@mui/material'

type Hash<T> = Record<string, T>

export default function RuleCard({
  sections,
}: {
  readonly sections: Hash<WalletContent[]>
}): JSX.Element {
  const { t } = useTranslation()
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
              marginLeft: '0px',
            }}
            variant="h4"
          >
            {key === 'false' ? 'Others' : key}
          </Typography>
          <Grid
            container
            spacing={4}
            sx={{
              paddingLeft: '0px',
            }}
          >
            {sections[key]?.map((item: WalletContent) => (
              <Grid
                item
                xs={6}
                sm={6}
                md={6}
                className="main-rule-card-container"
                key={item.id}
                sx={{
                  paddingLeft: '20px !important',
                }}
              >
                <div key={item.id} className="rule-card-container">
                  <Typography className="text" variant="body2">
                    {item?.credentialSubject[0].status ?? 'Inactive'}
                  </Typography>
                  <Typography className="text" variant="h4">
                    {item?.credentialSubject[0].type}
                  </Typography>
                  <div>
                    <Typography className="text" variant="body3">
                      {item.issuer?.split('.net:')[1]}
                    </Typography>
                    <Typography className="text" variant="body3">
                      {t('content.companyWallet.expiry')}
                      {dayjs(item.expirationDate).format('YYYY-MM-DD')}
                    </Typography>
                  </div>
                </div>
              </Grid>
            ))}
          </Grid>
        </div>
      ))}
    </>
  )
}
