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

import {
  Typography,
  PageHeader2,
  Button,
  IconButton,
  DialogHeader,
  Dialog,
  DialogContent,
  UploadStatus,
  DropArea,
  type DropAreaProps,
  Tooltips,
} from '@arena2036/portal-shared-components-construct-x'
import { useTranslation } from 'react-i18next'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { Box, Divider } from '@mui/material'
import { useState } from 'react'
import type { ItemType } from './AddRoles'
import type { DocumentData } from 'features/appManagement/apiSlice'
import {
  DocumentTypeId,
  useDeleteAppChangeDocumentMutation,
  useFetchAppDocumentsQuery,
  useUpdateAppChangeDocumentMutation,
} from 'features/appManagement/apiSlice'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined'
import { error, success } from 'services/NotifyService'
import { Controller, useForm } from 'react-hook-form'
import { Dropzone, type DropzoneFile } from 'components/shared/basic/Dropzone'

enum DocumentNameType {
  APP_IMAGE = 'App Image',
  APP_TECHNICAL_INFORMATION = 'App Technical Information',
  APP_CONTRACT = 'App Contract',
  ADDITIONAL_DETAILS = 'Additional Details',
}

export default function ChangeDocuments() {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const appId = useParams().appId
  const { state } = useLocation()
  const items = state
  const app = items?.filter((item: ItemType) => item.id === appId)
  const { data, refetch } = useFetchAppDocumentsQuery(appId ?? '')
  const [deleteAppChangeDocument] = useDeleteAppChangeDocumentMutation()
  const [documentType, setDocumentType] = useState('')
  const [uploadDocsOverlayOpen, setUploadDocsOverlayOpen] =
    useState<boolean>(false)
  const [updateAppChangeDocument] = useUpdateAppChangeDocumentMutation()

  const { control, trigger, setValue } = useForm({
    defaultValues: { uploadDocument: '' },
    mode: 'onChange',
  })

  const uploadDocumentApi = async (
    appId: string,
    documentTypeId: string,
    file: File
  ) => {
    const data = {
      appId,
      documentTypeId,
      body: { file },
    }
    await updateAppChangeDocument(data).unwrap()
  }

  const onFileUpload = (file: DropzoneFile) => {
    if (appId && file) {
      const setFileStatus = (status: UploadStatus) => {
        setValue('uploadDocument', {
          id: file.id,
          name: file.name,
          size: file.size,
          status,
          // Add an ESLint exception until there is a solution
          // eslint-disable-next-line
        } as any)
      }
      setFileStatus(UploadStatus.UPLOADING)
      uploadDocumentApi(appId, documentType, file)
        .then(() => {
          setFileStatus(UploadStatus.UPLOAD_SUCCESS)
          refetch()
          setUploadDocsOverlayOpen(false)
          success(t('content.changeDocuments.successMsg'))
        })
        .catch((err) => {
          setFileStatus(UploadStatus.UPLOAD_ERROR)
          error(t('content.changeDocuments.errorMsg'), '', err)
        })
    }
  }

  const deleteDocument = async (documentId: string) => {
    appId &&
      documentId &&
      (await deleteAppChangeDocument({ appId, documentId })
        .unwrap()
        .then(() => {
          success(t('content.changeDocuments.documentDeleteSuccess'))
          refetch()
        })
        // Add an ESLint exception until there is a solution
        // eslint-disable-next-line
        .catch((err: any) => {
          error(
            err.status === 409
              ? err.data.title
              : t('content.changeDocuments.errorMsg'),
            '',
            err
          )
        }))
  }

  const renderdocs = (
    docType: string,
    documents: DocumentData[],
    documentTypeId: string
  ) => {
    return (
      <div>
        <Box width={500} margin={'0 auto'} justifyContent="center">
          <Typography
            variant="label3"
            sx={{ color: '#1977cc', display: 'flex', marginTop: '28px' }}
          >
            <ArrowForwardIcon fontSize="small" sx={{ mr: 1 }} /> {docType}
          </Typography>
          <Box sx={{ mb: '20px', mt: '10px' }}>
            {documents?.map((doc: DocumentData) => {
              return (
                <div key={doc.documentId}>
                  <Typography variant="label4" sx={{ ml: '28px' }}>
                    {doc.documentName}
                  </Typography>
                  <Tooltips
                    tooltipPlacement="right-end"
                    tooltipText={
                      docType === DocumentNameType.APP_IMAGE &&
                      documents.length <= 1
                        ? t('content.changeDocuments.deleteIconTooltip')
                        : ''
                    }
                    children={
                      <span style={{ float: 'right' }}>
                        <IconButton
                          sx={{ height: '18px', width: '18px', float: 'right' }}
                          onClick={() => deleteDocument(doc.documentId)}
                          disabled={
                            docType === DocumentNameType.APP_IMAGE &&
                            documents.length <= 1
                          }
                        >
                          <DeleteOutlinedIcon />
                        </IconButton>
                      </span>
                    }
                  />
                </div>
              )
            })}
          </Box>
          <Tooltips
            tooltipPlacement="right-end"
            tooltipText={
              (docType === DocumentNameType.APP_IMAGE &&
                documents.length === 3) ||
              (docType !== DocumentNameType.APP_IMAGE && documents.length === 1)
                ? t('content.changeDocuments.uploadButtonTooltip')
                : ''
            }
            children={
              <span>
                <Button
                  size="small"
                  variant="contained"
                  color="secondary"
                  onClick={() => {
                    setUploadDocsOverlayOpen(true)
                    setDocumentType(documentTypeId)
                  }}
                  sx={{ fontSize: '12px' }}
                  disabled={
                    (docType === DocumentNameType.APP_IMAGE &&
                      documents.length === 3) ||
                    (docType !== DocumentNameType.APP_IMAGE &&
                      documents.length === 1)
                  }
                >
                  {t('content.changeDocuments.uploadNewDocument')}
                </Button>
              </span>
            }
          />
          {docType !== DocumentNameType.ADDITIONAL_DETAILS && (
            <Divider sx={{ margin: '34px auto' }} />
          )}
        </Box>
      </div>
    )
  }

  const renderDropArea = (props: DropAreaProps) => {
    return <DropArea {...props} size="small" />
  }

  return (
    <main className="deactivate-main">
      <PageHeader2 title={app?.[0]?.title} topPage={true} headerHeight={200} />

      <section>
        <Typography mb={3} align="center" variant="body2">
          {app?.[0]?.title}
        </Typography>

        <Typography align="center" mb={3} variant="h2">
          {t('content.changeDocuments.headerTitle')}
        </Typography>

        <Typography variant="body2" align="center">
          {t('content.changeDocuments.description')}
        </Typography>
      </section>
      <section>
        <div className="main-container">
          <div className="main-row">
            <Dialog
              open={uploadDocsOverlayOpen}
              additionalModalRootStyles={{
                width: '60%',
              }}
            >
              <DialogHeader
                title={t('content.changeDocuments.uploadNewDocument')}
                intro={
                  <Typography variant="body2">
                    {t('content.changeDocuments.uploadNewDocumentDescription')}
                  </Typography>
                }
                closeWithIcon={true}
                onCloseWithIcon={() => {
                  setUploadDocsOverlayOpen(false)
                }}
              />
              <DialogContent
                sx={{
                  padding: '0px 120px 40px 120px',
                }}
              >
                <Controller
                  control={control}
                  name={'uploadDocument'}
                  render={({ field: { onChange: reactHookFormOnChange } }) => (
                    <Dropzone
                      onChange={(files) => {
                        reactHookFormOnChange(files[0]?.name)
                        trigger('uploadDocument')
                        onFileUpload(files[0])
                      }}
                      acceptFormat={
                        documentType === DocumentTypeId.APP_IMAGE
                          ? {
                              'image/png': [],
                              'image/jpeg': [],
                            }
                          : { 'application/pdf': [] }
                      }
                      maxFileSize={819200}
                      maxFilesToUpload={1}
                      enableDeleteOverlay={false}
                      DropArea={renderDropArea}
                      errorText={t(
                        'content.apprelease.appReleaseForm.fileSizeError'
                      )}
                    />
                  )}
                />
              </DialogContent>
            </Dialog>
            {data?.documents && (
              <>
                {renderdocs(
                  DocumentNameType.APP_IMAGE,
                  data.documents.APP_IMAGE,
                  DocumentTypeId.APP_IMAGE
                )}
                {renderdocs(
                  DocumentNameType.APP_TECHNICAL_INFORMATION,
                  data.documents.APP_TECHNICAL_INFORMATION,
                  DocumentTypeId.APP_TECHNICAL_INFORMATION
                )}
                {renderdocs(
                  DocumentNameType.APP_CONTRACT,
                  data.documents.APP_CONTRACT,
                  DocumentTypeId.APP_CONTRACT
                )}
                {renderdocs(
                  DocumentNameType.ADDITIONAL_DETAILS,
                  data.documents.ADDITIONAL_DETAILS,
                  DocumentTypeId.ADDITIONAL_DETAILS
                )}
              </>
            )}
          </div>
        </div>
        <hr
          style={{
            border: 0,
            borderTop: '1px solid #DCDCDC',
            marginTop: '80px',
          }}
        />
        <Box
          sx={{ position: 'relative', marginTop: '30px', textAlign: 'center' }}
        >
          <Button
            color="secondary"
            size="small"
            onClick={() => {
              navigate('/appOverview')
            }}
          >
            {t('global.actions.close')}
          </Button>
        </Box>
      </section>
    </main>
  )
}
