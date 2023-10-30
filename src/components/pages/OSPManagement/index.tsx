/********************************************************************************
 * Copyright (c) 2021, 2023 BMW Group AG
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

import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline'
import { OVERLAYS } from 'types/Constants'
import { Button, Image, Typography } from '@catena-x/portal-shared-components'
import { Trans, useTranslation } from 'react-i18next'
import { useDispatch } from 'react-redux'
import { show } from 'features/control/overlay'
import './style.scss'
import { getAssetBase } from 'services/EnvironmentService'
import { IDPList } from '../IDPManagement/IDPList'

export default function OSPManagement() {
  const { t } = useTranslation('osp')
  const dispatch = useDispatch()

  return (
    <main>
      <section>
        <div className="idp-management-header">
          <Trans>
            <Typography variant="h2" className="idp-management-title">
              {t('onboarding.title')}
            </Typography>
          </Trans>
          <Trans>
            <Typography className="idp-management-desc">
              {t('onboarding.desc')}
            </Typography>
          </Trans>
          <Image
            style={{ width: 480, height: 240 }}
            src={`${getAssetBase()}/images/content/teaser_osp.png`}
            alt={t('onboarding.title')}
          />
          <div>
            <Button
              size="small"
              startIcon={<AddCircleOutlineIcon />}
              onClick={() => dispatch(show(OVERLAYS.ADD_OSP))}
              className="add-idp-btn"
            >
              {t('action.create')}
            </Button>
          </div>
        </div>
        <div style={{ paddingTop: '70px' }}>
          <IDPList isOSP={true} />
        </div>
      </section>
    </main>
  )
}
