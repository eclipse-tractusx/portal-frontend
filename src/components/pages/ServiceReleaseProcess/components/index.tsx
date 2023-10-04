/********************************************************************************
 * Copyright (c) 2021, 2023 BMW Group AG
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

import ReleaseProcessWrapper from 'components/shared/basic/ReleaseProcess/components/ReleaseProcessWrapper'
import {
  ReleaseProcessTypes,
  ServiceTypeIdsEnum,
} from 'features/serviceManagement/apiSlice'
import {
  serviceStatusDataSelector,
  setServiceReleaseActiveStep,
} from 'features/serviceManagement/slice'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

export default function ServiceReleaseProcessForm() {
  const navigate = useNavigate()
  const { t } = useTranslation('servicerelease')
  const dispatch = useDispatch()

  const onServiceOverviewClick = () => {
    navigate('/serviceoverview')
    dispatch(setServiceReleaseActiveStep())
  }
  const serviceStatusData = useSelector(serviceStatusDataSelector)

  const stepsListWithoutTechnicalIntegration = [
    {
      headline: t('stepper.marketCard'),
      step: 1,
    },
    {
      headline: t('stepper.servicePage'),
      step: 2,
    },
    {
      headline: t('stepper.contractAndConsent'),
      step: 3,
    },
    {
      headline: t('stepper.validateAndPublish'),
      step: 4,
    },
  ]

  const stepsList = [
    {
      headline: t('stepper.marketCard'),
      step: 1,
    },
    {
      headline: t('stepper.servicePage'),
      step: 2,
    },
    {
      headline: t('stepper.contractAndConsent'),
      step: 3,
    },
    {
      headline: t('stepper.technicalIntegration'),
      step: 4,
    },
    {
      headline: t('stepper.validateAndPublish'),
      step: 5,
    },
  ]

  return (
    <ReleaseProcessWrapper
      processType={ReleaseProcessTypes.SERVICE_RELEASE}
      onAppsOverviewClick={() => {
        onServiceOverviewClick()
      }}
      stepsList={
        serviceStatusData?.serviceTypeIds.length === 0 ||
        (serviceStatusData?.serviceTypeIds.length > 0 &&
          serviceStatusData?.serviceTypeIds.includes(
            ServiceTypeIdsEnum.DATASPACE_SERVICE
          ))
          ? stepsList
          : stepsListWithoutTechnicalIntegration
      }
      numberOfSteps={
        serviceStatusData?.serviceTypeIds.length === 0 ||
        (serviceStatusData?.serviceTypeIds.length > 0 &&
          serviceStatusData?.serviceTypeIds.includes(
            ServiceTypeIdsEnum.DATASPACE_SERVICE
          ))
          ? 5
          : 4
      }
      pageHeaderTitle={t('headerTitle')}
      headerTitle={t('submit.headerTitle')}
      headerDescription={t('submit.headerDescription')}
      headerDescriptionComplete={t('submit.headerDescriptionComplete')}
      yourCatenaXTeam={t('submit.yourCatenaXTeam')}
      myAppsOverview={t('submit.overview')}
    />
  )
}
