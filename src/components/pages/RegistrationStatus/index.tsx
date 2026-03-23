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

import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import {
  Button,
  Stepper,
  Typography,
} from '@arena2036/portal-shared-components-construct-x'
import {
  ApplicationStatus,
  useFetchApplicationsQuery,
} from 'features/registration/registrationApiSlice'
import './style.scss'

export default function RegistrationStatus() {
  const { t } = useTranslation()

  const [activeStep, setActiveStep] = useState(1)

  const { data } = useFetchApplicationsQuery()
  const companyData = data?.[0]

  useEffect(() => {
    switch (companyData?.applicationStatus) {
      case ApplicationStatus.CREATED:
      case ApplicationStatus.ADD_COMPANY_DATA:
        setActiveStep(1)
        return
      case ApplicationStatus.INVITE_USER:
        setActiveStep(2)
        return
      case ApplicationStatus.SELECT_COMPANY_ROLE:
        setActiveStep(3)
        return
      case ApplicationStatus.UPLOAD_DOCUMENTS:
        setActiveStep(4)
        return
      case ApplicationStatus.VERIFY:
        setActiveStep(5)
    }
  }, [companyData])

  const AddStepsList = [
    {
      headline: t('content.registration.steps.step1'),
      step: 1,
      color: '',
    },
    {
      headline: t('content.registration.steps.step2'),
      step: 2,
    },
    {
      headline: t('content.registration.steps.step3'),
      step: 3,
    },
    {
      headline: t('content.registration.steps.step4'),
      step: 4,
    },
    {
      headline: t('content.registration.steps.step5'),
      step: 5,
    },
  ]

  const NewAddStepList = AddStepsList.map((list) => {
    if (list.step === activeStep) {
      const obj = { ...list }
      obj.color = '#0F71CB'
      return obj
    }
    return list
  })

  return (
    <div className="container registration-main">
      <div className="text-center">
        <Typography variant="h2" className="mb-35 title">
          {t('content.registration.title')}
        </Typography>
        <Typography variant="body1" className="mainDescription mb-35">
          {t('content.registration.mainDescription')}
        </Typography>
        <Button
          variant="outlined"
          onClick={() => {
            window.open('/registration/form', '_blank')
          }}
          size="small"
          className="completeBtn mb-35"
        >
          {t('content.registration.completeBtn')}
        </Button>
        <Typography variant="body3" className="description">
          {t('content.registration.description')}
        </Typography>
        <Stepper
          list={NewAddStepList}
          showSteps={5}
          activeStep={activeStep}
          tooltipText={t('content.registration.steps.tooltipText')}
          tooltipLink="/registration/form"
        />
        <div className="helpTextReg">
          <Typography variant="body3">
            {t('content.registration.helpText')}
            <Link to={''} className="emailText">
              {t('content.registration.email')}
            </Link>
          </Typography>
        </div>
      </div>
    </div>
  )
}
