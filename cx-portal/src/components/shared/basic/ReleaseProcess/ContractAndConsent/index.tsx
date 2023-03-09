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

import { useTranslation } from 'react-i18next'
import { useForm } from 'react-hook-form'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  appIdSelector,
  decrement,
  increment,
} from 'features/appManagement/slice'
import {
  AgreementStatusType,
  ConsentType,
  UpdateAgreementConsentType,
  useFetchAgreementDataQuery,
  useFetchConsentDataQuery,
  useUpdateAgreementConsentsMutation,
  useFetchAppStatusQuery,
  useUpdateDocumentUploadMutation,
  useFetchNewDocumentByIdMutation,
} from 'features/appManagement/apiSlice'
import { setAppStatus } from 'features/appManagement/actions'
import SnackbarNotificationWithButtons from '../SnackbarNotificationWithButtons'
import { ConnectorFormInputField } from '../components/ConnectorFormInputField'
import ReleaseStepHeader from '../components/ReleaseStepHeader'
import { UploadFileStatus, UploadStatus } from 'cx-portal-shared-components'
import ConnectorFormInputFieldImage from '../components/ConnectorFormInputFieldImage'
import { download } from 'utils/downloadUtils'

type AgreementType = {
  agreementId: string
  name: string
  consentStatus?: boolean | string
}[]

export default function ContractAndConsent() {
  const { t } = useTranslation()
  const [contractNotification, setContractNotification] = useState(false)
  const [contractSnackbar, setContractSnackbar] = useState<boolean>(false)
  const dispatch = useDispatch()
  const appId = useSelector(appIdSelector)
  const fetchAgreementData = useFetchAgreementDataQuery().data
  const fetchConsentData = useFetchConsentDataQuery(appId ?? '').data
  const [updateAgreementConsents] = useUpdateAgreementConsentsMutation()
  const [updateDocumentUpload] = useUpdateDocumentUploadMutation()
  const [agreementData, setAgreementData] = useState<AgreementType>([])
  const [defaultValue, setDefaultValue] = useState<ConsentType>({
    agreements: [],
  })
  const fetchAppStatus = useFetchAppStatusQuery(appId ?? '', {
    refetchOnMountOrArgChange: true,
  }).data
  const [getDocumentById] = useFetchNewDocumentByIdMutation()

  useEffect(() => {
    dispatch(setAppStatus(fetchAppStatus))
  }, [dispatch, fetchAppStatus])

  useEffect(() => {
    loadData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fetchConsentData, fetchAgreementData])

  const loadData = () => {
    const fetchConsent = fetchConsentData?.agreements.map(
      (item: AgreementStatusType) => ({
        ...item,
        consentStatus: item.consentStatus === 'ACTIVE',
      })
    )

    const consentAgreementData: any =
      fetchAgreementData &&
      fetchConsent &&
      fetchAgreementData?.map((item, index: number) =>
        Object.assign({}, item, fetchConsent[index])
      )

    fetchAgreementData && setAgreementData(consentAgreementData)

    const defaultCheckboxData = consentAgreementData?.reduce(
      (data: any, item: AgreementStatusType) => {
        return { ...data, [item.agreementId]: item.consentStatus }
      },
      {}
    )

    setDefaultValue({ ...defaultCheckboxData, agreements: agreementData })
    reset({ ...defaultCheckboxData, agreements: agreementData })
  }

  const defaultValues = {
    agreements: defaultValue,
    uploadImageConformity:
      fetchAppStatus?.documents?.CONFORMITY_APPROVAL_BUSINESS_APPS || null,
  }

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
  const defaultuploadImageConformity = defaultValues.uploadImageConformity

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [defaultuploadImageConformity])

  const setFileStatus = (
    fieldName: Parameters<typeof setValue>[0],
    status: UploadFileStatus
  ) => {
    const value = getValues(fieldName)

    setValue(fieldName, {
      id: value.id,
      name: value.name,
      size: value.size,
      status,
    } as any)
  }

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

      uploadDocumentApi(appId, 'CONFORMITY_APPROVAL_BUSINESS_APPS', value)
        .then(() =>
          setFileStatus('uploadImageConformity', UploadStatus.UPLOAD_SUCCESS)
        )
        .catch(() =>
          setFileStatus('uploadImageConformity', UploadStatus.UPLOAD_ERROR)
        )
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [uploadImageConformityValue])

  const onContractConsentSubmit = async (data: any, buttonLabel: string) => {
    const validateFields = await trigger([
      'agreements',
      'uploadImageConformity',
    ])
    if (validateFields) {
      handleSave(data, buttonLabel)
    }
  }

  const handleSave = async (data: any, buttonLabel: string) => {
    const filteredData = Object.fromEntries(
      Object.entries(data).filter(([i, item]) => typeof item === 'boolean')
    )

    const updateAgreementData = Object.entries(filteredData).map((entry) =>
      Object.assign(
        {},
        {
          agreementId: entry[0],
          consentStatus: entry[1] === true ? 'ACTIVE' : 'INACTIVE',
        }
      )
    )

    const updateData: UpdateAgreementConsentType = {
      appId: appId,
      body: {
        agreements: updateAgreementData,
      },
    }

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

  const uploadDocumentApi = async (
    appId: string,
    documentTypeId: string,
    file: any
  ) => {
    const data = {
      appId: appId,
      documentTypeId: documentTypeId,
      body: { file },
    }

    await updateDocumentUpload(data).unwrap()
  }

  const onBackIconClick = () => {
    dispatch(setAppStatus(fetchAppStatus))
    dispatch(decrement())
  }

  const handleDownload = async (documentName: string, documentId: string) => {
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
        title={t('content.apprelease.contractAndConsent.headerTitle')}
        description={t(
          'content.apprelease.contractAndConsent.headerDescription'
        )}
      />
      <form className="header-description">
        {agreementData?.map((item) => (
          <div className="form-field" key={item.agreementId}>
            <ConnectorFormInputField
              {...{
                control,
                trigger,
                errors,
                name: item.agreementId,
                defaultValues: item.consentStatus,
                label: item.name,
                type: 'checkbox',
                rules: {
                  required: {
                    value: true,
                    message: `${item.name} ${t(
                      'content.apprelease.appReleaseForm.isMandatory'
                    )}`,
                  },
                },
              }}
            />
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
          label={
            t('content.apprelease.contractAndConsent.uploadImageConformity') +
            ' *'
          }
          noteDescription={t(
            'content.apprelease.appReleaseForm.OnlyOneFileAllowed'
          )}
          note={t('content.apprelease.appReleaseForm.note')}
          requiredText={t(
            'content.apprelease.appReleaseForm.fileUploadIsMandatory'
          )}
          handleDownload={handleDownload}
        />
      </form>
      <SnackbarNotificationWithButtons
        pageNotification={contractNotification}
        pageSnackbar={contractSnackbar}
        pageSnackBarDescription={t(
          'content.apprelease.appReleaseForm.dataSavedSuccessMessage'
        )}
        pageNotificationsObject={{
          title: t('content.apprelease.appReleaseForm.error.title'),
          description: t('content.apprelease.appReleaseForm.error.message'),
        }}
        setPageNotification={setContractNotification}
        setPageSnackbar={setContractSnackbar}
        onBackIconClick={onBackIconClick}
        onSave={handleSubmit((data) => onContractConsentSubmit(data, 'save'))}
        onSaveAndProceed={handleSubmit((data) =>
          onContractConsentSubmit(data, 'saveAndProceed')
        )}
        isValid={isValid}
      />
    </div>
  )
}
