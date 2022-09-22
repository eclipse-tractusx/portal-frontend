/********************************************************************************
 * Copyright (c) 2021,2022 BMW Group AG
 * Copyright (c) 2021,2022 Contributors to the CatenaX (ng) GitHub Organisation.
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

import { useTranslation } from 'react-i18next'
import { Typography } from 'cx-portal-shared-components'

export default function CookiePolicy() {
  const { t } = useTranslation('footer', { keyPrefix: 'cookies' })
  return (
    <main className="cookies-page">
      <Typography variant="h3">{t('title')}</Typography>
      <div className="cookie-description">
        <Typography variant="body2">{t('what')}</Typography>
        <br />
        <Typography variant="body2">{t('purposes.why')}</Typography>
        <ul>
          {[0, 1, 2, 3, 4].map((n) => (
            <li key={n}>{t(`purposes.reason.${n}`)}</li>
          ))}
        </ul>
        <br />
        <Typography variant="body2">{t('types.message')}</Typography>
        <ul>
          {['strict', 'function', 'target'].map((type) => (
            <li key={type}>
              {t(`types.${type}`)}
              <table className="cookie-table">
                <thead>
                  <tr>
                    <th>XXX</th>
                    <th>XXX</th>
                    <th>XXX</th>
                  </tr>
                </thead>
              </table>
            </li>
          ))}
        </ul>
      </div>
    </main>
  )
}
