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

import { LogoGrayData } from 'cx-portal-shared-components'
import { useTranslation } from 'react-i18next'
import { useMemo } from 'react'
import { useSelector } from 'react-redux'
import {
  ConsentStatusEnum,
  useFetchDocumentByIdMutation,
} from 'features/appManagement/apiSlice'
import CommonValidateAndPublish from '../components/CommonValidateAndPublish'
import { serviceIdSelector } from 'features/serviceManagement/slice'
import {
  ReleaseProcessTypes,
  useFetchServiceStatusQuery,
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
  const [fetchDocumentById] = useFetchDocumentByIdMutation()
  const fetchServiceStatus = useFetchServiceStatusQuery(serviceId, {
    refetchOnMountOrArgChange: true,
  }).data
  const defaultValues = useMemo(() => {
    return {
      images: [LogoGrayData, LogoGrayData, LogoGrayData],
      connectedTableData: {
        head: ['Linked to your identity', 'Linked NOT to your identity'],
        body: [
          ['personal Information', 'Loreum personal Information'],
          ['Used Content', 'Loreum Used Content'],
          ['Catena-X Account Data', 'Loreum Catena-X Account Data'],
        ],
      },
      dataSecurityInformation: t('defaultValues.dataSecurityInformation'),
      conformityDocumentsDescription: t(
        'defaultValues.conformityDocumentsDescription'
      ),
      documentsDescription: t('defaultValues.documentsDescription'),
      providerTableData: {
        head: ['Homepage', 'E-Mail'],
        body: [
          [fetchServiceStatus?.providerUri],
          [fetchServiceStatus?.contactEmail],
        ],
      },
      cxTestRuns: [
        {
          agreementId: 'uuid',
          consentStatus: ConsentStatusEnum.ACTIVE,
          name: 'Test run A - done',
        },
        {
          agreementId: 'uuid',
          consentStatus: ConsentStatusEnum.ACTIVE,
          name: 'Test run B - done',
        },
      ],
    }
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
          fetchDocumentById={fetchDocumentById}
          showSubmitPage={showSubmitPage}
          submitData={submitService}
          detailsText={t('step4.appDetails')}
          longDescriptionTitleEN={t('step4.longDescriptionTitleEN')}
          longDescriptionTitleDE={t('step4.longDescriptionTitleDE')}
          connectedData={t('step4.connectedData')}
          conformityDocument={t('step4.conformityDocument')}
          dataSecurityInformation={t('step4.dataSecurityInformation')}
          documentsTitle={t('step4.documents')}
          providerInformation={t('step4.providerInformation')}
          consentTitle={t('step4.consent')}
          cxTestRunsTitle={t('step4.cxTestRuns')}
          error={{
            title: t('serviceReleaseForm.error.title'),
            message: t('serviceReleaseForm.error.message'),
          }}
          helpText={t('footerButtons.help')}
          submitButton={t('footerButtons.submit')}
          values={defaultValues}
        />
      )}
    </div>
  )
}
