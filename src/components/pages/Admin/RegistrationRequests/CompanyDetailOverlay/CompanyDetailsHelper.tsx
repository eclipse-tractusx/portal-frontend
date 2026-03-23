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

import {
  ProgressStatus,
  ApplicationRequestStatus,
  type ApplicationRequest,
} from 'features/admin/applicationRequestApiSlice'
import { Trans } from 'react-i18next'
import type i18next from 'i18next'
import dayjs from 'dayjs'
import { Typography } from '@arena2036/portal-shared-components-construct-x'
import { type CompanyDetail } from 'features/admin/registration/types'

export const getTitle = (
  activeTab: number,
  t: typeof i18next.t,
  selectedRequest?: ApplicationRequest
) => {
  const getStatus = () => {
    if (
      selectedRequest?.applicationStatus ===
        ApplicationRequestStatus.CONFIRMED &&
      selectedRequest?.applicationChecklist?.filter(
        (checklist) => checklist.statusId === ProgressStatus.SKIPPED
      ).length > 0
    ) {
      return t('content.admin.registration-requests.buttonPartiallyCompleted')
    } else if (
      selectedRequest?.applicationStatus === ApplicationRequestStatus.SUBMITTED
    ) {
      const failedItems = selectedRequest.applicationChecklist.filter(
        (checklist) => checklist.statusId === ProgressStatus.FAILED
      )
      return t(
        `content.admin.registration-requests.${failedItems.length ? 'buttonerror' : 'buttonprogress'}`
      )
    } else if (
      selectedRequest?.applicationStatus ===
        ApplicationRequestStatus.DECLINED ||
      selectedRequest?.applicationStatus ===
        ApplicationRequestStatus.CANCELLED_BY_CUSTOMER
    ) {
      return t('content.admin.registration-requests.buttonrejected')
    } else if (
      selectedRequest?.applicationStatus === ApplicationRequestStatus.CONFIRMED
    ) {
      return t('content.admin.registration-requests.buttoncompleted')
    }
  }

  if (activeTab === 0) {
    return t('content.admin.registration-requests.overlay.tab1Title')
  } else {
    return (
      <>
        <Typography variant="h3">
          {t('content.admin.registration-requests.overlay.tab1Title')}
        </Typography>
        <Trans
          values={{
            status: getStatus(),
          }}
        >
          <Typography variant="h4">
            {t('content.admin.registration-requests.overlay.tab2SubTitle')}
          </Typography>
        </Trans>
      </>
    )
  }
}

export const getIntro = (
  activeTab: number,
  selectedCompany: CompanyDetail,
  t: typeof i18next.t
) => {
  if (activeTab === 2) {
    return (
      <Trans
        values={{
          date: dayjs(selectedCompany.lastChanged).format('DD-MM-YYYY'),
        }}
      >
        <Typography variant="caption3">
          {t('content.admin.registration-requests.overlay.lastDate')}
        </Typography>
      </Trans>
    )
  }
}
