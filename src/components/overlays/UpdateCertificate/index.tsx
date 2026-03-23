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

import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch } from 'react-redux'
import {
  Button,
  Chip,
  DialogActions,
  DialogContent,
  DialogHeader,
  DropArea,
  type DropAreaProps,
  LoadingButton,
  Typography,
  SelectList,
  Tooltips,
  Dialog,
} from '@arena2036/portal-shared-components-construct-x'
import { Box } from '@mui/material'
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline'
import PendingOutlinedIcon from '@mui/icons-material/PendingOutlined'
import { OVERLAYS } from 'types/Constants'
import { closeOverlay, show } from 'features/control/overlay'
import type { store } from 'features/store'
import { Dropzone } from '../../shared/basic/Dropzone'
import { error } from 'services/NotifyService'
import {
  useAddCertificateMutation,
  useFetchCertificateTypesQuery,
} from 'features/certification/certificationApiSlice'
import './style.scss'

export type CertificateType = {
  title: string
}

export default function UpdateCertificate() {
  const { t } = useTranslation()
  const dispatch = useDispatch<typeof store.dispatch>()
  const [uploadedFile, setUploadedFile] = useState<File>()
  const [submitClicked, setSubmitClicked] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(false)
  const [certificatetypesArr, setCertificatetypesArr] = useState<
    CertificateType[]
  >([])
  const [selectedCertificate, setSelectedCertificate] = useState<string>('')

  const [addCertificate] = useAddCertificateMutation()
  const { data: certificateTypes } = useFetchCertificateTypesQuery()

  useEffect(() => {
    certificateTypes?.map((item) => {
      setCertificatetypesArr((oldArray: CertificateType[]) => [
        ...oldArray,
        { title: item },
      ])
      return null
    })
    certificateTypes?.length === 1 &&
      setSelectedCertificate(certificateTypes?.[0] ?? '')
  }, [certificateTypes])

  const renderDropArea = (props: DropAreaProps) => {
    return <DropArea {...props} size="small" />
  }

  const handleSubmit = async () => {
    setLoading(true)
    try {
      if (uploadedFile) {
        const data = {
          credentialType: 'DISMANTLER_CERTIFICATE', //static for now as we have only one certificate
          document: uploadedFile,
        }
        await addCertificate(data).unwrap()
        setSubmitClicked(true)
      }
      // Add an ESLint exception until there is a solution
      // eslint-disable-next-line
    } catch (err: any) {
      setLoading(false)
      error(
        t('content.certificates.updateCertificate.error') +
          err.data.errors.unknown[0],
        '',
        ''
      )
    }
  }

  return (
    <>
      {submitClicked ? (
        <Dialog open={true} maxWidth="md">
          <DialogHeader
            {...{
              title: t('content.certificates.successCertificate.title'),
              intro: '',
              closeWithIcon: true,
              onCloseWithIcon: () => dispatch(show(OVERLAYS.NONE, '')),
            }}
          />

          <DialogContent>
            <div className="success-certificate">
              <Box
                sx={{
                  display: 'flex',
                  backgroundColor: '#f5f9ee',
                  padding: '5px 20px',
                  marginBottom: '10px',
                }}
              >
                <CheckCircleOutlineIcon
                  sx={{
                    color: '#00aa55',
                    margin: '2px 20px 0 0',
                  }}
                />
                <Typography
                  variant="body3"
                  sx={{
                    lineHeight: '20px',
                    height: '18px',
                    margin: '2px 0',
                  }}
                >
                  {t('content.certificates.successCertificate.fileUpload')}
                </Typography>
                <Chip
                  color="success"
                  variant="filled"
                  label={t('content.certificates.successCertificate.completed')}
                  size="small"
                  withIcon={false}
                  sx={{
                    marginRight: '0 !important',
                    margin: '0 auto',
                  }}
                />
              </Box>
              <Typography variant="h5" className="nextStep">
                {t('content.certificates.successCertificate.nextSteps')}
              </Typography>
              <Box
                sx={{
                  display: 'flex',
                  backgroundColor: '#fff7ec',
                  padding: '5px 20px',
                  marginBottom: '10px',
                }}
              >
                <PendingOutlinedIcon
                  sx={{
                    color: '#b18258',
                    margin: '2px 20px 0 0',
                  }}
                />
                <Typography
                  variant="body3"
                  sx={{
                    lineHeight: '20px',
                    height: '18px',
                    margin: '2px 0',
                  }}
                >
                  {t('content.certificates.successCertificate.verification')}
                </Typography>
                <Chip
                  color="warning"
                  variant="filled"
                  label={t('content.certificates.successCertificate.pending')}
                  size="small"
                  withIcon={false}
                  sx={{
                    marginRight: '0 !important',
                    margin: '0 auto',
                  }}
                />
              </Box>
              <Typography variant="caption3" className="queryDescription">
                {t('content.certificates.successCertificate.queryDescription')}
              </Typography>
              <Typography
                variant="caption3"
                sx={{
                  lineHeight: '20px',
                  margin: '2px 0',
                }}
              >
                {t('content.certificates.successCertificate.email')}
              </Typography>
            </div>
          </DialogContent>
          <DialogActions>
            <Button variant="outlined" onClick={() => dispatch(closeOverlay())}>
              {t('global.actions.close')}
            </Button>
          </DialogActions>
        </Dialog>
      ) : (
        <>
          <DialogHeader
            {...{
              title: t('content.certificates.updateCertificate.title'),
              intro: t('content.certificates.updateCertificate.description'),
              closeWithIcon: true,
              onCloseWithIcon: () => dispatch(show(OVERLAYS.NONE, '')),
            }}
          />

          <DialogContent>
            <div className="update-certificate">
              {certificatetypesArr?.length && (
                <Tooltips
                  additionalStyles={{
                    display:
                      certificatetypesArr.length === 1 ? 'block' : 'none',
                  }}
                  tooltipPlacement="bottom-end"
                  tooltipText={t(
                    'content.certificates.updateCertificate.noOptionsMessage'
                  )}
                  children={
                    <span>
                      <SelectList
                        error={!selectedCertificate}
                        helperText={t(
                          'content.certificates.updateCertificate.certificateTypeError'
                        )}
                        defaultValue={certificatetypesArr[0]}
                        items={certificatetypesArr}
                        label={t(
                          'content.certificates.updateCertificate.selectLabel'
                        )}
                        placeholder={
                          certificatetypesArr.length === 1
                            ? certificatetypesArr[0].title
                            : t(
                                'content.certificates.updateCertificate.placeholder'
                              )
                        }
                        onChangeItem={(e) => {
                          setSelectedCertificate(e.title as string)
                        }}
                        keyTitle={'title'}
                        disabled={certificatetypesArr.length === 1}
                      />
                    </span>
                  }
                />
              )}
              <Typography variant="h4" className="uploadDocumentTitle">
                {t(
                  'content.certificates.updateCertificate.uploadDocumentTitle'
                )}
              </Typography>
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
              <div className="note">
                <Typography variant="label2">
                  {t('content.certificates.updateCertificate.note')}
                </Typography>
              </div>
            </div>
          </DialogContent>
          <DialogActions>
            <Button variant="outlined" onClick={() => dispatch(closeOverlay())}>
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
                disabled={uploadedFile === undefined || !selectedCertificate}
              >
                {t('global.actions.submit')}
              </Button>
            )}
          </DialogActions>
        </>
      )}
    </>
  )
}
