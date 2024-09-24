/********************************************************************************
 * Copyright (c) 2023 BMW Group AG
 * Copyright (c) 2023 Contributors to the Eclipse Foundation
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

import { PageHeader, Typography } from '@catena-x/portal-shared-components'
import { useTranslation } from 'react-i18next'

export default function Imprint() {
  const { t } = useTranslation('footer', { keyPrefix: 'imprint' })

  return (
    <main>
      <PageHeader headerHeight={200} topPage={true} title={t('title')} />
      <section>
        <Typography variant="h5">{t('directors')}</Typography>
        <Typography variant="body2">{t('ceo')}</Typography>
        <Typography variant="body2">{t('deputyCeo')}</Typography>
        <Typography variant="body2">{t('treasurer')}</Typography>
        <br />
        <Typography variant="h5">{t('address')}</Typography>
        <Typography variant="body2">{t('nameOfOrganization')}</Typography>
        <Typography variant="body2">{t('careOf')}</Typography>
        <Typography variant="body2">{t('street')}</Typography>
        <Typography variant="body2">{t('postalCode&City')}</Typography>
        <br />
        <Typography variant="h5">{t('contact&Support')}</Typography>
        <Typography variant="body2">{t('contact&SupportDesc')}</Typography>
        <br />
        <Typography variant="h5">{t('privacy')}</Typography>
        <Typography variant="body2">{t('privacyDesc')}</Typography>
        {/* TODO: once privacy page's content is available, then href url can be changed to href="./privacy" */}
        <a href="./imprint">{t('privacyPolicy')}</a>
      </section>
    </main>
  )
}
