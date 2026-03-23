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

import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import i18next from 'i18next'
import { useDispatch } from 'react-redux'
import {
  Button,
  Checkbox,
  DialogActions,
  DialogContent,
  DialogHeader,
  DropArea,
  type DropAreaProps,
  LoadingButton,
} from '@arena2036/portal-shared-components-construct-x'
import { error, success } from 'services/NotifyService'
import { OVERLAYS } from 'types/Constants'
import { closeOverlay, show } from 'features/control/overlay'
import type { store } from 'features/store'
import { Dropzone } from '../../shared/basic/Dropzone'
import './style.scss'
import { useAddUsecaseMutation } from 'features/usecase/usecaseApiSlice'

export default function EditUseCase({
  id: verifiedCredentialTypeId,
  title: credentialType,
}: Readonly<{
  id: string
  title: string
}>) {
  const { t } = useTranslation()
  const dispatch = useDispatch<typeof store.dispatch>()
  const [uploadedFile, setUploadedFile] = useState<File>()
  const [checked, setChecked] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(false)

  const [addUsecase] = useAddUsecaseMutation()

  const renderDropArea = (props: DropAreaProps) => {
    return <DropArea {...props} size="small" />
  }

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

  return (
    <>
      <DialogHeader
        {...{
          title: i18next.t('content.usecaseParticipation.editUsecase.title', {
            usecaseName: credentialType,
          }),
          intro: i18next.t(
            'content.usecaseParticipation.editUsecase.description',
            { usecaseName: credentialType }
          ),
          closeWithIcon: true,
          onCloseWithIcon: () => dispatch(show(OVERLAYS.NONE, '')),
        }}
      />

      <DialogContent>
        <div className="edit-usecase">
          <Dropzone
            acceptFormat={{ 'application/pdf': [] }}
            maxFilesToUpload={1}
            maxFileSize={2097152}
            onChange={([file]) => {
              setUploadedFile(file)
            }}
            errorText={t(
              'content.usecaseParticipation.editUsecase.fileSizeError'
            )}
            DropStatusHeader={false}
            DropArea={renderDropArea}
          />
          <div className="checkbox-confirmation">
            <Checkbox
              label={`${t(
                'content.usecaseParticipation.editUsecase.checkboxLabel'
              )}`}
              onChange={(e) => {
                setChecked(e.target.checked)
              }}
            />
          </div>
        </div>
      </DialogContent>

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
            disabled={!checked || uploadedFile === undefined}
          >
            {t('global.actions.submit')}
          </Button>
        )}
      </DialogActions>
    </>
  )
}
