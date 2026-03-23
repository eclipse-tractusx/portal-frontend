/********************************************************************************
 * Copyright (c) 2024 Contributors to the Eclipse Foundation
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
} from '@arena2036/portal-shared-components-construct-x'
import { useDispatch } from 'react-redux'
import { closeOverlay } from 'features/control/overlay'
import {
  useEnableIDPMutation,
  useFetchManagedIDPNetworkQuery,
} from 'features/admin/idpApiSlice'
import { success } from 'services/NotifyService'
import { useState } from 'react'

export const DisableManagedIDP = ({ id }: { id: string }) => {
  const { t } = useTranslation('idp')
  const dispatch = useDispatch()
  const { data, refetch } = useFetchManagedIDPNetworkQuery(id)
  const [enableIDP] = useEnableIDPMutation()
  const [loading, setLoading] = useState(false)
  const [enableErrorMessage, setEnableErrorMessage] = useState<boolean>(false)

  const handleEnableDisable = async () => {
    setLoading(true)
    try {
      data && (await enableIDP({ id, enabled: false }).unwrap())
      success(t('disableManagedIdp.disableSuccess'))
      setEnableErrorMessage(false)
      refetch()
      dispatch(closeOverlay())
      setLoading(false)
    } catch (err) {
      setLoading(false)
      setEnableErrorMessage(true)
    }
  }

  return (
    <>
      <DialogHeader
        title={t('disableManagedIdp.title')}
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
          {data?.connectedCompanies && data.connectedCompanies.length > 0
            ? data.connectedCompanies.map((item) => item.companyName).join(', ')
            : t('disableManagedIdp.none')}
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
            variant="label3"
            sx={{ color: '#D91E18', display: 'block', mt: 3 }}
            textAlign={'center'}
          >
            {t('disableManagedIdp.error')}
          </Typography>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={() => dispatch(closeOverlay())} variant="outlined">
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
          <Button variant="contained" onClick={handleEnableDisable}>
            {t('action.disable')}
          </Button>
        )}
      </DialogActions>
    </>
  )
}
