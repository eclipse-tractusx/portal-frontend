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
import { closeOverlay, show } from 'features/control/overlay'
import { useState } from 'react'
import HelpOutlineIcon from '@mui/icons-material/HelpOutline'
import {
  type IdentityProviderUpdate,
  useFetchIDPDetailQuery,
  useUpdateIDPMutation,
  useEnableIDPMutation,
  IDPCategory,
} from 'features/admin/idpApiSlice'
import { UpdateIDPContent } from './UpdateIDPContent'
import { OVERLAYS } from 'types/Constants'
import { error, success } from 'services/NotifyService'

export const UpdateIDP = ({ id }: { id: string }) => {
  const { t } = useTranslation('idp')
  const dispatch = useDispatch()
  const { data } = useFetchIDPDetailQuery(id)
  const [updateIdp] = useUpdateIDPMutation()
  const [enableIdp] = useEnableIDPMutation()
  const [idpUpdateData, setIdpUpdateData] = useState<
    IdentityProviderUpdate | undefined
  >(undefined)
  const [loading, setLoading] = useState(false)

  console.log(data)

  const doUpdateIDP = async () => {
    if (!(data && idpUpdateData)) return
    setLoading(true)
    try {
      await updateIdp(idpUpdateData).unwrap()
      success(t('edit.success'))
      if (data.identityProviderTypeId === IDPCategory.MANAGED) {
        await enableIdp({
          id,
          enabled: true,
        }).unwrap()
        success(t('enable.success'))
        dispatch(closeOverlay())
      } else {
        dispatch(show(OVERLAYS.ENABLE_IDP, id))
      }
    } catch (err) {
      error(t('edit.error'), '', err as object)
    }
    setLoading(false)
  }

  const UpdateStepsList = [
    {
      headline: t('add.stepLists.firstStep'),
      step: 1,
      text: t('edit.created'),
      color: '#B3CB2D',
    },
    {
      headline: t('add.stepLists.secondStep'),
      step: 2,
      color: '#0F71CB',
    },
    {
      headline: t('add.stepLists.thirdStep'),
      step: 3,
    },
  ]

  const steps =
    data?.identityProviderTypeId === IDPCategory.MANAGED
      ? UpdateStepsList.slice(0, 2)
      : UpdateStepsList

  const numberSteps =
    data?.identityProviderTypeId === IDPCategory.MANAGED ? 2 : 3

  return (
    <>
      <DialogHeader
        title={t('edit.title')}
        intro=""
        closeWithIcon={true}
        onCloseWithIcon={() => dispatch(closeOverlay())}
      />
      <DialogContent>
        <div style={{ width: '70%', margin: '0 auto 40px' }}>
          <Stepper list={steps} showSteps={numberSteps} activeStep={2} />
        </div>
        <div style={{ textAlign: 'center', marginBottom: '30px' }}>
          <Trans>
            <Typography variant="label3">{t('edit.desc')}</Typography>
          </Trans>
        </div>
        <Typography variant="label2">{t('edit.addDataHeading')}</Typography>
        {data && <UpdateIDPContent idp={data} onValid={setIdpUpdateData} />}
        <Typography
          variant="label3"
          sx={{
            display: 'flex',
            justifyContent: 'center',
            cursor: 'pointer',
            color: '#0088CC',
            textDecoration: 'underline',
            marginTop: '30px',
          }}
        >
          <HelpOutlineIcon
            sx={{
              marginRight: '5px',
              fontSize: '18px',
            }}
          />
          {t('add.learnMore')}
        </Typography>
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
            onButtonClick={() => {
              // do nothing
            }}
            sx={{ marginLeft: '10px' }}
          />
        ) : (
          <Button
            variant="contained"
            onClick={doUpdateIDP}
            disabled={!idpUpdateData}
          >
            {t('action.saveMetadata')}
          </Button>
        )}
      </DialogActions>
    </>
  )
}
