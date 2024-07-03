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
  return (
    <main>
      <PageHeader headerHeight={200} topPage={true} title={t('title')} />
      <section>
        <Typography variant="h5">{t('directors')}</Typography>

        <Box sx={{ display: 'inline-flex' }}>
          <div style={{ paddingTop: '20px' }}>CEO : </div>
          <div style={{ marginTop: '-29px' }}>
            <Input
              sx={{
                width: 'max-width',
                ml: 1,
                p: 0,
                display: 'inline-flex',
                '.MuiFilledInput-input': { padding: '10px !important' },
              }}
              placeholder={'Oliver Ganser'}
              disabled={true}
            />
          </div>
        </Box>
        <div>
          <Box sx={{ display: 'inline-flex' }}>
            <div style={{ paddingTop: '20px' }}>{t('deputyCeo')} : </div>
            <div style={{ marginTop: '-25px' }}>
              <Input
                sx={{
                  width: 'max-width',
                  ml: 1,
                  p: 0,
                  display: 'inline-flex',
                  '.MuiFilledInput-input': { padding: '10px !important' },
                }}
                placeholder={'Prof. Dr.-Ing. Boris Otto'}
                disabled={true}
              />
            </div>
          </Box>
        </div>
        <div>
          <Box sx={{ display: 'inline-flex' }}>
            <div style={{ paddingTop: '20px' }}>{t('treasurer')} : </div>
            <div style={{ marginTop: '-20px' }}>
              <Input
                sx={{
                  width: 'max-width',
                  ml: 1,
                  p: 0,
                  display: 'inline-flex',
                  '.MuiFilledInput-input': { padding: '10px !important' },
                }}
                placeholder={'Claus Cremers'}
                disabled={true}
              />
            </div>
          </Box>
        </div>
        <br />
        <Typography variant="body2">{t('address')}</Typography>
        <Typography variant="body2">
          Catena-X Automotive Network e.V.
        </Typography>
        <div>
          <Box sx={{ display: 'inline-flex' }}>
            <div style={{ paddingTop: '20px' }}>c/o : </div>
            <div style={{ marginTop: '-20px' }}>
              <Input
                sx={{
                  width: 'max-width',
                  ml: 1,
                  p: 0,
                  display: 'inline-flex',
                  '.MuiFilledInput-input': { padding: '10px !important' },
                }}
                placeholder={'IFOK GmbH'}
                disabled={true}
              />
            </div>
          </Box>
        </div>

        <div>
          <Box sx={{ display: 'inline-flex' }}>
            <div style={{ marginTop: '-20px' }}>
              <Input
                sx={{
                  width: 'max-width',
                  ml: 1,
                  p: 0,
                  display: 'inline-flex',
                  '.MuiFilledInput-input': { padding: '10px !important' },
                }}
                placeholder={'Reinhardtstraße 58'}
                disabled={true}
              />
            </div>
          </Box>
        </div>
        <div>
          <Box sx={{ display: 'inline-flex' }}>
            <div style={{ marginTop: '-20px' }}>
              <Input
                sx={{
                  width: 'max-width',
                  ml: 1,
                  p: 0,
                  display: 'inline-flex',
                  '.MuiFilledInput-input': { padding: '10px !important' },
                }}
                placeholder={'10117 Berlin'}
                disabled={true}
              />
            </div>
          </Box>
        </div>
        <br />
        <Typography variant="h5">{t('contact&support')}</Typography>
        <Typography variant="body2">{t('contact&supportDesc')}</Typography>
        <br />
        <Typography variant="h5">{t('privacy')}</Typography>
        <Typography variant="body2">{t('privacyDesc')}</Typography>
        <a href="./privacy">Privacy Policy</a>
      </section>
    </main>
  )
}
