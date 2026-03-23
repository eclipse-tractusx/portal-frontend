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
  Button,
  DialogActions,
  DialogContent,
  DialogHeader,
  DropArea,
  type DropAreaProps,
  LoadingButton,
  Typography,
} from '@arena2036/portal-shared-components-construct-x'
import { useUploadCSVMutation } from 'features/companyData/companyDataApiSlice'
import { Dropzone } from 'components/shared/basic/Dropzone'
import { useDispatch } from 'react-redux'
import { closeOverlay } from 'features/control/overlay'
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined'
import UserService from 'services/UserService'
import { getBpdmGateApiBase } from 'services/EnvironmentService'
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline'
import CheckCircleOutlinedIcon from '@mui/icons-material/CheckCircleOutlined'
import WarningAmberOutlinedIcon from '@mui/icons-material/WarningAmberOutlined'
import { success as CopySuccess } from 'services/NotifyService'

export default function CSVUploadOverlay(): JSX.Element {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const [uploadedFile, setUploadedFile] = useState<File>()
  const [loading, setLoading] = useState<boolean>(false)
  const [uploadCSV] = useUploadCSVMutation()
  const [success, setSuccess] = useState<boolean>(false)
  const [error, setError] = useState<boolean>(false)
  const [errorResponse, setErrorResponse] = useState<string[]>([])
  const [errorStatus, setErrorStatus] = useState<number>(0)

  const renderDropArea = (props: DropAreaProps): JSX.Element => {
    return <DropArea {...props} size="small" />
  }

  const handleSubmit = async (): Promise<void> => {
    setLoading(true)
    try {
      if (uploadedFile != null) {
        await uploadCSV(uploadedFile)
          .unwrap()
          .then((response) => {
            if (response.length > 0) {
              setSuccess(true)
            } else {
              setError(true)
              setErrorResponse([])
            }
          })
        setLoading(false)
      }
      // Add an ESLint exception until there is a solution
      // eslint-disable-next-line
    } catch (err: any) {
      setLoading(false)
      setErrorStatus(err?.status)
      setErrorResponse(err?.data?.error ?? [])
      setError(true)
    }
  }

  const handleClose = () => {
    dispatch(closeOverlay())
  }

  const downloadTemplate = () => {
    const url = `${getBpdmGateApiBase()}/input/partner-upload-template`
    return fetch(url, {
      method: 'GET',
      headers: {
        authorization: `Bearer ${UserService.getToken()}`,
      },
    })
      .then((res) => res.blob())
      .then((blob) => {
        const url = window.URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url
        a.download = 'upload_template.csv'
        document.body.appendChild(a)
        a.click()
        a.remove()
      })
  }

  const getIcon = () => {
    if (success)
      return <CheckCircleOutlinedIcon sx={{ fontSize: 60 }} color="success" />
    else if (error)
      return <ErrorOutlineIcon sx={{ fontSize: 60 }} color="error" />
    return <></>
  }

  return (
    <Dialog open={true}>
      <DialogHeader
        {...{
          title: t('content.companyData.upload.title'),
          intro: '',
          closeWithIcon: true,
          icon: true,
          onCloseWithIcon: () => {
            handleClose()
          },
          iconComponent: getIcon(),
        }}
      />
      {success && (
        <DialogContent>
          <div
            style={{
              marginBottom: '30px',
              marginTop: '30px',
              textAlign: 'center',
            }}
          >
            <Typography variant="label1" className="title">
              {t('content.companyData.upload.successDescription')}
            </Typography>
          </div>
        </DialogContent>
      )}
      {error && (
        <DialogContent>
          <div
            style={{
              marginBottom: '30px',
              marginTop: '30px',
              textAlign: 'center',
            }}
          >
            <Typography variant="label1" className="title">
              {t('content.companyData.upload.errorDescription')}
            </Typography>
            <div
              style={{
                marginBottom: '30px',
                marginTop: '30px',
                textAlign: 'center',
              }}
            >
              {errorStatus !== 500 ? (
                <>
                  {errorResponse?.length > 0 ? (
                    <>
                      {errorResponse.map((text, i) => (
                        <Typography
                          sx={{ marginBottom: '10px', display: 'block' }}
                          id={text + i}
                          variant="label1"
                          className="title"
                        >
                          {text}
                        </Typography>
                      ))}
                    </>
                  ) : (
                    <Typography variant="label1" className="title">
                      {t('content.companyData.upload.emptyError')}
                    </Typography>
                  )}
                </>
              ) : (
                <Typography variant="label1" className="title">
                  {errorResponse}
                </Typography>
              )}
            </div>
            <div>
              <Button
                color="secondary"
                onClick={async () => {
                  await navigator.clipboard.writeText(
                    errorResponse.join('. ') ?? ''
                  )
                  CopySuccess(t('content.companyData.upload.copySuccess'))
                }}
                size="small"
                variant="outlined"
                startIcon={<WarningAmberOutlinedIcon />}
                sx={{ marginRight: '8px' }}
                disabled={errorResponse.length === 0 || errorStatus === 500}
              >
                {t('content.companyData.upload.copy')}
              </Button>
            </div>
          </div>
        </DialogContent>
      )}
      {!success && !error && (
        <DialogContent>
          <div
            style={{
              margin: '40px auto',
              textAlign: 'center',
            }}
          >
            <Button
              variant="outlined"
              endIcon={<FileDownloadOutlinedIcon />}
              sx={{ fontSize: '16px' }}
              size="small"
              onClick={() => downloadTemplate()}
            >
              {t('content.companyData.upload.templateBtn')}
            </Button>
          </div>
          <Dropzone
            acceptFormat={{ 'text/csv': [] }}
            maxFilesToUpload={1}
            maxFileSize={1000000}
            onChange={([file]) => {
              setUploadedFile(file)
            }}
            errorText={t('content.companyData.upload.fileSizeError')}
            DropStatusHeader={false}
            DropArea={renderDropArea}
          />
          <div className="note">
            <Typography variant="label2">
              {t('content.companyData.upload.note')}
            </Typography>
          </div>
        </DialogContent>
      )}
      {success && (
        <DialogActions>
          <Button
            variant="outlined"
            onClick={() => {
              handleClose()
            }}
          >
            {t('global.actions.close')}
          </Button>
        </DialogActions>
      )}
      {!success && !error && (
        <DialogActions>
          <Button
            variant="outlined"
            onClick={() => {
              handleClose()
            }}
          >
            {t('global.actions.close')}
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
              onClick={handleSubmit}
              disabled={uploadedFile === undefined}
            >
              {t('global.actions.submit')}
            </Button>
          )}
        </DialogActions>
      )}
    </Dialog>
  )
}
