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

import {
  Input,
  PageHeader,
  Typography,
} from '@catena-x/portal-shared-components'
import { Box } from '@mui/material'
import { useTranslation } from 'react-i18next'

export default function Imprint() {
  const { t } = useTranslation('footer', { keyPrefix: 'imprint' })

  const handlePlaceHolder = (
    label: string,
    placeholder: string,
    margin: string
  ) => {
    return (
      <div>
        <Box sx={{ display: 'inline-flex' }}>
          <Typography variant="body2" sx={{ mt: 3 }}>
            {label}
          </Typography>
          <div style={{ margin }}>
            <Input
              sx={{
                width: 'max-width',
                ml: 1,
                p: 0,
                display: 'inline-flex',
                '.MuiFilledInput-input': { padding: '10px !important' },
              }}
              placeholder={placeholder}
              disabled={true}
            />
          </div>
        </Box>
      </div>
    )
  }

  return (
    <main>
      <PageHeader headerHeight={200} topPage={true} title={t('title')} />
      <section>
        <Typography variant="h5">{t('directors')}</Typography>
        {handlePlaceHolder(`${t('ceo')} :`, 'Oliver Ganser', '-29px 0 0 0')}
        {handlePlaceHolder(
          `${t('deputyCeo')} :`,
          'Prof. Dr.-Ing. Boris Otto',
          '-25px 0 0 0'
        )}
        {handlePlaceHolder(
          `${t('treasurer')} :`,
          'Claus Cremers',
          '-20px 0 0 0'
        )}
        <br />
        <Typography variant="body2">{t('address')}</Typography>
        <Typography variant="body2">{t('catenaxAutomativeNetwork')}</Typography>
        {handlePlaceHolder('c/o : ', 'IFOK GmbH', '-20px 0 0 0')}
        {handlePlaceHolder('', 'Reinhardtstraße 58', '-20px 0 0 0')}
        {handlePlaceHolder('', '10117 Berlin', '-20px 0 0 0')}
        <br />
        <Typography variant="h5">{t('contact&support')}</Typography>
        <Typography variant="body2">{t('contact&supportDesc')}</Typography>
        <br />
        <Typography variant="h5">{t('privacy')}</Typography>
        <Typography variant="body2">{t('privacyDesc')}</Typography>
        <a href="./privacy">{t('privacyPolicy')}</a>
      </section>
    </main>
  )
}
