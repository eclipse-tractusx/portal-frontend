/********************************************************************************
 * Copyright (c) 2021, 2023 Mercedes-Benz Group AG and BMW Group AG
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
import { serviceIdSelector } from 'features/serviceManagement/slice'
import {
  useUpdateServiceAgreementConsentsMutation,
  useFetchNewDocumentByIdMutation,
  useFetchServiceStatusQuery,
  useFetchServiceAgreementDataQuery,
  useFetchServiceConsentDataQuery,
  useUpdateServiceDocumentUploadMutation,
  ReleaseProcessTypes,
  useFetchFrameDocumentByIdMutation,
} from 'features/serviceManagement/apiSlice'
import { setServiceStatus } from 'features/serviceManagement/actions'
import CommonContractAndConsent from '../components/CommonContractAndConsent'

export default function OfferContractAndConsent() {
  const { t } = useTranslation('servicerelease')
  const dispatch = useDispatch()
  const serviceId = useSelector(serviceIdSelector)
  const fetchAgreementData = useFetchServiceAgreementDataQuery().data
  const fetchConsentData = useFetchServiceConsentDataQuery(serviceId ?? '').data
  const [updateAgreementConsents] = useUpdateServiceAgreementConsentsMutation()
  const [updateDocumentUpload] = useUpdateServiceDocumentUploadMutation()
  const fetchServiceStatus = useFetchServiceStatusQuery(serviceId ?? '', {
    refetchOnMountOrArgChange: true,
  }).data
  const [fetchFrameDocumentById] = useFetchFrameDocumentByIdMutation()
  const [getDocumentById] = useFetchNewDocumentByIdMutation()

  useEffect(() => {
    if (fetchServiceStatus) dispatch(setServiceStatus(fetchServiceStatus))
  }, [dispatch, fetchServiceStatus])

  return (
    <div className="contract-consent">
      <CommonContractAndConsent
        type={ReleaseProcessTypes.SERVICE_RELEASE}
        stepperTitle={t('step3.headerTitle')}
        stepperDescription={t('step3.headerDescription')}
        checkBoxMandatoryText={t('serviceReleaseForm.isMandatory')}
        pageSnackbarDescription={t(
          'serviceReleaseForm.dataSavedSuccessMessage'
        )}
        pageNotificationObject={{
          title: t('serviceReleaseForm.error.title'),
          description: t('serviceReleaseForm.error.message'),
        }}
        imageFieldNoDescription={t('serviceReleaseForm.OnlyOneFileAllowed')}
        imageFieldNote={t('serviceReleaseForm.note')}
        imageFieldRequiredText={t('serviceReleaseForm.fileUploadIsMandatory')}
        id={serviceId ?? ''}
        fetchAgreementData={fetchAgreementData ?? []}
        fetchConsentData={fetchConsentData}
        updateAgreementConsents={updateAgreementConsents}
        updateDocumentUpload={updateDocumentUpload}
        fetchStatusData={fetchServiceStatus ?? undefined}
        getDocumentById={getDocumentById}
        fetchFrameDocumentById={fetchFrameDocumentById}
        helpUrl={
          '/documentation/?path=user%2F05.+Service%28s%29%2F02.+Service+Release+Process'
        }
        imageFieldLabel={
          <>
            {t('step3.uploadImageConformity')}
            <span style={{ color: 'red' }}> *</span>
          </>
        }
      />
    </div>
  )
}
