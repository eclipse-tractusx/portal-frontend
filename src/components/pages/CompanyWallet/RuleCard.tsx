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
import { Box, Grid } from '@mui/material'
import smallLogo from '../../../assets/logo/logo_tractus-x.svg'

type Hash<T> = Record<string, T>

enum StatusType {
  ACTIVE = 'Active',
  INACTIVE = 'Inactive',
}

export default function RuleCard({
  sections,
}: {
  readonly sections: Hash<WalletContent[]>
}): JSX.Element {
  const { t } = useTranslation()
  const keys = Object.keys(sections)
  const getBgColor = (item: WalletContent) => {
    if (item?.credentialSubject[0].status === StatusType.ACTIVE) {
      return '#004F4B'
    } else if (item?.credentialSubject[0].status === StatusType.INACTIVE) {
      return '#FFA600'
    } else {
      return '#F0F5D5'
    }
  }

  return (
    <>
      {keys.map((key) => (
        <div key={key} className="rulecard">
          <Typography
            sx={{
              color: '#111111',
              marginBottom: '0px',
              textAlign: 'left',
              marginLeft: '0px',
              marginTop: '10px',
            }}
            variant="h4"
          >
            {key === 'false' ? 'Others' : key}
          </Typography>
          <Grid
            container
            spacing={2}
            sx={{
              paddingLeft: '0px',
            }}
            className="grid-layout"
          >
            {sections[key]?.map((item: WalletContent) => (
              <Grid
                item
                xs={4}
                sm={4}
                md={4}
                className="main-rule-card-container"
                key={item.id}
                sx={{
                  paddingLeft: '20px !important',
                }}
              >
                <Box className="dumm">
                  <Box key={item.id} className="rule-card-container">
                    <Box className="circle-container">
                      <Typography
                        sx={{
                          color: item?.credentialSubject[0].status
                            ? '#fff !important'
                            : '#428C5B !important',
                          backgroundColor: getBgColor(item),
                        }}
                        className="text"
                        variant="body2"
                      >
                        {item?.credentialSubject[0].status ?? 'Unknown'}
                      </Typography>
                      <img src={smallLogo} alt={'icon'} />
                    </Box>
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
                  </Box>
                </Box>
              </Grid>
            ))}
          </Grid>
        </div>
      ))}
    </>
  )
}
