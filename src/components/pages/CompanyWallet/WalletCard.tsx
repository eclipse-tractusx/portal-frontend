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
import smallLogo from '../../../assets/logo/cx-logo-short.svg'
import { type WalletContent } from 'features/compayWallet/companyWalletApiSlice'
import dayjs from 'dayjs'
import { useTranslation } from 'react-i18next'

export default function WalletCard({
  wallet,
}: {
  wallet: WalletContent
}): JSX.Element {
  const { t } = useTranslation()
  return (
    <div
      style={{
        backgroundColor:
          wallet.credentialSubject[0].status === 'Active'
            ? '#004f4b'
            : '#EAEAEA',
      }}
      className="main-card-container"
    >
      <div className="card-container">
        <div className="icon-text">
          <div className="icon">
            <img src={smallLogo} alt="jhgasjg12i" />
            {wallet.credentialSubject[0].status !== 'Active' && (
              <div>
                <Typography variant="body2">
                  {t('content.companyWallet.inactive')}
                </Typography>
              </div>
            )}
          </div>
          <Typography variant="body2">
            {wallet.credentialSubject[0].type}
          </Typography>
          <Typography variant="caption1">
            {wallet.issuer?.split('.net:')[1]}
          </Typography>
        </div>
        <div>
          <Typography
            sx={{
              textAlign: 'left',
              color: '#ffffff',
            }}
            variant="body2"
          >
            {dayjs(wallet.expirationDate).format('YYYY-MM-DD')}
          </Typography>
        </div>
      </div>
    </div>
  )
}
