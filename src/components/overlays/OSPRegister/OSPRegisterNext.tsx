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

import { Trans, useTranslation } from 'react-i18next'
import {
  Button,
  DialogActions,
  DialogContent,
  DialogHeader,
  Stepper,
  Typography,
} from '@arena2036/portal-shared-components-construct-x'
import { closeOverlay } from 'features/control/overlay'
import { useDispatch } from 'react-redux'

export const OSPRegisterNext = ({ id }: { id: string }) => {
  const { t } = useTranslation('idp')
  const dispatch = useDispatch()

  const steps = [
    {
      step: 1,
      headline: t('osp.steps.one.title'),
      text: t('osp.steps.one.text'),
    },
    {
      step: 2,
      headline: t('osp.steps.two.title'),
      text: t('osp.steps.two.text'),
    },
    {
      step: 3,
      headline: t('osp.steps.three.title'),
      text: t('osp.steps.three.text'),
    },
    {
      step: 4,
      headline: t('osp.steps.four.title'),
    },
  ]

  return (
    <>
      <DialogHeader
        title={t('osp.register_next.title')}
        intro=""
        closeWithIcon={true}
        onCloseWithIcon={() => dispatch(closeOverlay())}
      />
      <DialogContent>
        <div style={{ width: '70%', margin: '0 auto 40px' }}>
          <Stepper list={steps} showSteps={4} activeStep={4} />
        </div>
        <div style={{ textAlign: 'center', marginBottom: '30px' }}>
          <Trans>
            <Typography variant="label3">
              {t('osp.register_next.desc')}
            </Typography>
          </Trans>
        </div>
        <Typography variant="body1" style={{ margin: '50px 0' }}>
          {t('osp.register_next.body1', { id })}
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => dispatch(closeOverlay())} variant="outlined">
          {t('action.close')}
        </Button>
      </DialogActions>
    </>
  )
}
