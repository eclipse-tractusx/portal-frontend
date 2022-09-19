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

import StageHeader from 'components/shared/frame/StageHeader'
import { Typography } from 'cx-portal-shared-components'
import { useTranslation } from 'react-i18next'

export default function Imprint() {
  const { t } = useTranslation('footer', { keyPrefix: 'imprint' })
  return (
    <main>
      <StageHeader title={t('title')} />
      <section>
        <Typography variant="h5">{t('directors')}</Typography>
        <Typography variant="body2">Oliver Ganser ({t('ceo')})</Typography>
        <Typography variant="body2">
          Prof. Dr.-Ing. Boris Otto ({t('deputyCeo')})
        </Typography>
        <Typography variant="body2">
          Claus Cremers ({t('treasurer')})
        </Typography>
        <br />
        <Typography variant="body2">{t('address')}</Typography>
        <Typography variant="body2">
          Catena-X Automotive Network e.V.
        </Typography>
        <Typography variant="body2">c/o IFOK GmbH</Typography>
        <Typography variant="body2">Reinhardtstraße 58</Typography>
        <Typography variant="body2">10117 Berlin</Typography>
        <br />
        <Typography variant="h5">{t('contact&support')}</Typography>
        <Typography variant="body2">{t('contact&supportDesc')}</Typography>
        <br />
        <Typography variant="h5">{t('privacy')}</Typography>
        <Typography variant="body2">{t('privacyDesc')}</Typography>
        <a href=".">xxx.xxx.xxx</a>
      </section>
    </main>
  )
}
