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
  type ProgressButtonsType,
  ProgressStatus,
} from 'features/admin/applicationRequestApiSlice'
import { Trans } from 'react-i18next'
import type i18next from 'i18next'

export const isComplete = (applicationChecklist: ProgressButtonsType[]) =>
  applicationChecklist.reduce(
    (a, b) => a && b.statusId === ProgressStatus.DONE,
    true
  )

export const getTitle = (
  activeTab: number,
  applicationChecklist: ProgressButtonsType[],
  t: typeof i18next.t
) => {
  if (activeTab === 0) {
    return t('content.admin.registration-requests.overlay.tab1Title')
  }
  if (isComplete(applicationChecklist)) {
    return (
      <Trans
        i18nKey={'content.admin.registration-requests.overlay.tab2Title'}
        values={{
          status: t(
            'content.admin.registration-requests.overlay.statusComplete'
          ),
        }}
      ></Trans>
    )
  }
  return (
    <Trans
      i18nKey={'content.admin.registration-requests.overlay.tab2Title'}
      values={{
        status: t(
          'content.admin.registration-requests.overlay.statusIncomplete'
        ),
      }}
    ></Trans>
  )
}
