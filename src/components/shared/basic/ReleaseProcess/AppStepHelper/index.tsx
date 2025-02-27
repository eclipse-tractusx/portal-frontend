/********************************************************************************
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

import {
  ConsentStatusEnum,
  type updateRolePayload,
} from 'features/appManagement/apiSlice'
import { type AppStatusDataState } from 'features/appManagement/types'

export function isStepCompleted(
  fetchAppStatus: AppStatusDataState,
  step: number,
  appRedirectStatus: boolean,
  data?: updateRolePayload[]
) {
  console.log('data>', data)
  console.log(
    'fetchAppStatus>',
    fetchAppStatus?.technicalUserProfile &&
      Object.keys(fetchAppStatus?.technicalUserProfile)?.length
  )
  switch (step) {
    case 1:
      return (
        fetchAppStatus?.title &&
        fetchAppStatus.provider &&
        fetchAppStatus.descriptions[0]?.shortDescription &&
        fetchAppStatus.descriptions[1]?.shortDescription &&
        fetchAppStatus.useCase?.length &&
        fetchAppStatus.supportedLanguageCodes?.length &&
        fetchAppStatus.documents?.APP_LEADIMAGE?.length &&
        fetchAppStatus.price &&
        appRedirectStatus
      )
    case 2:
      return (
        fetchAppStatus?.descriptions[0]?.longDescription &&
        fetchAppStatus.descriptions[1]?.longDescription &&
        fetchAppStatus.images?.length &&
        fetchAppStatus?.privacyPolicies?.length &&
        appRedirectStatus
      )
    case 3:
      return (
        fetchAppStatus?.agreements &&
        fetchAppStatus.agreements[0]?.consentStatus ===
          ConsentStatusEnum.ACTIVE &&
        fetchAppStatus.agreements[1]?.consentStatus ===
          ConsentStatusEnum.ACTIVE &&
        fetchAppStatus.agreements[2]?.consentStatus ===
          ConsentStatusEnum.ACTIVE &&
        fetchAppStatus.documents?.CONFORMITY_APPROVAL_BUSINESS_APPS?.length &&
        appRedirectStatus
      )
    case 4:
      return (
        data &&
        data.length > 0 &&
        fetchAppStatus?.technicalUserProfile &&
        Object.keys(fetchAppStatus?.technicalUserProfile)?.length &&
        appRedirectStatus
      )
    case 5:
      return fetchAppStatus && appRedirectStatus
    default:
      return false
  }
}
