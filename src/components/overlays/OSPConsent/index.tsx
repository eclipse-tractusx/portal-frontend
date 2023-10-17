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
  DialogActions,
  DialogContent,
  DialogHeader,
  LoadingButton,
  Stepper,
  Typography,
} from '@catena-x/portal-shared-components'
import { useDispatch } from 'react-redux'
import { closeOverlay } from 'features/control/overlay'
import { useState } from 'react'
import { useFetchIDPDetailQuery } from 'features/admin/idpApiSlice'
import { OSPConsentContent } from './OSPConsentContent'
import { error, success } from 'services/NotifyService'

export const OSPConsent = ({ id }: { id: string }) => {
  const { t } = useTranslation('osp')
  const dispatch = useDispatch()
  const { data } = useFetchIDPDetailQuery(id)
  const [consent, setConsent] = useState<boolean>(false)
  const [loading, setLoading] = useState(false)

  const doConsent = async () => {
    if (!(data && consent)) return
    setLoading(true)
    try {
      success(t('consent.success'))
      dispatch(closeOverlay())
    } catch (err) {
      error(t('consent.error'), '', err as object)
    }
    setLoading(false)
  }

  const steps = [
    {
      headline: t('add.stepLists.firstStep'),
      step: 1,
      text: t('edit.created'),
    },
    {
      headline: t('add.stepLists.secondStep'),
      step: 2,
      text: t('edit.configured'),
    },
    {
      headline: t('add.stepLists.thirdStep'),
      step: 3,
      text: t('edit.registered'),
    },
    {
      headline: t('add.stepLists.fourthStep'),
      step: 4,
    },
  ]

  return (
    <>
      <DialogHeader
        title={t('consent.title')}
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
            <Typography variant="label3">{t('consent.desc')}</Typography>
          </Trans>
        </div>
        <Typography variant="label2">{t('consent.addDataHeading')}</Typography>
        {data && <OSPConsentContent idp={data} onValid={setConsent} />}
      </DialogContent>
      <DialogActions>
        <Button onClick={() => dispatch(closeOverlay())} variant="outlined">
          {t('action.cancel')}
        </Button>
        {loading ? (
          <LoadingButton
            color="primary"
            size="medium"
            helperText=""
            helperTextColor="success"
            label=""
            loading
            loadIndicator={t('action.loading')}
            onButtonClick={() => {}}
            sx={{ marginLeft: '10px' }}
          />
        ) : (
          <Button variant="contained" onClick={doConsent} disabled={!consent}>
            {t('action.consent')}
          </Button>
        )}
      </DialogActions>
    </>
  )
}
