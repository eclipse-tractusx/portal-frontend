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

import {
  ProgressButtonsProps,
  ProgressStatus,
} from 'features/admin/applicationRequestApiSlice'

export const isComplete = (applicationChecklist: ProgressButtonsProps[]) => {
  let flag = true
  if (applicationChecklist) {
    applicationChecklist.forEach(
      (btn: { typeId: string; statusId: string }) => {
        if (btn.statusId !== ProgressStatus.DONE) {
          flag = false
          return flag
        }
      }
    )
  }
  return flag
}

export const getTitle = (
  activeTab: number,
  applicationChecklist: ProgressButtonsProps[],
  t: any
) => {
  if (activeTab === 0) {
    return t('content.admin.registration-requests.overlay.tab1Title')
  } else {
    if (isComplete(applicationChecklist)) {
      return t('content.admin.registration-requests.overlay.tab2Title').replace(
        '{status}',
        t('content.admin.registration-requests.overlay.statusComplete')
      )
    } else {
      return t('content.admin.registration-requests.overlay.tab2Title').replace(
        '{status}',
        t('content.admin.registration-requests.overlay.statusIncomplete')
      )
    }
  }
}
