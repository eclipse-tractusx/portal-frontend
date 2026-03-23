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
  Dialog,
  DialogActions,
  DialogContent,
  DialogHeader,
  Stepper,
  Typography,
} from '@arena2036/portal-shared-components-construct-x'
import { useDispatch } from 'react-redux'
import { closeOverlay, exec } from 'features/control/overlay'
import HelpOutlineIcon from '@mui/icons-material/HelpOutline'
import { ACTIONS } from 'types/Constants'
import { useFetchIDPDetailQuery } from 'features/admin/idpApiSlice'

export const EnableIDPSuccess = ({ id }: { id: string }) => {
  const { t } = useTranslation('idp')
  const dispatch = useDispatch()

  const { data } = useFetchIDPDetailQuery(id)

  const stepsList = [
    {
      headline: t('enablesuccess.stepLists.firstStep'),
      step: 1,
      text: t('enablesuccess.created'),
      color: '#B3CB2D',
    },
    {
      headline: t('enablesuccess.stepLists.secondStep'),
      step: 2,
      text: t('enablesuccess.configured'),
      color: '#B3CB2D',
    },
    {
      headline: t('enablesuccess.stepLists.thirdStep'),
      step: 3,
      text: t('enablesuccess.connected'),
      color: '#B3CB2D',
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
        <div style={{ background: '#F9F9F9', padding: '20px', margin: '30px' }}>
          <div style={{ textAlign: 'center', marginBottom: '30px' }}>
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
                margin: '0 10px 10px 20px',
              }}
            >
              2
            </Typography>
            <Trans
              values={{
                idpDisplayname: data?.displayName,
              }}
            >
              <Typography variant="label2">
                {t('enablesuccess.step2Heading')}
              </Typography>
            </Trans>
          </div>
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
        <Typography
          variant="label3"
          sx={{
            display: 'flex',
            justifyContent: 'center',
            cursor: 'pointer',
            color: '#0088CC',
            textDecoration: 'underline',
          }}
          onClick={() =>
            window.open(
              '/documentation/?path=user%2F02.+Technical+Integration%2F02.+Identity+Provider+Management%2F02.+Configure+Company+IdP.md',
              '_blank',
              'noopener'
            )
          }
        >
          <HelpOutlineIcon
            sx={{
              fontSize: '18px',
              marginRight: '5px',
            }}
          />
          {t('add.learnMore')}
        </Typography>
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
