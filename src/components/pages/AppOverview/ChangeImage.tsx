/********************************************************************************
 * Copyright (c) 2023 BMW Group AG
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

import {
  Typography,
  PageHeader,
  Button,
  LoadingButton,
  Card,
  type UploadFileStatus,
  UploadStatus,
} from '@arena2036/portal-shared-components-construct-x'
import { useTranslation } from 'react-i18next'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { Box } from '@mui/material'
import { useCallback, useEffect, useState } from 'react'
import { useUpdateImageDataMutation } from 'features/appManagement/apiSlice'
import ConnectorFormInputFieldImage from 'components/shared/basic/ReleaseProcess/components/ConnectorFormInputFieldImage'
import { useForm } from 'react-hook-form'
import type { DropzoneFile } from 'components/shared/basic/Dropzone'
import { error, success } from 'services/NotifyService'
import type { ItemType } from './AddRoles'
import { useFetchDocumentByIdMutation } from 'features/apps/apiSlice'

export default function ChangeImage() {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const appId = useParams().appId
  const [isLoading, setIsLoading] = useState(false)
  const { state } = useLocation()
  const items = state
  const [cardImage, setCardImage] = useState('')
  const [previewLocalCardImage, setPreviewLocalCardImage] = useState('')
  const [enableImageUpload, setEnableImageUpload] = useState(false)
  const [updateImageData] = useUpdateImageDataMutation()
  const [fetchDocumentById] = useFetchDocumentByIdMutation()
  const app = items?.filter((item: ItemType) => item.id === appId)
  const leadImageId = app?.[0]?.leadPictureId

  const {
    control,
    trigger,
    formState: { errors },
    getValues,
    setValue,
  } = useForm({
    defaultValues: {
      uploadLeadImage: null,
    },
    mode: 'onChange',
  })

  const fetchLeadImage = useCallback(
    async (documentId: string, documentType: string) => {
      try {
        const response = await fetchDocumentById({
          appId: appId ?? '',
          documentId,
        })
        if (response && 'data' in response) {
          const file = response?.data?.data
          if (documentType === 'APP_LEADIMAGE') {
            setCardImage(URL.createObjectURL(file))
          }
        }
      } catch (err) {
        error('ERROR WHILE FETCHING IMAGE', '', err as object)
      }
    },
    [fetchDocumentById, appId]
  )

  useEffect(() => {
    if (leadImageId) {
      fetchLeadImage(leadImageId, 'APP_LEADIMAGE')
    }
  }, [fetchLeadImage, leadImageId])

  const uploadDocumentApi = async (appId: string, file: File) => {
    const data = {
      appId,
      body: { file },
    }
    await updateImageData(data).unwrap()
  }

  const uploadImageValue = getValues()
    .uploadLeadImage as unknown as DropzoneFile

  const handleSaveClick = () => {
    setIsLoading(true)
    if (appId && uploadImageValue) {
      const setFileStatus = (status: UploadFileStatus) => {
        setValue('uploadLeadImage', {
          id: uploadImageValue.id,
          name: uploadImageValue.name,
          size: uploadImageValue.size,
          status,
          // Add an ESLint exception until there is a solution
          // eslint-disable-next-line
        } as any)
      }

      setFileStatus(UploadStatus.UPLOADING)
      uploadDocumentApi(appId, uploadImageValue)
        .then(() => {
          setFileStatus(UploadStatus.UPLOAD_SUCCESS)
          navigate('/appOverview', {
            state: 'change-image-success',
          })
          success(t('content.changeImage.successMsg'))
        })
        .catch((err) => {
          setIsLoading(false)
          setFileStatus(UploadStatus.UPLOAD_ERROR)
          error(t('content.changeImage.errorMsg'), '', err)
        })
    }
  }

  const cardImageData: string | null = getValues().uploadLeadImage

  useEffect(() => {
    if (cardImageData) {
      const blobFile = new Blob([cardImageData], { type: 'image/png' })
      setPreviewLocalCardImage(URL.createObjectURL(blobFile))
    }
  }, [cardImageData])

  return (
    <main className="change-image-main">
      <PageHeader title={app?.[0]?.title} headerHeight={200} topPage={true} />
      <section>
        <Typography mb={3} variant="body2" align="center">
          {app?.[0]?.title}
        </Typography>
        <Typography mb={3} variant="h2" align="center">
          {t('content.changeImage.headerTitle')}
        </Typography>
        <Typography align="center" variant="body2">
          {t('content.changeImage.description')}
        </Typography>
      </section>
      <div className="main-container">
        <div className="main-row">
          {app && (
            <Box sx={{ display: 'flex' }}>
              <Box sx={{ width: '40%' }}>
                <Card
                  image={{
                    src: previewLocalCardImage || cardImage,
                  }}
                  title={app[0]?.title || ''}
                  subtitle={app[0]?.provider}
                  imageSize="normal"
                  imageShape="square"
                  variant="minimal"
                  expandOnHover={false}
                  filledBackground={false}
                  buttonText={''}
                />
              </Box>
              {enableImageUpload ? (
                <Box sx={{ width: '50%' }}>
                  <ConnectorFormInputFieldImage
                    {...{
                      control,
                      trigger,
                      errors,
                    }}
                    name="uploadLeadImage"
                    isRequired={false}
                    size="small"
                    handleDelete={() => {
                      setPreviewLocalCardImage('')
                    }}
                  />
                </Box>
              ) : (
                <Box sx={{ width: '50%', marginTop: '14%' }}>
                  <Button
                    color="secondary"
                    size="small"
                    onClick={() => {
                      setEnableImageUpload(true)
                    }}
                  >
                    {t('content.changeImage.uploadNewImage')}
                  </Button>
                </Box>
              )}
            </Box>
          )}
        </div>
      </div>
      <section>
        <hr style={{ border: 0, borderTop: '1px solid #DCDCDC' }} />
        <Box sx={{ position: 'relative', marginTop: '30px' }}>
          <Button
            color="secondary"
            size="small"
            onClick={() => {
              navigate('/appOverview')
            }}
          >
            {t('global.actions.cancel')}
          </Button>

          <span style={{ position: 'absolute', right: '10px' }}>
            {isLoading ? (
              <LoadingButton
                size="small"
                loading={isLoading}
                variant="contained"
                onButtonClick={() => {
                  // do nothing
                }}
                loadIndicator="Loading..."
                label={`${t('global.actions.confirm')}`}
              />
            ) : (
              <Button
                size="small"
                variant="contained"
                disabled={
                  uploadImageValue === null || uploadImageValue === undefined
                }
                onClick={handleSaveClick}
              >
                {t('global.actions.save')}
              </Button>
            )}
          </span>
        </Box>
      </section>
    </main>
  )
}
