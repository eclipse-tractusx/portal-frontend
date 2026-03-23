/********************************************************************************
 * Copyright (c) 2023 Mercedes-Benz Group AG and BMW Group AG
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

import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import {
  type ReactElement,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react'
import { useDispatch } from 'react-redux'
import {
  decrement,
  increment,
  setAppRedirectStatus,
} from 'features/appManagement/slice'
import {
  type AgreementStatusType,
  type AgreementType,
  ConsentStatusEnum,
  type ConsentType,
  DocumentTypeId,
  type UpdateAgreementConsentType,
  useDeleteAppReleaseDocumentMutation,
} from 'features/appManagement/apiSlice'
import { setAppStatus } from 'features/appManagement/actions'
import SnackbarNotificationWithButtons from '../components/SnackbarNotificationWithButtons'
import { ConnectorFormInputField } from '../components/ConnectorFormInputField'
import ReleaseStepHeader from '../components/ReleaseStepHeader'
import {
  PageSnackbar,
  Typography,
  type UploadFileStatus,
  UploadStatus,
} from '@arena2036/portal-shared-components-construct-x'
import ConnectorFormInputFieldImage from '../components/ConnectorFormInputFieldImage'
import { download } from 'utils/downloadUtils'
import type { AppStatusDataState } from 'features/appManagement/types'
import { Grid } from '@mui/material'
import { ErrorMessage } from '@hookform/error-message'
import type { ServiceStatusDataState } from 'features/serviceManagement/types'
import {
  ReleaseProcessTypes,
  useDeleteDocumentMutation,
} from 'features/serviceManagement/apiSlice'
import {
  serviceReleaseStepIncrement,
  serviceReleaseStepDecrement,
  setServiceRedirectStatus,
} from 'features/serviceManagement/slice'
import { ButtonLabelTypes } from '..'
import { error, success } from 'services/NotifyService'

type AgreementDataType = {
  agreementId: string
  name: string
  consentStatus?: ConsentStatusEnum
  documentId: string
  mandatory: boolean
}[]

type CommonConsentType = {
  type: string
  stepperTitle: string
  stepperDescription: string
  checkBoxMandatoryText: string
  imageFieldLabel?: ReactElement
  pageSnackbarDescription: string
  pageNotificationObject: {
    title: string
    description: string
  }
  imageFieldNoDescription: string
  imageFieldNote: string
  imageFieldRequiredText: string
  id: string
  helpUrl: string
  fetchAgreementData: AgreementType[]
  fetchConsentData?: ConsentType
  // Add an ESLint exception until there is a solution
  // eslint-disable-next-line
  updateAgreementConsents?: (obj: UpdateAgreementConsentType) => any
  updateDocumentUpload?: (obj: {
    appId: string
    documentTypeId: DocumentTypeId
    body: {
      file: File
    }
    // Add an ESLint exception until there is a solution
    // eslint-disable-next-line
  }) => any
  fetchStatusData: AppStatusDataState | ServiceStatusDataState | undefined
  // Add an ESLint exception until there is a solution
  // eslint-disable-next-line
  getDocumentById?: (data: { appId: string; documentId: string }) => any
  // Add an ESLint exception until there is a solution
  // eslint-disable-next-line
  fetchFrameDocumentById?: (id: string) => any
  onRefetch?: () => void
}

export default function CommonContractAndConsent({
  type,
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
  updateAgreementConsents,
  updateDocumentUpload,
  fetchStatusData,
  getDocumentById,
  fetchFrameDocumentById,
  helpUrl,
  onRefetch,
}: CommonConsentType) {
  const { t } = useTranslation()
  const [contractNotification, setContractNotification] = useState(false)
  const [contractSnackbar, setContractSnackbar] = useState<boolean>(false)
  const dispatch = useDispatch()
  const [agreementData, setAgreementData] = useState<AgreementDataType>([])
  const [defaultValue, setDefaultValue] = useState<ConsentType>({
    agreements: [],
  })
  const [loading, setLoading] = useState<boolean>(false)
  const [deleteSuccess, setDeleteSuccess] = useState(false)
  const [deleteAppReleaseDocument, deleteResponse] =
    useDeleteAppReleaseDocumentMutation()

  const [deleteServiceDocumentSuccess, setDeleteServiceDocumentSuccess] =
    useState(false)
  const [deleteServiceReleaseDocument, deleteServiceReleaseDocumentResponse] =
    useDeleteDocumentMutation()

  useEffect(() => {
    if (deleteResponse.isSuccess) setDeleteSuccess(true)
    if (deleteResponse.isError) {
      resetField('uploadImageConformity', {
        defaultValue:
          fetchStatusData?.documents?.CONFORMITY_APPROVAL_BUSINESS_APPS ?? null,
      })
    }
  }, [deleteResponse])

  useEffect(() => {
    if (deleteServiceReleaseDocumentResponse.isSuccess)
      setDeleteServiceDocumentSuccess(true)
    if (deleteServiceReleaseDocumentResponse.isError) {
      resetField('uploadImageConformity', {
        defaultValue:
          fetchStatusData?.documents?.CONFORMITY_APPROVAL_SERVICES ?? null,
      })
    }
  }, [deleteServiceReleaseDocumentResponse])

  const deleteDocument = async (documentId: string) => {
    documentId &&
      (await (
        type === ReleaseProcessTypes.APP_RELEASE
          ? deleteAppReleaseDocument(documentId)
          : deleteServiceReleaseDocument(documentId)
      )
        .unwrap()
        .then(() => {
          success(
            t('content.apprelease.contractAndConsent.documentDeleteSuccess')
          )
        })
        // Add an ESLint exception until there is a solution
        // eslint-disable-next-line
        .catch((err: any) => {
          error(
            err.status === 409
              ? err.data.title
              : t('content.apprelease.appReleaseForm.errormessage'),
            '',
            err
          )
        }))
  }

  const defaultValues = useMemo(() => {
    return {
      agreements: defaultValue,
      uploadImageConformity:
        type === ReleaseProcessTypes.APP_RELEASE
          ? fetchStatusData?.documents?.CONFORMITY_APPROVAL_BUSINESS_APPS ||
            null
          : fetchStatusData?.documents?.CONFORMITY_APPROVAL_SERVICES || null,
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
    resetField,
  } = useForm({
    defaultValues,
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
        } as unknown)
    },
    [getValues, setValue]
  )

  useEffect(() => {
    if (fetchStatusData) dispatch(setAppStatus(fetchStatusData))
  }, [dispatch, fetchStatusData])

  const loadData = useCallback(() => {
    const fetchConsent = fetchStatusData?.agreements?.map((item) => ({
      ...item,
      consentStatus: item.consentStatus === ConsentStatusEnum.ACTIVE,
    }))
    // Add an ESLint exception until there is a solution
    // eslint-disable-next-line
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
  }, [agreementData, fetchAgreementData, fetchStatusData, reset])

  useEffect(() => {
    if (!agreementData || agreementData.length === 0) loadData()
  }, [loadData, agreementData])

  const uploadDocumentApi = useCallback(
    async (documentTypeId: DocumentTypeId, file: File) => {
      const data = {
        appId: id,
        documentTypeId,
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
        id: defaultuploadImageConformity?.[0]?.documentId,
        name: defaultuploadImageConformity?.[0]?.documentName,
        status: UploadStatus.UPLOAD_SUCCESS,
      })
      setFileStatus('uploadImageConformity', UploadStatus.UPLOAD_SUCCESS)
    }
  }, [defaultuploadImageConformity, setFileStatus, setValue])

  useEffect(() => {
    const value = getValues().uploadImageConformity

    if (Array.isArray(value)) {
      setValue('uploadImageConformity', {
        id: defaultuploadImageConformity?.[0]?.documentId,
        name: defaultuploadImageConformity?.[0]?.documentName,
        status: UploadStatus.UPLOAD_SUCCESS,
      })
      setFileStatus('uploadImageConformity', UploadStatus.UPLOAD_SUCCESS)
    }

    if (value && !Array.isArray(value) && !('status' in value)) {
      setFileStatus('uploadImageConformity', UploadStatus.UPLOADING)

      uploadDocumentApi(
        type === ReleaseProcessTypes.APP_RELEASE
          ? DocumentTypeId.CONFORMITY_APPROVAL_BUSINESS_APPS
          : DocumentTypeId.CONFORMITY_APPROVAL_SERVICES,
        uploadImageConformityValue
      )
        .then(() => {
          setFileStatus('uploadImageConformity', UploadStatus.UPLOAD_SUCCESS)
          type === ReleaseProcessTypes.SERVICE_RELEASE && onRefetch?.()
        })
        .catch(() => {
          setFileStatus('uploadImageConformity', UploadStatus.UPLOAD_ERROR)
        })
    }
  }, [
    uploadImageConformityValue,
    setFileStatus,
    setValue,
    uploadDocumentApi,
    defaultuploadImageConformity,
    getValues,
  ])

  const onContractConsentSubmit = async (
    data: Record<string, unknown>,
    buttonLabel: string
  ) => {
    const validateFields = await trigger([
      'agreements',
      'uploadImageConformity',
    ])
    if (validateFields) {
      void handleSave(data, buttonLabel)
    }
  }

  const handleSave = async (
    data: Record<string, unknown>,
    buttonLabel: string
  ) => {
    setLoading(true)
    const filteredData = Object.fromEntries(
      Object.entries(data).filter(([_i, item]) => typeof item === 'boolean')
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
          buttonLabel === ButtonLabelTypes.SAVE && setContractSnackbar(true)
          if (buttonLabel === ButtonLabelTypes.SAVE_AND_PROCEED) {
            type === ReleaseProcessTypes.APP_RELEASE && dispatch(increment())
            type === ReleaseProcessTypes.SERVICE_RELEASE &&
              dispatch(serviceReleaseStepIncrement())
          }
        })
        .catch(() => {
          setContractNotification(true)
        })
    setLoading(false)
  }

  const onBackIconClick = () => {
    if (fetchStatusData) dispatch(setAppStatus(fetchStatusData))
    if (type === ReleaseProcessTypes.APP_RELEASE) {
      dispatch(setAppRedirectStatus(false))
      dispatch(decrement())
    } else {
      dispatch(setServiceRedirectStatus(false))
      dispatch(serviceReleaseStepDecrement())
    }
  }

  const handleDownload = async (documentName: string, documentId: string) => {
    if (getDocumentById)
      try {
        const response = await getDocumentById({
          appId: id,
          documentId,
        }).unwrap()

        const fileType = response.headers.get('content-type')
        const file = response.data

        download(file, fileType, documentName)
      } catch (error) {
        console.error(error, 'ERROR WHILE FETCHING DOCUMENT')
      }
  }

  const handleFrameDocumentDownload = async (
    documentName: string,
    documentId: string
  ) => {
    if (fetchFrameDocumentById)
      try {
        const response = await fetchFrameDocumentById(documentId).unwrap()

        const fileType = response.headers.get('content-type')
        const file = response.data

        download(file, fileType, documentName)
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
              <Grid item md={1}>
                <ConnectorFormInputField
                  {...{
                    control,
                    trigger,
                    errors,
                    name: item.agreementId,
                    defaultValues:
                      item.consentStatus === ConsentStatusEnum.ACTIVE,
                    label: '',
                    type: 'checkbox',
                    rules: {
                      required: {
                        value: item.mandatory,
                        message: `${item.name} ${checkBoxMandatoryText}`,
                      },
                    },
                  }}
                />
              </Grid>
              <Grid item md={11} sx={{ marginTop: '8px' }}>
                {item.documentId ? (
                  <>
                    <span
                      className={item.documentId ? 'agreement-span' : ''}
                      onClick={() =>
                        handleFrameDocumentDownload(item.name, item.documentId)
                      }
                      onKeyDown={() => {
                        // do nothing
                      }}
                    >
                      {item.name}
                    </span>
                    <span style={{ color: 'red' }}>
                      {item.mandatory ? ' *' : ''}
                    </span>
                  </>
                ) : (
                  <>
                    <span>{item.name}</span>
                    <span style={{ color: 'red' }}>
                      {item.mandatory ? ' *' : ''}
                    </span>
                  </>
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
          handleDelete={(documentId: string) => deleteDocument(documentId)}
          isRequired={true}
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
        onSave={handleSubmit((data) =>
          onContractConsentSubmit(data, ButtonLabelTypes.SAVE)
        )}
        onSaveAndProceed={handleSubmit((data) =>
          onContractConsentSubmit(data, ButtonLabelTypes.SAVE_AND_PROCEED)
        )}
        isValid={isValid}
        loader={loading}
        helpUrl={helpUrl}
      />
      <PageSnackbar
        autoClose
        description={t(
          'content.apprelease.contractAndConsent.documentDeleteSuccess'
        )}
        open={deleteSuccess || deleteServiceDocumentSuccess}
        severity={'success'}
        showIcon
      />
    </div>
  )
}
