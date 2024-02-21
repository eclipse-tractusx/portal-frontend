/********************************************************************************
 * Copyright (c) 2021, 2024 Contributors to the Eclipse Foundation
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

import { useTranslation } from 'react-i18next'
import {
  Button,
  DialogActions,
  DialogContent,
  DialogHeader,
  LoadingButton,
  Typography,
} from '@catena-x/portal-shared-components'
import { useDispatch } from 'react-redux'
import { closeOverlay } from 'features/control/overlay'
import {
  useDisableIDPMutation,
  useFetchIDPDetailQuery,
} from 'features/admin/idpApiSlice'
import { success } from 'services/NotifyService'
import { useState } from 'react'

export const DisableManagedIDP = ({ id }: { id: string }) => {
  const { t } = useTranslation('idp')
  const dispatch = useDispatch()
  const { data } = useFetchIDPDetailQuery(id)
  const [disableIDP] = useDisableIDPMutation()
  const [loading, setLoading] = useState(false)
  const [enableErrorMessage, setEnableErrorMessage] = useState<boolean>(true)

  const doDisable = async (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    setLoading(true)
    try {
      await disableIDP({ id, enabled: false })
      dispatch(closeOverlay())
      success(t('disableManagedIdp.success'))
      setEnableErrorMessage(false)
    } catch (err) {
      setLoading(false)
      setEnableErrorMessage(true)
    }
  }

  return (
    <>
      <DialogHeader
        title={t('disableManagedIdp.title', {
          idp: data?.displayName,
        })}
        closeWithIcon={false}
        onCloseWithIcon={() => dispatch(closeOverlay())}
      />
      <DialogContent sx={{ padding: '0 110px 32px 110px' }}>
        <Typography
          variant="body2"
          textAlign={'center'}
          sx={{ lineHeight: '20px' }}
        >
          {t('disableManagedIdp.desc1')}
        </Typography>
        <Typography
          variant="body2"
          textAlign={'center'}
          sx={{ lineHeight: '20px', mb: 6 }}
        >
          {t('disableManagedIdp.desc2')}
        </Typography>
        <Typography
          variant="body2"
          textAlign={'center'}
          sx={{ lineHeight: '20px' }}
        >
          {t('disableManagedIdp.connectedCompanies')}
        </Typography>
        <Typography
          variant="body2"
          textAlign={'center'}
          sx={{ lineHeight: '20px', mb: 3 }}
        >
          {' '}
          {data?.displayName} - {data?.alias}
        </Typography>
        <Typography
          variant="body2"
          textAlign={'center'}
          sx={{ lineHeight: '20px' }}
        >
          {t('disableManagedIdp.desc3')}
        </Typography>
        {enableErrorMessage && (
          <Typography
            variant="body2"
            sx={{ color: '#D91E18', mb: 2, mt: 2 }}
            textAlign={'center'}
          >
            {t('disableManagedIdp.error')}
          </Typography>
        )}
      </DialogContent>
      <DialogActions>
        <Button variant="outlined" onClick={() => dispatch(closeOverlay())}>
          {t('action.cancel')}
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
            onButtonClick={() => {
              // do nothing
            }}
            sx={{ marginLeft: '10px' }}
          />
        ) : (
          <Button variant="contained" onClick={doDisable}>
            {t('action.disable')}
          </Button>
        )}
      </DialogActions>
    </>
  )
}
