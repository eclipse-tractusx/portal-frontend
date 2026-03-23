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

import { Typography } from '@arena2036/portal-shared-components-construct-x'
import {
  CredentialSubjectStatus,
  type WalletContent,
} from 'features/compayWallet/companyWalletApiSlice'
import dayjs from 'dayjs'
import { useTranslation } from 'react-i18next'
import './style.scss'

export default function WalletCard({
  wallet,
  isError,
}: {
  readonly wallet: WalletContent
  readonly isError: boolean
}): JSX.Element {
  const { t } = useTranslation()

  const status = wallet?.status === CredentialSubjectStatus.ACTIVE

  const getMessge = () => {
    if (isError) {
      return {
        info: t('content.companyWallet.error'),
        message: t('content.companyWallet.errorDescription'),
      }
    } else {
      return status
        ? {
            info: t('content.companyWallet.activate'),
            message: t('content.companyWallet.activateDescription'),
          }
        : {
            info: '',
            message: '',
          }
    }
  }

  const current = getMessge()

  const getBgColor = () => {
    if (isError) {
      return '#EBC6C6'
    } else {
      return status ? '#004f4b' : '#EAEAEA'
    }
  }

  const bgColor = getBgColor()

  const getTextColor = () => {
    if (isError) {
      return '#FFFFFF'
    } else {
      return status ? '#00AA55' : '#FF532F'
    }
  }

  const textColor = getTextColor()

  const type = isError ? 'Unknown' : wallet?.credentialType

  return (
    <div
      className="wrapper-container"
      style={{
        backgroundColor: isError ? 'red' : '#00aa55',
      }}
    >
      <div
        style={{
          backgroundColor: bgColor,
        }}
        className="main-card-container"
      >
        <div className="card-container">
          <div className="icon-text">
            <div className="icon">
              <img
                id="wallet-logo"
                src="/construct-x-logo-transparent.svg"
                alt="Construct-X Logo"
                style={{ display: 'inline', width: '100px', height: '80px' }}
              />
            </div>
            <Typography variant="body2">{type}</Typography>
            <Typography variant="caption1">{wallet?.authority}</Typography>
          </div>
          {wallet?.expiryDate && (
            <div>
              <Typography
                sx={{
                  textAlign: 'left',
                  color: '#ffffff',
                }}
                variant="body2"
              >
                {t('content.companyWallet.expiry')}
                {dayjs(wallet?.expiryDate).format('YYYY-MM-DD')}
              </Typography>
            </div>
          )}
        </div>
      </div>
      <div className="status-container">
        <div className="info">
          <Typography
            variant="body1"
            sx={{
              color: textColor,
              paddingLeft: '10px',
              fontWeight: '600',
            }}
          >
            {current?.info}
          </Typography>
        </div>
        <Typography variant="body1">{current?.message}</Typography>
      </div>
    </div>
  )
}
