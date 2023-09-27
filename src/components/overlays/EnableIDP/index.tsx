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
import HelpOutlineIcon from '@mui/icons-material/HelpOutline'
import { closeOverlay, show } from 'features/control/overlay'
import { useState } from 'react'
import {
  useEnableIDPMutation,
  useUpdateUserIDPMutation,
  IdentityProviderUser,
  useFetchIDPDetailQuery,
} from 'features/admin/idpApiSlice'
import { EnableIDPContent } from './EnableIDPContent'
import { useFetchOwnUserDetailsQuery } from 'features/admin/userApiSlice'
import { OVERLAYS } from 'types/Constants'
import { error, success } from 'services/NotifyService'

export const EnableIDP = ({ id }: { id: string }) => {
  const { t } = useTranslation('idp')
  const dispatch = useDispatch()
  const { data } = useFetchOwnUserDetailsQuery()
  const idpData = useFetchIDPDetailQuery(id).data
  const [enableIdp] = useEnableIDPMutation()
  const [updateUserIDP] = useUpdateUserIDPMutation()
  const [idpEnableData, setIdpEnableData] = useState<
    IdentityProviderUser | undefined
  >(undefined)
  const [loading, setLoading] = useState(false)

  const stepsList = [
    {
      headline: t('enable.stepLists.firstStep'),
      step: 1,
      text: t('enable.created'),
      color: '#B3CB2D',
    },
    {
      headline: t('enable.stepLists.secondStep'),
      step: 2,
      text: t('enable.created'),
      color: '#B3CB2D',
    },
    {
      headline: t('enable.stepLists.thirdStep'),
      step: 3,
      color: '#0F71CB',
    },
  ]

  const doEnableIDP = async () => {
    if (!(data && idpEnableData)) return
    try {
      setLoading(true)
      await enableIdp({
        id,
        enabled: true,
      }).unwrap()
      const idpUser: IdentityProviderUser = {
        ...idpEnableData,
        ...{
          identityProviderId: id,
          companyUserId: data.companyUserId,
        },
      }
      try {
        await updateUserIDP(idpUser).unwrap()
        dispatch(show(OVERLAYS.ENABLE_IDP_SUCCESS, id))
        success(t('enable.success'))
      } catch (err) {
        error(t('enable.error'), '', err as object)
      }
      setLoading(false)
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <>
      <DialogHeader
        title={t('enable.title', {
          idp: idpData?.displayName,
        })}
        intro=""
        closeWithIcon={true}
        onCloseWithIcon={() => dispatch(closeOverlay())}
      />
      <DialogContent>
        <div style={{ width: '70%', margin: '0 auto 40px' }}>
          <Stepper list={stepsList} showSteps={3} activeStep={3} />
        </div>
        <Trans>
          <Typography variant="label2">{t('enable.desc')}</Typography>
        </Trans>
        <EnableIDPContent
          onValid={setIdpEnableData}
          identityProviderId={id}
          companyUserId={data?.companyUserId || ''}
        />
        <Typography
          variant="label3"
          sx={{
            display: 'flex',
            justifyContent: 'center',
            cursor: 'pointer',
            color: '#0088CC',
            textDecoration: 'underline',
          }}
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
        <Button
          variant="outlined"
          onClick={() => dispatch(show(OVERLAYS.UPDATE_IDP, id))}
        >
          {t('action.back')}
        </Button>
        {loading ? (
          <LoadingButton
            color="primary"
            helperText=""
            helperTextColor="success"
            label=""
            loadIndicator={t('action.loading')}
            loading
            size="medium"
            onButtonClick={() => {}}
            sx={{ marginLeft: '10px' }}
          />
        ) : (
          <Button
            variant="contained"
            disabled={
              !(!!id && !!data?.companyUserId && !!idpEnableData?.userId)
            }
            onClick={doEnableIDP}
          >
            {t('action.connect')}
          </Button>
        )}
      </DialogActions>
    </>
  )
}
