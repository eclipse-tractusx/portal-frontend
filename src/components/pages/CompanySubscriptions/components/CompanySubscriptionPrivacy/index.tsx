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

import { uniqueId } from 'lodash'
import { Apartment, Person, LocationOn, Web, Info } from '@mui/icons-material'
import { useTranslation } from 'react-i18next'
import { Typography } from '@catena-x/portal-shared-components'
import { PrivacyPolicyType } from 'features/adminBoard/adminBoardApiSlice'
import { type AppDetails } from 'features/apps/types'
import './CompanySubscriptionPrivacy.scss'

export default function CompanySubscriptionPrivacy({
  detail,
}: {
  detail: AppDetails
}) {
  const { t } = useTranslation('', {
    keyPrefix: 'content.companySubscriptionsDetail.privacy',
  })

  const renderPrivacy = (policy: PrivacyPolicyType) => {
    switch (policy) {
      case PrivacyPolicyType.COMPANY_DATA:
        return <Apartment className="policy-icon" />
      case PrivacyPolicyType.USER_DATA:
        return <Person className="policy-icon" />
      case PrivacyPolicyType.LOCATION:
        return <LocationOn className="policy-icon" />
      case PrivacyPolicyType.BROWSER_HISTORY:
        return <Web className="policy-icon" />
      case PrivacyPolicyType.NONE:
        return <Info className="policy-icon" />
      default:
        return <Apartment className="policy-icon" />
    }
  }

  return (
    <div
      className="company-subscription-detail-privacy company-subscription-content-section"
      id="privacy-policy"
    >
      <div className="privacy-content">
        <Typography variant="h3">{t('heading')}</Typography>
        <Typography variant="body2">{t('message')}</Typography>
      </div>
      {detail?.privacyPolicies?.length ? (
        <div className="policies-list app-policies">
          {detail.privacyPolicies.map((policy: PrivacyPolicyType) => (
            <Typography
              variant="body2"
              className="policy-name"
              key={uniqueId(policy)}
            >
              {renderPrivacy(policy)}
              {t(policy)}
            </Typography>
          ))}
        </div>
      ) : (
        <Typography variant="label3" sx={{ textAlign: 'left' }}>
          {t('notSupportedMessage')}
        </Typography>
      )}
    </div>
  )
}
