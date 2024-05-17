/********************************************************************************
 * Copyright (c) 2024 Contributors to the Eclipse Foundation
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
import {
  CredentialSubjectStatus,
  type WalletContent,
} from 'features/compayWallet/companyWalletApiSlice'
import dayjs from 'dayjs'
import { useTranslation } from 'react-i18next'
import { Box, Grid } from '@mui/material'

type Hash<T> = Record<string, T>

export default function RuleCard({
  sections,
}: {
  readonly sections: Hash<WalletContent[]>
}): JSX.Element {
  const { t } = useTranslation()
  const keys = Object.keys(sections)
  const getBgColor = (item: WalletContent) => {
    if (item?.status === CredentialSubjectStatus.ACTIVE) {
      return '#004F4B'
    } else if (
      item?.status === CredentialSubjectStatus.INACTIVE ||
      item?.status === CredentialSubjectStatus.REVOKED
    ) {
      return '#FEE7E2'
    } else {
      return '#FFA600'
    }
  }

  const getStatus = (status: string) =>
    status === CredentialSubjectStatus.REVOKED
      ? CredentialSubjectStatus.INACTIVE
      : status

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
            {key.split('_').join(' ')}
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
                key={item.expiryDate}
                sx={{
                  paddingLeft: '20px !important',
                }}
              >
                <Box className="gradient-container">
                  <Box
                    key={item.expiryDate}
                    className="rule-card-container"
                    sx={{
                      backgroundColor:
                        item?.status === CredentialSubjectStatus.INACTIVE ||
                        item?.status === CredentialSubjectStatus.REVOKED
                          ? '#EAEAEA'
                          : '#deeeef',
                    }}
                  >
                    <Box className="circle-container">
                      <Typography
                        sx={{
                          color:
                            item?.status !== CredentialSubjectStatus.INACTIVE &&
                            item?.status !== CredentialSubjectStatus.REVOKED
                              ? '#fff !important'
                              : '#FF532F !important',
                          backgroundColor: getBgColor(item),
                        }}
                        className="text"
                        variant="body2"
                      >
                        {getStatus(item?.status)}
                      </Typography>
                      <img
                        src="/logo_tractus-x.svg"
                        alt="tractus x logo"
                        style={{
                          width: 40,
                        }}
                      />
                    </Box>
                    <Typography className="text" variant="h4">
                      {item?.credentialType.split('_').join(' ')}
                    </Typography>
                    <div>
                      <Typography className="text" variant="body3">
                        {item.authority}
                      </Typography>
                      <Typography className="text" variant="body3">
                        {t('content.companyWallet.expiry')}
                        {dayjs(item.expiryDate).format('YYYY-MM-DD')}
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
