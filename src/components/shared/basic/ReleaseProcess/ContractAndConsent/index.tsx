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
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { appIdSelector } from 'features/appManagement/slice'
import {
  useFetchAgreementDataQuery,
  useFetchConsentDataQuery,
  useUpdateAgreementConsentsMutation,
  useFetchAppStatusQuery,
  useUpdateDocumentUploadMutation,
  useFetchNewDocumentByIdMutation,
  useFetchFrameDocumentByIdMutation,
} from 'features/appManagement/apiSlice'
import { setAppStatus } from 'features/appManagement/actions'
import CommonContractAndConsent from '../components/CommonContractAndConsent'
import { ReleaseProcessTypes } from 'features/serviceManagement/apiSlice'

export default function ContractAndConsent() {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const appId = useSelector(appIdSelector)
  const fetchAgreementData = useFetchAgreementDataQuery().data
  const fetchConsentData = useFetchConsentDataQuery(appId ?? '', {
    refetchOnMountOrArgChange: true,
  }).data
  const [updateAgreementConsents] = useUpdateAgreementConsentsMutation()
  const [updateDocumentUpload] = useUpdateDocumentUploadMutation()
  const { data: fetchAppStatus } = useFetchAppStatusQuery(appId ?? '', {
    refetchOnMountOrArgChange: true,
  })
  const [getDocumentById] = useFetchNewDocumentByIdMutation()
  const [fetchFrameDocumentById] = useFetchFrameDocumentByIdMutation()

  useEffect(() => {
    if (fetchAppStatus) dispatch(setAppStatus(fetchAppStatus))
  }, [dispatch, fetchAppStatus])

  return (
    <div className="contract-consent">
      <CommonContractAndConsent
        type={ReleaseProcessTypes.APP_RELEASE}
        stepperTitle={t('content.apprelease.contractAndConsent.headerTitle')}
        stepperDescription={t(
          'content.apprelease.contractAndConsent.headerDescription'
        )}
        checkBoxMandatoryText={t(
          'content.apprelease.appReleaseForm.isMandatory'
        )}
        imageFieldLabel={
          <>
            {t('content.apprelease.contractAndConsent.uploadImageConformity')}
            <span style={{ color: 'red' }}> *</span>
          </>
        }
        pageSnackbarDescription={t(
          'content.apprelease.appReleaseForm.dataSavedSuccessMessage'
        )}
        pageNotificationObject={{
          title: t('content.apprelease.appReleaseForm.error.title'),
          description: t('content.apprelease.appReleaseForm.error.message'),
        }}
        imageFieldNoDescription={t(
          'content.apprelease.appReleaseForm.OnlyOneFileAllowed'
        )}
        imageFieldNote={t('content.apprelease.appReleaseForm.note')}
        imageFieldRequiredText={t(
          'content.apprelease.appReleaseForm.fileUploadIsMandatory'
        )}
        id={appId ?? ''}
        fetchAgreementData={fetchAgreementData ?? []}
        fetchConsentData={fetchConsentData}
        updateAgreementConsents={updateAgreementConsents}
        updateDocumentUpload={updateDocumentUpload}
        fetchStatusData={fetchAppStatus ?? undefined}
        getDocumentById={getDocumentById}
        fetchFrameDocumentById={fetchFrameDocumentById}
        helpUrl={
          '/documentation/?path=user%2F04.+App%28s%29%2F02.+App+Release+Process'
        }
      />
    </div>
  )
}
