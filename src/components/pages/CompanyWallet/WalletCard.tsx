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
import { type WalletContent } from 'features/compayWallet/companyWalletApiSlice'
import { useTranslation } from 'react-i18next'
import './CompanyWallet.scss'
import classNames from 'classnames'
import useFormattedDate from 'hooks/useFormattedDate'

export default function WalletCard({
  wallet,
  isError,
  isIssuerCofinity,
}: {
  readonly wallet: WalletContent
  readonly isError: boolean
  readonly isIssuerCofinity?: boolean
}): JSX.Element {
  const { t } = useTranslation()
  const { formatDate } = useFormattedDate()

  console.log('data', wallet)

  const getMessge = () => {
    if (isError) {
      return {
        info: t('content.companyWallet.error'),
        message: t('content.companyWallet.errorDescription'),
      }
    } else {
      return {
        info: t('content.companyWallet.activate'),
        message: t('content.companyWallet.activateDescription'),
      }
    }
  }

  const current = getMessge()

  const type = isError ? 'Unknown' : wallet?.credentialType

  /**reusable typography styles */
  const typographyStyles = {
    title: {
      fontWeight: 600,
      fontSize: '28px',
      lineHeight: '28px',
    },
    descriptionText: {
      textAlign: 'left',
      color: '#ffffff',
      fontSize: '17px',
      fontWeight: '500',
    },
  }

  return (
    <div
      className={classNames('wrapper-container', { 'cx-error-bg': isError })}
    >
      <div
        className={classNames('main-card-container', {
          'cx-error-border': isError,
        })}
      >
        <div className="card-container">
          <div className="icon-text">
            <div className="icon">
              <img
                src="/cx-logo.svg"
                alt="cx logo"
                style={{
                  width: 40,
                }}
              />
            </div>
            {type && (
              <Typography variant="body2" sx={typographyStyles.title}>
                {t(`content.companyWallet.${type.toLowerCase()}`)}
              </Typography>
            )}
            <div className="cx-description-container">
              {wallet?.authority && (
                <Typography sx={typographyStyles.descriptionText}>
                  {t('content.companyWallet.issuer')}
                  {isIssuerCofinity ? 'Cofinity-X' : wallet?.authority}
                </Typography>
              )}
              {wallet?.expiryDate && (
                <Typography
                  sx={typographyStyles.descriptionText}
                  variant="body2"
                >
                  {t('content.companyWallet.expiry')}
                  {formatDate(wallet?.expiryDate)}
                </Typography>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="status-container">
        <div className="info">
          <Typography variant="body1" sx={typographyStyles.descriptionText}>
            {current?.info}
          </Typography>
        </div>
        <Typography variant="body1">{current?.message}</Typography>
      </div>
    </div>
  )
}
