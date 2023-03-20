/********************************************************************************
 * Copyright (c) 2021, 2023 BMW Group AG
 * Copyright (c) 2021, 2023 Contributors to the Eclipse Foundation
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

import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { useDispatch } from 'react-redux'
import { decrement, increment } from 'features/appManagement/slice'
import {
  AgreementStatusType,
  AgreementType,
  ConsentStatusEnum,
  ConsentType,
  DocumentTypeId,
  UpdateAgreementConsentType,
  useDeleteAppReleaseDocumentMutation,
} from 'features/appManagement/apiSlice'
import { setAppStatus } from 'features/appManagement/actions'
import SnackbarNotificationWithButtons from '../components/SnackbarNotificationWithButtons'
import { ConnectorFormInputField } from '../components/ConnectorFormInputField'
import ReleaseStepHeader from '../components/ReleaseStepHeader'
import {
  PageSnackbar,
  Typography,
  UploadFileStatus,
  UploadStatus,
} from 'cx-portal-shared-components'
import ConnectorFormInputFieldImage from '../components/ConnectorFormInputFieldImage'
import { download } from 'utils/downloadUtils'
import {
  AppStatusDataState,
  ServiceStatusDataState,
} from 'features/appManagement/types'
import { Grid } from '@mui/material'
import { ErrorMessage } from '@hookform/error-message'

type AgreementDataType = {
  agreementId: string
  name: string
  consentStatus?: ConsentStatusEnum
  documentId: string
}[]

type CommonConsentType = {
  stepperTitle: string
  stepperDescription: string
  checkBoxMandatoryText: string
  imageFieldLabel: string
  pageSnackbarDescription: string
  pageNotificationObject: {
    title: string
    description: string
  }
  imageFieldNoDescription: string
  imageFieldNote: string
  imageFieldRequiredText: string
  id: string
  fetchAgreementData: AgreementType[]
  fetchConsentData?: ConsentType
  updateAgreementConsents?: (obj: UpdateAgreementConsentType) => any
  updateDocumentUpload?: (obj: {
    appId: string
    documentTypeId: DocumentTypeId
    body: {
      file: File
    }
  }) => any
  fetchStatusData: AppStatusDataState | ServiceStatusDataState | undefined
  getDocumentById?: (id: string) => any
}

export default function CommonContractAndConsent({
  stepperTitle,
  stepperDescription,
  checkBoxMandatoryText,
  imageFieldLabel,
  pageSnackbarDescription,
  pageNotificationObject,
  imageFieldNoDescription,
  imageFieldNote,
  imageFieldRequiredText,
  id,
  fetchAgreementData,
  fetchConsentData,
  updateAgreementConsents,
  updateDocumentUpload,
  fetchStatusData,
  getDocumentById,
}: CommonConsentType) {
  const { t } = useTranslation()
  const [contractNotification, setContractNotification] = useState(false)
  const [contractSnackbar, setContractSnackbar] = useState<boolean>(false)
  const dispatch = useDispatch()
  const [agreementData, setAgreementData] = useState<AgreementDataType>([])
  const [defaultValue, setDefaultValue] = useState<ConsentType>({
    agreements: [],
  })
  const [deleteSuccess, setDeleteSuccess] = useState(false)

  const [deleteAppReleaseDocument, deleteResponse] =
    useDeleteAppReleaseDocumentMutation()

  useEffect(() => {
    deleteResponse.isSuccess && setDeleteSuccess(true)
  }, [deleteResponse])

  const defaultValues = useMemo(() => {
    return {
      agreements: defaultValue,
      uploadImageConformity:
        fetchStatusData?.documents?.CONFORMITY_APPROVAL_BUSINESS_APPS || null,
    }
  }, [fetchStatusData, defaultValue])

  const {
    handleSubmit,
    control,
    trigger,
    formState: { errors, isValid },
    reset,
    getValues,
    setValue,
  } = useForm({
    defaultValues: defaultValues,
    mode: 'onChange',
  })

  const uploadImageConformityValue = getValues().uploadImageConformity
  const defaultuploadImageConformity = useMemo(
    () => defaultValues.uploadImageConformity,
    [defaultValues]
  )

  const setFileStatus = useCallback(
    (fieldName: Parameters<typeof setValue>[0], status: UploadFileStatus) => {
      const value = getValues(fieldName)
      if (value)
        setValue(fieldName, {
          id: value.id,
          name: value.name,
          size: value.size,
          status,
        } as any)
    },
    [getValues, setValue]
  )

  useEffect(() => {
    if (fetchStatusData) dispatch(setAppStatus(fetchStatusData))
  }, [dispatch, fetchStatusData])

  const loadData = useCallback(() => {
    const fetchConsent = fetchConsentData?.agreements.map(
      (item: AgreementStatusType) => ({
        ...item,
        consentStatus: item.consentStatus === ConsentStatusEnum.ACTIVE,
      })
    )

    const consentAgreementData: any =
      fetchAgreementData &&
      fetchConsent &&
      fetchAgreementData?.map((item: AgreementType, index: number) =>
        Object.assign({}, item, fetchConsent[index])
      )

    fetchAgreementData && setAgreementData(consentAgreementData)

    const defaultCheckboxData = consentAgreementData?.reduce(
      (data: ConsentType, item: AgreementStatusType) => {
        return { ...data, [item.agreementId]: item.consentStatus }
      },
      {}
    )

    setDefaultValue({ ...defaultCheckboxData, agreements: agreementData })
    reset({ ...defaultCheckboxData, agreements: agreementData })
  }, [agreementData, fetchAgreementData, fetchConsentData, reset])

  useEffect(() => {
    if (!agreementData || agreementData.length === 0) loadData()
  }, [loadData, agreementData])

  const uploadDocumentApi = useCallback(
    async (documentTypeId: DocumentTypeId, file: File) => {
      const data = {
        appId: id,
        documentTypeId: documentTypeId,
        body: { file },
      }
      if (updateDocumentUpload) await updateDocumentUpload(data).unwrap()
    },
    [id, updateDocumentUpload]
  )

  useEffect(() => {
    if (
      defaultuploadImageConformity &&
      Object.keys(defaultuploadImageConformity).length > 0
    ) {
      setValue('uploadImageConformity', {
        id:
          defaultuploadImageConformity &&
          defaultuploadImageConformity[0]?.documentId,
        name:
          defaultuploadImageConformity &&
          defaultuploadImageConformity[0]?.documentName,
        status: UploadStatus.UPLOAD_SUCCESS,
      })
      setFileStatus('uploadImageConformity', UploadStatus.UPLOAD_SUCCESS)
    }
  }, [defaultuploadImageConformity, setFileStatus, setValue])

  useEffect(() => {
    const value = getValues().uploadImageConformity

    if (Array.isArray(value)) {
      setValue('uploadImageConformity', {
        id:
          defaultuploadImageConformity &&
          defaultuploadImageConformity[0]?.documentId,
        name:
          defaultuploadImageConformity &&
          defaultuploadImageConformity[0]?.documentName,
        status: UploadStatus.UPLOAD_SUCCESS,
      })
      setFileStatus('uploadImageConformity', UploadStatus.UPLOAD_SUCCESS)
    }

    if (value && !Array.isArray(value) && !('status' in value)) {
      setFileStatus('uploadImageConformity', UploadStatus.UPLOADING)

      uploadDocumentApi(
        DocumentTypeId.CONFORMITY_APPROVAL_BUSINESS_APPS,
        uploadImageConformityValue
      )
        .then(() =>
          setFileStatus('uploadImageConformity', UploadStatus.UPLOAD_SUCCESS)
        )
        .catch(() =>
          setFileStatus('uploadImageConformity', UploadStatus.UPLOAD_ERROR)
        )
    }
  }, [
    uploadImageConformityValue,
    setFileStatus,
    setValue,
    uploadDocumentApi,
    defaultuploadImageConformity,
    getValues,
  ])

  const onContractConsentSubmit = async (data: Object, buttonLabel: string) => {
    const validateFields = await trigger([
      'agreements',
      'uploadImageConformity',
    ])
    if (validateFields) {
      handleSave(data, buttonLabel)
    }
  }

  const handleSave = async (data: Object, buttonLabel: string) => {
    const filteredData = Object.fromEntries(
      Object.entries(data).filter(([i, item]) => typeof item === 'boolean')
    )

    const updateAgreementData = Object.entries(filteredData).map((entry) =>
      Object.assign(
        {},
        {
          agreementId: entry[0],
          consentStatus:
            entry[1] === true
              ? ConsentStatusEnum.ACTIVE
              : ConsentStatusEnum.INACTIVE,
        }
      )
    )

    const updateData: UpdateAgreementConsentType = {
      appId: id,
      body: {
        agreements: updateAgreementData,
      },
    }
    if (updateAgreementConsents)
      await updateAgreementConsents(updateData)
        .unwrap()
        .then(() => {
          buttonLabel === 'saveAndProceed' && dispatch(increment())
          buttonLabel === 'save' && setContractSnackbar(true)
        })
        .catch(() => {
          setContractNotification(true)
        })
  }

  const onBackIconClick = () => {
    if (fetchStatusData) dispatch(setAppStatus(fetchStatusData))
    dispatch(decrement())
  }

  const handleDownload = async (documentName: string, documentId: string) => {
    if (getDocumentById)
      try {
        const response = await getDocumentById(documentId).unwrap()

        const fileType = response.headers.get('content-type')
        const file = response.data

        return download(file, fileType, documentName)
      } catch (error) {
        console.error(error, 'ERROR WHILE FETCHING DOCUMENT')
      }
  }

  return (
    <div className="contract-consent">
      <ReleaseStepHeader
        title={stepperTitle}
        description={stepperDescription}
      />
      <form className="header-description">
        {agreementData?.map((item) => (
          <div className="form-field" key={item.agreementId}>
            <Grid container spacing={1.5}>
              <Grid md={1}>
                <ConnectorFormInputField
                  {...{
                    control,
                    trigger,
                    errors,
                    name: item.agreementId,
                    defaultValues: item.consentStatus,
                    label: '',
                    type: 'checkbox',
                    rules: {
                      required: {
                        value: true,
                        message: `${item.name} ${checkBoxMandatoryText}`,
                      },
                    },
                  }}
                />
              </Grid>
              <Grid md={11} sx={{ marginTop: '8px' }}>
                {item.documentId ? (
                  <span
                    className={item.documentId ? 'agreement-span' : ''}
                    onClick={() => handleDownload(item.name, item.documentId)}
                  >
                    {item.name}
                  </span>
                ) : (
                  <span>{item.name}</span>
                )}

                <ErrorMessage
                  errors={errors}
                  name={item.agreementId}
                  render={({ message }) => (
                    <Typography variant="body2" className="file-error-msg">
                      {message}
                    </Typography>
                  )}
                />
              </Grid>
            </Grid>
          </div>
        ))}
        <ConnectorFormInputFieldImage
          {...{
            control,
            trigger,
            errors,
          }}
          name="uploadImageConformity"
          acceptFormat={{
            'application/pdf': ['.pdf'],
          }}
          label={imageFieldLabel}
          noteDescription={imageFieldNoDescription}
          note={imageFieldNote}
          requiredText={imageFieldRequiredText}
          handleDownload={handleDownload}
          handleDelete={(documentId: string) => {
            //deleteAppReleaseDocument(documentId)
          }}
        />
      </form>
      <SnackbarNotificationWithButtons
        pageNotification={contractNotification}
        pageSnackbar={contractSnackbar}
        pageSnackBarDescription={pageSnackbarDescription}
        pageNotificationsObject={pageNotificationObject}
        setPageNotification={setContractNotification}
        setPageSnackbar={setContractSnackbar}
        onBackIconClick={onBackIconClick}
        onSave={handleSubmit((data) => onContractConsentSubmit(data, 'save'))}
        onSaveAndProceed={handleSubmit((data) =>
          onContractConsentSubmit(data, 'saveAndProceed')
        )}
        isValid={isValid}
      />
      <PageSnackbar
        autoClose
        description={t(
          'content.apprelease.contractAndConsent.documentDeleteSuccess'
        )}
        open={deleteSuccess}
        severity={'success'}
        showIcon
      />
    </div>
  )
}
