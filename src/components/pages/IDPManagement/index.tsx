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

import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline'
import { OVERLAYS } from 'types/Constants'
import {
  Button,
  Typography,
} from '@arena2036/portal-shared-components-construct-x'
import { Trans, useTranslation } from 'react-i18next'
import { useDispatch } from 'react-redux'
import { IDPList } from './IDPList'
import { show } from 'features/control/overlay'
import './style.scss'
import { getAssetBase } from 'services/EnvironmentService'

export default function IDPManagement() {
  const { t } = useTranslation('idp')
  const dispatch = useDispatch()

  return (
    <main>
      <section>
        <div className="idp-management-header">
          <Trans>
            <Typography variant="h2" className="idp-management-title">
              {t('page.title')}
            </Typography>
          </Trans>
          <Trans>
            <Typography className="idp-management-desc">
              {t('page.desc')}
            </Typography>
          </Trans>
          <img
            src={`${getAssetBase()}/images/content/teaser.png`}
            alt={'idp management'}
          />
          <div>
            <Button
              size="small"
              startIcon={<AddCircleOutlineIcon />}
              onClick={() => dispatch(show(OVERLAYS.ADD_IDP))}
              className="add-idp-btn"
            >
              {t('action.create')}
            </Button>
          </div>
        </div>
        <div style={{ paddingTop: '70px' }}>
          <IDPList />
        </div>
      </section>
    </main>
  )
}
