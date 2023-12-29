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

import { useTranslation, Trans } from 'react-i18next'
import { Typography } from '@catena-x/portal-shared-components'
import './CompanyWallet.scss'
import { useFetchCompanyWalletQuery } from 'features/compayWallet/companyWalletApiSlice'
import WalletActivationInfo from './WalletActivationInfo'
import ComapnyWalletSubNavigationHeader from './ComapnyWalletSubNavigationHeader'
import WalletCard from './WalletCard'
import RuleCard from './RuleCard'

export default function CompanyWallet(): JSX.Element {
  const { t } = useTranslation()
  const { data } = useFetchCompanyWalletQuery()

  console.log(data)

  return (
    <main className="companywallet-main">
      <div className="companywallet-section">
        <div className="container">
          <Typography variant="h2" className="heading">
            {t('content.companyWallet.heading')}
          </Typography>
          <Trans>
            <Typography variant="body1" className="description">
              {t('content.companyWallet.description')}
            </Typography>
          </Trans>
        </div>
        <div className="container">
          <WalletActivationInfo status={'active'} />
        </div>
        <ComapnyWalletSubNavigationHeader />
        <div className="container">
          <WalletCard />
          <RuleCard />
        </div>
      </div>
    </main>
  )
}
