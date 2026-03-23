/********************************************************************************
 * Copyright (c) 2024 BMW Group AG
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

import { Trans, useTranslation } from 'react-i18next'
import { Typography } from '@arena2036/portal-shared-components-construct-x'
import {
  type ApplicationChecklist,
  useFetchApplicationsQuery,
} from 'features/registration/registrationApiSlice'
import '../RegistrationReview.scss'
import { ProgressStatus } from 'features/admin/applicationRequestApiSlice'
import RegistrationStatusList from './RegistrationStatusList'

export type StatusTagIcon = {
  type?: 'confirmed' | 'pending' | 'declined' | 'label'
}

const RegistrationReviewContent = () => {
  const { t } = useTranslation()

  const { data } = useFetchApplicationsQuery()
  const companyData = data?.[0]

  const approvedSteps = companyData?.applicationChecklist.filter(
    (checklist: ApplicationChecklist) =>
      checklist.statusId === ProgressStatus.DONE
  ).length

  return (
    <>
      <Typography variant="body3" className="subDescription">
        {t('content.registrationInreview.subDescription')}
      </Typography>
      <Trans
        values={{
          step: approvedSteps,
          totalSteps: companyData?.applicationChecklist.length,
        }}
      >
        <Typography variant="h5" className="stepTitle">
          {t('content.registrationInreview.stageTitle')}
        </Typography>
      </Trans>
      {companyData?.applicationChecklist && (
        <RegistrationStatusList checklist={companyData.applicationChecklist} />
      )}
    </>
  )
}

export default RegistrationReviewContent
