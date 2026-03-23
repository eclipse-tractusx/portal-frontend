/********************************************************************************
 * Copyright (c) 2023 BMW Group AG
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
import { useEffect, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { appIdSelector } from 'features/appManagement/slice'
import {
  ConsentStatusEnum,
  useFetchAppStatusQuery,
  useFetchAppRolesDataQuery,
  useSubmitappMutation,
  useFetchTechnicalUserProfilesQuery,
} from 'features/appManagement/apiSlice'
import { setAppStatus } from 'features/appManagement/actions'
import CommonValidateAndPublish from '../components/CommonValidateAndPublish'
import { ReleaseProcessTypes } from 'features/serviceManagement/apiSlice'
import { useFetchDocumentByIdMutation } from 'features/apps/apiSlice'

export default function ValidateAndPublish({
  showSubmitPage,
}: Readonly<{
  showSubmitPage: (val: boolean) => void
}>) {
  const dispatch = useDispatch()
  const { t } = useTranslation()
  const [submitapp] = useSubmitappMutation()
  const appId = useSelector(appIdSelector)
  const [fetchDocumentById] = useFetchDocumentByIdMutation()
  const { data: technicalUserProfiles } = useFetchTechnicalUserProfilesQuery(
    appId ?? ''
  )

  const fetchAppStatus = useFetchAppStatusQuery(appId ?? '', {
    refetchOnMountOrArgChange: true,
  }).data
  const { data } = useFetchAppRolesDataQuery(appId ?? '')

  useEffect(() => {
    if (fetchAppStatus) dispatch(setAppStatus(fetchAppStatus))
  }, [dispatch, fetchAppStatus])

  const defaultValues = useMemo(() => {
    return {
      images: [LogoGrayData, LogoGrayData, LogoGrayData],
      conformityDocumentsDescription: t(
        'content.apprelease.defaultValues.conformityDocumentsDescription'
      ),
      documentsDescription: t(
        'content.apprelease.defaultValues.documentsDescription'
      ),
      providerTableData: {
        head: ['App Provider', 'Homepage', 'E-Mail', 'Phone'],
        body: [
          [fetchAppStatus?.providerName],
          [fetchAppStatus?.providerUri],
          [fetchAppStatus?.contactEmail],
          [fetchAppStatus?.contactNumber],
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
  }, [fetchAppStatus, t])

  return (
    <div>
      <CommonValidateAndPublish
        type={ReleaseProcessTypes.APP_RELEASE}
        stepperHeader={t('content.apprelease.validateAndPublish.headerTitle')}
        stepperDescription={t(
          'content.apprelease.validateAndPublish.headerDescription'
        )}
        statusData={fetchAppStatus}
        id={appId}
        fetchDocumentById={fetchDocumentById}
        showSubmitPage={showSubmitPage}
        submitData={submitapp}
        techUserProfiles={technicalUserProfiles ?? []}
        validateAndPublishItemText="content.apprelease.validateAndPublish"
        detailsText={t('content.apprelease.validateAndPublish.appDetails')}
        longDescriptionTitleEN={t(
          'content.apprelease.validateAndPublish.longDescriptionTitleEN'
        )}
        longDescriptionTitleDE={t(
          'content.apprelease.validateAndPublish.longDescriptionTitleDE'
        )}
        conformityDocument={t(
          'content.apprelease.validateAndPublish.conformityDocument'
        )}
        documentsTitle={t('content.apprelease.validateAndPublish.documents')}
        providerInformation={t(
          'content.apprelease.validateAndPublish.providerInformation'
        )}
        consentTitle={t('content.apprelease.validateAndPublish.consent')}
        cxTestRunsTitle={t('content.apprelease.validateAndPublish.cxTestRuns')}
        error={{
          title: t('content.apprelease.appReleaseForm.error.title'),
          message: t('content.apprelease.appReleaseForm.error.message'),
        }}
        helpText={t('content.apprelease.footerButtons.help')}
        submitButton={t('content.apprelease.footerButtons.submit')}
        values={defaultValues}
        rolesData={data}
        helpUrl={
          '/documentation/?path=user%2F04.+App%28s%29%2F02.+App+Release+Process%2F05.+Verify+%26+Submit.md'
        }
      />
    </div>
  )
}
