/********************************************************************************
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

import { useState, useEffect } from 'react'
import { Trans, useTranslation } from 'react-i18next'
import i18next from 'i18next'
import { useDispatch } from 'react-redux'
import {
  Button,
  Checkbox,
  DialogActions,
  DialogContent,
  DialogHeader,
  LoadingButton,
} from '@cofinity-x/shared-components'
import { error, success } from 'services/NotifyService'
import { OVERLAYS } from 'types/Constants'
import { closeOverlay, show } from 'features/control/overlay'
import type { store } from 'features/store'
import './style.scss'
import { useAddUsecaseMutation } from 'features/usecase/usecaseApiSlice'
import { generateDummyPdf } from 'utils/cfxPdfGenerator'

export default function EditUseCase({
  id: verifiedCredentialTypeId,
  title: credentialType,
  link,
}: Readonly<{
  id: string
  title: string
  link?: string
}>) {
  const { t } = useTranslation()
  const dispatch = useDispatch<typeof store.dispatch>()
  const [uploadedFile, setUploadedFile] = useState<File>()
  const [checked, setChecked] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(false)

  const [addUsecase] = useAddUsecaseMutation()

  const handleUpload = async () => {
    setLoading(true)
    try {
      if (uploadedFile) {
        const data = {
          verifiedCredentialTypeId,
          credentialType,
          document: uploadedFile,
        }
        await addUsecase(data).unwrap()
        setLoading(false)
        dispatch(closeOverlay())
        success(t('content.usecaseParticipation.editUsecase.success'))
      }
    } catch (err) {
      setLoading(false)
      error(t('content.usecaseParticipation.editUsecase.error'), '', '')
    }
  }

  useEffect(() => {
    if (checked) {
      const createPdf = async () => {
        const file = await generateDummyPdf()
        setUploadedFile(file)
      }
      createPdf()
    }
  }, [checked])

  return (
    <>
      <div className="cx-edit-usecase-overlay">
        <DialogHeader
          {...{
            title: i18next.t('content.usecaseParticipation.editUsecase.title', {
              usecaseName: credentialType,
            }),
            intro: (
              <Trans i18nKey="content.usecaseParticipation.editUsecase.description">
                <br />
              </Trans>
            ),
            closeWithIcon: true,
            onCloseWithIcon: () => dispatch(show(OVERLAYS.NONE, '')),
          }}
        />

        <DialogContent>
          <div className="edit-usecase">
            <div className="checkbox-confirmation">
              <Checkbox
                checked={checked}
                onChange={(e) => {
                  setChecked(e.target.checked)
                }}
              />
              <label htmlFor="agreement-checkbox" style={{ fontWeight: '500' }}>
                <span className="cx-custom-link-wrapper">
                  <Trans
                    i18nKey="content.usecaseParticipation.editUsecase.checkboxLabel"
                    components={{
                      1: (
                        <a
                          href={link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="cx-custom-link"
                          style={{ color: '#2484c6' }}
                        >
                          {t(
                            'content.usecaseParticipation.editUsecase.linkText'
                          )}
                        </a>
                      ),
                    }}
                  />
                </span>
              </label>
            </div>
          </div>
        </DialogContent>
      </div>

      <DialogActions>
        <Button
          variant="outlined"
          onClick={() => dispatch(show(OVERLAYS.NONE, ''))}
        >
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
          <Button
            variant="contained"
            onClick={handleUpload}
            disabled={!checked}
          >
            {t('global.actions.submitCredentialRequest')}
          </Button>
        )}
      </DialogActions>
    </>
  )
}
