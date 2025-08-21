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
  ViewSelector,
} from '@cofinity-x/shared-components'
import './style.scss'
import {
  CredentialSubjectStatus,
  CredentialType,
  type WalletContent,
} from 'features/compayWallet/companyWalletApiSlice'
import { useTranslation } from 'react-i18next'
import { Box, Grid } from '@mui/material'
import CopyAllIcon from '@mui/icons-material/CopyAll'
import ConfirmationNumberOutlinedIcon from '@mui/icons-material/ConfirmationNumberOutlined'
import { getAssetBase } from 'services/EnvironmentService'
import useFormattedDate from 'hooks/useFormattedDate'
import { useMemo, useState } from 'react'
import { error, success } from 'services/NotifyService'
import { groupBy } from 'lodash'

type Hash<T> = Record<string, T>

export default function RuleCard({
  sections: walletData,
  handleRevoke,
  isIssuerCofinity,
}: {
  readonly sections: Hash<WalletContent[]>
  readonly handleRevoke: (id: string) => void
  readonly isIssuerCofinity?: boolean
}): JSX.Element {
  const { t } = useTranslation()
  const { formatDate } = useFormattedDate()
  const [copied, setCopied] = useState<string>('')
  const [filterStatus, setFilterStatus] = useState('Active')

  const filteredWalletData = useMemo(() => {
    if (!walletData) return

    const now = new Date().getTime()
    const allItems = Object.values(walletData).flat()

    return allItems.filter((item) => {
      const expiryTime = new Date(item.expiryDate).getTime()
      if (filterStatus === 'Active') {
        return expiryTime >= now
      } else if (filterStatus === 'Expired') {
        return expiryTime < now
      }
      return true
    })
  }, [walletData, filterStatus])

  const groupedItems = useMemo(() => {
    if (!filteredWalletData) return {}
    return groupBy(filteredWalletData, (item) =>
      item.credentialType === CredentialType.TRACEABILITY_FRAMEWORK
        ? t('content.companyWallet.TRACEABILITY_FRAMEWORK')
        : t('content.companyWallet.others')
    )
  }, [filteredWalletData, t])

  const keys = useMemo(() => Object.keys(groupedItems), [groupedItems])

  const filterOptions = [
    {
      buttonText: t('content.usecaseParticipation.valid'),
      buttonValue: 'Active',
      onButtonClick: () => {
        if (filterStatus !== 'Active') setFilterStatus('Active')
      },
    },
    {
      buttonText: t('content.usecaseParticipation.expired'),
      buttonValue: 'Expired',
      onButtonClick: () => {
        if (filterStatus !== 'Expired') setFilterStatus('Expired')
      },
    },
  ]

  const getBgColor = (item: WalletContent) => {
    if (item?.status === CredentialSubjectStatus.ACTIVE) {
      return '#DBEBB0'
    } else if (
      item?.status === CredentialSubjectStatus.INACTIVE ||
      item?.status === CredentialSubjectStatus.REVOKED
    ) {
      return '#A6A6A6'
    } else {
      return 'rgba(253, 185, 19, 0.4)'
    }
  }

  const getTextColor = (item: WalletContent) => {
    if (item?.status === CredentialSubjectStatus.ACTIVE) {
      return '#406124'
    } else if (
      item?.status === CredentialSubjectStatus.INACTIVE ||
      item?.status === CredentialSubjectStatus.REVOKED
    ) {
      return '#fff'
    } else {
      return '#785707'
    }
  }

  const getStatus = (status: string) => {
    return status === CredentialSubjectStatus.REVOKED
      ? t(`content.companyWallet.status.${CredentialSubjectStatus.INACTIVE}`)
      : t(`content.companyWallet.status.${status}`)
  }

  const canShowRevoke = (item: WalletContent) => {
    return (
      item.status === CredentialSubjectStatus.ACTIVE &&
      item?.credentialType !== CredentialType.MEMBERSHIP &&
      item.credentialType !== CredentialType.BUSINESS_PARTNER_NUMBER
    )
  }

  return (
    <>
      {keys.map((key, index) => (
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
          {index === 0 && (
            <div className="cx-wallet-subnavigation-header">
              <ViewSelector
                activeView={filterStatus}
                align=""
                views={filterOptions}
              />
            </div>
          )}
          <Grid container spacing={0} className="grid-layout">
            {groupedItems[key]?.map((item: WalletContent, index) => (
              <Grid
                size={{ xs: 4, sm: 4, md: 4 }}
                className="main-rule-card-container"
                key={
                  item.credentialDetailId ?? `${item.credentialType}-${index}`
                }
              >
                <Box className="gradient-container">
                  <Box
                    key={
                      item.credentialDetailId ??
                      `${item.credentialType}-${index}`
                    }
                    className={`rule-card-container ${
                      item?.status === CredentialSubjectStatus.INACTIVE ||
                      item?.status === CredentialSubjectStatus.REVOKED
                        ? 'cx-revoked-rule-card-container'
                        : ''
                    }`}
                    sx={{
                      border: '1.5px solid #d2d2d2',
                    }}
                  >
                    <Box className="circle-container">
                      <img
                        src={`${getAssetBase()}/images/logos/logo_tractus-x.svg`}
                        alt="tractus x logo"
                        style={{
                          width: 25,
                        }}
                      />
                      <Typography
                        sx={{
                          color: getTextColor(item),
                          backgroundColor: getBgColor(item),
                          padding: '0 !important',
                          fontSize: '12px',
                          height: '20px',
                          lineHeight: 'normal',
                        }}
                        variant="body2"
                      >
                        {getStatus(item?.status)}
                      </Typography>
                    </Box>
                    <div className="cx-flex-description-container">
                      <Typography className="text" variant="h4">
                        {item?.credentialType.split('_').join(' ')}
                      </Typography>
                      {isIssuerCofinity &&
                        item.credentialType ===
                          CredentialType.BUSINESS_PARTNER_NUMBER && (
                          <Box
                            sx={{
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'flex-start',
                              gap: '5px',
                              width: '100%',
                            }}
                            className="ph-mask-text"
                          >
                            <Typography
                              variant="h4"
                              className="text cx-bpnl-text"
                              sx={{
                                color: '#0073E6',
                                flexGrow: 1,
                              }}
                            >
                              {item.holder}
                              <Box
                                sx={{
                                  color:
                                    copied === item.holder
                                      ? '#00cc00'
                                      : '#eeeeee',
                                  cursor: 'pointer',
                                  width: '18px',
                                  ':hover': {
                                    color:
                                      copied === item.holder
                                        ? '#00cc00'
                                        : '#cccccc',
                                  },
                                }}
                                onClick={async () => {
                                  try {
                                    const value = item.holder ?? ''
                                    await navigator.clipboard.writeText(
                                      value as string
                                    )
                                    setCopied(value as string)
                                    success(
                                      t('global.actions.copyInfoSuccessMessage')
                                    )
                                  } catch (err) {
                                    error(
                                      t('global.actions.copyInfoErrorMessage')
                                    )
                                  } finally {
                                    setTimeout(() => {
                                      setCopied('')
                                    }, 1000)
                                  }
                                }}
                              >
                                <CopyAllIcon />
                              </Box>
                            </Typography>
                          </Box>
                        )}

                      {item?.version && (
                        <Typography className="text" variant="body3">
                          {t('content.companyWallet.version')}: {item.version}
                        </Typography>
                      )}
                    </div>
                    <Box className="revoke-container">
                      <div className="cx-flex-description-container">
                        <Typography className="text" variant="body3">
                          {t('content.companyWallet.issuer')}
                          {isIssuerCofinity ? 'Cofinity-X' : item.holder}
                        </Typography>
                        <Typography className="text" variant="body3">
                          {t('content.companyWallet.expiry')}
                          {formatDate(item?.expiryDate)}
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
                              <Typography
                                sx={{
                                  border: '1px solid #c84f4f',
                                  cursor: 'pointer',
                                  borderRadius: '100px',
                                  width: 'auto',
                                  fontSize: '12px',
                                  color: '#c84f4f !important',
                                  display: 'flex',
                                  padding: '7px 7px 7px 6px',
                                  height: '27px',
                                  justifyContent: 'center',
                                  alignItems: 'center',
                                }}
                                variant="body2"
                              >
                                <ConfirmationNumberOutlinedIcon
                                  sx={{
                                    color: '#c84f4f',
                                  }}
                                  className="cx-revoke-icon"
                                />
                                {t('content.adminCertificate.table.deactivate')}
                              </Typography>
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
