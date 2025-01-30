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

import { useTranslation } from 'react-i18next'
import { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  serviceRedirectStatusSelector,
  serviceIdSelector,
  serviceReleaseStepIncrement,
} from 'features/serviceManagement/slice'
import {
  useUpdateServiceAgreementConsentsMutation,
  useFetchServiceStatusQuery,
  useFetchServiceAgreementDataQuery,
  useFetchServiceConsentDataQuery,
  useUpdateServiceDocumentUploadMutation,
  ReleaseProcessTypes,
  useFetchDocumentMutation,
} from 'features/serviceManagement/apiSlice'
import { setServiceStatus } from 'features/serviceManagement/actions'
import CommonContractAndConsent from '../components/CommonContractAndConsent'
import { useFetchFrameDocumentByIdMutation } from 'features/appManagement/apiSlice'
import { isStepCompleted } from '../OfferStepHelper'

export default function OfferContractAndConsent() {
  const { t } = useTranslation('servicerelease')
  const dispatch = useDispatch()
  const serviceId = useSelector(serviceIdSelector)
  const redirectStatus = useSelector(serviceRedirectStatusSelector)
  const hasDispatched = useRef(false)
  const fetchAgreementData = useFetchServiceAgreementDataQuery().data
  const fetchConsentData = useFetchServiceConsentDataQuery(serviceId ?? '').data
  const [updateAgreementConsents] = useUpdateServiceAgreementConsentsMutation()
  const [updateDocumentUpload] = useUpdateServiceDocumentUploadMutation()
  const { data: fetchServiceStatus, refetch } = useFetchServiceStatusQuery(
    serviceId ?? ' ',
    {
      refetchOnMountOrArgChange: true,
    }
  )
  const [fetchFrameDocumentById] = useFetchFrameDocumentByIdMutation()
  const [fetchDocumentById] = useFetchDocumentMutation()

  useEffect(() => {
    if (fetchServiceStatus) dispatch(setServiceStatus(fetchServiceStatus))
  }, [dispatch, fetchServiceStatus])

  useEffect(() => {
    if (hasDispatched.current) return
    if (
      fetchServiceStatus &&
      isStepCompleted(fetchServiceStatus, 3, redirectStatus)
    ) {
      dispatch(serviceReleaseStepIncrement())
      hasDispatched.current = true
    }
  }, [fetchServiceStatus, hasDispatched])

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
        getDocumentById={fetchDocumentById}
        fetchFrameDocumentById={fetchFrameDocumentById}
        helpUrl={
          '/documentation/?path=user%2F05.+Service%28s%29%2F02.+Service+Release+Process%2F03.+Terms%26Conditions.md'
        }
        imageFieldLabel={
          <>
            {t('step3.uploadImageConformity')}
            <span style={{ color: 'red' }}> *</span>
          </>
        }
        onRefetch={() => refetch()}
      />
    </div>
  )
}
