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

import { Trans, useTranslation } from 'react-i18next'
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogHeader,
  Stepper,
  Typography,
} from '@catena-x/portal-shared-components'
import { useDispatch } from 'react-redux'
import { closeOverlay, exec } from 'features/control/overlay'
import { ACTIONS } from 'types/Constants'

export const EnableIDPSuccess = ({ id }: { id: string }) => {
  const { t } = useTranslation('idp')
  const dispatch = useDispatch()

  const stepsList = [
    {
      headline: t('add.stepLists.firstStep'),
      step: 1,
    },
    {
      headline: t('add.stepLists.secondStep'),
      step: 2,
    },
    {
      headline: t('enablesuccess.stepLists.thirdStep'),
      step: 3,
    },
  ]

  return (
    <Dialog open={true}>
      <DialogHeader
        title={t('enablesuccess.title')}
        intro=""
        closeWithIcon={true}
        onCloseWithIcon={() => dispatch(closeOverlay())}
      />
      <DialogContent>
        <div style={{ width: '70%', margin: '0 auto 40px' }}>
          <Stepper list={stepsList} showSteps={3} activeStep={4} />
        </div>
        <div
          style={{
            width: '90%',
            textAlign: 'center',
            border: '1px solid #B3CB2D',
            padding: '15px',
            margin: '0 auto',
          }}
        >
          <Trans>
            <Typography variant="label3">
              {t('enablesuccess.subHeading1')}
            </Typography>
            <br />
            <Typography variant="label2">
              {t('enablesuccess.subHeading2')}
            </Typography>
          </Trans>
        </div>
        <div style={{ textAlign: 'center', margin: '30px' }}>
          <div>
            <Typography variant="label1">
              {t('enablesuccess.nextStepHeading')}
            </Typography>
          </div>
          <div style={{ marginTop: '20px' }}>
            <Typography variant="label2">
              {t('enablesuccess.nextStepSubHeading')}
            </Typography>
          </div>
        </div>
        <div style={{ textAlign: 'center' }}>
          <Typography
            variant="label4"
            sx={{
              border: '1px solid #0f71cb',
              color: '#0f71cb',
              borderRadius: '50%',
              display: 'inline-block',
              width: '20px',
              height: '20px',
              lineHeight: '20px',
              textAlign: 'center',
              fontSize: '15px',
              margin: '0 10px 10px',
            }}
          >
            1
          </Typography>
          <Typography variant="label2">
            {t('enablesuccess.step1Heading')}
          </Typography>
        </div>
        <div style={{ textAlign: 'center', marginTop: '40px' }}>
          <Typography
            variant="label4"
            sx={{
              border: '1px solid #0f71cb',
              color: '#0f71cb',
              borderRadius: '50%',
              display: 'inline-block',
              width: '20px',
              height: '20px',
              lineHeight: '20px',
              textAlign: 'center',
              fontSize: '15px',
              margin: '0 10px 10px 20px',
            }}
          >
            2
          </Typography>
          <Trans>
            <Typography variant="label2">
              {t('enablesuccess.step2Heading')}
            </Typography>
          </Trans>
        </div>
        <div style={{ textAlign: 'center', marginTop: '50px' }}>
          <Typography variant="label3">{t('enablesuccess.note')}</Typography>
        </div>
        <div style={{ display: 'flex', margin: '30px auto' }}>
          <Trans>
            <Typography
              variant="label2"
              sx={{ width: '48%', textAlign: 'center' }}
            >
              {t('enablesuccess.successText')}
            </Typography>
          </Trans>
          <Typography variant="label2" sx={{ width: '15%' }}>
            {t('enablesuccess.or')}
          </Typography>
          <Trans>
            <Typography variant="label2" sx={{ textAlign: 'center' }}>
              {t('enablesuccess.failText')}
            </Typography>
          </Trans>
        </div>
      </DialogContent>
      <DialogActions>
        <Button variant="outlined" onClick={() => dispatch(closeOverlay())}>
          {t('action.notnow')}
        </Button>
        <Button
          variant="contained"
          onClick={() => dispatch(exec(ACTIONS.SIGNOUT))}
        >
          {t('action.signout')}
        </Button>
      </DialogActions>
    </Dialog>
  )
}
