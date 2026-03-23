/********************************************************************************
 * Copyright (c) 2024 Contributors to the Eclipse Foundation
 *
 * See the NOTICE file(s) distributed with this work for additional
 * information regarding copyright ownership.
 *
 * This program and the accompanying materials are made available under the
 * terms of the Apache License Version 2.0 which is available at
 * https://www.apache.org/licenses/LICENSE-2.0.
 *
 * Unless required by applicable law or agreed to in writing software
 * distributed under the License is distributed on an AS IS BASIS WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND either express or implied. See the
 * License for the specific language governing permissions and limitations
 * under the License.
 *
 * SPDX-License-Identifier: Apache-2.0
 ********************************************************************************/

import { useNavigate } from 'react-router-dom'
import { useMediaQuery, useTheme } from '@mui/material'
import { Trans, useTranslation } from 'react-i18next'
import {
  Button,
  Typography,
} from '@arena2036/portal-shared-components-construct-x'
import RegistrationStatusList from 'components/shared/frame/Header/RegistrationReviewOverlay/RegistrationReviewContent/RegistrationStatusList'
import { type ApplicationResponse } from 'features/registration/registrationApiSlice'

export const SuccessRegistration = ({
  applicationData,
}: {
  applicationData: ApplicationResponse[]
}) => {
  const { t } = useTranslation('registration')
  const theme = useTheme()
  const navigate = useNavigate()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'), {
    defaultMatches: true,
  })

  return (
    <div className="registration-confirmation">
      <Typography variant={isMobile ? 'h4' : 'h3'}>
        {t('osp.success.heading')}
      </Typography>
      <Trans>
        <Typography variant="body2" className="description">
          {t('osp.success.description')}
        </Typography>
      </Trans>
      <div className="statusDetails">
        <Typography variant="h5" className="stepTitle">
          {t('osp.success.stepTitle')}
        </Typography>
        {applicationData?.[0] && (
          <RegistrationStatusList
            checklist={applicationData[0].applicationChecklist}
          />
        )}
      </div>
      <div className="homeBtn">
        <Button
          variant="contained"
          size="small"
          onClick={() => {
            navigate('/home')
          }}
        >
          {t('osp.success.homepage')}
        </Button>
      </div>
    </div>
  )
}
