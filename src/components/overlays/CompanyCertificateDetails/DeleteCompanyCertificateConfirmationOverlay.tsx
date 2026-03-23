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

import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import {
  Dialog,
  DialogContent,
  Button,
  DialogActions,
  DialogHeader,
  LoadingButton,
} from '@arena2036/portal-shared-components-construct-x'
import { useDispatch } from 'react-redux'
import { closeOverlay } from 'features/control/overlay'
import { useDeleteCompanyCertificateMutation } from 'features/companyCertification/companyCertificateApiSlice'

export default function DeleteCompanyCertificateConfirmationOverlay({
  id,
  title,
}: {
  readonly id: string
  readonly title: string
}) {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const [deleteCertificate] = useDeleteCompanyCertificateMutation()
  const [success, setSuccess] = useState<boolean>(false)
  const [error, setError] = useState<boolean>(false)
  const [errorMessage, setErrorMessage] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)

  const close = () => {
    dispatch(closeOverlay())
    setError(false)
    setSuccess(false)
  }

  const onDelete = async () => {
    setLoading(true)
    await deleteCertificate(id)
      .unwrap()
      .then(() => {
        setSuccess(true)
      })
      .catch((error) => {
        setErrorMessage(error?.data?.title)
        setError(true)
      })
    setLoading(false)
  }
  return (
    <div>
      <Dialog
        open={true}
        sx={{
          '.MuiDialog-paper': {
            maxWidth: '45%',
          },
        }}
      >
        <DialogHeader
          title={t('content.companyCertificate.confirm.title').replace(
            '{{name}}',
            title
          )}
        />
        <DialogContent>
          {!success &&
            !error &&
            t('content.companyCertificate.confirm.description')}
          {success &&
            t('content.companyCertificate.confirm.success').replace(
              '{{name}}',
              title
            )}
          {error &&
            t('content.companyCertificate.confirm.error').replace(
              '{{error}}',
              errorMessage
            )}
        </DialogContent>
        <DialogActions>
          {!success && !error ? (
            <>
              <Button variant="outlined" onClick={close}>
                {t('global.actions.cancel')}
              </Button>
              {loading ? (
                <LoadingButton
                  color="primary"
                  helperText=""
                  helperTextColor="success"
                  label=""
                  loadIndicator="Loading ..."
                  loading
                  size="medium"
                  onButtonClick={() => {
                    // do nothing
                  }}
                  sx={{ marginLeft: '10px' }}
                />
              ) : (
                <Button variant="contained" onClick={onDelete}>
                  {t('global.actions.confirm')}
                </Button>
              )}
            </>
          ) : (
            <Button variant="outlined" onClick={close}>
              {t('global.actions.close')}
            </Button>
          )}
        </DialogActions>
      </Dialog>
    </div>
  )
}
