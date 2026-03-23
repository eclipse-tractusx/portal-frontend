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
  useFetchManagedIDPNetworkQuery,
  useRemoveIDPMutation,
} from 'features/admin/idpApiSlice'
import { success } from 'services/NotifyService'
import { useState } from 'react'

export const DeleteManagedIDP = ({ id }: { id: string }) => {
  const { t } = useTranslation('idp')
  const dispatch = useDispatch()
  const { data } = useFetchManagedIDPNetworkQuery(id)
  const [removeIDP] = useRemoveIDPMutation()
  const [loadingButton, setLoadingButton] = useState(false)
  const [enableErrorMessage, setEnableErrorMessage] = useState<boolean>(false)

  const handleDelete = async () => {
    setLoadingButton(true)
    try {
      await removeIDP(id).unwrap()
      setLoadingButton(false)
      dispatch(closeOverlay())
      success(t('deleteManagedIdp.success'))
      setEnableErrorMessage(false)
    } catch (err) {
      setEnableErrorMessage(true)
      setLoadingButton(false)
    }
  }

  return (
    <>
      <DialogHeader
        title={t('deleteManagedIdp.title')}
        closeWithIcon={false}
        onCloseWithIcon={() => dispatch(closeOverlay())}
      />
      <DialogContent sx={{ padding: '0 110px 32px 110px' }}>
        <Typography
          variant="body2"
          sx={{ textAlign: 'center', lineHeight: '20px' }}
        >
          {t('deleteManagedIdp.desc1')}
        </Typography>
        <Typography
          variant="body2"
          sx={{ lineHeight: '20px', mb: 6, textAlign: 'center' }}
        >
          {t('deleteManagedIdp.desc2')}
        </Typography>
        <Typography
          variant="body2"
          sx={{ lineHeight: '20px', textAlign: 'center' }}
        >
          {t('deleteManagedIdp.connectedCompanies')}
        </Typography>
        <Typography
          variant="body2"
          sx={{ textAlign: 'center', lineHeight: '20px', mb: 3 }}
        >
          {data?.connectedCompanies && data.connectedCompanies.length > 0
            ? data.connectedCompanies.map((item) => item.companyName).join(', ')
            : t('disableManagedIdp.none')}
        </Typography>
        <Typography
          variant="body2"
          sx={{ lineHeight: '20px', textAlign: 'center' }}
        >
          {t('deleteManagedIdp.desc3')}
        </Typography>
        {enableErrorMessage && (
          <Typography
            variant="label3"
            sx={{
              textAlign: 'center',
              color: '#D91E18',
              mt: 3,
              display: 'block',
            }}
          >
            {t('deleteManagedIdp.error')}
          </Typography>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={() => dispatch(closeOverlay())} variant="outlined">
          {t('action.cancel')}
        </Button>
        {loadingButton ? (
          <LoadingButton
            color="primary"
            label=""
            helperTextColor="success"
            size="medium"
            sx={{ marginLeft: '10px' }}
            onButtonClick={() => {
              // do nothing
            }}
            loadIndicator={t('action.loading')}
            helperText=""
            loading={loadingButton}
          />
        ) : (
          <Button variant="contained" onClick={handleDelete}>
            {t('action.delete')}
          </Button>
        )}
      </DialogActions>
    </>
  )
}
