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

import {
  Tooltips,
  Typography,
} from '@arena2036/portal-shared-components-construct-x'
import './style.scss'
import {
  CredentialSubjectStatus,
  CredentialType,
  type WalletContent,
} from 'features/compayWallet/companyWalletApiSlice'
import dayjs from 'dayjs'
import { useTranslation } from 'react-i18next'
import { Box, Grid } from '@mui/material'
import SettingsBackupRestoreIcon from '@mui/icons-material/SettingsBackupRestore'
import { getAssetBase } from 'services/EnvironmentService'
import { userHasSsiCredentialRole } from 'services/AccessService'
import { ROLES } from 'types/Constants'

type Hash<T> = Record<string, T>

export default function RuleCard({
  sections,
  handleRevoke,
}: {
  readonly sections: Hash<WalletContent[]>
  readonly handleRevoke: (id: string) => void
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

  const canShowRevoke = (item: WalletContent) => {
    return (
      userHasSsiCredentialRole(ROLES.REVOKE_CREDENTIAL) &&
      item.status === CredentialSubjectStatus.ACTIVE &&
      item?.credentialType !== CredentialType.MEMBERSHIP &&
      item.credentialType !== CredentialType.BUSINESS_PARTNER_NUMBER
    )
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
            {sections[key]?.map((item: WalletContent, index) => (
              <Grid
                item
                xs={4}
                sm={4}
                md={4}
                className="main-rule-card-container"
                key={item.expiryDate ?? index}
                sx={{
                  paddingLeft: '20px !important',
                }}
              >
                <Box className="gradient-container">
                  <Box
                    key={item.expiryDate ?? index}
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
                        src={`${getAssetBase()}/images/logos/logo_tractus-x.svg`}
                        alt="tractus x logo"
                        style={{
                          width: 40,
                        }}
                      />
                    </Box>
                    <Typography className="text" variant="h4">
                      {item?.credentialType.split('_').join(' ')}
                    </Typography>
                    <Box className="revoke-container">
                      <div>
                        <Typography className="text" variant="body3">
                          {item.authority}
                        </Typography>
                        <Typography className="text" variant="body3">
                          {t('content.companyWallet.expiry')}
                          {dayjs(item.expiryDate).format('YYYY-MM-DD')}
                        </Typography>
                      </div>
                      {canShowRevoke(item) && (
                        <Tooltips
                          tooltipPlacement="top-start"
                          tooltipText={t('content.companyWallet.revokeHint')}
                          children={
                            <Box
                              onClick={() => {
                                handleRevoke(item.credentialDetailId)
                              }}
                            >
                              <SettingsBackupRestoreIcon
                                sx={{
                                  color: '#c84f4f',
                                  cursor: 'pointer',
                                }}
                              />
                            </Box>
                          }
                        />
                      )}
                    </Box>
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
