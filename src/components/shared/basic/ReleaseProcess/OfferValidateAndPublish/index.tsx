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

import { LogoGrayData } from '@arena2036/portal-shared-components-construct-x'
import { useTranslation } from 'react-i18next'
import { useCallback, useMemo } from 'react'
import { useSelector } from 'react-redux'
import CommonValidateAndPublish from '../components/CommonValidateAndPublish'
import { serviceIdSelector } from 'features/serviceManagement/slice'
import {
  ReleaseProcessTypes,
  ServiceTypeIdsEnum,
  useFetchDocumentMutation,
  useFetchServiceStatusQuery,
  useFetchServiceTechnicalUserProfilesQuery,
  useSubmitServiceMutation,
} from 'features/serviceManagement/apiSlice'

export default function OfferValidateAndPublish({
  showSubmitPage,
}: {
  showSubmitPage: (val: boolean) => void
}) {
  const { t } = useTranslation('servicerelease')
  const [submitService] = useSubmitServiceMutation()
  const serviceId = useSelector(serviceIdSelector)
  const [fetchDocumentById] = useFetchDocumentMutation()
  const fetchServiceStatus = useFetchServiceStatusQuery(serviceId, {
    refetchOnMountOrArgChange: true,
  }).data

  const { data: technicalUserProfiles } =
    useFetchServiceTechnicalUserProfilesQuery(serviceId ?? '')

  const defaultValues = useMemo(() => {
    return {
      images: [LogoGrayData, LogoGrayData, LogoGrayData],
      conformityDocumentsDescription: t('step4.conformityDocumentsDescription'),
      documentsDescription: t('defaultValues.documentsDescription'),
      providerTableData: {
        head: ['Homepage', 'E-Mail'],
        body: [
          [fetchServiceStatus?.providerUri],
          [fetchServiceStatus?.contactEmail],
        ],
      },
    }
  }, [fetchServiceStatus, t])

  const getServiceTypes = useCallback(() => {
    const newArr: string[] = []
    fetchServiceStatus?.serviceTypeIds.forEach((serviceType: string) => {
      if (serviceType === ServiceTypeIdsEnum.CONSULTANCY_SERVICE)
        newArr.push(t('consultancyService'))
      if (serviceType === ServiceTypeIdsEnum.DATASPACE_SERVICE)
        newArr.push(t('dataspaceService'))
    })
    return newArr.join(', ')
  }, [fetchServiceStatus, t])

  return (
    <div>
      {fetchServiceStatus && (
        <CommonValidateAndPublish
          type={ReleaseProcessTypes.SERVICE_RELEASE}
          stepperHeader={t('step4.headerTitle')}
          stepperDescription={t('step4.headerDescription')}
          statusData={fetchServiceStatus}
          id={serviceId}
          techUserProfiles={technicalUserProfiles ?? []}
          fetchDocumentById={fetchDocumentById}
          showSubmitPage={showSubmitPage}
          submitData={submitService}
          detailsText={t('step4.appDetails')}
          longDescriptionTitleEN={t('step4.longDescriptionTitleEN')}
          longDescriptionTitleDE={t('step4.longDescriptionTitleDE')}
          documentsTitle={t('step4.documents')}
          providerInformation={t('step4.providerInformation')}
          consentTitle={t('step4.consent')}
          error={{
            title: t('serviceReleaseForm.error.title'),
            message: t('serviceReleaseForm.error.message'),
          }}
          helpText={t('footerButtons.help')}
          submitButton={t('footerButtons.submit')}
          values={defaultValues}
          serviceTypes={getServiceTypes()}
          helpUrl={
            '/documentation/?path=user%2F05.+Service%28s%29%2F02.+Service+Release+Process%2F05.+Verify+%26+Submit.md'
          }
          conformityDocument={t('step4.conformityDocument')}
        />
      )}
    </div>
  )
}
