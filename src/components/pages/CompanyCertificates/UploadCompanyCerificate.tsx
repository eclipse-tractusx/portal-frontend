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

import { useEffect, useState } from 'react'
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
  SelectList,
  Tooltips,
  Datepicker,
  type DateType,
} from '@arena2036/portal-shared-components-construct-x'
import { Dropzone } from '../../shared/basic/Dropzone'
import { error } from 'services/NotifyService'
import {
  type CertificateTypes,
  useFetchCertificateTypesQuery,
  useUploadCertificateMutation,
} from 'features/companyCertification/companyCertificateApiSlice'
import i18n from 'i18next'

interface UploadCompanyCertificateProps {
  readonly handleClose: () => void
}

export default function UploadCompanyCertificate({
  handleClose,
}: UploadCompanyCertificateProps): JSX.Element {
  const { t } = useTranslation()
  const [uploadedFile, setUploadedFile] = useState<File>()
  const [selectedCertificateType, setSelectedCertificateType] =
    useState<CertificateTypes>()
  const [date, setDate] = useState<DateType>(null)
  const [loading, setLoading] = useState<boolean>(false)
  const [dateError, setDateError] = useState<boolean>(false)
  const [uploadCertificate] = useUploadCertificateMutation()
  const { data: certificateTypes } = useFetchCertificateTypesQuery()
  const [uploaded, setUploaded] = useState<boolean>(false)

  useEffect(() => {
    if (certificateTypes != null && certificateTypes?.length > 0) {
      setSelectedCertificateType(certificateTypes[0])
    }
  }, [])

  const renderDropArea = (props: DropAreaProps): JSX.Element => {
    return <DropArea {...props} size="small" />
  }

  const handleSubmit = async (): Promise<void> => {
    setLoading(true)
    try {
      if (uploadedFile != null) {
        const data = {
          certificateType: selectedCertificateType?.certificateType ?? '',
          document: uploadedFile,
          expiryDate: date?.toISOString(),
        }
        await uploadCertificate(data).unwrap()
        setUploaded(true)
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
    <Dialog open={true}>
      <DialogHeader
        {...{
          title: uploaded
            ? t('content.companyCertificate.upload.successTitle')
            : t('content.companyCertificate.upload.title'),
          intro: uploaded
            ? ''
            : t('content.companyCertificate.upload.description'),
          closeWithIcon: true,
          onCloseWithIcon: () => {
            handleClose()
          },
        }}
      />
      {uploaded ? (
        <DialogContent>
          <div
            style={{
              marginBottom: '30px',
              textAlign: 'center',
            }}
          >
            <Typography variant="label1" className="title">
              {t('content.companyCertificate.upload.successDescription')}
            </Typography>
          </div>
        </DialogContent>
      ) : (
        <DialogContent>
          <div className="upload-certificate">
            <Typography
              variant="label3"
              sx={{
                display: 'block',
                marginBottom: '-10px',
              }}
              className="title"
            >
              {t('content.companyCertificate.upload.certificateTypeTitle')}
            </Typography>
            <SelectList
              error={selectedCertificateType == null}
              helperText={t(
                'content.companyCertificate.upload.certificateTypeError'
              )}
              defaultValue={certificateTypes?.[0]}
              items={certificateTypes ?? []}
              label={t(
                'content.companyCertificate.upload.certificateTypeLabel'
              )}
              placeholder={
                certificateTypes?.length === 1
                  ? certificateTypes[0].certificateType
                  : t(
                      'content.companyCertificate.upload.certificateTypePlaceholder'
                    )
              }
              onChangeItem={(e) => {
                setSelectedCertificateType(e as CertificateTypes)
              }}
              keyTitle={'certificateType'}
              disabled={certificateTypes?.length === 1}
            />
            <Typography
              variant="label3"
              sx={{
                display: 'block',
                marginBottom: '-10px',
              }}
              className="title"
            >
              {t('content.companyCertificate.upload.certificateSiteTitle')}
            </Typography>
            <Tooltips
              additionalStyles={{
                display: 'block',
              }}
              tooltipPlacement="bottom-end"
              tooltipText={t('content.companyCertificate.upload.comingsoon')}
            >
              <span>
                <SelectList
                  error={false}
                  helperText={t(
                    'content.companyCertificate.upload.certificateSiteError'
                  )}
                  defaultValue={{}}
                  items={[]}
                  label={t(
                    'content.companyCertificate.upload.certificateSiteLabel'
                  )}
                  placeholder={t(
                    'content.companyCertificate.upload.certificateSitePlaceholder'
                  )}
                  onChangeItem={() => {
                    // do nothing
                  }}
                  keyTitle={'certificateSite'}
                  disabled={true}
                />
              </span>
            </Tooltips>
            <Typography
              variant="label3"
              className="title"
              sx={{
                marginBottom: '15px',
                display: 'block',
              }}
            >
              {t('content.companyCertificate.upload.expiry')}
            </Typography>
            <Datepicker
              placeholder={t(
                'content.companyCertificate.upload.dateplaceholder'
              )}
              locale={i18n.language as 'en' | 'de'}
              error={dateError}
              helperText={
                dateError
                  ? t('content.companyCertificate.upload.dateError')
                  : ''
              }
              readOnly={false}
              inputFormat={'yyyy-MM-dd'}
              onChangeItem={(items: DateType) => {
                if (items != null && items < new Date()) {
                  setDateError(true)
                } else {
                  setDate(items)
                  setDateError(false)
                }
              }}
              label={''}
            />
            <Typography
              variant="label3"
              className="title"
              sx={{
                marginBottom: '15px',
                display: 'block',
              }}
            >
              {t('content.companyCertificate.upload.uploadDocumentTitle')}
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
                {t('content.companyCertificate.upload.note')}
              </Typography>
            </div>
          </div>
        </DialogContent>
      )}
      {uploaded ? (
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
      ) : (
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
              disabled={
                uploadedFile === undefined ||
                selectedCertificateType == null ||
                dateError
              }
            >
              {t('global.actions.submit')}
            </Button>
          )}
        </DialogActions>
      )}
    </Dialog>
  )
}
